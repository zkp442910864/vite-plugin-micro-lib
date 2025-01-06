# @zzzz-/vite-plugin-micro-lib

`vite-plugin-micro-lib` 是一个用于构建微型库的 Vite 插件。它可以帮助你将多个外部依赖打包成独立的模块，并生成相应的导入映射。

## 安装

使用 npm 安装：

```sh
npm install @zzzz-/vite-plugin-micro-lib --save-dev
```

使用 pnpm 安装：

```sh
pnpm add @zzzz-/vite-plugin-micro-lib --save-dev
```

### 使用

在你的 `vite.config.ts` 中配置该插件：

```ts
import { defineConfig } from 'vite';
import { microLib } from '@zzzz-/vite-plugin-micro-lib';

export default defineConfig({
    plugins: [
        microLib({
            outDir: './micro-lib',
            externalData: {
                react: {},
                'react/jsx-runtime': {},
                'react-dom': {},
                'react-dom/client': {},
                'react-router': { lib: true, },
                zustand: { lib: true, },
                // 添加更多外部依赖
            },
            // webAbsUrl: 'https://cdn.example.com/libs',
            // minify: true,
            // sourcemap: true,
            // customHandleGenerateCode: async (libItem, code) => {
            //     // 自定义代码处理逻辑
            //     return code;
            // },
        }),
    ],
});
```

### 配置选项

`microLib` 接受一个配置对象，包含以下选项：

- `outDir` (string): 输出目录，默认为 `./micro-lib`。
- `externalData` (Record<string, IExternalData>): 外部依赖数据，必须配置。
- `webAbsUrl` (string): 外部依赖的绝对 URL 前缀，默认为空字符串。
- `minify` (boolean): 是否压缩输出文件，默认为 `true`。
- `sourcemap` (boolean): 是否生成 sourcemap，默认为 `true`。
- `customHandleGenerateCode` (function): 自定义代码处理函数，接受 `libItem` 和 `code` 两个参数，返回处理后的代码。

### 类型定义

插件的类型定义如下：

```ts
interface IExternalData {
    /**
     * 是否启用 Tree Shaking
     * @default true
     */
    treeshake?: boolean;
    /**
     * 是否作为库进行打包
     * @default false
     */
    lib?: boolean;
}

interface ILibData extends IExternalData {
    name: string;
    version: string;
    scriptUrl: string;
    webAbsUrl: string;
    fileName: string;
}

interface IOptions {
    /**
     * 输出目录
     * @default './micro-lib'
     */
    outDir?: string;
    /**
     * 外部依赖数据
     */
    externalData: Record<string, IExternalData>;
    /**
     * 外部依赖的绝对 URL 前缀
     * @default ''
     */
    webAbsUrl?: string;
    /**
     * 是否压缩输出文件
     * @default true
     */
    minify?: boolean;
    /**
     * 是否生成 sourcemap
     * @default true
     */
    sourcemap?: boolean;
    /**
     * 自定义代码处理函数
     * @param libItem - 库项目信息
     * @param code - 生成的代码
     * @returns 处理后的代码或 Promise 对象
     */
    customHandleGenerateCode?: (libItem: IExternalData, code: string) => string | Promise<string>;
}
```
