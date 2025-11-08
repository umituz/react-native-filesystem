/**
 * Module Loader Utilities
 *
 * Provides automatic module loading using Metro bundler's require.context
 * Used for auto-discovering and importing files at build time
 *
 * USAGE:
 * ```typescript
 * // Auto-load all JSON files in current directory
 * const context = require.context('./', false, /\.json$/);
 * const modules = loadJsonModules(context);
 * ```
 */

import type { RequireContext, ModuleCollection } from '../../domain/entities/ModuleContext';

/**
 * Load JSON modules from a require.context
 *
 * @param context - Metro bundler require.context result
 * @returns Object with module names as keys and content as values
 *
 * @example
 * ```typescript
 * const translationContext = require.context('./', false, /\.json$/);
 * const translations = loadJsonModules(translationContext);
 * // Result: { common: {...}, errors: {...}, settings: {...} }
 * ```
 */
export function loadJsonModules(context: RequireContext): ModuleCollection {
  const modules: ModuleCollection = {};

  context.keys().forEach((key: string) => {
    // Extract module name from path
    // './animation.json' -> 'animation'
    // './common.json' -> 'common'
    const moduleName = key
      .replace('./', '')
      .replace(/\.(json|js|ts|tsx)$/, '');

    // Load module content
    modules[moduleName] = context(key);
  });

  return modules;
}

/**
 * Load modules with custom name transformation
 *
 * @param context - Metro bundler require.context result
 * @param transformName - Function to transform module name
 * @returns Object with transformed names as keys
 *
 * @example
 * ```typescript
 * const context = require.context('./', false, /\.json$/);
 * const modules = loadModulesWithTransform(context, name => name.toUpperCase());
 * // Result: { COMMON: {...}, ERRORS: {...} }
 * ```
 */
export function loadModulesWithTransform(
  context: RequireContext,
  transformName: (name: string) => string
): ModuleCollection {
  const modules: ModuleCollection = {};

  context.keys().forEach((key: string) => {
    const baseName = key
      .replace('./', '')
      .replace(/\.(json|js|ts|tsx)$/, '');

    const transformedName = transformName(baseName);
    modules[transformedName] = context(key);
  });

  return modules;
}

/**
 * Get list of module names from context
 *
 * @param context - Metro bundler require.context result
 * @returns Array of module names (without extensions)
 *
 * @example
 * ```typescript
 * const context = require.context('./', false, /\.json$/);
 * const names = getModuleNames(context);
 * // Result: ['animation', 'common', 'errors', 'settings']
 * ```
 */
export function getModuleNames(context: RequireContext): string[] {
  return context.keys().map((key: string) =>
    key
      .replace('./', '')
      .replace(/\.(json|js|ts|tsx)$/, '')
  );
}
