/**
 * Shim for @twick/2d/lib/jsx-dev-runtime when the installed @twick/2d
 * doesn't export it. Re-exports jsx as jsxDEV from the main package.
 */
export { Fragment, jsx as jsxDEV } from "@twick/2d";
