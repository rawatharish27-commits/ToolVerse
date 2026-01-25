import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // ... (AI, SOCIAL, IMAGE tools preserved) ...
  { slug: 'image-compressor', title: 'Smart Image Compressor', category: 'image', priority: 100, description: 'Reduce size without quality loss.', keywords: ['compress'], toolType: 'client' },
  { slug: 'background-remover', title: 'Local Background Remover', category: 'image', priority: 99, description: 'Neural network bg removal.', keywords: ['bg remover'], toolType: 'client' },
  { slug: 'image-resizer', title: 'Bulk Image Resizer', category: 'image', priority: 95, description: 'Resize to custom dimensions.', keywords: ['resize'], toolType: 'client' },
  { slug: 'image-cropper', title: 'Image Cropper Pro', category: 'image', priority: 93, description: 'Precision social media cropping.', keywords: ['crop'], toolType: 'client' },
  { slug: 'image-converter', title: 'Image Converter Pro', category: 'image', priority: 92, description: 'Convert between JPG, PNG, WebP.', keywords: ['convert'], toolType: 'client' },
  { slug: 'image-to-webp', title: 'Image to WebP Converter', category: 'image', priority: 106, description: 'Convert images to high-compression WebP format.', keywords: ['webp', 'convert'], toolType: 'client' },
  { slug: 'passport-size-photo-maker', title: 'Passport Size Photo Maker', category: 'image', priority: 115, description: 'Create official passport photos with custom background and exact dimensions.', keywords: ['passport', 'visa', 'photo'], toolType: 'client' },
  { slug: 'jpg-to-pdf', title: 'JPG to PDF Converter Pro', category: 'pdf', priority: 115, description: 'Convert multiple images into a single PDF with custom layout.', keywords: ['pdf', 'images', 'converter'], toolType: 'client' },

  // --- PDF ---
  { slug: 'pdf-size-reducer', title: 'PDF Size Reducer (MB Target)', category: 'pdf', priority: 120, description: 'Reduce PDF file size to a target MB for govt and job portals.', keywords: ['pdf', 'compress', 'mb'], toolType: 'client' },
  { slug: 'pdf-page-number-adder', title: 'PDF Page Number Adder', category: 'pdf', priority: 125, description: 'Add custom page numbers, Roman numerals, or fractions to your PDF.', keywords: ['pdf', 'page', 'number'], toolType: 'client' },
  { slug: 'pdf-watermark', title: 'PDF Watermark Tool', category: 'pdf', priority: 110, description: 'Add professional text or image watermarks to your PDF documents.', keywords: ['pdf', 'watermark', 'brand'], toolType: 'client' },
  { slug: 'pdf-merger', title: 'PDF Merger Pro', category: 'pdf', priority: 130, description: 'Combine multiple PDFs into one with custom file ordering and page ranges.', keywords: ['pdf', 'merge', 'combine'], toolType: 'client' },
  { slug: 'pdf-splitter', title: 'PDF Splitter Pro', category: 'pdf', priority: 128, description: 'Split PDF into individual pages or specific ranges with bulk ZIP output.', keywords: ['pdf', 'split', 'extract'], toolType: 'client' },
  { slug: 'pdf-password-protect', title: 'Advanced PDF Protector', category: 'pdf', priority: 122, description: 'Secure your PDF with AES-256 encryption and custom access permissions.', keywords: ['pdf', 'protect', 'password'], toolType: 'client' },
  { slug: 'pdf-password-remover', title: 'PDF Password Remover', category: 'pdf', priority: 121, description: 'Unlock password-protected PDFs and remove all usage restrictions instantly.', keywords: ['pdf', 'unlock', 'remover'], toolType: 'client' },
  { slug: 'pdf-metadata-viewer', title: 'PDF Metadata Inspector', category: 'pdf', priority: 119, description: 'Examine hidden PDF properties, creation data, and producer tags locally.', keywords: ['pdf', 'metadata', 'inspector'], toolType: 'client' },

  // ... (Rest of inventory preserved) ...
  { slug: 'age-calculator', title: 'Age Calculator Pro', category: 'calculators', priority: 110, description: 'Calculate age in years, months, and days from date of birth.', keywords: ['age', 'dob'], toolType: 'client' },
  { slug: 'percentage-calculator', title: 'Percentage Calculator Master', category: 'calculators', priority: 105, description: 'Quickly find percentage increase, decrease, or value ratios.', keywords: ['percentage', 'math'], toolType: 'client' },
  { slug: 'discount-calculator', title: 'Smart Discount Calculator', category: 'calculators', priority: 108, description: 'Calculate final price after discounts and taxes instantly.', keywords: ['discount', 'shopping'], toolType: 'client' },
  { slug: 'image-kb-reducer', title: 'Image Size Reducer (Target KB)', category: 'image', priority: 105, description: 'Compress images to specific file sizes like 20KB, 50KB, or 100KB.', keywords: ['compress', 'kb'], toolType: 'client' },
  { slug: 'image-dpi-checker', title: 'Image DPI Checker & Fixer', category: 'image', priority: 102, description: 'Check and modify image Dots Per Inch (DPI) for high-quality printing.', keywords: ['dpi', 'print'], toolType: 'client' }
];