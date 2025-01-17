import * as fs from 'node:fs';
import path from 'node:path';
import { cwd } from 'node:process';
import type { IExternalData, ILibData, IOptions } from './index.type';
import chalk from 'chalk';
import { Plugin } from 'vite';

/** 生成基础数据 */
export function generateExternalAndLibMap(externalData: Record<string, IExternalData>, outDir: string, webAbsUrl: string) {
    const packageJson = JSON.parse(fs.readFileSync(path.resolve(cwd(), 'package.json'), 'utf-8')) as {dependencies: Record<string, string>};
    const external = Object.keys(externalData);
    const libMap: Record<string, ILibData> = {};
    const outDirPath = path.join(outDir);

    // 生成数据
    external.forEach((key) => {
        const [name,] = key.split('/');
        const version = packageJson.dependencies[name];
        const fileName = `${key}${version}.mjs`.replace(/[\^~]/, '@').replace('/', '-');

        libMap[key] = {
            name: key,
            version,
            fileName,
            scriptUrl: `./${path.posix.join(outDirPath, fileName)}`,
            webAbsUrl: webAbsUrl ? `${webAbsUrl}/${fileName}` : '',
            treeshake: true,
            lib: false,
            ...externalData[key],
        };
    });
    return { external, externalReg: external.map(ii => new RegExp(`^${ii}`)), libMap, outDirPath, };
}

/** 处理非lib打包后,内容没有进行export抛出问题 */
export function libBuildPlugin(rootOutDir: string, outDir: string, libItem: ILibData, customHandleGenerateCode: IOptions['customHandleGenerateCode']) {
    const config: Plugin = {
        name: 'inline:build',
        closeBundle() {},
        async generateBundle(_, bundle) {
            const asset = bundle[libItem.fileName];
            if (asset.type !== 'chunk') return;

            if (libItem.lib) {
                //
            }
            else if (customHandleGenerateCode) {
                asset.code = await customHandleGenerateCode(libItem, asset.code);
            }
            else {
                /** 手动增加 export */
                let originalCode = asset.code;
                const exportName = originalCode.match(/var\s*(\w+)\s*=\s*\{\}[;|,]/)?.[1]?.trim();
                const reg = new RegExp(`(${exportName}\\.(\\w+)\\s*=)`);
                const regG = new RegExp(`(${exportName}\\.(\\w+)\\s*=)`, 'g');
                const matchData = originalCode.match(regG);

                if (!exportName || !matchData) return;

                matchData.forEach((str) => {
                    const exportData = str.match(reg)?.[2]?.trim();

                    if (exportData && originalCode.includes(`function ${exportData}(`)) {
                        originalCode = originalCode.replace(`function ${exportData}(`, `export function ${exportData}(`);
                    }
                    else {
                        const newStr = str.replace(reg, `export const ${exportData} = $1`);
                        originalCode = originalCode.replace(str, newStr);
                    }
                });

                asset.code = `${originalCode}\nexport default ${exportName};`;
            }

            console.log(
                `✔ ${chalk.green(path.posix.join(rootOutDir, outDir, libItem.fileName))}   ${(asset.code.length / 1024).toFixed(2)} kB`
            );
        },

    };
    return config;
}
