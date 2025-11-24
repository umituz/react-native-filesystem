/**
 * File Operations Service
 * Handles basic file read/write operations
 */

import { readFile, readFileAsBase64 } from "./file-reader.service";
import { writeFile } from "./file-writer.service";
import type { FileEncoding, FileOperationResult } from "../../domain/entities/File";

export class FileOperations {
  static async readFile(
    uri: string,
    encoding: FileEncoding = "utf8",
  ): Promise<string | null> {
    return readFile(uri, encoding);
  }

  static async readFileAsBase64(uri: string): Promise<string | null> {
    return readFileAsBase64(uri);
  }

  static async writeFile(
    uri: string,
    content: string,
    encoding: FileEncoding = "utf8",
  ): Promise<FileOperationResult> {
    return writeFile(uri, content, encoding);
  }
}
