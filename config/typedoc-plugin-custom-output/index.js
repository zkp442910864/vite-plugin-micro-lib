import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';
import { MarkdownPageEvent } from 'typedoc-plugin-markdown';

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
    app.renderer.on(MarkdownPageEvent.BEGIN, (context) => {
        // page.contents = page.contents?.replace('foo', 'bar');
        // page.model
        context.model.children?.reverse();
        context.model.childrenIncludingDocuments?.reverse();
        context.model.groups?.reverse();
    });

    app.renderer.on(MarkdownPageEvent.END, (context) => {
        // context.contents
        const filePath = path.join(cwd(), 'README.md');
        const flag = '<!-- 这里往后用typedoc 生成并插入 -->';
        const base = readFileSync(filePath, 'utf-8').split(flag)[0].trim();
        writeFileSync(filePath, `${base}\n\n${flag}\n\n${context.contents}`, 'utf-8');
    });
}