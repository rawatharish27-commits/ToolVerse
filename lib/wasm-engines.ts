import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import JSZip from "jszip";

/**
 * PHASE-3: Production Engine Stability
 * Handles WASM lifecycle and error-resistant worker management.
 */

const FFMPEG_VERSION = '0.12.6';
const CORE_URL = `https://unpkg.com/@ffmpeg/core@${FFMPEG_VERSION}/dist/ffmpeg-core.js`;
const WASM_URL = `https://unpkg.com/@ffmpeg/core@${FFMPEG_VERSION}/dist/ffmpeg-core.wasm`;

// --- FFmpeg Engine (Video/Audio) ---
let ffmpegInstance: FFmpeg | null = null;
export const getFFmpeg = async () => {
  if (ffmpegInstance) return ffmpegInstance;
  ffmpegInstance = new FFmpeg();
  
  await ffmpegInstance.load({
    coreURL: await toBlobURL(CORE_URL, 'text/javascript'),
    wasmURL: await toBlobURL(WASM_URL, 'application/wasm'),
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
 */
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
 * Packaging Utility
 */
export const downloadZip = async (files: {url: string, name: string}[], zipName: string) => {
  const zip = new JSZip();
  for (const file of files) {
    const response = await fetch(file.url);
    const blob = await response.blob();
    zip.file(file.name, blob);
  }
  const content = await zip.generateAsync({ type: "blob" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = zipName;
  link.click();
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
  
  const progressHandler = ({ progress }: { progress: number }) => {
    if (onProgress) onProgress(progress * 100);
  };

  ff.on('progress', progressHandler);

  try {
    for (const file of inputFiles) {
      await ff.writeFile(file.name, await fetchFile(file.data));
    }

    await ff.exec(args);
    const data = await ff.readFile(outputName);
    
    for (const file of inputFiles) {
      try { await ff.deleteFile(file.name); } catch(e) {}
    }
    
    return data;
  } finally {
    ff.off('progress', progressHandler);
  }
};

/**
 * OCR Engine
 */
export const runOCRTask = async (
  image: Blob | File | string,
  onProgress?: (p: number) => void
) => {
  const { createWorker } = await getTesseract();
  const worker = await createWorker({
    logger: m => {
      if (m.status === 'recognizing text' && onProgress) {
        onProgress(m.progress);
      }
    }
  });
  
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
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
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
  
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
    }, index * 300);
  });
};