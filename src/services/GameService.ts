import { Subject } from 'rxjs';
import { SpinReelEvent } from '../types/TwinReelEvent';

export class GameService {
    private static instance: GameService;
    reelSpinned$: Subject<SpinReelEvent> = new Subject<SpinReelEvent>();
    playClicked$: Subject<void> = new Subject();
    spinTimeInMs: number;

    private constructor() {}

    public static getInstance(): GameService {
        if (!GameService.instance) GameService.instance = new GameService();

        return GameService.instance;
    }
}
