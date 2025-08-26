/**
 * @twick/live-player - Live Player Package
 * 
 * A React-based live player component for the Twick video platform.
 * Provides real-time video playback with dynamic content updates,
 * external controls, and comprehensive state management.
 * 
 * @example
 * ```jsx
 * import { LivePlayer, LivePlayerProvider, useLivePlayerContext } from '@twick/live-player';
 * 
 * function App() {
 *   return (
 *     <LivePlayerProvider>
 *       <LivePlayer
 *         playing={true}
 *         projectData={{ text: "Hello World" }}
 *         onTimeUpdate={(time) => console.log('Time:', time)}
 *       />
 *     </LivePlayerProvider>
 *   );
 * }
 * ```
 */

// Constants
export { PLAYER_STATE } from "./helpers/constants";

// Utility functions
export { getBaseProject, generateId } from "./helpers/player.utils";

// Components
export { LivePlayer } from "./components/live-player";

// Hooks and Context
export { LivePlayerProvider, useLivePlayerContext } from "./context/live-player-context";