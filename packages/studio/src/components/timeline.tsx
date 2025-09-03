import { useTimeline } from '../hooks/useTimeline'
import { formatTime } from '../lib/utils'
import { Trash2, Scissors, RotateCcw, RotateCw } from 'lucide-react'

export function Timeline() {
  const { timeline, tracks } = useTimeline()
  
  const timeMarkers = []
  for (let i = 0; i <= timeline.duration; i += 1) {
    timeMarkers.push(i)
  }

  return (
    <div className="h-36 bg-neutral-800/80 border-t border-gray-600/50 flex flex-col backdrop-blur-md shadow-md">
      {/* Time Ruler */}
      <div className="h-8 bg-neutral-700/50 border-b border-gray-600/50 flex items-center px-4 relative">
        <div className="flex-1 relative">
          {timeMarkers.map((time) => (
            <div
              key={time}
              className="absolute text-xs text-gray-300 font-medium"
              style={{ left: `${(time / timeline.duration) * 100}%` }}
            >
              {formatTime(time)}
            </div>
          ))}
        </div>
      </div>

      {/* Tracks */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="min-w-full">
          {tracks.map((track) => (
            <div key={track.id} className="h-12 border-b border-gray-600/30 flex items-center px-4">
              {/* Track Header */}
              <div className="w-24 flex-shrink-0 flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-300">{track.name}</span>
                <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: track.color }}></div>
              </div>
              
              {/* Track Content */}
              <div className="flex-1 relative h-8 bg-neutral-700/30 rounded-lg border-2 border-dashed border-gray-500/50 backdrop-blur-sm shadow-sm">
                {track.elements.map((element) => {
                  const startPercent = (element.startTime / timeline.duration) * 100
                  const widthPercent = ((element.endTime - element.startTime) / timeline.duration) * 100
                  
                  return (
                    <div
                      key={element.id}
                      className="absolute top-1 bottom-1 rounded-md border border-purple-500/50 cursor-pointer transition-all hover:border-purple-400 hover:shadow-md hover:shadow-purple-500/20"
                      style={{
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`,
                        background: element.type === 'text' 
                          ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.2))'
                          : 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(59, 130, 246, 0.2))'
                      }}
                      title={`${element.type} element - ${formatTime(element.endTime - element.startTime)}`}
                    >
                      <div className="h-full flex items-center justify-center text-xs text-white font-semibold px-2">
                        {element.type === 'text' ? 'T' : element.type.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Controls */}
      <div className="h-6 bg-neutral-700/50 border-t border-gray-600/30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 rounded-md bg-neutral-600/50 hover:bg-neutral-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200">
            <Trash2 className="w-3 h-3" />
          </button>
          <button className="w-6 h-6 rounded-md bg-neutral-600/50 hover:bg-neutral-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200">
            <Scissors className="w-3 h-3" />
          </button>
          <button className="w-6 h-6 rounded-md bg-neutral-600/50 hover:bg-neutral-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200">
            <RotateCcw className="w-3 h-3" />
          </button>
          <button className="w-6 h-6 rounded-md bg-neutral-600/50 hover:bg-neutral-600 flex items-center justify-center text-gray-300 hover:text-white transition-all duration-200">
            <RotateCw className="w-3 h-3" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Zoom</span>
          <div className="w-24 h-1.5 bg-neutral-600/50 rounded-full overflow-hidden">
            <div className="w-1/2 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
