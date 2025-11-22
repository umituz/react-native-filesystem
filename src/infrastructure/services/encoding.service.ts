/**
 * Encoding Service
 * Single Responsibility: Handle file encoding/decoding operations
 */

import * as FileSystem from "expo-file-system";
import type { FileEncoding } from "../../domain/entities/File";

/**
 * Convert FileEncoding to Expo FileSystem encoding type
 */
export function getEncodingType(encoding: FileEncoding): any {
  // Expo v19+ uses different encoding format
  if (encoding === "base64") {
    return FileSystem.EncodingType?.Base64 ?? "base64";
  }
  return FileSystem.EncodingType?.UTF8 ?? "utf8";
}

/**
 * Validate encoding type
 */
export function isValidEncoding(encoding: string): encoding is FileEncoding {
  return encoding === "utf8" || encoding === "base64";
}

