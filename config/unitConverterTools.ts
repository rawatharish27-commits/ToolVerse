export const lengthConverterConfig = {
  slug: "length-converter",
  title: "Precision Length Converter",
  description: "Convert between metric and imperial units including meters, kilometers, inches, and feet with high precision.",
  icon: "📏",
  colorClass: "bg-emerald-600",
  options: [
    {
      id: "value",
      label: "Value to Convert",
      type: "number",
      default: 1
    },
    {
      id: "from",
      label: "From Unit",
      type: "select",
      values: ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"],
      default: "meter"
    },
    {
      id: "to",
      label: "To Unit",
      type: "select",
      values: ["meter", "kilometer", "centimeter", "millimeter", "inch", "foot", "yard", "mile"],
      default: "foot"
    },
  ],
};

export const weightConverterConfig = {
  slug: "weight-converter",
  title: "Precision Weight Converter",
  description: "Convert between common weight units including Kilograms, Grams, Pounds, and Ounces instantly.",
  icon: "⚖️",
  colorClass: "bg-emerald-500",
  options: [
    {
      id: "value",
      label: "Value to Convert",
      type: "number",
      default: 1
    },
    {
      id: "from",
      label: "From Unit",
      type: "select",
      values: ["kg", "g", "lb", "oz", "ton", "mg"],
      default: "kg"
    },
    {
      id: "to",
      label: "To Unit",
      type: "select",
      values: ["kg", "g", "lb", "oz", "ton", "mg"],
      default: "lb"
    },
  ],
};

export const temperatureConverterConfig = {
  slug: "temperature-converter",
  title: "Temperature Converter",
  description: "Quickly convert temperatures between Celsius, Fahrenheit, and Kelvin with scientific accuracy.",
  icon: "🌡️",
  colorClass: "bg-orange-500",
  options: [
    {
      id: "value",
      label: "Temperature Value",
      type: "number",
      default: 0
    },
    {
      id: "from",
      label: "From Scale",
      type: "select",
      values: ["Celsius", "Fahrenheit", "Kelvin"],
      default: "Celsius"
    },
    {
      id: "to",
      label: "To Scale",
      type: "select",
      values: ["Celsius", "Fahrenheit", "Kelvin"],
      default: "Fahrenheit"
    },
  ],
};

export const speedConverterConfig = {
  slug: "speed-converter",
  title: "Speed Converter Pro",
  description: "Convert between Kilometer per hour (km/h), Meter per second (m/s), Miles per hour (mph), and Knots accurately.",
  icon: "🚀",
  colorClass: "bg-cyan-600",
  options: [
    {
      id: "value",
      label: "Speed Value",
      type: "number",
      default: 100
    },
    {
      id: "from",
      label: "From Unit",
      type: "select",
      values: ["km/h", "m/s", "mph", "knot"],
      default: "km/h"
    },
    {
      id: "to",
      label: "To Unit",
      type: "select",
      values: ["km/h", "m/s", "mph", "knot"],
      default: "mph"
    },
  ],
};

export const areaConverterConfig = {
  slug: "area-converter",
  title: "Precision Area Converter",
  description: "Convert between metric and imperial area units including Square Meters, Square Feet, Acres, and Hectares.",
  icon: "🗺️",
  colorClass: "bg-emerald-700",
  options: [
    {
      id: "value",
      label: "Area Value",
      type: "number",
      default: 1
    },
    {
      id: "from",
      label: "From Unit",
      type: "select",
      values: ["sqm", "sqkm", "sqft", "acre", "hectare"],
      default: "sqm"
    },
    {
      id: "to",
      label: "To Unit",
      type: "select",
      values: ["sqm", "sqkm", "sqft", "acre", "hectare"],
      default: "sqft"
    },
  ],
};

export const volumeConverterConfig = {
  slug: "volume-converter",
  title: "Precision Volume Converter",
  description: "Convert between metric and US customary volume units including Liters, Milliliters, Cubic Meters, Gallons, and Cups.",
  icon: "🧪",
  colorClass: "bg-emerald-400",
  options: [
    {
      id: "value",
      label: "Volume Value",
      type: "number",
      default: 1
    },
    {
      id: "from",
      label: "From Unit",
      type: "select",
      values: ["Liter", "Milliliter", "Cubic Meter", "US Gallon", "US Cup"],
      default: "Liter"
    },
    {
      id: "to",
      label: "To Unit",
      type: "select",
      values: ["Liter", "Milliliter", "Cubic Meter", "US Gallon", "US Cup"],
      default: "Milliliter"
    },
  ],
};

export const dataSizeConverterConfig = {
  slug: "data-size-converter",
  title: "Data Size Converter",
  description: "Convert between digital storage units like Bytes, KB, MB, GB, and TB with binary precision (1024-based).",
  icon: "💾",
  colorClass: "bg-slate-700",
  options: [
    {
      id: "value",
      label: "Data Size",
      type: "number",
      default: 1024
    },
    {
      id: "from",
      label: "From Unit",
      type: "select",
      values: ["Byte (B)", "Kilobyte (KB)", "Megabyte (MB)", "Gigabyte (GB)", "Terabyte (TB)"],
      default: "Kilobyte (KB)"
    },
    {
      id: "to",
      label: "To Unit",
      type: "select",
      values: ["Byte (B)", "Kilobyte (KB)", "Megabyte (MB)", "Gigabyte (GB)", "Terabyte (TB)"],
      default: "Megabyte (MB)"
    },
  ],
};
