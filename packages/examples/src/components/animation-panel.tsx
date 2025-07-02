import { ANIMATIONS } from '@twick/video-editor';
import { useState } from 'react';

const AnimationPanel = () => {
    const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null);
    const [animate, setAnimate] = useState('enter');
    const [direction, setDirection] = useState('up');
    const [mode, setMode] = useState('in');
    const [intensity, setIntensity] = useState(1);
    const [interval, setInterval] = useState(1000);

    const getSelectedAnimationData = () => {
        return ANIMATIONS.find(anim => anim.name === selectedAnimation);
    };

    const handleAnimate = () => {
        if (!selectedAnimation) return;
        
        // TODO: Apply animation to selected element
        console.log('Applying animation:', {
            animation: selectedAnimation,
            animate,
            direction,
            mode,
            intensity,
            interval
        });
    };

    const selectedAnimData = getSelectedAnimationData();

    return (
        <div className="p-3 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
            <h2 className="text-lg font-semibold mb-2 text-white">Animations</h2>
            
            {/* Animation Grid */}
            <div className="grid grid-cols-3 gap-3 mb-2">
                {ANIMATIONS.map((animation) => (
                    <div 
                        key={animation.name} 
                        className={`border rounded-lg p-1 cursor-pointer transition-colors ${
                            selectedAnimation === animation.name 
                                ? 'border-blue-400 bg-blue-900' 
                                : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                        }`}
                        onClick={() => setSelectedAnimation(animation.name)}
                    >
                        <div className="w-full h-16 bg-gray-600 rounded mb-2 flex items-center justify-center">
                            <img 
                                src={animation.getSample()} 
                                alt={`${animation.name} preview`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="text-xs font-medium text-center capitalize text-gray-200">
                            {animation.name.replace('-', ' ')}
                        </p>
                    </div>
                ))}
            </div>

            {/* Animation Controls */}
            {selectedAnimation && (
                <div className="space-y-4">
                    <div className="border-t border-gray-600 pt-4">
                        <h3 className="text-sm font-medium mb-3 text-white">Animation Settings</h3>
                        
                        {/* Animate */}
                        {selectedAnimData?.options?.animate && (
                            <div className="mb-3">
                                <label className="block text-xs font-medium text-gray-300 mb-1">
                                    Animate
                                </label>
                                <select 
                                    value={animate} 
                                    onChange={(e) => setAnimate(e.target.value)}
                                    className="w-full text-xs border border-gray-600 rounded px-2 py-1 bg-gray-700 text-white"
                                >
                                    {selectedAnimData.options.animate.map((option) => (
                                        <option key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Direction */}
                        {selectedAnimData?.options?.direction && (
                            <div className="mb-3">
                                <label className="block text-xs font-medium text-gray-300 mb-1">
                                    Direction
                                </label>
                                <select 
                                    value={direction} 
                                    onChange={(e) => setDirection(e.target.value)}
                                    className="w-full text-xs border border-gray-600 rounded px-2 py-1 bg-gray-700 text-white"
                                >
                                    {selectedAnimData.options.direction.map((option) => (
                                        <option key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Mode */}
                        {selectedAnimData?.options?.mode && (
                            <div className="mb-3">
                                <label className="block text-xs font-medium text-gray-300 mb-1">
                                    Mode
                                </label>
                                <select 
                                    value={mode} 
                                    onChange={(e) => setMode(e.target.value)}
                                    className="w-full text-xs border border-gray-600 rounded px-2 py-1 bg-gray-700 text-white"
                                >
                                    {selectedAnimData.options.mode.map((option) => (
                                        <option key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Intensity */}
                        <div className="mb-3">
                            <label className="block text-xs font-medium text-gray-300 mb-1">
                                Intensity: {intensity}
                            </label>
                            <input 
                                type="range" 
                                min="0.1" 
                                max="3" 
                                step="0.1"
                                value={intensity} 
                                onChange={(e) => setIntensity(parseFloat(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        {/* Interval */}
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-300 mb-1">
                                Interval (ms): {interval}
                            </label>
                            <input 
                                type="range" 
                                min="100" 
                                max="5000" 
                                step="100"
                                value={interval} 
                                onChange={(e) => setInterval(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>

                        {/* Animate Button */}
                        <button 
                            onClick={handleAnimate}
                            className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Animate
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimationPanel;