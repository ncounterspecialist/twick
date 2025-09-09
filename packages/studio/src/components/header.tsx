import type { Size } from "@twick/timeline";
import { Save, Download, Clapperboard } from "lucide-react";
import { useEffect, useState } from "react";

export const StudioHeader = ({ setVideoResolution }: { setVideoResolution: (resolution: Size) => void }) => {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('vertical');
  useEffect(() => {
    const orientation = localStorage.getItem('orientation');
    if (orientation) {
      setOrientation(orientation as 'horizontal' | 'vertical');
    }
  }, []);

  useEffect(()=> {
    if(orientation === 'horizontal') {
      localStorage.setItem('orientation', 'horizontal');
      setVideoResolution({ width: 1280, height: 720 });
    } else {
      localStorage.setItem('orientation', 'vertical');
      setVideoResolution({ width: 720, height: 1280 });
    }
  }, [orientation])

  return (
    <header className="h-14 bg-neutral-800/90 border-b border-gray-600/50 flex items-center justify-between px-4 backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Clapperboard className="w-8 h-8 text-purple-400" />
            <h1 className="text-lg font-bold text-gradient-purple">
              Twick Studio
            </h1>
          </div>
        </div>
        {/* <div className="flex items-center">
          <div className="flex items-center bg-neutral-700/50 rounded-lg p-1 gap-1">
            <button
              onClick={() => setOrientation('horizontal')}
              className={`p-2 rounded transition-colors ${
                orientation === 'horizontal'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-600/50'
              }`}
              title="Switch to horizontal layout"
            >
              <RectangleHorizontal className="w-5 h-5" />
            </button>
            <button
              onClick={() => setOrientation('vertical')}
              className={`p-2 rounded transition-colors ${
                orientation === 'vertical'
                  ? 'bg-purple-500/20 text-purple-400'
                  : 'text-gray-400 hover:text-white hover:bg-neutral-600/50'
              }`}
              title="Switch to vertical layout"
            >
              <RectangleVertical className="w-5 h-5" />
            </button>
          </div>
        </div> */}
        <div className="flex items-center gap-2">
          <button
            className="btn btn-ghost w-32"
            title="Save Draft"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          <button className="btn btn-primary w-32" title="Export">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </header>
  );
};

export default StudioHeader;