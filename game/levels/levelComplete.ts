import * as me from "melonjs";
import game from "../game";

class LevelComplete extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        game.value.currentLevel = undefined;
        this.destroy();
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        // stop some music
        super.onDestroyEvent();
    }
}

export { LevelComplete };
