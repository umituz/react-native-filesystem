/**
 * Directory Service
 * Single Responsibility: Manage directory operations
 */

import * as FileSystem from "expo-file-system";
import type { DirectoryType } from "../../domain/entities/File";

/**
 * Create directory
 */
export async function createDirectory(uri: string): Promise<boolean> {
  try {
    await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * List directory contents
 */
export async function listDirectory(uri: string): Promise<string[]> {
  try {
    const files = await FileSystem.readDirectoryAsync(uri);
    return files;
  } catch (error) {
    return [];
  }
}

/**
 * Get directory path by type
 */
export function getDirectoryPath(type: DirectoryType): string {
  try {
    switch (type) {
      case "documentDirectory":
        // Try Expo v19+ API first
        if ((FileSystem as any).Paths?.document?.uri) {
          return (FileSystem as any).Paths.document.uri;
        }
        // Fallback for older versions
        return (FileSystem as any).documentDirectory || "";
      case "cacheDirectory":
        // Try Expo v19+ API first
        if ((FileSystem as any).Paths?.cache?.uri) {
          return (FileSystem as any).Paths.cache.uri;
        }
        // Fallback for older versions
        return (FileSystem as any).cacheDirectory || "";
      default:
        return "";
    }
  } catch (error) {
    return "";
  }
}

/**
 * Get document directory path
 */
export function getDocumentDirectory(): string {
  return getDirectoryPath("documentDirectory");
}

/**
 * Get cache directory path
 */
export function getCacheDirectory(): string {
  return getDirectoryPath("cacheDirectory");
}

