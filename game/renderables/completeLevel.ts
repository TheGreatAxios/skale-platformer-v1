import {
    event,
    Stage,
    Trigger,
    level,
    state,
    game
} from "melonjs";
import ResponseObject from "melonjs/dist/types/physics/response";

export default class CompleteLevelTrigger extends Trigger {

    constructor(x: number, y: number, settings: any) {
        super(x, y, settings);
    }

    getTriggerSettings(): { event: string; to: string } {
        const sett = super.getTriggerSettings() as { event: string, to: string };
        return sett;
    }

    onResetEvent(x: any, y: any, w: any, h: any): void {
        super.onResetEvent(x, y, w, h);
    }

    onCollision(response: ResponseObject, other: any): boolean {
        const currentLevel = level.getCurrentLevel();
        const currentMap = currentLevel.name;
        if (this.getTriggerSettings().to === currentMap) {
            state.change(state.GAME_END, true);
            return false;
        } else {
            return super.onCollision(response, other);
        }
    }
}