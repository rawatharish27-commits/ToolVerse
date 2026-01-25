import JSZip from 'jszip';

export const createZipArchive = async (files: File[]) => {
  const zip = new JSZip();
  files.forEach(f => zip.file(f.name, f));
  return await zip.generateAsync({ type: 'blob' });
};

export const extractZipArchive = async (zipFile: File) => {
  const zip = new JSZip();
  const loaded = await zip.loadAsync(zipFile);
  const files: { name: string, blob: Blob }[] = [];
  
  for (const [name, file] of Object.entries(loaded.files)) {
    // Fix: Cast file to any to access JSZip-specific properties like 'dir' and 'async' which were missing in the unknown type inference.
    const zipEntry = file as any;
    if (!zipEntry.dir) {
      const blob = await zipEntry.async('blob');
      files.push({ name, blob });
    }
  }
  return files;
};