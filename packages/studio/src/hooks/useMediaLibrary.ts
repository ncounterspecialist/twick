import { useMemo } from 'react'
import { useEditor } from './useEditor'

export function useMediaLibrary() {
  const { project } = useEditor()
  const items = project.mediaLibrary
  const byType = useMemo(() => ({
    video: items.filter(i => i.type === 'video'),
    image: items.filter(i => i.type === 'image'),
    audio: items.filter(i => i.type === 'audio'),
  }), [items])

  return { items, byType }
}
