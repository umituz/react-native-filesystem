/**
 * File Path Operations Service
 * Handles file path generation and utilities
 */

import { generateFilePath } from "./file-path.service";
import { getDirectoryPath } from "./directory.service";
import { FileUtils } from "../../domain/entities/File";
import type { DirectoryType } from "../../domain/entities/File";

export class FilePathOperations {
  static generateFilePath(
    filename: string,
    directory: DirectoryType = "documentDirectory",
  ): string {
    return generateFilePath(filename, directory);
  }

  static generateUniqueFilePath(
    filename: string,
    directory: DirectoryType = "documentDirectory",
  ): string {
    const uniqueName = FileUtils.generateUniqueFilename(filename);
    return FileUtils.joinPaths(getDirectoryPath(directory), uniqueName);
  }
}
