import * as PIXI from 'pixi.js';
import { Dimensions } from '../constants/Dimensions';
import { GameService } from '../services/GameService';
import { Reel } from '../types/Reel';
import { ReelBoardConfig } from '../types/ReelBoardConfig';
import { Colors } from '../constants/Colors';
import { Container } from 'pixi.js';

/**
 * Class which initializes the UI components on the gameboard.
 */
export class ReelBoard {
    private config: ReelBoardConfig;

    private reels: Reel[];

    constructor(config: ReelBoardConfig) {
        this.config = config;

        const reelContainer = this.initializeReels();
        this.config.app?.stage.addChild(reelContainer);

        this.initializePlayButton();
        this.initializeSlider();
    }

    public getReels(): Reel[] {
        return this.reels;
    }

    private initializeReels(): Container {
        this.reels = [];
        const reelContainer = new PIXI.Container();
        for (let i = 0; i < this.config.numberOfReels; i++) {
            const rc = new PIXI.Container();
            rc.x = i * Dimensions.REEL_WIDTH + (Dimensions.REEL_WIDTH - Dimensions.SYMBOL_SIZE) / 2;
            reelContainer.addChild(rc);

            const reel = {
                container: rc,
                symbols: [],
                position: 0,
                previousPosition: 0,
            };

            this.config.textures.forEach((st, j) => {
                const symbol = new PIXI.Sprite(st);
                symbol.y = j * Dimensions.SYMBOL_SIZE;
                symbol.scale.x = symbol.scale.y = Math.max(
                    Dimensions.SYMBOL_SIZE / symbol.width,
                    Dimensions.SYMBOL_SIZE / symbol.height
                );
                symbol.x = Math.round((Dimensions.SYMBOL_SIZE - symbol.width) / 2);
                reel.symbols.push(symbol);
                rc.addChild(symbol);
            });

            this.reels.push(reel);
        }

        return reelContainer;
    }

    private initializePlayButton() {
        const buttonHeight = 100;
        const bottom = new PIXI.Graphics();
        bottom.beginFill(100, 1);
        bottom.drawRect(
            0,
            Dimensions.SYMBOL_SIZE * this.config.slotsInReel,
            Dimensions.REEL_WIDTH * this.config.numberOfReels,
            buttonHeight
        );

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: Colors.TEXT_FILL_GRADIENT, // gradient
            stroke: Colors.TEXT_STROKE,
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: Colors.TEXT_SHADOW,
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });
        //
        const playText = new PIXI.Text('Play!', style);
        playText.x = Math.round((bottom.width - playText.width) / 2);
        playText.y =
            this.config.app?.screen.height -
            buttonHeight +
            Math.round((buttonHeight - playText.height) / 2);
        bottom.addChild(playText);

        bottom.addListener('pointerdown', () => {
            GameService.getInstance().playClicked$.next();
        });

        this.config.app?.stage.addChild(bottom);

        bottom.interactive = true;
        bottom.buttonMode = true;
    }

    private initializeSlider() {
        const slider = document.getElementById('duration') as HTMLInputElement;
        const output = document.getElementById('output');

        const updateSpinTime = () => {
            GameService.getInstance().spinTimeInMs = +slider?.value;
            output.innerHTML = slider?.value;
        };
        updateSpinTime();

        slider.oninput = updateSpinTime;
    }
}
