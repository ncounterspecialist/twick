/**
 * Generates a base project structure for the Twick Live Player.
 * Creates a minimal project configuration object with the specified video dimensions.
 * Used as a starting point for building or loading video compositions.
 *
 * @param videoSize - Object containing the width and height of the video
 * @param playerId - Unique identifier for the player instance
 * @returns Base project object with the specified video dimensions
 * 
 * @example
 * ```js
 * const project = getBaseProject({ width: 720, height: 1280 }, "player-123");
 * // project = { playerId: "player-123", input: { properties: { width: 720, height: 1280 } } }
 * ```
 */
export const getBaseProject = (
  videoSize: {
    width: number;
    height: number;
  },
  playerId: string
) => {
  return {
    playerId,
    input: {
      properties: {
        width: videoSize.width,
        height: videoSize.height,
      },
    },
  };
};

/**
 * Generates a unique identifier for player instances.
 * Creates a random string using base36 encoding for use as
 * player IDs and other unique identifiers.
 *
 * @returns A unique identifier string
 * 
 * @example
 * ```js
 * const id = generateId();
 * // id = "abc123def456"
 * ```
 */
export const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
