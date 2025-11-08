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
 * File constants
 */
export const FILE_CONSTANTS = {
    MAX_FILE_NAME_LENGTH: 255,
    DEFAULT_ENCODING: 'utf8',
    TEMP_FILE_PREFIX: 'tmp_',
};
/**
 * File utilities
 */
export class FileUtils {
    /**
     * Generate unique filename with timestamp
     */
    static generateUniqueFilename(originalName) {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(7);
        const extension = FileUtils.getFileExtension(originalName);
        const baseName = originalName.replace(extension, '').substring(0, 50);
        return `${baseName}_${timestamp}_${randomStr}${extension}`;
    }
    /**
     * Get file extension from filename
     */
    static getFileExtension(filename) {
        const match = filename.match(/\.[^.]+$/);
        return match ? match[0] : '';
    }
    /**
     * Get filename without extension
     */
    static getFilenameWithoutExtension(filename) {
        return filename.replace(/\.[^.]+$/, '');
    }
    /**
     * Sanitize filename (remove invalid characters)
     */
    static sanitizeFilename(filename) {
        return filename
            .replace(/[^a-zA-Z0-9._-]/g, '_')
            .substring(0, FILE_CONSTANTS.MAX_FILE_NAME_LENGTH);
    }
    /**
     * Format file size to human-readable string
     */
    static formatFileSize(bytes) {
        if (bytes === 0)
            return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
    }
    /**
     * Parse download progress percentage
     */
    static calculateProgress(written, total) {
        if (total === 0)
            return 0;
        return Math.min(Math.max(written / total, 0), 1);
    }
    /**
     * Check if path is absolute
     */
    static isAbsolutePath(path) {
        return path.startsWith('/') || path.startsWith('file://');
    }
    /**
     * Join path segments
     */
    static joinPaths(...segments) {
        return segments
            .filter(Boolean)
            .join('/')
            .replace(/\/+/g, '/');
    }
}
//# sourceMappingURL=File.js.map