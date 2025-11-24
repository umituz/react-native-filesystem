/**
 * Download Operations Service
 * Handles file download operations
 */

import { downloadFile } from "./download.service";
import type { FileOperationResult } from "../../domain/entities/File";

export class DownloadOperations {
  static async downloadFile(
    url: string,
    destinationUri?: string,
  ): Promise<FileOperationResult> {
    return downloadFile(url, destinationUri);
  }
}
