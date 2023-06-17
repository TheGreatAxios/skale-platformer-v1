import * as me from "melonjs";

class GameOver extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        window.location.href = "/game-over";
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        // stop some music
        super.onDestroyEvent();
    }
}

export { GameOver };
