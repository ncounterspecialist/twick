import { useState } from 'react';
import { ChevronDown, ChevronRight, Play, Volume2, Settings, FileText, Frame, Zap, Sparkles as SparklesIcon } from 'lucide-react';
import { ANIMATIONS, TEXT_EFFECTS } from '@twick/video-editor';

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children, isOpen, onToggle }) => (
  <div className="border-b border-gray-600/30 last:border-b-0 bg-gradient-to-b from-neutral-800/40 to-neutral-800/20 backdrop-blur-sm">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between px-3 py-2.5 text-left text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-500/10 transition-all duration-200 rounded-none border-l-2 border-transparent hover:border-purple-500/50"
    >
      <div className="flex items-center gap-2.5">
        <div className="text-purple-400/80">
          {icon}
        </div>
        <span className="font-medium text-sm">{title}</span>
      </div>
      {isOpen ? (
        <ChevronDown className="w-4 h-4 transition-transform duration-200 text-purple-400/60" />
      ) : (
        <ChevronRight className="w-4 h-4 transition-transform duration-200 text-purple-400/60" />
      )}
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="px-3 py-2 bg-neutral-900/30 border-l-2 border-purple-500/30 ml-2">
        {children}
      </div>
    </div>
  </div>
);

interface PropertiesPanelProps {
  elementType?: 'text' | 'image' | 'video' | 'audio' | 'subtitle' | 'shape';
}

