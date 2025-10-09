import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

class ImageService {
  /**
   * Validate image file
   */
  async validateImage(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      
      // Check file size (max 10MB)
      const stats = fs.statSync(filePath);
      if (stats.size > 10 * 1024 * 1024) {
        throw new Error('File size exceeds 10MB limit');
      }

      // Validate image format
      const validFormats = ['jpeg', 'jpg', 'png', 'webp'];
      if (!validFormats.includes(metadata.format)) {
        throw new Error('Invalid file format. Please upload JPEG, PNG, or WEBP');
      }

      return {
        valid: true,
        metadata,
        size: stats.size
      };
    } catch (error) {
      throw new Error(`Image validation failed: ${error.message}`);
    }
  }

  /**
   * Optimize image for API processing
   */
  async optimizeImage(inputPath, outputPath) {
    try {
      await sharp(inputPath)
        .resize(2048, 2048, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 90 })
        .toFile(outputPath);

      return outputPath;
    } catch (error) {
      throw new Error(`Image optimization failed: ${error.message}`);
    }
  }

  /**
   * Convert image to required format
   */
  async convertToFormat(inputPath, outputPath, format = 'jpeg') {
    try {
      const image = sharp(inputPath);

      switch (format) {
        case 'jpeg':
        case 'jpg':
          await image.jpeg({ quality: 90 }).toFile(outputPath);
          break;
        case 'png':
          await image.png({ quality: 90 }).toFile(outputPath);
          break;
        case 'webp':
          await image.webp({ quality: 90 }).toFile(outputPath);
          break;
        default:
          throw new Error(`Unsupported format: ${format}`);
      }

      return outputPath;
    } catch (error) {
      throw new Error(`Format conversion failed: ${error.message}`);
    }
  }

  /**
   * Clean up temporary files
   */
  cleanupFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Cleaned up: ${filePath}`);
      }
    } catch (error) {
      console.error(`Failed to cleanup ${filePath}:`, error.message);
    }
  }

  /**
   * Clean up multiple files
   */
  cleanupFiles(filePaths) {
    filePaths.forEach(filePath => this.cleanupFile(filePath));
  }
}

export default ImageService;

