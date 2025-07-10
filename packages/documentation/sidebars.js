/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro', 'installation', 'operations'],
    },
    {
      type: 'category',
      label: 'Packages',
      items: [
        {
          type: 'doc',
          label: '@twick/media-utils',
          id: 'packages/media-utils/modules'
        },
        {
          type: 'doc',
          label: '@twick/canvas',
          id: 'packages/canvas/modules'
        },
        {
          type: 'doc',
          label: '@twick/live-player',
          id: 'packages/live-player/modules'
        },
        {
          type: 'doc',
          label: '@twick/visualizer',
          id: 'packages/visualizer/modules'
        },
        {
          type: 'doc',
          label: '@twick/examples',
          id: 'packages/examples/README'
        },
      ],
    },
  ],
};

module.exports = sidebars; 