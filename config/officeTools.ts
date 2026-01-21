export const wordCounterConfig = {
  slug: "word-counter",
  title: "Advanced Word Counter",
  description: "Comprehensive text analysis with word frequency, character counts, and time estimates. Perfect for editors, students, and copywriters.",
  icon: "📝",
  colorClass: "bg-blue-600",
  options: [
    {
      id: "ignoreNumbers",
      label: "Ignore Numbers",
      type: "toggle",
      default: false
    },
    {
      id: "ignorePunctuation",
      label: "Ignore Punctuation",
      type: "toggle",
      default: false
    }
  ],
};

export const ttsConfig = {
  slug: "text-to-speech-reader",
  title: "AI Voice Reader (TTS)",
  description: "Transform written text into natural human-sounding speech. Adjust pitch, rate, and select from available system voices.",
  icon: "🗣️",
  colorClass: "bg-indigo-600",
  options: [
    {
      id: "rate",
      label: "Speech Rate",
      type: "slider",
      min: 0.5,
      max: 2,
      default: 1
    },
    {
      id: "pitch",
      label: "Voice Pitch",
      type: "slider",
      min: 0,
      max: 2,
      default: 1
    }
  ],
};

export const textCompareConfig = {
  slug: "text-compare",
  title: "Visual Diff Checker",
  description: "Compare two versions of text side-by-side. Instantly highlight additions, deletions, and modifications with professional accuracy.",
  icon: "⚖️",
  colorClass: "bg-indigo-700",
  options: [
    {
      id: "caseSensitive",
      label: "Case Sensitive",
      type: "toggle",
      default: false
    },
    {
      id: "ignoreWhitespace",
      label: "Ignore Whitespace",
      type: "toggle",
      default: true
    }
  ],
};