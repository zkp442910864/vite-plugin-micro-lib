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

## 使用

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

<!-- 这里往后用typedoc 生成并插入 -->

## microLib()

> **microLib**(`options`): `Plugin`

Defined in: [index.ts:8](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.ts#L8)

### Parameters

| Parameter | Type |
| ------ | ------ |
| `options` | [`IOptions`](#ioptions) |

### Returns

`Plugin`

***

## IExternalData

Defined in: [index.type.ts:2](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L2)

### Extended by

- [`ILibData`](#ilibdata)

### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="lib"></a> `lib?` | `boolean` | 是否作为库进行打包 **Default** `false` | [index.type.ts:12](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L12) |
| <a id="treeshake"></a> `treeshake?` | `boolean` | 是否启用 Tree Shaking **Default** `true` | [index.type.ts:7](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L7) |

***

## ILibData

Defined in: [index.type.ts:15](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L15)

### Extends

- [`IExternalData`](#iexternaldata)

### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="filename"></a> `fileName` | `string` | 库的文件名 | - | [index.type.ts:35](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L35) |
| <a id="lib-1"></a> `lib?` | `boolean` | 是否作为库进行打包 **Default** `false` | [`IExternalData`](#iexternaldata).[`lib`](#lib) | [index.type.ts:12](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L12) |
| <a id="name"></a> `name` | `string` | 库的名称 | - | [index.type.ts:19](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L19) |
| <a id="scripturl"></a> `scriptUrl` | `string` | 库的脚本 URL | - | [index.type.ts:27](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L27) |
| <a id="treeshake-1"></a> `treeshake?` | `boolean` | 是否启用 Tree Shaking **Default** `true` | [`IExternalData`](#iexternaldata).[`treeshake`](#treeshake) | [index.type.ts:7](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L7) |
| <a id="version"></a> `version` | `string` | 库的版本 | - | [index.type.ts:23](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L23) |
| <a id="webabsurl"></a> `webAbsUrl` | `string` | 库的绝对 URL | - | [index.type.ts:31](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L31) |

***

## IOptions

Defined in: [index.type.ts:38](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L38)

### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="customhandlegeneratecode"></a> `customHandleGenerateCode?` | (`libItem`: [`IExternalData`](#iexternaldata), `code`: `string`) => `string` \| `Promise`\<`string`\> | 自定义代码处理函数 | [index.type.ts:69](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L69) |
| <a id="externaldata"></a> `externalData` | `Record`\<`string`, [`IExternalData`](#iexternaldata)\> | 外部依赖数据 | [index.type.ts:47](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L47) |
| <a id="minify"></a> `minify?` | `boolean` | 是否压缩输出文件 **Default** `true` | [index.type.ts:57](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L57) |
| <a id="outdir"></a> `outDir?` | `string` | 输出目录 **Default** `'./micro-lib'` | [index.type.ts:43](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L43) |
| <a id="sourcemap"></a> `sourcemap?` | `boolean` | 是否生成 sourcemap **Default** `true` | [index.type.ts:62](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L62) |
| <a id="webabsurl-1"></a> `webAbsUrl?` | `string` | 外部依赖的绝对 URL 前缀 **Default** `''` | [index.type.ts:52](https://github.com/zkp442910864/vite-plugin-micro-lib/blob/57ff4bdf280910a31bab8de216d4eaa0c2f20e65/src/index.type.ts#L52) |
