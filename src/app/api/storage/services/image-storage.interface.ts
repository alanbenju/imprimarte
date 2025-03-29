export interface UploadResult {
  url: string;
  path: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface IImageStorage {
  /**
   * Upload an image file to the storage service
   * @param file The file buffer to upload
   * @param path Optional path/folder to store the file in
   * @param filename Optional custom filename (without extension)
   * @returns Promise resolving to the uploaded file information
   */
  uploadImage(
    file: File,
    path?: string,
    filename?: string
  ): Promise<UploadResult>;

  /**
   * Upload multiple image files to the storage service
   * @param files Array of file buffers to upload
   * @param path Optional path/folder to store the files in
   * @returns Promise resolving to an array of uploaded file information
   */
  uploadMultipleImages(
    files: File[],
    path?: string
  ): Promise<UploadResult[]>;

  /**
   * Delete an image from storage
   * @param path The path of the file to delete
   * @returns Promise resolving to true if deletion was successful
   */
  deleteImage(path: string): Promise<boolean>;
} 