import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react'
import { usePlayback } from '../hooks/usePlayback'

export function Transport() {
  const { isPlaying, currentTime, duration, toggle, seek } = usePlayback()
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="h-20 bg-gray-800 border-t border-gray-700 p-4">
      <div className="flex items-center gap-4">
        <button onClick={toggle} className="btn btn-ghost text-white">
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>

        <button onClick={() => seek(Math.max(0, currentTime - 5))} className="btn btn-ghost text-gray-400">
          <SkipBack className="w-5 h-5" />
        </button>
        <button onClick={() => seek(Math.min(duration, currentTime + 5))} className="btn btn-ghost text-gray-400">
          <SkipForward className="w-5 h-5" />
        </button>

        <div className="flex-1 mx-4">
          <div className="relative">
            <div className="w-full h-2 bg-gray-600 rounded-full">
              <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => seek(parseFloat(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{Math.floor(currentTime)}s</span>
            <span>{Math.floor(duration)}s</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-gray-400" />
          <input type="range" min="0" max="1" step="0.1" defaultValue="1" className="w-20 h-2 bg-gray-600 rounded-full appearance-none cursor-pointer" />
        </div>
      </div>
    </div>
  )
}
