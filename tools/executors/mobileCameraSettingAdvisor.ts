type UseCase = "government" | "kyc" | "social" | "print";
type Phone = "android" | "iphone";
type Mode = "auto" | "pro";
type Lighting = "poor" | "average" | "good";
type Movement = "static" | "handheld";

export function mobileCameraSettingAdvisor({
  useCase,
  phoneType,
  cameraMode = "auto",
  lighting = "average",
  movement = "handheld"
}: {
  useCase: UseCase;
  phoneType: Phone;
  cameraMode?: Mode;
  lighting?: Lighting;
  movement?: Movement;
}) {
  const settings: string[] = [];
  const tips: string[] = [];
  const avoid: string[] = [];

  // Universal settings
  settings.push("Use rear camera for better quality.");
  settings.push("Disable beauty filters and scene enhancements.");
  settings.push("Use highest available resolution.");

  // Use-case specifics
  if (useCase === "government" || useCase === "kyc") {
    settings.push("Turn off HDR to avoid unnatural edges.");
    settings.push("Keep ISO low for clean image.");
    tips.push("Place document/photo against plain background.");
    avoid.push("Using filters, portrait mode, or night mode.");
  }

  if (useCase === "print") {
    settings.push("Ensure good lighting to avoid noise.");
    tips.push("Hold phone steady or use support.");
  }

  if (useCase === "social") {
    tips.push("Good lighting matters more than camera mode.");
  }

  // Camera mode advice
  if (cameraMode === "pro") {
    tips.push("Set ISO as low as possible.");
    tips.push("Set shutter speed fast enough to avoid blur.");
  }

  // Lighting
  if (lighting === "poor") {
    tips.push("Add external light instead of increasing ISO.");
    avoid.push("Using digital zoom in low light.");
  }

  // Movement
  if (movement === "handheld") {
    tips.push("Stabilize hands or rest phone on surface.");
  }

  // Phone-type neutral note
  tips.push(
    phoneType === "iphone"
      ? "iPhones apply strong processing; keep it minimal."
      : "Android phones vary; stick to default camera app."
  );

  return {
    "Recommended Settings": settings,
    "Capture Tips": tips,
    "Mistakes to Avoid": avoid,
    "Strategic Takeaway":
      "Clear capture at source prevents most upload and print issues."
  };
}