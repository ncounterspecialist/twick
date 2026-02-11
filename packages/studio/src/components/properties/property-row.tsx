import type { ReactNode } from "react";

interface PropertyRowProps {
  label: string;
  children: ReactNode;
  /** Optional secondary label/value on the right (e.g. units, current value) */
  secondary?: ReactNode;
}

export function PropertyRow({ label, children, secondary }: PropertyRowProps) {
  return (
    <div className="property-row">
      <div className="property-row-label">
        <span className="property-label">{label}</span>
      </div>
      <div className="property-row-control">
        {children}
      </div>
      {secondary && (
        <div className="property-row-secondary">
          {secondary}
        </div>
      )}
    </div>
  );
}

