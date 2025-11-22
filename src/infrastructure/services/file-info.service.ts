/**
 * File Info Service
 * Single Responsibility: Get file information and metadata
 */

import * as FileSystem from "expo-file-system/legacy";
import type { FileInfo } from "../../domain/entities/File";

/**
 * Get file information
 */
export async function getFileInfo(uri: string): Promise<FileInfo | null> {
  try {
    const info = await FileSystem.getInfoAsync(uri);

    if (!info.exists) {
      return null;
    }

    return {
      uri,
      name: uri.split("/").pop() || "",
      size: info.size || 0,
      exists: info.exists,
      isDirectory: info.isDirectory || false,
      modificationTime: info.modificationTime || 0,
    };
  } catch (error) {
    return null;
  }
}

/**
 * Check if file exists
 */
export async function fileExists(uri: string): Promise<boolean> {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    return info.exists;
  } catch (error) {
    return false;
  }
}

/**
 * Get file size
 */
export async function getFileSize(uri: string): Promise<number> {
  const info = await getFileInfo(uri);
  return info?.size || 0;
}

