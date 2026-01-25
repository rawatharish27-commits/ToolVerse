import imageCompression from 'browser-image-compression';

export interface CompressorOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  initialQuality?: number;
  fileType?: string;
  preserveExif?: boolean;
}

export interface CompressorResult {
  blob: Blob;
  finalSize: number;
  originalSize: number;
  savings: string;
}

/**
 * Image Compressor Engine
 * Uses smart re-sampling and multi-threaded compression.
 */
export async function imageCompressor(
  file: File,
  options: CompressorOptions
): Promise<CompressorResult> {
  const compressionOptions = {
    maxSizeMB: options.maxSizeMB || 10,
    maxWidthOrHeight: options.maxWidthOrHeight || 4000,
    useWebWorker: options.useWebWorker ?? true,
    initialQuality: options.initialQuality || 0.75,
    fileType: options.fileType === 'original' ? undefined : options.fileType,
    preserveExif: options.preserveExif ?? false,
  };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    const savings = (((file.size - compressedFile.size) / file.size) * 100).toFixed(1);

    return {
      blob: compressedFile,
      finalSize: compressedFile.size,
      originalSize: file.size,
      savings: parseFloat(savings) > 0 ? `${savings}%` : '0%'
    };
  } catch (error) {
    console.error('Compression node failure:', error);
    throw new Error('Engine failed to process this image format.');
  }
}