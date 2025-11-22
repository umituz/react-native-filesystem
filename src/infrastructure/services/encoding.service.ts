/**
 * Encoding Service
 * Single Responsibility: Handle file encoding/decoding operations
 */

import type { FileEncoding } from "../../domain/entities/File";

/**
 * Convert FileEncoding to Expo FileSystem encoding type
 * Expo v19+ uses string literals directly
 */
export function getEncodingType(encoding: FileEncoding): "utf8" | "base64" {
  return encoding;
}

/**
 * Validate encoding type
 */
export function isValidEncoding(encoding: string): encoding is FileEncoding {
  return encoding === "utf8" || encoding === "base64";
}

