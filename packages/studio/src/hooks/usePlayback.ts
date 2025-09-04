import { useCallback } from 'react'
import { useStudioContext } from '../context/studio-context'

export function usePlayback() {
  const { state, dispatch, duration } = useStudioContext()

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
