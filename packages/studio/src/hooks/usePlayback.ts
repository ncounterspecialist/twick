import { useCallback } from 'react'
import { useEditor } from './useEditor'

export function usePlayback() {
  const { state, dispatch, duration } = useEditor()

  const toggle = useCallback(() => dispatch({ type: 'play_toggle' }), [dispatch])
  const seek = useCallback((time: number) => dispatch({ type: 'seek', time }), [dispatch])

  return {
    isPlaying: state.isPlaying,
    currentTime: state.currentTime,
    duration,
    toggle,
    seek,
  }
}
