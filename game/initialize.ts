import {
    TextureAtlas,
    audio,
    device,
    input,
    loader,
    pool,
    state,
    utils,
    video,
    event
} from "melonjs";
import resources from "./resources";
import game from "./game";
import { CoinEntity, FlyEnemyEntity, PlayerEntity, SlimeEnemyEntity } from "./renderables";
import { Levels } from "./levels";

export default function initialize(levelIndex: number) {
    if (
        !video.init(800, 600, {
            parent: "screen",
            scaleMethod: "flex-width",
            renderer: video.AUTO,
            preferWebGL1: false,
            subPixel: false,
        })
    ) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the "sound engine"
    audio.init("mp3,ogg");

    // set all ressources to be loaded
    loader.preload(resources, () => {
        // set the "Play/Ingame" Screen Object
        const Level = Levels[levelIndex];
        state.set(state.PLAY, new Level());
        // set the fade transition effect
        state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        pool.register("mainPlayer", PlayerEntity);
        pool.register("SlimeEntity", SlimeEnemyEntity);
        pool.register("FlyEntity", FlyEnemyEntity);
        pool.register("CoinEntity", CoinEntity, true);

        // load the texture atlas file
        // this will be used by renderable object later
        game.value.texture = new TextureAtlas(
            loader.getJSON("texture"),
            loader.getImage("texture")
        );

        // add some keyboard shortcuts
        event.on(event.KEYDOWN, (_: input.KEY, keyCode: number /*, edge */) => {
            // change global volume setting
            if (keyCode === input.KEY.PLUS) {
                // increase volume
                audio.setVolume(audio.getVolume() + 0.1);
            } else if (keyCode === input.KEY.MINUS) {
                // decrease volume
                audio.setVolume(audio.getVolume() - 0.1);
            }

            // toggle fullscreen on/off
            if (keyCode === input.KEY.F) {
                if (!device.isFullscreen()) {
                    device.requestFullscreen();
                } else {
                    device.exitFullscreen();
                }
            }
        });

        // switch to PLAY state
        // setTimeout(() => {
        state.change(state.PLAY, true);
        // }, 2500);

    });
}
