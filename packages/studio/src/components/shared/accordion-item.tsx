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
    <div className="accordion-item">
      <div
        onClick={onToggle}
        className="accordion-header"
      >
        <div className="flex-container">
          <div className="accent-purple">
            {icon}
          </div>
          <span className="property-title">{title}</span>
        </div>
        {isOpen ? (
          <ChevronDown className="icon-sm accent-purple" />
        ) : (
          <ChevronRight className="icon-sm accent-purple" />
        )}
      </div>
      <div
        className={`accordion-content ${isOpen ? 'expanded' : ''}`}
      >
        <div className="accordion-panel">
          {children}
        </div>
      </div>
    </div>
  );
}
