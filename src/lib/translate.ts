export async function translateText(
  text: string,
  targetLang: string = "en",
  sourceLang: string = "auto",
): Promise<string> {
  const trimmed = text?.trim();
  if (!trimmed) {
    return text;
  }

  try {
    const params = new URLSearchParams({
      client: "gtx",
      sl: sourceLang,
      tl: targetLang,
      dt: "t",
      q: trimmed,
    });

    const response = await fetch(
      `https://translate.googleapis.com/translate_a/single?${params.toString()}`,
    );
    if (!response.ok) {
      throw new Error(`Translate API responded ${response.status}`);
    }
    const data = (await response.json()) as any[];
    const segments = Array.isArray(data?.[0]) ? data[0] : [];
    const translated = segments.map((segment: any[]) => segment?.[0] ?? "").join("");
    return translated || text;
  } catch (error) {
    console.warn("Auto translation failed:", error);
    return text;
  }
}

export function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function textToHtmlParagraphs(text: string): string {
  if (!text) return "";
  const escapeHtml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}
