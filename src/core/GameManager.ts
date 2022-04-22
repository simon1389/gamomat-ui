import * as PIXI from 'pixi.js';
import { Colors } from '../constants/Colors';
import { SlotImages } from '../constants/SlotImages';
import { Dimensions } from '../constants/Dimensions';
import { GameService } from '../services/GameService';
import { ReelBoard } from './ReelBoard';
import { TweenUpdate } from './TweenUpdate';
import { Application } from 'pixi.js';

/**
 * Main class which initializes assets, the board and is entrypoint when the reel is started
 */
export class GameManager {
    public readonly app: Application;
    private readonly NUMBER_OF_REELS = 10;
    private readonly SLOTS_IN_REEL = 3;

    private running = false;
    private reelBoard: ReelBoard;

    public constructor(app?: PIXI.Application) {
        const slotImages = Object.values(SlotImages);

        this.app =
            app ||
            new PIXI.Application({
                width: Dimensions.REEL_WIDTH * this.NUMBER_OF_REELS,
                height: this.SLOTS_IN_REEL * Dimensions.SYMBOL_SIZE + 100,
                backgroundColor: Colors.BACKGROUND_COLOR,
            });
        document.body.appendChild(this.app.view);

        slotImages.forEach((v) => {
            this.app.loader.add(v, v);
        });
        this.app.loader.load(this.onAssetsLoaded.bind(this, slotImages));

        new TweenUpdate(this.app.ticker);
    }

    private onAssetsLoaded(slotImages: SlotImages[]): void {
        this.reelBoard = new ReelBoard({
            slotsInReel: this.SLOTS_IN_REEL,
            numberOfReels: this.NUMBER_OF_REELS,
            textures: slotImages.map((i) => PIXI.Texture.from(i)),
            app: this.app,
        });

        GameService.getInstance().playClicked$.subscribe(() => {
            this.startGame();
        });
    }

    private startGame(): void {
        if (this.running) return;
        this.running = true;

        this.reelBoard.getReels().forEach((reel, i, reels) => {
            const extra = Math.floor(Math.random() * 3);
            const targetPosition = reel.position + 20 + i * 5 + extra;
            const reelSpinDuration = GameService.getInstance().spinTimeInMs + i * 600 + extra * 600;

            // the last reel completes and setting running flag back
            const oncomplete = i === reels.length - 1 ? () => (this.running = false) : null;

            GameService.getInstance().reelSpinned$.next({
                reelSpinDuration,
                oncomplete,
                reel,
                targetPosition,
            });
        });
    }
}
