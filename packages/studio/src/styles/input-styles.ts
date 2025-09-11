// Common Tailwind classes for form elements

export const inputStyles = {
  // Base container styles for form groups
  container: "mb-6",
  
  // Label styles
  label: {
    base: "block text-sm font-semibold text-gray-300 mb-2",
    small: "block text-xs text-gray-400 mb-1",
  },

  // Text input and select styles
  input: {
    base: "w-full bg-neutral-700/50 border border-gray-600 rounded-lg text-white text-sm px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm",
    small: "bg-neutral-700/50 border border-gray-600 rounded-lg text-white text-xs px-2 py-1 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 backdrop-blur-sm",
  },

  // Range input styles
  range: {
    base: "flex-1 h-2 bg-neutral-600 rounded-full appearance-none cursor-pointer slider-thumb",
    gradient: "flex-1 h-2 bg-gradient-to-r from-purple-500 to-neutral-600 rounded-full appearance-none cursor-pointer slider-thumb",
    container: "flex items-center gap-3",
    value: "text-white text-sm font-medium min-w-[50px]",
  },

  // Color input styles
  color: {
    container: "flex items-center gap-2",
    picker: "w-6 h-6 rounded border border-gray-600 cursor-pointer",
    preview: "flex-1 h-8 rounded-lg border border-gray-600",
  },

  // Toggle button styles
  toggle: {
    base: "w-10 h-10 rounded-lg border-2 transition-all duration-200 hover:bg-purple-400 hover:text-white",
    active: "bg-purple-600 border-purple-500 text-white",
    inactive: "bg-transparent border-gray-600 text-gray-400 hover:border-gray-500",
  },

  // Radio button styles
  radio: {
    base: "w-4 h-4 text-purple-600 bg-neutral-700 border-gray-600 focus:ring-purple-500 focus:ring-2",
    label: "text-sm text-gray-300",
    container: "flex items-center gap-2",
  },

  // Action button styles
  button: {
    primary: "w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20",
  },

  // Panel container styles
  panel: {
    container: "w-72 h-full bg-neutral-800/80 border-l border-gray-600/50 p-4 overflow-y-auto overflow-x-hidden backdrop-blur-md shadow-lg",
    title: "text-xl font-bold text-white mb-6",
  },
};
