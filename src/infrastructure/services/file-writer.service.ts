/**
 * File Writer Service
 * Single Responsibility: Write files to device storage
 */

import * as FileSystem from "expo-file-system";
import type { FileEncoding, FileOperationResult } from "../../domain/entities/File";

/**
 * Write string to file
 */
export async function writeFile(
  uri: string,
  content: string,
  encoding: FileEncoding = "utf8",
): Promise<FileOperationResult> {
  try {
    const encodingType =
      encoding === "base64"
        ? FileSystem.EncodingType.Base64
        : FileSystem.EncodingType.UTF8;

    await FileSystem.writeAsStringAsync(uri, content, { encoding: encodingType });
    return { success: true, uri };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

