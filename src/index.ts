export * from './index.type';
import path from 'node:path';
import { build, Plugin } from 'vite';
import chalk from 'chalk';
import type { IOptions } from './index.type';
import { generateExternalAndLibMap, libBuildPlugin } from './utils';

export const microLib = (options: IOptions) => {
    const {
        outDir = './micro-lib',
        externalData,
        webAbsUrl = '',
        minify = true,
        sourcemap = true,
        customHandleGenerateCode,
    } = options;

    let envMode = 'development';
    let rootOutDir = 'dist';
    const { external, libMap, outDirPath, } = generateExternalAndLibMap(externalData, outDir, webAbsUrl);

    const pluginConfig: Plugin = {
        name: 'vite-plugin-micro-lib',
        apply: 'build',
        enforce: 'post',
        config: (config, env) => {
            envMode = env.mode;
            rootOutDir = config.build?.outDir || 'dist';

            if (envMode === 'development') return;

            return {
                build: {
                    rollupOptions: {
                        external,
                        /**
                         * - 一个思路, 大概是
                         * - 传入正则,用起始匹配
                         * - 然后通过 node_modules/{包名}/package.json 中的 exports 找到库下的其他子包
                         * - 来填充 external 里面没列的包
                         * - TODO: 问题是这种是全量的, 不清楚哪些包是不存在的, 也可能出现 exports 不存在的情况
                         *
                         * - 目前的实现是,需要用户手动录入的方式
                         */
                        // external: externalReg,
                    },
                },
            };
        },
        transformIndexHtml(html) {
            if (envMode === 'development') return html;

            // 引入js包
            const importMap = Object.fromEntries(
                Object.values(libMap).map((item) => [item.name, item.webAbsUrl || item.scriptUrl,])
            );

            const scriptList = [
                `<script type="importmap">${JSON.stringify({ imports: importMap, })}</script>`,
                // 不需要默认加载,代码在加载时候会自动识别并加载
                // ...Object.values(libMap).map((item) => `<script type="module" crossorigin src="${item.webAbsUrl || item.scriptUrl}"></script>`),
            ];

            return html.replace('</title>', `</title>\n${scriptList.join('\n')}\n`);
        },
        async closeBundle() {
            if (envMode === 'development') return;

            console.log(`\n${chalk.cyan('Micro libraries built:')}`);

            for (const lib of external) {
                const libItem = libMap[lib];

                await build({
                    mode: 'production',
                    configFile: false,
                    publicDir: false,
                    // esbuild: false,
                    logLevel: 'silent',
                    build: {
                        emptyOutDir: false,
                        outDir: path.join(rootOutDir, outDirPath),
                        minify,
                        sourcemap,
                        lib: libItem.lib
                            ? {
                                entry: lib,
                                formats: ['es',],
                            }
                            : undefined,
                        rollupOptions: {
                            external: external.filter(ii => ii !== lib),
                            input: lib,
                            treeshake: libItem.treeshake,
                            output: {
                                format: 'module',
                                entryFileNames: libMap[lib].fileName,
                                // esModule: true,
                            },
                        },
                    },
                    plugins: [libBuildPlugin(rootOutDir, outDir, libItem, customHandleGenerateCode),],
                });
            }
        },
    };

    return pluginConfig;
};
