import 'index.css';
import { device } from "melonjs";
import "./web3/wallet";
import { getAccount } from "@wagmi/core";
import { utils } from "ethers";
import web3modal from './web3/wallet';
import * as me from "melonjs";

import game from './game';
import resources from './resources';
import PlayerEntity from './renderables/player';
import { SlimeEnemyEntity, FlyEnemyEntity } from './renderables/enemies';
import CoinEntity from './renderables/coin';
import PlayScreen from './stage/play';
import { getSFUEL } from './web3/signer';

/**
 *
 * Initialize the application
 */
export default function onload() {

    // init the video
    if (!me.video.init(800, 600, {parent : "screen", scaleMethod : "flex-width", renderer : me.video.AUTO, preferWebGL1 : false, subPixel : false })) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }

    // initialize the Debug Panel
    import('./plugin/debug/debugPanel').then((plugin) => {
        // automatically register the debug panel
        me.utils.function.defer(me.plugin.register, this, plugin.DebugPanelPlugin, "debugPanel");
    });


    // initialize the "sound engine"
    me.audio.init("mp3,ogg");

    // set all ressources to be loaded
    me.loader.preload(resources, () => {

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());

        // set the fade transition effect
        me.state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        me.pool.register("mainPlayer", PlayerEntity);
        me.pool.register("SlimeEntity", SlimeEnemyEntity);
        me.pool.register("FlyEntity", FlyEnemyEntity);
        me.pool.register("CoinEntity", CoinEntity, true);

        // load the texture atlas file
        // this will be used by renderable object later
        game.texture = new me.TextureAtlas(
            me.loader.getJSON("texture"),
            me.loader.getImage("texture")
        );

        // add some keyboard shortcuts
        me.event.on(me.event.KEYDOWN, (action, keyCode /*, edge */) => {

            // change global volume setting
            if (keyCode === me.input.KEY.PLUS) {
                // increase volume
                me.audio.setVolume(me.audio.getVolume()+0.1);
            } else if (keyCode === me.input.KEY.MINUS) {
                // decrease volume
                me.audio.setVolume(me.audio.getVolume()-0.1);
            }

            // toggle fullscreen on/off
            if (keyCode === me.input.KEY.F) {
                if (!me.device.isFullscreen()) {
                    me.device.requestFullscreen();
                } else {
                    me.device.exitFullscreen();
                }
            }
        });

        // switch to PLAY state
        me.state.change(me.state.PLAY);
    });
}

device.onReady(() => {
    getSFUEL()
        .then((res) => {
            setup();
        })
        .catch((err) => {
            alert("Error Starting Game");
            setup();
        })
});

const setup = () => {
    if (utils.isAddress(getAccount().address)) {
        document.getElementById("introduction").style.display = "none";
        onload();
    } else {
        // web3modal.openModal();
    }
}