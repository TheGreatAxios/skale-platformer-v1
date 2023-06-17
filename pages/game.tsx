import { useEffect, useState } from "react"
import initialize from "../game/initialize"
import { Metadata, NextPage } from "next";
import styles from "../styles/Game.module.css";
import { Navigation } from "../components";
import { inGameSigner } from "../game/blockchain/inGameSigner";
import { useSignal } from "@preact/signals-react";
import game from "../game/game";

export const metadata: Metadata = {
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false
    }
       
}

const Game: NextPage = () => {

    const startLevel = (levelIndex: number) => (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (game.valueOf().currentLevel === undefined) {
            game.value.currentLevel = levelIndex;
            initialize(levelIndex);
        }
    }

    return (
        <div className={styles.container}>
            <Navigation />
            {game.valueOf().currentLevel === undefined
                && (
                    <div className={styles.grid}>
                        <button onClick={startLevel(0)}>Start Level</button>
                    </div>
                )
            }
            <div className={styles.screen} id="screen"></div>
        </div>
    )
}

export default Game;