import {execSync} from 'child_process';
import {createWriteStream, readFileSync, writeFileSync} from 'fs';
import path from 'path';
import {version as packageVersion} from '../../../../package.json';

interface Version {
	version: string;
	preVersionType: string;
	preVersionNumber: number;
}

class Release {
	// conventionalChangelog is not available as an ESM module therefore it has to be imported with require and not with import
	private static readonly conventionalChangelog = require('conventional-changelog');

	static perform(preVersion?: string): void {
		const nextVersion = Release.computeVersion(Release.splitVersion(packageVersion), preVersion);
		execSync(`npm version ${nextVersion} --prefix ../../`);
		Release.bumpVersion(nextVersion);
		const schematicsPath = path.join('..', 'oblique', 'schematics');
		Release.bumpPackageVersion(nextVersion, path.join('..', 'sandbox', 'package.json'));
		Release.bumpPackageVersion(nextVersion, path.join(schematicsPath, 'package.json'));
		Release.bumpPackageVersion(nextVersion, path.join(schematicsPath, 'package-lock.json'));
		Release.writeChangelog();
	}

	private static splitVersion(version): Version {
		const {groups} = version.match(/(?<version>\d+\.\d+\.\d+)(?:-(?<type>[^.]+)\.(?<typeNbr>\d+))?/);
		return {
			version: groups?.version,
			preVersionType: groups?.type,
			preVersionNumber: +groups?.typeNbr
		};
	}

	private static computeVersion(version: Version, preVersion: string): string {
		if (!version.preVersionType) {
			const newVersion = Release.getVersionFromGit(version.version);
			return preVersion ? `${newVersion}-${preVersion}.1` : newVersion;
		}
		if (!preVersion) {
			return version.version;
		}
		if (version.preVersionType !== preVersion) {
			return `${version.version}-${preVersion}.1`;
		}
		return `${version.version}-${version.preVersionType}.${version.preVersionNumber + 1}`;
	}

	private static getVersionFromGit(versionNbr: string): string {
		const current = /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)/.exec(versionNbr).groups;
		const commits = execSync(`git log ${versionNbr}..HEAD --abbrev-commit`).toString();
		if (commits.includes('BREAKING CHANGE')) {
			return `${+current?.major + 1}.0.0`;
		}
		return commits.includes('feat:') || commits.includes('feat(')
			? `${current?.major}.${+current?.minor + 1}.0`
			: `${current?.major}.${current?.minor}.${+current?.patch + 1}`;
	}

	private static bumpVersion(version: string): void {
		writeFileSync(path.join('..', 'oblique', 'src', 'lib', 'version.ts'), `export const appVersion = '${version}';\n`, {flag: 'w'});
	}

	private static bumpPackageVersion(version: string, filePath: string): void {
		const pkg = readFileSync(filePath)
			.toString()
			.replace(/"version": "[^"]*",/, `"version": "${version}",`);
		writeFileSync(filePath, pkg);
	}

	private static writeChangelog(): void {
		const changelogPath = path.join('..', '..', 'CHANGELOG.md');
		const changelog: string = readFileSync(changelogPath).toString();
		const stream = createWriteStream(changelogPath);
		stream.on('finish', () => {
			const newLog: string = readFileSync(changelogPath)
				.toString()
				.replace(/##(?<title>.*)\n/g, '#$<title>')
				.replace(/\n\n\n/g, '\n\n');
			writeFileSync(changelogPath, newLog + changelog);
		});
		Release.conventionalChangelog({
			preset: 'angular',
			tagPrefix: ''
		}).pipe(stream);
	}
}

Release.perform(process.argv[2]);
