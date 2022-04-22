import { ReelBoard } from '../src/core/ReelBoard';
import * as PIXI from 'pixi.js-legacy';
import { Dimensions } from '../src/constants/Dimensions';
import { Colors } from '../src/constants/Colors';
import { GameManager } from '../src/core/GameManager';

document.body.innerHTML = `<div class="slidecontainer">
        <input type="range" min="1" max="5000" value="500" id="duration">
        <div>Minimum Spinning-Time: <span id="output"></span> Milliseconds</div>
    </div>`;

test('number of reels is 6', () => {
    const rb = new ReelBoard({
        numberOfReels: 6,
        app: null,
        slotsInReel: 3,
        textures: [],
    });
    expect(rb.getReels().length).toBe(6);
});

test('app width is 1600', () => {
    const gm = new GameManager(
        new PIXI.Application({
            width: Dimensions.REEL_WIDTH * 10,
            height: 3 * Dimensions.SYMBOL_SIZE + 100,
            backgroundColor: Colors.BACKGROUND_COLOR,
        })
    );

    expect(gm.app.screen.width).toBe(1600);
});
