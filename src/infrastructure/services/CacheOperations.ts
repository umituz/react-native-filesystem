/**
 * Cache Operations Service
 * Handles cache-related operations
 */

import { clearCache, getDirectorySize } from "./cache.service";

export class CacheOperations {
  static async clearCache(): Promise<boolean> {
    return clearCache();
  }

  static async getDirectorySize(uri: string): Promise<number> {
    return getDirectorySize(uri);
  }
}
