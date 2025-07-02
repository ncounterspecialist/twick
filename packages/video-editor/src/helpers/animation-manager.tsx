import { animationGifs } from '../assets';
import { Animation } from './types';

export const ANIMATIONS: Animation[] = [
    {
        name: "fade",
        interval: 1,
        animate: "enter",
        options: {
            animate: ["enter", "exit", "both"],
        },
        getSample: () => {
            return animationGifs.fade;
        }
    },
    {
        name: "rise",
        interval: 1,
        animate: "enter",
        direction: "up",
        options: {
            animate: ["enter", "exit", "both"],
            direction: ["up", "down"],
        },
        getSample: (animation?: Animation) => {
            return animation?.direction === "down" ? animationGifs['rise-down'] : animationGifs['rise-up'];
        }
    },
    {
        name: "blur",
        interval: 1,
        animate: "enter",
        options: {
            animate: ["enter", "exit", "both"],
        },
        getSample: () => {
            return animationGifs.blur;
        }
    },
    {
        name: "breathe",
        interval: 1,
        mode: "in",
        animate: "enter",
        options: {
            animate: ["enter", "exit", "both"],
            mode: ["in", "out"],
        },
        getSample: (animation?: Animation) => {
            return animation?.mode === "out" ? animationGifs['breathe-out'] : animationGifs['breathe-in'];
        }
    },
    {
        name: "succession",
        interval: 1,
        animate: "enter",
        options: {
            animate: ["enter", "exit", "both"],
        },
        getSample: () => {
            return animationGifs.succession;
        }
    }
]