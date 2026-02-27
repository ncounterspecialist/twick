import { makeProject } from "@twick/core";
import { getActiveEffectsForFrame } from "@twick/effects";
import { scene } from "./visualizer";

const project = makeProject({
  scenes: [scene],
});
(project as import("@twick/core").Project).getActiveEffectsForFrame =
  getActiveEffectsForFrame;
export default project;
