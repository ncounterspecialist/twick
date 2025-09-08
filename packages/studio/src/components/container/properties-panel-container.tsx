import { useState } from 'react';
import { ElementProps } from '../properties/element-props';
import { TextEffects } from '../properties/text-effects';
import { Animation } from '../properties/animation';
import { AudioElement, ImageElement, TextElement, VideoElement, type TrackElement } from '@twick/timeline';

interface PropertiesPanelContainerProps {
  selectedElement: TrackElement | null;
}

export function PropertiesPanelContainer({ selectedElement }: PropertiesPanelContainerProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(['all']));

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
    sections.push('animations');

    if(selectedElement instanceof TextElement) {
      sections.push('text-effects');
    } else if(selectedElement instanceof ImageElement) {
      sections.push('image-effects');
    } else if(selectedElement instanceof VideoElement) {
      sections.push('video-effects');
    } else if(selectedElement instanceof AudioElement) {
      sections.push('audio-effects');
    }
    return sections;
  };

  const availableSections = getAvailableSections();

  if(!selectedElement) {
    return (<div className="w-72 bg-gradient-to-b from-neutral-800/90 to-neutral-900/80 border-l border-gray-600/40 overflow-y-auto overflow-x-hidden backdrop-blur-xl shadow-2xl">
      <div className="px-3 py-3 border-b border-gray-600/30 bg-gradient-to-r from-purple-600/10 to-transparent">
        <h3 className="text-lg font-bold text-white">Select Element to see properties</h3>
      </div>
    </div>)
  }
  return (
    <div className="w-72 bg-gradient-to-b from-neutral-800/90 to-neutral-900/80 border-l border-gray-600/40 overflow-y-auto overflow-x-hidden backdrop-blur-xl shadow-2xl">
      <div className="px-3 py-3 border-b border-gray-600/30 bg-gradient-to-r from-purple-600/10 to-transparent">
        <h3 className="text-lg font-bold text-white">Element Properties</h3>
      </div>

      <div className="p-1">
        {/* Element Properties */}
        <ElementProps
          isOpen={openSections.has('all')}
          onToggle={() => toggleSection('all')}
        />

        {/* Text Effects */}
        {availableSections.includes('text-effects') && (
          <TextEffects
            isOpen={openSections.has('text-effects')}
            onToggle={() => toggleSection('text-effects')}
          />
        )}

        {/* Animations */}
        {availableSections.includes('animations') && (
          <Animation
            isOpen={openSections.has('animations')}
            onToggle={() => toggleSection('animations')}
          />
        )}
      </div>
    </div>
  );
}