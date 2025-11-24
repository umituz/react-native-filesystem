/**
 * File Information Service
 * Handles file information queries
 */

import { getFileInfo, fileExists, getFileSize } from "./file-info.service";
import type { FileInfo } from "../../domain/entities/File";

export class FileInformation {
  static async getFileInfo(uri: string): Promise<FileInfo | null> {
    return getFileInfo(uri);
  }

  static async exists(uri: string): Promise<boolean> {
    return fileExists(uri);
  }

  static async getFileSize(uri: string): Promise<number> {
    return getFileSize(uri);
  }
}
