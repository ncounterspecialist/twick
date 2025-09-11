import { ChevronDown, ChevronRight } from "lucide-react";

interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ title, icon, children, isOpen, onToggle }: AccordionItemProps) {
  return (
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
        className={`overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 py-2 bg-neutral-900/30 border-l-2 border-purple-500/30 ml-2">
          {children}
        </div>
      </div>
    </div>
  );
}
