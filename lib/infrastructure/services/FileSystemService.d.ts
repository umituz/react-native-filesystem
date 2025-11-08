/**
 * Filesystem Domain - FileSystem Service
 *
 * Service for runtime file operations using expo-file-system.
 * Provides abstraction layer for file read/write/delete operations on device.
 *
 * @domain filesystem
 * @layer infrastructure/services
 */
import type { FileInfo, FileOperationResult, DirectoryType, FileEncoding } from '../../domain/entities/File';
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
export declare class FileSystemService {
    /**
     * Get file information
     */
    static getFileInfo(uri: string): Promise<FileInfo | null>;
    /**
     * Read file as string
     */
    static readFile(uri: string, encoding?: FileEncoding): Promise<string | null>;
    /**
     * Write string to file
     */
    static writeFile(uri: string, content: string, encoding?: FileEncoding): Promise<FileOperationResult>;
    /**
     * Delete file or directory
     */
    static deleteFile(uri: string): Promise<boolean>;
    /**
     * Copy file
     */
    static copyFile(sourceUri: string, destinationUri: string): Promise<FileOperationResult>;
    /**
     * Move file
     */
    static moveFile(sourceUri: string, destinationUri: string): Promise<FileOperationResult>;
    /**
     * Create directory
     */
    static createDirectory(uri: string): Promise<boolean>;
    /**
     * List directory contents
     */
    static listDirectory(uri: string): Promise<string[]>;
    /**
     * Check if file exists
     */
    static exists(uri: string): Promise<boolean>;
    /**
     * Get directory path by type
     */
    static getDirectoryPath(type: DirectoryType): string;
    /**
     * Get document directory path
     */
    static getDocumentDirectory(): string;
    /**
     * Get cache directory path
     */
    static getCacheDirectory(): string;
    /**
     * Generate unique file path in specified directory
     */
    static generateFilePath(filename: string, directory?: DirectoryType): string;
    /**
     * Download file from URL
     */
    static downloadFile(url: string, destinationUri?: string): Promise<FileOperationResult>;
    /**
     * Get file size
     */
    static getFileSize(uri: string): Promise<number>;
    /**
     * Clear cache directory
     */
    static clearCache(): Promise<boolean>;
    /**
     * Get total size of directory
     */
    static getDirectorySize(uri: string): Promise<number>;
    /**
     * Copy file to cache directory
     */
    static copyToCache(sourceUri: string, filename?: string): Promise<FileOperationResult>;
    /**
     * Copy file to document directory
     */
    static copyToDocuments(sourceUri: string, filename?: string): Promise<FileOperationResult>;
}
//# sourceMappingURL=FileSystemService.d.ts.map