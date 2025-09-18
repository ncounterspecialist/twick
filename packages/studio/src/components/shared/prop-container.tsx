interface PropContainerProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export function PropContainer({ title, icon, children }: PropContainerProps) {
  return (
    <div className="border-b border-gray-600/30 last:border-b-0 bg-gradient-to-b from-neutral-800/40 to-neutral-800/20 backdrop-blur-sm">
      <div className="w-full flex items-center justify-between px-3 py-2.5 text-left text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-purple-500/10 transition-all duration-200 rounded-none border-l-2 border-transparent hover:border-purple-500/50">
        <div className="flex items-center gap-2.5">
          <div className="text-purple-400/80">{icon}</div>
          <span className="font-medium text-sm">{title}</span>
        </div>
      </div>
      <div
        className={`overflow-x-hidden overflow-y-auto p-1 transition-all duration-300 ease-in-out`}
      >
        {children}
      </div>
    </div>
  );
}
