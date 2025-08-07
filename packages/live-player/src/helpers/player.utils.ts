/**
 * Generates a base project structure for the Twick Live Player.
 *
 * This function returns a minimal project configuration object with
 * the specified video dimensions. It's typically used as a starting
 * point for building or loading video compositions.
 *
 * @param videoSize - An object containing the width and height of the video.
 * @returns A base project object with the specified video dimensions.
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

export const generateId = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
