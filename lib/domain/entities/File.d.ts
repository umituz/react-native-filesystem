/**
 * Filesystem Domain - File Entities
 *
 * This file defines core types and interfaces for runtime file operations.
 * Uses expo-file-system for reading, writing, and managing files on device.
 *
 * @domain filesystem
 * @layer domain/entities
 */
/**
 * File information interface
 */
export interface FileInfo {
    uri: string;
    name: string;
    size: number;
    exists: boolean;
    isDirectory: boolean;
    modificationTime: number;
}
/**
 * File encoding types (compatible with expo-file-system)
 */
export type FileEncoding = 'utf8' | 'base64';
/**
 * Directory type (compatible with expo-file-system)
 */
export type DirectoryType = 'documentDirectory' | 'cacheDirectory';
/**
 * File operation result
 */
export interface FileOperationResult {
    success: boolean;
    uri?: string;
    error?: string;
}
/**
 * Download progress info
 */
export interface DownloadProgress {
    totalBytesWritten: number;
    totalBytesExpectedToWrite: number;
    progress: number;
}
/**
 * File constants
 */
export declare const FILE_CONSTANTS: {
    readonly MAX_FILE_NAME_LENGTH: 255;
    readonly DEFAULT_ENCODING: FileEncoding;
    readonly TEMP_FILE_PREFIX: "tmp_";
};
/**
 * File utilities
 */
export declare class FileUtils {
    /**
     * Generate unique filename with timestamp
     */
    static generateUniqueFilename(originalName: string): string;
    /**
     * Get file extension from filename
     */
    static getFileExtension(filename: string): string;
    /**
     * Get filename without extension
     */
    static getFilenameWithoutExtension(filename: string): string;
    /**
     * Sanitize filename (remove invalid characters)
     */
    static sanitizeFilename(filename: string): string;
    /**
     * Format file size to human-readable string
     */
    static formatFileSize(bytes: number): string;
    /**
     * Parse download progress percentage
     */
    static calculateProgress(written: number, total: number): number;
    /**
     * Check if path is absolute
     */
    static isAbsolutePath(path: string): boolean;
    /**
     * Join path segments
     */
    static joinPaths(...segments: string[]): string;
}
//# sourceMappingURL=File.d.ts.map