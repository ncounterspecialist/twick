export const getBaseProject = (videoSize: {
  width: number;
  height: number;
}) => {
  return {
    input: {
      properties: { width: videoSize.width, height: videoSize.height },
    },
  };
};
