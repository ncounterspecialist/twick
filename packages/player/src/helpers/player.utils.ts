/**
 * Generates a base project structure for the Twick Player.
 *
 * This function returns a minimal project configuration object with
 * the specified video dimensions. It's typically used as a starting
 * point for building or loading video compositions.
 *
 * @param videoSize - An object containing the width and height of the video.
 * @returns A base project object with the specified video dimensions.
 */
export const getBaseProject = (videoSize: {
    width: number;
    height: number;
  }) => {
    return {
      input: {
        properties: {
          width: videoSize.width,
          height: videoSize.height,
        },
      },
    };
  };
  