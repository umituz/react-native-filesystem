/**
 * Directory Operations Service
 * Handles directory-related operations
 */

import {
  createDirectory,
  listDirectory,
  getDirectoryPath,
  getDocumentDirectory,
  getCacheDirectory,
} from "./directory.service";
import type { DirectoryType } from "../../domain/entities/File";

export class DirectoryOperations {
  static async createDirectory(uri: string): Promise<boolean> {
    return createDirectory(uri);
  }

  static async listDirectory(uri: string): Promise<string[]> {
    return listDirectory(uri);
  }

  static getDirectoryPath(type: DirectoryType): string {
    return getDirectoryPath(type);
  }

  static getDocumentDirectory(): string {
    return getDocumentDirectory();
  }

  static getCacheDirectory(): string {
    return getCacheDirectory();
  }
}
