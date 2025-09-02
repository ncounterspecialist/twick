import { useTimeline } from '../hooks/useTimeline'
import { formatTime } from '../lib/utils'

export function Timeline() {
  const { timeline, tracks } = useTimeline()
  
  const timeMarkers = []
  for (let i = 0; i <= timeline.duration; i += 2) {
    timeMarkers.push(i)
  }

  return (
    <div className="h-48 bg-gray-900 border-t border-gray-700 flex flex-col">
      {/* Time Ruler */}
      <div className="h-8 bg-gray-800 border-b border-gray-700 flex items-center px-4 relative">
        <div className="flex-1 relative">
          {timeMarkers.map((time) => (
            <div
              key={time}
              className="absolute text-xs text-gray-400"
              style={{ left: `${(time / timeline.duration) * 100}%` }}
            >
              {formatTime(time)}
            </div>
          ))}
        </div>
      </div>

      {/* Tracks */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-full">
          {tracks.map((track) => (
            <div key={track.id} className="h-16 border-b border-gray-700 flex items-center px-4">
              {/* Track Header */}
              <div className="w-32 flex-shrink-0 flex items-center gap-2">
                <span className="text-sm font-medium text-gray-300">{track.name}</span>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: track.color }}></div>
              </div>
              
              {/* Track Content */}
              <div className="flex-1 relative h-12 bg-gray-800 rounded border-2 border-dashed border-gray-600">
                {track.elements.map((element) => {
                  const startPercent = (element.startTime / timeline.duration) * 100
                  const widthPercent = ((element.endTime - element.startTime) / timeline.duration) * 100
                  
                  return (
                    <div
                      key={element.id}
                      className="absolute top-1 bottom-1 rounded border border-gray-500 cursor-pointer transition-all hover:border-blue-400"
                      style={{
                        left: `${startPercent}%`,
                        width: `${widthPercent}%`,
                        backgroundColor: element.type === 'text' ? '#8b5cf6' : '#3b82f6'
                      }}
                      title={`${element.type} element`}
                    >
                      <div className="h-full flex items-center justify-center text-xs text-white font-medium px-2">
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
      <div className="h-6 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button className="text-xs text-gray-400 hover:text-white">-</button>
          <span className="text-xs text-gray-400">Zoom</span>
          <button className="text-xs text-gray-400 hover:text-white">+</button>
        </div>
        <div className="w-32 h-1 bg-gray-800 border border-gray-700 rounded-full">
          <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
