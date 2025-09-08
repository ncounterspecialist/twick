import { SparklesIcon } from "lucide-react";
import { TEXT_EFFECTS } from "@twick/video-editor";
import { AccordionItem } from "../shared/accordion-item";

interface TextEffectsProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function TextEffects({ isOpen, onToggle }: TextEffectsProps) {
  return (
    <AccordionItem
      title="Text Effects"
      icon={<SparklesIcon className="w-4 h-4" />}
      isOpen={isOpen}
      onToggle={onToggle}
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
  );
}
