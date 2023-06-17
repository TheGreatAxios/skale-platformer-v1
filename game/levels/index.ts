import { LevelOne } from "./levelOne";
import { GameOver } from "./gameOver";
import { LevelComplete } from "./levelComplete";

type GameStage = 
    | typeof LevelOne
    | typeof GameOver
    | typeof LevelComplete;

export const Levels: {[key: number]: GameStage} = {
    0: LevelOne
}

export {
    LevelComplete,
    GameOver
}