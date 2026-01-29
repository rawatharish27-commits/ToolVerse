
import { ImageReducerInput } from './validate';

/**
 * Normalizes input parameters and calculates binary targets.
 */
// Fix: Use unified ImageReducerInput type to resolve pipeline inference conflicts
export function normalize(input: ImageReducerInput): ImageReducerInput {
  return {
    ...input,
    targetKb: Math.floor(input.targetKb),
    targetBytes: Math.floor(input.targetKb * 1024)
  };
}
