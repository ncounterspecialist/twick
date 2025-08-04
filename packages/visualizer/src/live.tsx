import { makeProject } from "@twick/core";
import { scene } from "./visualizer";
import { sample } from "./sample";

export default makeProject({
  scenes: [scene],
  variables: sample,
  settings: {
    shared: {
      size: {
        x: sample.input.properties.width,
        y: sample.input.properties.height,
      },
    },
  },
});
