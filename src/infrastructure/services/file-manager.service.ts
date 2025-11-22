/**
 * File Manager Service
 * Single Responsibility: Manage file operations (delete, copy, move)
 */

import * as FileSystem from "expo-file-system/legacy";
import type { FileOperationResult } from "../../domain/entities/File";

/**
 * Delete file or directory
 */
export async function deleteFile(uri: string): Promise<boolean> {
  try {
    await FileSystem.deleteAsync(uri, { idempotent: true });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Copy file
 */
export async function copyFile(
  sourceUri: string,
  destinationUri: string,
): Promise<FileOperationResult> {
  try {
    await FileSystem.copyAsync({
      from: sourceUri,
      to: destinationUri,
    });
    return { success: true, uri: destinationUri };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Move file
 */
export async function moveFile(
  sourceUri: string,
  destinationUri: string,
): Promise<FileOperationResult> {
  try {
    await FileSystem.moveAsync({
      from: sourceUri,
      to: destinationUri,
    });
    return { success: true, uri: destinationUri };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

