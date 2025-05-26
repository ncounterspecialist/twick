/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      items: ['intro'],
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
        // Add more packages here as they are documented
      ],
    },
  ],
};

module.exports = sidebars; 