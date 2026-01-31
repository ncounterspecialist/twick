/**
 * CRACO config for @twick/examples-cra.
 * Suppresses "Critical dependency: the request of a dependency is an expression"
 * from transitive deps so CI builds pass when warnings are treated as errors.
 */
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        ...(webpackConfig.ignoreWarnings || []),
        {
          message: /Critical dependency: the request of a dependency is an expression/,
        },
      ];
      return webpackConfig;
    },
  },
};
