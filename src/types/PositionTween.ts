import { Reel } from './Reel';

export type PositionTween = {
    reel: Reel;
    positionBeginValue: number;
    targetPosition: number;
    easing: (t: number) => number;
    reelSpinDuration: number;
    complete: (t?: any) => void;
    startTime: number;
};
