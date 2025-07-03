import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseAIMessage(content: string): string {
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    const maybeText =
      parsed?.message?.content?.[0]?.text ??
      parsed?.message?.content ??
      parsed?.content;

    if (
      typeof maybeText === "string" &&
      (maybeText.trim().startsWith("{") || maybeText.trim().startsWith("["))
    ) {
      return parseAIMessage(maybeText); // Recursive parsing
    }

    if (typeof maybeText === "string") return maybeText;

    if (Array.isArray(maybeText)) {
      return maybeText
        .map((part) => (typeof part?.text === "string" ? part.text : ""))
        .join("\n");
    }

    return JSON.stringify(maybeText ?? parsed);
  } catch {
    return content;
  }
}
