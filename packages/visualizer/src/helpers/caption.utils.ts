/**
 * Caption utilities for the visualizer package.
 * Provides functions for handling caption text formatting and timing.
 */

/**
 * Splits a phrase into words with timing information
 * @param {string} phrase - The phrase to split
 * @param {number} startTime - Start time of the phrase
 * @param {number} duration - Duration of the phrase
 * @returns {Array} Array of words with timing information
 */
export function splitPhraseTiming({ t, s, e }: { t: string, s: number, e: number }) {
    const words = t.split(" ");
    const totalDuration = e - s;
    const totalLength = words.join("").length; // Total character length without spaces
  
    let currentTime = s;
    return words.map((word) => {
      const wordDuration = (word.length / totalLength) * totalDuration;
      const wordStart = currentTime;
      const wordEnd = wordStart + wordDuration;
      currentTime = wordEnd;
      return {
        t: word,
        s: parseFloat(wordStart.toFixed(2)),
        e: parseFloat(wordEnd.toFixed(2)),
      };
    });
  }

/**
 * Formats caption text with specified style
 * @param {string} text - The text to format
 * @param {Object} style - The style to apply
 * @returns {string} Formatted text
 */
export function formatCaptionText(text: string, style: any) {
  // ... existing code ...
}