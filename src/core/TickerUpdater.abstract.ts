import { Ticker } from 'pixi.js';

/**
 * Abstract class which has an abstract function that can be used to perform updates on each available animationFrame.
 * Makes use of pixis Ticker.
 */
export abstract class TickerUpdaterAbstract {
    ticker: Ticker;

    protected constructor(ticker: Ticker) {
        this.ticker = ticker;
        this.ticker.add(this.updateFunction.bind(this));
    }

    public abstract updateFunction(): void;
}
