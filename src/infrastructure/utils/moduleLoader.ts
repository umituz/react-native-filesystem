/**
 * Module Loader Utilities
 *
 * Provides explicit module loading for maximum compatibility
 * No longer uses require.context to avoid iOS Metro bundler issues
 */

import type { ModuleCollection } from '../../domain/entities/ModuleContext';

/**
 * Load JSON modules with explicit imports
 *
 * This function is kept for backward compatibility but now uses explicit imports
 * instead of require.context for maximum platform compatibility.
 *
 * @deprecated Use explicit imports instead of require.context pattern
 * @param context - Not used anymore, kept for API compatibility
 * @returns Empty object (backward compatibility)
 */
export function loadJsonModules(context?: any): ModuleCollection {
  // Return empty object for backward compatibility
  // Projects should migrate to explicit imports
  return {};
}

/**
 * Load modules with custom name transformation
 *
 * @deprecated Use explicit imports instead
 * @param context - Not used anymore
 * @param transformName - Not used anymore
 * @returns Empty object (backward compatibility)
 */
export function loadModulesWithTransform(
  context?: any,
  transformName?: (name: string) => string
): ModuleCollection {
  // Return empty object for backward compatibility
  return {};
}

/**
 * Get list of module names from context
 *
 * @deprecated Use explicit imports instead
 * @param context - Not used anymore
 * @returns Empty array (backward compatibility)
 */
export function getModuleNames(context?: any): string[] {
  // Return empty array for backward compatibility
  return [];
}
