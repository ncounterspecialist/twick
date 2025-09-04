import { useMemo } from 'react'
import { useStudioContext } from '../context/studio-context'
import type { MediaItem } from '../types'

export function useMediaLibrary() {
  const { project } = useStudioContext()
  const items = project.mediaLibrary
  const byType = useMemo(() => ({
    video: items.filter((i: MediaItem) => i.type === 'video'),
    image: items.filter((i: MediaItem) => i.type === 'image'),
    audio: items.filter((i: MediaItem) => i.type === 'audio'),
  }), [items])

  return { items, byType }
}
