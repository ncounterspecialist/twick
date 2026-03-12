export type CaptionScript = "Latin";

export const LANGUAGE_TO_SCRIPT: Record<string, CaptionScript> = {
  english: "Latin",
  italian: "Latin",
  spanish: "Latin",
  portuguese: "Latin",
  french: "Latin",
  german: "Latin",
  turkish: "Latin",
  indonesian: "Latin",
  // Hindi audio rendered as Latin-script captions (Hinglish).
  hindi: "Latin",
};

export const SCRIPT_DEFAULT_FONTS: Record<CaptionScript, string[]> = {
  Latin: ["Bangers", "Roboto", "Poppins", "Montserrat"],
};

export function getScriptForLanguage(language?: string): CaptionScript | undefined {
  if (!language) return undefined;
  return LANGUAGE_TO_SCRIPT[language.toLowerCase()] ?? undefined;
}

export function getDefaultFontForLanguage(language?: string): string | undefined {
  const script = getScriptForLanguage(language);
  if (!script) return undefined;
  const fonts = SCRIPT_DEFAULT_FONTS[script];
  return fonts?.[0];
}