export function PropertiesPanel({ elementType = 'text' }: PropertiesPanelProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['all']));

  // Custom slider styles
  const sliderStyles = `
    .slider-thumb::-webkit-slider-thumb {
      appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a855f7, #8b5cf6);
      cursor: pointer;
      border: 2px solid #7c3aed;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
      transition: all 0.2s ease;
    }
    .slider-thumb::-webkit-slider-thumb:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(139, 92, 246, 0.6);
    }
    .slider-thumb::-moz-range-thumb {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: linear-gradient(135deg, #a855f7, #8b5cf6);
      cursor: pointer;
      border: 2px solid #7c3aed;
      box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
      transition: all 0.2s ease;
    }
  `;

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const getAvailableSections = () => {
    const sections = ['all'];
    
    switch (elementType) {
      case 'text':
        sections.push('text-effects');
        break;
      case 'subtitle':
        sections.push('subtitle-styles');
        break;
      case 'image':
      case 'video':
        sections.push('frame-effects');
        sections.push('playback');
        break;
      case 'audio':
        sections.push('playback');
        break;
    }
    
    // Animation section is available for all element types
    sections.push('animations');
    
    return sections;
  };

  const availableSections = getAvailableSections();

  return (
    <>
      <style>{sliderStyles}</style>
      <div className="w-72 bg-gradient-to-b from-neutral-800/90 to-neutral-900/80 border-l border-gray-600/40 overflow-y-auto overflow-x-hidden backdrop-blur-xl shadow-2xl">
        <div className="px-3 py-3 border-b border-gray-600/30 bg-gradient-to-r from-purple-600/10 to-transparent">
          <h3 className="text-lg font-bold text-white">Element Properties</h3>
        </div>

      <div className="p-1">
        {/* All Properties Section */}
        <AccordionItem
          title="All Properties"
          icon={<Settings className="w-4 h-4" />}
          isOpen={openSections.has('all')}
          onToggle={() => toggleSection('all')}
        >
                     <div className="space-y-3">
             {/* Position & Size */}
             <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
               <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                 Position & Size
               </h5>
               <div className="grid grid-cols-2 gap-2">
                 <div>
                   <label className="block text-xs text-gray-400 mb-1">X</label>
                   <input
                     type="number"
                     defaultValue="0"
                     className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                   />
                 </div>
                 <div>
                   <label className="block text-xs text-gray-400 mb-1">Y</label>
                   <input
                     type="number"
                     defaultValue="0"
                     className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                   />
                 </div>
                 <div>
                   <label className="block text-xs text-gray-400 mb-1">Width</label>
                   <input
                     type="number"
                     defaultValue="100"
                     className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                   />
                 </div>
                 <div>
                   <label className="block text-xs text-gray-400 mb-1">Height</label>
                   <input
                     type="number"
                     defaultValue="100"
                     className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                   />
                 </div>
               </div>
             </div>

             {/* Opacity */}
             <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
               <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                 Opacity
               </h5>
               <input
                 type="range"
                 min="0"
                 max="100"
                 defaultValue="100"
                 className="w-full h-1.5 bg-gradient-to-r from-purple-500/30 to-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
               />
               <div className="flex justify-between text-xs text-gray-400 mt-1">
                 <span>0%</span>
                 <span>100%</span>
               </div>
             </div>

             {/* Rotation */}
             <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
               <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
                 <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                 Rotation
               </h5>
               <input
                 type="range"
                 min="0"
                 max="360"
                 defaultValue="0"
                 className="w-full h-1.5 bg-gradient-to-r from-purple-500/30 to-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
               />
               <div className="flex justify-between text-xs text-gray-400 mt-1">
                 <span>0°</span>
                 <span>360°</span>
               </div>
             </div>
           </div>
        </AccordionItem>

        {/* Text Effects Section */}
        {availableSections.includes('text-effects') && (
          <AccordionItem
            title="Text Effects"
            icon={<SparklesIcon className="w-4 h-4" />}
            isOpen={openSections.has('text-animation-effects')}
            onToggle={() => toggleSection('text-animation-effects')}
          >
                         <div className="space-y-3">
               {/* Text Effect Selection */}
               <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
                 <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                   Text Effect Type
                 </h5>
                 <select className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200">
                   <option value="">No Effect</option>
                   {TEXT_EFFECTS.map((effect) => (
                     <option key={effect.name} value={effect.name}>
                       {effect.name.charAt(0).toUpperCase() + effect.name.slice(1)}
                     </option>
                   ))}
                 </select>
               </div>

               {/* Text Effect Options */}
               <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
                 <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                   Effect Options
                 </h5>
                 <div className="space-y-2">
                   {/* Delay */}
                   <div>
                     <label className="block text-xs text-gray-400 mb-1">Delay (seconds)</label>
                     <input
                       type="number"
                       min="0"
                       max="5"
                       step="0.1"
                       defaultValue="0"
                       className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                     />
                   </div>

                   {/* Buffer Time */}
                   <div>
                     <label className="block text-xs text-gray-400 mb-1">Buffer Time (seconds)</label>
                     <input
                       type="number"
                       min="0.05"
                       max="1"
                       step="0.05"
                       defaultValue="0.1"
                       className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                     />
                   </div>
                 </div>
               </div>
             </div>
          </AccordionItem>
        )}

        {/* Subtitle Styles Section */}
        {availableSections.includes('subtitle-styles') && (
          <AccordionItem
            title="Subtitle Styles"
            icon={<FileText className="w-4 h-4" />}
            isOpen={openSections.has('subtitle-styles')}
            onToggle={() => toggleSection('subtitle-styles')}
          >
            <div className="space-y-4">
              {/* Background */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Background</h5>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    defaultValue="#000000"
                    className="w-6 h-6 rounded border border-gray-600 cursor-pointer"
                  />
                  <input
                    type="text"
                    defaultValue="#000000"
                    className="flex-1 bg-neutral-700/50 border border-gray-600 rounded-lg text-white text-xs px-2 py-1 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Border */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Border</h5>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    defaultValue="0"
                    className="w-full h-2 bg-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0px</span>
                    <span>10px</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>
        )}

        {/* Frame Effects Section */}
        {availableSections.includes('frame-effects') && (
          <AccordionItem
            title="Frame Effects"
            icon={<Frame className="w-4 h-4" />}
            isOpen={openSections.has('frame-effects')}
            onToggle={() => toggleSection('frame-effects')}
          >
            <div className="space-y-4">
              {/* Border Radius */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Border Radius</h5>
                <input
                  type="range"
                  min="0"
                  max="50"
                  defaultValue="0"
                  className="w-full h-2 bg-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0px</span>
                  <span>50px</span>
                </div>
              </div>

              {/* Border */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Border</h5>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="20"
                    defaultValue="0"
                    className="w-full h-2 bg-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0px</span>
                    <span>20px</span>
                  </div>
                </div>
              </div>

              {/* Shadow */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Shadow</h5>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    defaultValue="0"
                    className="w-full h-2 bg-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>0px</span>
                    <span>50px</span>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>
        )}

        {/* Playback Section */}
        {availableSections.includes('playback') && (
          <AccordionItem
            title="Playback"
            icon={<Play className="w-4 h-4" />}
            isOpen={openSections.has('playback')}
            onToggle={() => toggleSection('playback')}
          >
            <div className="space-y-4">
              {/* Volume */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Volume</h5>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="100"
                    className="flex-1 h-2 bg-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                  />
                  <span className="text-xs text-gray-400 w-8">100%</span>
                </div>
              </div>

              {/* Speed */}
              <div>
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Speed</h5>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  defaultValue="1"
                  className="w-full h-2 bg-neutral-600/50 rounded-full appearance-none cursor-pointer slider-thumb"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0.1x</span>
                  <span>3x</span>
                </div>
              </div>

              {/* Loop */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="loop"
                  className="w-4 h-4 text-purple-600 bg-neutral-700 border-gray-600 focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="loop" className="text-sm text-gray-300">Loop</label>
              </div>
            </div>
          </AccordionItem>
        )}

        {/* Animations Section */}
        {availableSections.includes('animations') && (
          <AccordionItem
            title="Animations"
            icon={<Zap className="w-4 h-4" />}
            isOpen={openSections.has('animations')}
            onToggle={() => toggleSection('animations')}
          >
                         <div className="space-y-3">
               {/* Animation Selection */}
               <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
                 <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                   Animation Type
                 </h5>
                 <select className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200">
                   <option value="">No Animation</option>
                   {ANIMATIONS.map((animation) => (
                     <option key={animation.name} value={animation.name}>
                       {animation.name.charAt(0).toUpperCase() + animation.name.slice(1)}
                     </option>
                   ))}
                 </select>
               </div>

               {/* Animation Options */}
               <div className="bg-neutral-800/40 rounded-lg p-2.5 border border-gray-600/20">
                 <h5 className="text-xs font-semibold text-gray-200 mb-2 flex items-center gap-1.5">
                   <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                   Animation Options
                 </h5>
                 <div className="space-y-2">
                   {/* Animate */}
                   <div>
                     <label className="block text-xs text-gray-400 mb-1">When to Animate</label>
                     <select className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200">
                       <option value="enter">Enter</option>
                       <option value="exit">Exit</option>
                       <option value="both">Both</option>
                     </select>
                   </div>

                   {/* Direction */}
                   <div>
                     <label className="block text-xs text-gray-400 mb-1">Direction</label>
                     <select className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200">
                       <option value="up">Up</option>
                       <option value="down">Down</option>
                       <option value="left">Left</option>
                       <option value="right">Right</option>
                       <option value="center">Center</option>
                     </select>
                   </div>

                   {/* Mode */}
                   <div>
                     <label className="block text-xs text-gray-400 mb-1">Mode</label>
                     <select className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200">
                       <option value="in">In</option>
                       <option value="out">Out</option>
                     </select>
                   </div>

                   {/* Interval */}
                   <div>
                     <label className="block text-xs text-gray-400 mb-1">Interval (seconds)</label>
                     <input
                       type="number"
                       min="0.1"
                       max="10"
                       step="0.1"
                       defaultValue="1"
                       className="w-full bg-neutral-700/60 border border-gray-600/40 rounded-md text-white text-xs px-2 py-1.5 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                     />
                   </div>
                 </div>
               </div>
             </div>
          </AccordionItem>
                 )}
       </div>
     </div>
     </>
   );
 }
