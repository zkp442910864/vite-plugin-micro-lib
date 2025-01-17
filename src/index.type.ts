
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
    /**
     * 库的名称
     */
    name: string;
    /**
     * 库的版本
     */
    version: string;
    /**
     * 库的脚本 URL
     */
    scriptUrl: string;
    /**
     * 库的绝对 URL
     */
    webAbsUrl: string;
    /**
     * 库的文件名
     */
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
};

export type {
    ILibData,
    IExternalData,
    IOptions
};
