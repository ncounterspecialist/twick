/**
 * Player state constants for the Live Player.
 * Defines the different states that a player can be in during playback.
 * 
 * @example
 * ```js
 * import { PLAYER_STATE } from '@twick/live-player';
 * 
 * if (playerState === PLAYER_STATE.PLAYING) {
 *   console.log('Player is currently playing');
 * }
 * ```
 */
export const PLAYER_STATE = {
  /** Player is refreshing/reloading content */
  REFRESH: "Refresh",
  /** Player is actively playing content */
  PLAYING: "Playing",
  /** Player is paused */
  PAUSED: "Paused",
} as const;