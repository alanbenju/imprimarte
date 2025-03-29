/**
 * Determines file extension based on buffer content
 * @param buffer The file buffer
 * @returns The file extension with dot prefix (e.g., '.jpg')
 */
export function getExtension(buffer: Buffer): string {
  // Check file signature (magic numbers)
  const fileSignature = buffer.toString("hex", 0, 4);
  
  if (fileSignature.startsWith("89504e47")) {
    return ".png";
  } else if (fileSignature.startsWith("47494638")) {
    return ".gif";
  } else if (buffer.toString("hex", 0, 2) === "ffd8") {
    return ".jpg";
  } else if (fileSignature.startsWith("52494646")) { // WEBP starts with RIFF
    return ".webp";
  }
  
  // Default to jpg if unknown
  return ".jpg";
}

/**
 * Get MIME type based on file extension
 * @param extension The file extension (with or without dot)
 * @returns The MIME type
 */
export function getMimeType(extension: string): string {
  // Normalize extension (remove dot if present)
  const ext = extension.startsWith(".") ? extension.substring(1) : extension;
  
  switch (ext.toLowerCase()) {
    case "png":
      return "image/png";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}

/**
 * Validates if a file is an image based on its buffer content
 * @param buffer The file buffer to check
 * @returns Boolean indicating if the buffer is a valid image
 */
export function isImage(buffer: Buffer): boolean {
  const fileSignature = buffer.toString("hex", 0, 8);
  
  // Check common image file signatures
  return (
    fileSignature.startsWith("89504e47") || // PNG
    fileSignature.startsWith("47494638") || // GIF
    buffer.toString("hex", 0, 2) === "ffd8" || // JPEG
    fileSignature.startsWith("52494646") || // WEBP
    fileSignature.includes("3c737667") // SVG
  );
} 