import type { NextPage } from "next";
import { Navigation } from "../components";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { inGameSigner } from "../game/blockchain/inGameSigner";

/** Icons */
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useEffect } from "react";


const Home: NextPage = () => {

    return (
        <div className={styles.container}>
            <Navigation />
            <div className={styles.actions}>
                <Link href="/game" className={styles.actions__play}>
                    <SportsEsportsIcon />
                    <h3>Play Now</h3>
                </Link>
                <Link href="#" className={styles.actions__play}>
                    <EmojiPeopleIcon />
                    <h3>Coming Soon</h3>
                </Link>
                <Link href="#" className={styles.actions__play}>
                    <StorefrontIcon />
                    <h3>Coming Soon</h3>
                </Link>
            </div>
        </div>
    );
};

export default Home;
