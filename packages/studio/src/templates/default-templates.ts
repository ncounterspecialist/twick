import type { ProjectTemplate } from "../types";
import { TRACK_TYPES } from "@twick/timeline";

export const DEFAULT_PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: "blank-project",
    name: "Blank Project",
    description: "Start from a clean timeline.",
    category: "blank",
    project: {
      tracks: [],
      version: 1,
      metadata: {
        profile: "default",
        templateId: "blank-project",
      },
    },
  },
  {
    id: "edu-lesson",
    name: "Lesson Template",
    description: "Intro, content, and summary sections for educational videos.",
    category: "edu",
    project: {
      version: 1,
      backgroundColor: "#0f172a",
      metadata: {
        profile: "edu",
        templateId: "edu-lesson",
        chapters: [
          { id: "chapter-intro", title: "Introduction", time: 0 },
          { id: "chapter-content", title: "Main Lesson", time: 20 },
          { id: "chapter-summary", title: "Summary", time: 45 },
        ],
      },
      tracks: [
        {
          id: "t-edu-text",
          name: "Lesson Text",
          type: TRACK_TYPES.ELEMENT,
          elements: [
            {
              id: "e-edu-title",
              trackId: "t-edu-text",
              type: "text",
              name: "Title",
              s: 0,
              e: 6,
              props: {
                text: "Lesson Title",
                fontSize: 58,
                fill: "#ffffff",
              },
            },
          ],
        },
      ],
    },
  },
  {
    id: "demo-screen",
    name: "Screen Demo",
    description: "Template optimized for product demonstrations.",
    category: "demo",
    project: {
      version: 1,
      metadata: {
        profile: "demo",
        templateId: "demo-screen",
      },
      tracks: [
        {
          id: "t-demo-video",
          name: "Screen Recording",
          type: TRACK_TYPES.VIDEO,
          elements: [],
        },
        {
          id: "t-demo-callout",
          name: "Callouts",
          type: TRACK_TYPES.ELEMENT,
          elements: [],
        },
      ],
    },
  },
];
