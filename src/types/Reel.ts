import * as PIXI from 'pixi.js';

export type Reel = {
    container: PIXI.Container;
    symbols: PIXI.Sprite[];
    position: number;
};
