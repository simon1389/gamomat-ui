import { Application, Texture } from 'pixi.js';

export type ReelBoardConfig = {
    app: Application;
    textures: Texture[];
    numberOfReels: number;
    slotsInReel: number;
};
