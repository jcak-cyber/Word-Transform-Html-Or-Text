
import archiver from 'archiver'; // 用于创建ZIP文件
import { join } from 'path';
import { createWriteStream } from 'fs';
export default function createZip(rootDir, spinner) {
    const output = createWriteStream(join(rootDir, 'extension.zip'));
    const archive = archiver('zip', {
        zlib: { level: 9 } // 最高压缩级别
    });

    output.on('close', () => {
        spinner.succeed(`ZIP created successfully! Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
    });

    archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
            spinner.warn(err.message);
        } else {
            throw err;
        }
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.on('progress', (progress) => {
        const percent = Math.round((progress.processed / progress.total) * 100);
        spinner.text = `Compressing... ${percent}%`;
    });

    archive.pipe(output);
    archive.directory(join(rootDir, 'extensions'), false);

    archive.finalize();
}