/**
 * Download Service
 * Single Responsibility: Download files from URLs
 */

import * as FileSystem from "expo-file-system";
import type { FileOperationResult } from "../../domain/entities/File";
import { getDirectoryPath } from "./directory.service";
import { FileUtils } from "../../domain/entities/File";

/**
 * Download file from URL
 */
export async function downloadFile(
  url: string,
  destinationUri?: string,
): Promise<FileOperationResult> {
  try {
    const destination =
      destinationUri ||
      FileUtils.joinPaths(
        getDirectoryPath("documentDirectory"),
        FileUtils.generateUniqueFilename("download"),
      );

    const result = await FileSystem.downloadAsync(url, destination);
    return { success: true, uri: result.uri };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Download failed",
    };
  }
}

