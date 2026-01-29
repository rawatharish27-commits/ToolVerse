
import { ToolMetadata } from '../types/platform';

/**
 * TOOLVERSE MASTER REGISTRY
 * Mandatory metadata for all production-ready logic nodes.
 */
export const TOOL_REGISTRY: ToolMetadata[] = [
  {
    "name": "Image Size Reducer (KB Target)",
    "slug": "image-size-reducer-kb",
    "category": "image",
    "subcategory": "compression",
    "keywords": ["20kb", "50kb", "compress image", "ssc photo"],
    "related": ["pdf-compressor", "passport-photo-maker"],
    "inputType": "image-file",
    "outputType": "blob",
    "complexity": "medium"
  }
];
