/**
 * Package version constant.
 * Imports version directly from package.json
 * 
 * @example
 * ```typescript
 * import { getPackageVersion } from './utils/version';
 * console.log(getPackageVersion()); // "0.14.11"
 * ```
 */

import packageJson from '../../package.json';

/**
 * Get the package version from package.json
 * @returns The package version from package.json
 */
export function getPackageVersion(): string {
  return packageJson.version;
}

/**
 * Get the package name
 * @returns The package name from package.json
 */
export function getPackageName(): string {
  return packageJson.name;
}
