/**
 * Filesystem Domain - FileSystem Service
 *
 * Service for runtime file operations using expo-file-system.
 * Provides abstraction layer for file read/write/delete operations on device.
 *
 * @domain filesystem
 * @layer infrastructure/services
 */

import * as FileSystem from 'expo-file-system';
import type { FileInfo, FileOperationResult, DirectoryType, FileEncoding } from '../../domain/entities/File';
import { FileUtils } from '../../domain/entities/File';

/**
 * FileSystem service for device file operations
 *
 * CENTRAL PLACE FOR ALL FILE OPERATIONS
 * - Reading/writing files
 * - Directory management
 * - File downloads
 * - Cache management
 *
 * Used by other domains (media, etc.) for file operations
 */
export class FileSystemService {
  /**
   * Get file information
   */
  static async getFileInfo(uri: string): Promise<FileInfo | null> {
    try {
      const info = await FileSystem.getInfoAsync(uri);

      if (!info.exists) {
        return null;
      }

      return {
        uri,
        name: uri.split('/').pop() || '',
        size: info.size || 0,
        exists: info.exists,
        isDirectory: info.isDirectory || false,
        modificationTime: info.modificationTime || 0,
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Read file as string
   */
  static async readFile(uri: string, encoding: FileEncoding = 'utf8'): Promise<string | null> {
    try {
      const content = await FileSystem.readAsStringAsync(uri, { encoding });
      return content;
    } catch (error) {
      return null;
    }
  }

  /**
   * Write string to file
   */
  static async writeFile(uri: string, content: string, encoding: FileEncoding = 'utf8'): Promise<FileOperationResult> {
    try {
      await FileSystem.writeAsStringAsync(uri, content, { encoding });
      return { success: true, uri };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Delete file or directory
   */
  static async deleteFile(uri: string): Promise<boolean> {
    try {
      await FileSystem.deleteAsync(uri, { idempotent: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Copy file
   */
  static async copyFile(sourceUri: string, destinationUri: string): Promise<FileOperationResult> {
    try {
      await FileSystem.copyAsync({
        from: sourceUri,
        to: destinationUri,
      });
      return { success: true, uri: destinationUri };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Move file
   */
  static async moveFile(sourceUri: string, destinationUri: string): Promise<FileOperationResult> {
    try {
      await FileSystem.moveAsync({
        from: sourceUri,
        to: destinationUri,
      });
      return { success: true, uri: destinationUri };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Create directory
   */
  static async createDirectory(uri: string): Promise<boolean> {
    try {
      await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * List directory contents
   */
  static async listDirectory(uri: string): Promise<string[]> {
    try {
      const files = await FileSystem.readDirectoryAsync(uri);
      return files;
    } catch (error) {
      return [];
    }
  }

  /**
   * Check if file exists
   */
  static async exists(uri: string): Promise<boolean> {
    try {
      const info = await FileSystem.getInfoAsync(uri);
      return info.exists;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get directory path by type
   */
  static getDirectoryPath(type: DirectoryType): string {
    switch (type) {
      case 'documentDirectory':
        return FileSystem.documentDirectory || '';
      case 'cacheDirectory':
        return FileSystem.cacheDirectory || '';
      default:
        return '';
    }
  }

  /**
   * Get document directory path
   */
  static getDocumentDirectory(): string {
    return FileSystemService.getDirectoryPath('documentDirectory');
  }

  /**
   * Get cache directory path
   */
  static getCacheDirectory(): string {
    return FileSystemService.getDirectoryPath('cacheDirectory');
  }

  /**
   * Generate unique file path in specified directory
   */
  static generateFilePath(filename: string, directory: DirectoryType = 'documentDirectory'): string {
    const dirPath = FileSystemService.getDirectoryPath(directory);
    const uniqueFilename = FileUtils.generateUniqueFilename(filename);
    return FileUtils.joinPaths(dirPath, uniqueFilename);
  }

  /**
   * Download file from URL
   */
  static async downloadFile(url: string, destinationUri?: string): Promise<FileOperationResult> {
    try {
      const destination = destinationUri || FileSystemService.generateFilePath('download');
      const result = await FileSystem.downloadAsync(url, destination);
      return { success: true, uri: result.uri };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Download failed' };
    }
  }

  /**
   * Get file size
   */
  static async getFileSize(uri: string): Promise<number> {
    const info = await FileSystemService.getFileInfo(uri);
    return info?.size || 0;
  }

  /**
   * Clear cache directory
   */
  static async clearCache(): Promise<boolean> {
    try {
      const cacheDir = FileSystemService.getCacheDirectory();
      if (!cacheDir) return false;

      const files = await FileSystemService.listDirectory(cacheDir);
      await Promise.all(
        files.map(file => FileSystemService.deleteFile(FileUtils.joinPaths(cacheDir, file)))
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get total size of directory
   */
  static async getDirectorySize(uri: string): Promise<number> {
    try {
      const files = await FileSystemService.listDirectory(uri);
      const sizes = await Promise.all(
        files.map(async file => {
          const filePath = FileUtils.joinPaths(uri, file);
          const info = await FileSystemService.getFileInfo(filePath);
          return info?.size || 0;
        })
      );
      return sizes.reduce((total, size) => total + size, 0);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Copy file to cache directory
   */
  static async copyToCache(sourceUri: string, filename?: string): Promise<FileOperationResult> {
    const name = filename || sourceUri.split('/').pop() || 'file';
    const destinationUri = FileSystemService.generateFilePath(name, 'cacheDirectory');
    return FileSystemService.copyFile(sourceUri, destinationUri);
  }

  /**
   * Copy file to document directory
   */
  static async copyToDocuments(sourceUri: string, filename?: string): Promise<FileOperationResult> {
    const name = filename || sourceUri.split('/').pop() || 'file';
    const destinationUri = FileSystemService.generateFilePath(name, 'documentDirectory');
    return FileSystemService.copyFile(sourceUri, destinationUri);
  }
}
