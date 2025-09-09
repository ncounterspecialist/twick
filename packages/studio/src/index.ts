/**
 * @twick/studio - Twick Studio Package
 */

import "./studio.css";

import { TwickStudio } from "./components/twick-studio";
import { Toolbar } from "./components/toolbar";
import { StageCanvas } from "./components/stage-canvas";
import { useStudioManager } from "./hooks/use-studio-manager";
import StudioHeader from "./components/header";

// Components
export {
  TwickStudio,
  Toolbar,
  StudioHeader,
  StageCanvas,
};

// Hooks
export {
  useStudioManager,
};

// Default export
export default TwickStudio;