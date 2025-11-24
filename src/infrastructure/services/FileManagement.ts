/**
 * File Management Service
 * Handles file operations like copy, move, delete
 */

import { deleteFile, copyFile, moveFile } from "./file-manager.service";
import type { FileOperationResult } from "../../domain/entities/File";

export class FileManagement {
  static async deleteFile(uri: string): Promise<boolean> {
    return deleteFile(uri);
  }

  static async copyFile(
    sourceUri: string,
    destinationUri: string,
  ): Promise<FileOperationResult> {
    return copyFile(sourceUri, destinationUri);
  }

  static async moveFile(
    sourceUri: string,
    destinationUri: string,
  ): Promise<FileOperationResult> {
    return moveFile(sourceUri, destinationUri);
  }
}
