import { Zap } from "lucide-react";
import { ANIMATIONS } from "@twick/video-editor";
import { AccordionItem } from "../shared/accordion-item";

interface AnimationProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Animation({ isOpen, onToggle }: AnimationProps) {
  return (
    <AccordionItem
      title="Animations"
      icon={<Zap className="w-4 h-4" />}
      isOpen={isOpen}
      onToggle={onToggle}
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
  );
}
