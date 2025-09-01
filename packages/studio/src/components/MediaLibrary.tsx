import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import {
  Play,
  Pause,
  Image,
  Video,
  Music,
  FileText,
  Trash2,
  Star,
  GripVertical,
  Upload
} from 'lucide-react'

import { cn, formatFileSize, formatTime } from '../lib/utils'
import type { MediaItem } from '../types'

interface MediaLibraryProps {
  mediaItems: MediaItem[]
  viewMode: 'grid' | 'list'
  onViewModeChange: (mode: 'grid' | 'list') => void
  onAddToTimeline: (item: MediaItem) => void
  onDelete?: (item: MediaItem) => void
  onFavorite?: (item: MediaItem) => void
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({
  mediaItems,
  viewMode,
  onAddToTimeline,
  onDelete,
  onFavorite
}) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const [playingItem, setPlayingItem] = useState<string | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.aac', '.flac', '.m4a']
    },
    onDrop: (acceptedFiles) => {
      // Handle dropped files
      console.log('Dropped files:', acceptedFiles)
    }
  })

  const handleItemClick = (item: MediaItem, event: React.MouseEvent) => {
    if (event.ctrlKey || event.metaKey) {
      // Multi-select
      setSelectedItems(prev => 
        prev.includes(item.id) 
          ? prev.filter(id => id !== item.id)
          : [...prev, item.id]
      )
    } else {
      // Single select
      setSelectedItems([item.id])
    }
  }

  const handleItemDoubleClick = (item: MediaItem) => {
    onAddToTimeline(item)
  }

  const handlePlayPause = (item: MediaItem, event: React.MouseEvent) => {
    event.stopPropagation()
    setPlayingItem(playingItem === item.id ? null : item.id)
  }

  const getMediaIcon = (type: string) => {
    switch (type) {
      case 'video':
        return Video
      case 'image':
        return Image
      case 'audio':
        return Music
      default:
        return FileText
    }
  }

  const getMediaPreview = (item: MediaItem) => {
    if (item.thumbnail) {
      return (
        <img
          src={item.thumbnail}
          alt={item.name}
          className="w-full h-full object-cover rounded"
        />
      )
    }

    const Icon = getMediaIcon(item.type)
    return (
      <div className="flex items-center justify-center w-full h-full bg-dark-700 rounded">
        <Icon className="w-8 h-8 text-dark-400" />
      </div>
    )
  }

  const renderGridItem = (item: MediaItem) => {
    const isSelected = selectedItems.includes(item.id)
    const isPlaying = playingItem === item.id

    return (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative group cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200",
          isSelected
            ? "border-primary-500 bg-primary-500/10"
            : "border-dark-700 hover:border-dark-600 bg-dark-800"
        )}
        onClick={(e) => handleItemClick(item, e)}
        onDoubleClick={() => handleItemDoubleClick(item)}

        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Media Preview */}
        <div className="aspect-video relative">
          {getMediaPreview(item)}
          
          {/* Play Button Overlay */}
          {item.type === 'video' && (
            <motion.button
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => handlePlayPause(item, e)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </motion.button>
          )}

          {/* Duration Badge */}
          {item.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
              {formatTime(item.duration)}
            </div>
          )}

          {/* Selection Indicator */}
          {isSelected && (
            <div className="absolute top-2 left-2 w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          )}
        </div>

        {/* Item Info */}
        <div className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-dark-100 truncate">
                {item.name}
              </h4>
              <p className="text-xs text-dark-400 mt-1">
                {formatFileSize(item.size)}
              </p>
            </div>
            
            <div className="flex items-center gap-1">
              <motion.button
                className="p-1 text-dark-400 hover:text-dark-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onFavorite?.(item)
                }}
              >
                <Star className="w-3 h-3" />
              </motion.button>
              <motion.button
                className="p-1 text-dark-400 hover:text-dark-200 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete?.(item)
                }}
              >
                <Trash2 className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Drag Handle */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-dark-400" />
        </div>
      </motion.div>
    )
  }

  const renderListItem = (item: MediaItem) => {
    const isSelected = selectedItems.includes(item.id)
    const Icon = getMediaIcon(item.type)

    return (
      <motion.div
        key={item.id}
        layout
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200",
          isSelected
            ? "bg-primary-500/10 border border-primary-500"
            : "hover:bg-dark-700 border border-transparent"
        )}
        onClick={(e) => handleItemClick(item, e)}
        onDoubleClick={() => handleItemDoubleClick(item)}
        whileHover={{ x: 4 }}
      >
        {/* Media Icon */}
        <div className="w-12 h-12 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6 text-dark-400" />
        </div>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-dark-100 truncate">
            {item.name}
          </h4>
          <div className="flex items-center gap-4 mt-1 text-xs text-dark-400">
            <span>{formatFileSize(item.size)}</span>
            {item.duration && <span>{formatTime(item.duration)}</span>}
            <span>{item.type}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {item.type === 'video' && (
            <motion.button
              className="p-1 text-dark-400 hover:text-dark-200 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation()
                handlePlayPause(item, e)
              }}
            >
              {playingItem === item.id ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </motion.button>
          )}
          
          <motion.button
            className="p-1 text-dark-400 hover:text-dark-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onFavorite?.(item)
            }}
          >
            <Star className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            className="p-1 text-dark-400 hover:text-dark-200 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(item)
            }}
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          "flex-1 p-4 overflow-auto custom-scrollbar",
          isDragActive && "bg-primary-500/10 border-2 border-dashed border-primary-500"
        )}
      >
        <input {...getInputProps()} />
        
        {isDragActive && (
          <div className="flex items-center justify-center h-full text-primary-400">
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-medium">Drop media files here</p>
              <p className="text-sm text-dark-400">Support for video, image, and audio files</p>
            </div>
          </div>
        )}

        {!isDragActive && (
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 gap-4"
              >
                {mediaItems.map(renderGridItem)}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {mediaItems.map(renderListItem)}
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {!isDragActive && mediaItems.length === 0 && (
          <div className="flex items-center justify-center h-full text-dark-400">
            <div className="text-center">
              <Image className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-medium">No media files</p>
              <p className="text-sm">Upload or drag files to get started</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
