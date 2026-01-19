
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";

/**
 * PHASE-2 STEP-6: Global Performance Layer
 * Queue management, concurrency control, and parallel batching.
 */

// --- FFmpeg Engine (Video/Audio) ---
let ffmpegInstance: FFmpeg | null = null;
export const getFFmpeg = async () => {
  if (ffmpegInstance) return ffmpegInstance;
  ffmpegInstance = new FFmpeg();
  await ffmpegInstance.load({
    coreURL: "https://unpkg.com/@ffmpeg/core@0.12.6/dist/ffmpeg-core.js",
  });
  return ffmpegInstance;
};

// --- PDF Engine ---
export const getPdfLib = () => import("pdf-lib");
export const getPdfJs = () => import("pdfjs-dist");

// --- OCR Engine ---
export const getTesseract = () => import("tesseract.js");

// --- Image Processing ---
export const getImageCompression = () => import("browser-image-compression");

/**
 * Concurrency-limited Queue Runner
 * Process multiple files in parallel without crashing the main thread.
 */
// Explicitly typing the results array to aid generic type inference
export const runBatchTask = async <T, R>(
  items: T[],
  task: (item: T, index: number) => Promise<R>,
  concurrency = 3
): Promise<(R | null)[]> => {
  const results: (R | null)[] = new Array(items.length);
  let currentIndex = 0;

  const worker = async () => {
    while (currentIndex < items.length) {
      const index = currentIndex++;
      try {
        results[index] = await task(items[index], index);
      } catch (err) {
        console.error(`Task ${index} failed:`, err);
        results[index] = null;
      }
    }
  };

  await Promise.all(
    Array(Math.min(concurrency, items.length))
      .fill(null)
      .map(worker)
  );
  return results;
};

/**
 * Helper to run FFmpeg commands with progress
 */
export const runMediaTask = async (
  inputFiles: { name: string; data: File | Blob }[],
  args: string[],
  outputName: string,
  onProgress?: (progress: number) => void
) => {
  const ff = await getFFmpeg();
  
  if (onProgress) {
    ff.on('progress', ({ progress }) => onProgress(progress * 100));
  }

  for (const file of inputFiles) {
    await ff.writeFile(file.name, await fetchFile(file.data));
  }

  await ff.exec(args);
  const data = await ff.readFile(outputName);
  
  // Explicit Memory Cleanup
  for (const file of inputFiles) {
    try { await ff.deleteFile(file.name); } catch(e) {}
  }
  
  return data;
};

/**
 * OCR Engine with Auto-termination for Batch
 */
export const runOCRTask = async (
  image: Blob | string,
  onProgress?: (p: number) => void
) => {
  const { createWorker } = await getTesseract();
  const worker = await createWorker('eng', 1, {
    logger: m => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(m.progress);
      }
    }
  });
  const ret = await worker.recognize(image);
  await worker.terminate();
  return ret.data.text;
};

/**
 * PDF to Image Rendering
 */
export const renderPdfToImages = async (
  pdfBlob: Blob,
  onProgress?: (p: number) => void
) => {
  const pdfjs = await getPdfJs();
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  
  const arrayBuffer = await pdfBlob.arrayBuffer();
  const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
  const images: string[] = [];
  
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    await page.render({ canvasContext: ctx, viewport }).promise;
    images.push(canvas.toDataURL('image/jpeg', 0.8));
    if (onProgress) onProgress((i / pdf.numPages) * 100);
  }
  
  return images;
};

/**
 * Sequential Download Trigger
 */
export const triggerBatchDownload = (urls: {url: string, name: string}[]) => {
  urls.forEach(({url, name}, index) => {
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
    }, index * 300); // 300ms gap to prevent browser block
  });
};
