/**
 * hold all game specific data
 */

import { Signal } from "@preact/signals-react";
import { TextureAtlas } from "melonjs";

type Game = {
    currentLevel: number | undefined,
    data: {
        gold: {
            balance: number | bigint
        },
        score: number | bigint
    },
    texture: TextureAtlas
    ,
    nonce: number | bigint

}

const _baseGame = {

    /**
     * object where to store game global scole
     */
    currentLevel: undefined,
    data : {
        gold: {
            balance : 0,
        },
        score : 0
    },
    texture: new TextureAtlas({}),
    nonce: 0
} satisfies Game;

export default new Signal<Game>(_baseGame);
