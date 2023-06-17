import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { inGameSigner } from "../game/blockchain/inGameSigner";

const LandingPage: NextPage = () => {
    const { isConnected, address } = useAccount();
    const router = useRouter();

    useEffect(() => {
        router.push("/home");
    }, [address, isConnected]);

    return (
        <div id="root">
            <h1>SKALE Platformer</h1>
            <ConnectButton />
        </div>
    );
};

export default LandingPage;