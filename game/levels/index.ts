import { Stage } from "melonjs";
import { LevelOne } from "./levelOne";

type GameStage = 
    | typeof LevelOne;

export const Levels: {[key: number]: GameStage} = {
    0: LevelOne
}