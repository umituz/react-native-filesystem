/**
 * File Reader Service
 * Single Responsibility: Read files from device storage
 */

import * as FileSystem from "expo-file-system";
import type { FileEncoding } from "../../domain/entities/File";

/**
 * Read file as string with encoding
 */
export async function readFile(
  uri: string,
  encoding: FileEncoding = "utf8",
): Promise<string | null> {
  try {
    const encodingType =
      encoding === "base64"
        ? FileSystem.EncodingType.Base64
        : FileSystem.EncodingType.UTF8;

    const content = await FileSystem.readAsStringAsync(uri, {
      encoding: encodingType,
    });
    return content;
  } catch (error) {
    return null;
  }
}

/**
 * Read file as base64 string
 */
export async function readFileAsBase64(uri: string): Promise<string | null> {
  return readFile(uri, "base64");
}


