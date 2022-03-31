import {readFileSync, readdirSync, statSync, writeFileSync} from 'fs';
import path from 'path';

class GenerateComponentStyles {
	static perform(): void {
		const componentPath = path.join('projects', 'stylesBuilder', 'oblique-components.scss');
		const directoryPath = path.join('projects', 'oblique', 'src', 'lib');
		const comment = '// This file is generated by the postdist script, please do not edit';
		const styleUrls = GenerateComponentStyles.generateComponentFile(directoryPath);
		writeFileSync(componentPath, `${comment}\n\n${styleUrls}`);
	}

	private static generateComponentFile(directoryPath: string): string {
		return GenerateComponentStyles.listFiles(directoryPath)
			.map(filePath => ({
				filePath: GenerateComponentStyles.getDirectoryPath(filePath),
				content: readFileSync(filePath, 'utf8')
			}))
			.map(file => ({filePath: file.filePath, styleUrls: /styleUrls:\s*\[(?<styleUrls>[^\]]*)]/m.exec(file.content)?.groups?.styleUrls}))
			.filter(file => file.styleUrls)
			.map(file => ({filePath: file.filePath, styleUrls: file.styleUrls.replace(/'|\t|\n|\.\/|\s/g, '')}))
			.map(file => ({filePath: file.filePath, styleUrls: file.styleUrls.split(',')}))
			.map(file => ({filePath: file.filePath, styleUrls: file.styleUrls.filter(url => !url.startsWith('.'))}))
			.map(file => file.styleUrls.map(fileName => `${file.filePath}/${fileName}`))
			.reduce<string[]>((flatArray, current) => [...flatArray, ...current], [])
			.map(styleUrl => `@import "${styleUrl}";`)
			.join('\n');
	}

	private static listFiles(directory: string): string[] {
		return readdirSync(directory)
			.map(fileName => path.join(directory, fileName))
			.filter(fileName => !fileName.includes('mock'))
			.reduce<string[]>(
				(filePaths, filePath) =>
					statSync(filePath).isDirectory() ? [...filePaths, ...GenerateComponentStyles.listFiles(filePath)] : [...filePaths, filePath],
				[]
			)
			.filter(filePath => filePath.endsWith('.component.ts'));
	}

	private static getDirectoryPath(filePath: string): string {
		const pathChunks = filePath.split(path.sep);
		pathChunks.pop();
		return pathChunks.join('/');
	}
}

GenerateComponentStyles.perform();
