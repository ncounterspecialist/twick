/**
 * Converts a hex color string to RGB values.
 * Handles both 3-digit and 6-digit hex color formats
 * and returns an object with red, green, and blue values.
 *
 * @param color - The hex color string to convert
 * @returns Object containing r, g, b values
 * 
 * @example
 * ```js
 * const rgb = hexToRGB("#ff0000");
 * // rgb = { r: 255, g: 0, b: 0 }
 * 
 * const rgb = hexToRGB("#f00");
 * // rgb = { r: 255, g: 0, b: 0 }
 * ```
 */
export const hexToRGB = (color: string) => {
  // Remove leading '#' if present
  let hex = color.replace(/^#/, '');

  // Handle shorthand hex (e.g., #abc)
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }

  if (hex.length !== 6) {
    throw new Error('Invalid hex color');
  }

  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  return { r, g, b };
}