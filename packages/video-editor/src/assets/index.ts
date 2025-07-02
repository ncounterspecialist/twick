// Import all animation GIFs
import fadeGif from './fade.gif';
import blurGif from './blur.gif';
import breatheInGif from './breathe-in.gif';
import breatheOutGif from './breathe-out.gif';
import riseDownGif from './rise-down.gif';
import riseUpGif from './rise-up.gif';
import successionGif from './succession.gif';

// Export all GIFs as a collection
export const animationGifs = {
    fade: fadeGif,
    blur: blurGif,
    'breathe-in': breatheInGif,
    'breathe-out': breatheOutGif,
    'rise-down': riseDownGif,
    'rise-up': riseUpGif,
    succession: successionGif,
};

// Export individual GIFs
export {
    fadeGif,
    blurGif,
    breatheInGif,
    breatheOutGif,
    riseDownGif,
    riseUpGif,
    successionGif,
};

// Helper function to get GIF by name
export const getAnimationGif = (name: string): string => {
    return animationGifs[name as keyof typeof animationGifs] || '';
}; 