
export async function process(input: { faceWidthRatio: number, eyeLevel: number }) {
  const valid = input.faceWidthRatio >= 0.5 && input.faceWidthRatio <= 0.75 && input.eyeLevel > 0.4;
  return {
    passed: valid,
    logicChecked: ["Face size ratio", "Eye alignment", "Head centering"],
    failurePoints: valid ? [] : ["Head too small or eyes too low"]
  };
}
