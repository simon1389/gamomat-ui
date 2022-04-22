import { PositionTween } from '../types/PositionTween';
import { Ticker } from 'pixi.js';
import { GameService } from '../services/GameService';
import { Dimensions } from '../constants/Dimensions';
import { SpinReelEvent } from '../types/TwinReelEvent';
import { TickerUpdaterAbstract } from './TickerUpdater.abstract';

/**
 * This class is responsible for updating the position of the reel and the y-coordinate of each symbol in every reel.
 */
export class TweenUpdate extends TickerUpdaterAbstract {
    private tweening: PositionTween[] = [];

    constructor(ticker: Ticker) {
        super(ticker);

        GameService.getInstance().reelSpinned$.subscribe((e) => {
            this.addTween(e);
        });
    }

    /**
     * Updates the position of every reel which is currently rotating (and therefor has tweening filled)
     * and the y-coordinate of every symbol inside that reel.
     */
    updateFunction(): void {
        const now = Date.now();
        const remove = [];
        this.tweening.forEach((t) => {
            const phase = Math.min(1, (now - t.startTime) / t.reelSpinDuration);

            t.reel.position = this.lerp(t.positionBeginValue, t.targetPosition, t.easing(phase));

            //phase === 1 means reel spinning is finished and the targetPosition is reached
            if (phase === 1) {
                t.reel.position = t.targetPosition;
                t.complete?.(t);
                remove.push(t);
            }

            // Update symbol positions on reel.
            t.reel.symbols.forEach((s, j) => {
                s.y =
                    ((t.reel.position + j) % t.reel.symbols.length) * Dimensions.SYMBOL_SIZE -
                    Dimensions.SYMBOL_SIZE;
            });
        });

        this.tweening = this.tweening.filter((t) => !remove.includes(t));
    }

    private lerp(a1, a2, t): number {
        return a1 * (1 - t) + a2 * t;
    }

    private backout(amount): (t: number) => number {
        return (t) => --t * t * ((amount + 1) * t + amount) + 1;
    }

    private addTween(event: SpinReelEvent) {
        this.tweening.push({
            reel: event.reel,
            positionBeginValue: event.reel.position,
            targetPosition: event.targetPosition,
            easing: event.easing || this.backout(0.5),
            reelSpinDuration: event.reelSpinDuration,
            complete: event.oncomplete,
            startTime: Date.now(),
        });
    }
}
