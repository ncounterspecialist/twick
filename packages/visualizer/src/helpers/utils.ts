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