import { useEffect } from "react"
import initialize from "../game/initialize"
import { Metadata, NextPage } from "next";
import styles from "../styles/Game.module.css";
import { Navigation } from "../components";
import { useSignal } from "@preact/signals-react";

export const metadata: Metadata = {
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false
    }
       
}

const Game: NextPage = () => {

    const status = useSignal<boolean>(false);

    useEffect(() => {
        if (!status.valueOf()) {
            status.value = true;
            initialize(0);
        }
    }, [])

    return (
        <div className={styles.container}>
            <Navigation />
            <div className={styles.screen} id="screen"></div>
        </div>
    )
}

export default Game;