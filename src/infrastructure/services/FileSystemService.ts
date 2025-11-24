/**
 * FileSystem Service - Facade
 * Delegates to specialized services following SOLID principles
 */

import { FileOperations } from "./FileOperations";
import { FileManagement } from "./FileManagement";
import { DirectoryOperations } from "./DirectoryOperations";
import { FileInformation } from "./FileInformation";
import { DownloadOperations } from "./DownloadOperations";
import { CacheOperations } from "./CacheOperations";
import { FilePathOperations } from "./FilePathOperations";
import { FileUtils } from "../../domain/entities/File";
import type { FileEncoding, DirectoryType, FileOperationResult } from "../../domain/entities/File";

/**
 * FileSystem Service - Clean facade for all file operations
 * Delegates to specialized services following Single Responsibility Principle
 */
export class FileSystemService {
  // File Reading
  static async readFile(uri: string, encoding: FileEncoding = "utf8"): Promise<string | null> {
    return FileOperations.readFile(uri, encoding);
  }

  static async readFileAsBase64(uri: string): Promise<string | null> {
    return FileOperations.readFileAsBase64(uri);
  }

  // File Writing
  static async writeFile(uri: string, content: string, encoding: FileEncoding = "utf8"): Promise<FileOperationResult> {
    return FileOperations.writeFile(uri, content, encoding);
  }

  // File Management
  static async deleteFile(uri: string): Promise<boolean> {
    return FileManagement.deleteFile(uri);
  }

  static async copyFile(sourceUri: string, destinationUri: string): Promise<FileOperationResult> {
    return FileManagement.copyFile(sourceUri, destinationUri);
  }

  static async moveFile(sourceUri: string, destinationUri: string): Promise<FileOperationResult> {
    return FileManagement.moveFile(sourceUri, destinationUri);
  }

  // Directory Operations
  static async createDirectory(uri: string): Promise<boolean> {
    return DirectoryOperations.createDirectory(uri);
  }

  static async listDirectory(uri: string): Promise<string[]> {
    return DirectoryOperations.listDirectory(uri);
  }

  static getDirectoryPath(type: DirectoryType): string {
    return DirectoryOperations.getDirectoryPath(type);
  }

  static getDocumentDirectory(): string {
    return DirectoryOperations.getDocumentDirectory();
  }

  static getCacheDirectory(): string {
    return DirectoryOperations.getCacheDirectory();
  }

  // File Information
  static async getFileInfo(uri: string) {
    return FileInformation.getFileInfo(uri);
  }

  static async exists(uri: string): Promise<boolean> {
    return FileInformation.exists(uri);
  }

  static async getFileSize(uri: string): Promise<number> {
    return FileInformation.getFileSize(uri);
  }

  // Downloads
  static async downloadFile(url: string, destinationUri?: string): Promise<FileOperationResult> {
    return DownloadOperations.downloadFile(url, destinationUri);
  }

  // Cache Management
  static async clearCache(): Promise<boolean> {
    return CacheOperations.clearCache();
  }

  static async getDirectorySize(uri: string): Promise<number> {
    return CacheOperations.getDirectorySize(uri);
  }

  // File Path Generation
  static generateFilePath(filename: string, directory: DirectoryType = "documentDirectory"): string {
    return FilePathOperations.generateFilePath(filename, directory);
  }

  // Convenience methods
  static async copyToCache(sourceUri: string, filename?: string): Promise<FileOperationResult> {
    const destinationUri = FilePathOperations.generateUniqueFilePath(
      filename || sourceUri.split("/").pop() || "file",
      "cacheDirectory"
    );
    return FileManagement.copyFile(sourceUri, destinationUri);
  }

  static async copyToDocuments(sourceUri: string, filename?: string): Promise<FileOperationResult> {
    const destinationUri = FilePathOperations.generateUniqueFilePath(
      filename || sourceUri.split("/").pop() || "file",
      "documentDirectory"
    );
    return FileManagement.copyFile(sourceUri, destinationUri);
  }
}
