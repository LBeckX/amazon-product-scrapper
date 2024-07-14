export function clearText(text: string): string {
    return text?.trim()?.replace(/\s\s+/ig, '') || ''
}