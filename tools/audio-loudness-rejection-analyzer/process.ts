
export async function process(input: { lufs: number }) {
  const isOptimal = input.lufs >= -16 && input.lufs <= -13;
  return {
    optimal: isOptimal,
    reason: input.lufs > -13 ? "Audio is too loud (clipping risk)" : (input.lufs < -16 ? "Audio is too quiet" : "Perfect loudness for streaming"),
    adjustmentNeeded: isOptimal ? 0 : -14 - input.lufs
  };
}
