import { Reel } from './Reel';

export type SpinReelEvent = {
    reel: Reel;
    targetPosition: number;
    reelSpinDuration: number;
    easing?: (t: number) => number;
    oncomplete: () => void;
};
