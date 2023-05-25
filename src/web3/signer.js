import { providers, Wallet } from "ethers";
import { watchWalletClient} from "@wagmi/core";
import { RPC_URL, SFUEL_KEY } from "../config";

let primarySigner = undefined;
const backgroundSigner = Wallet.createRandom().connect(new providers.JsonRpcProvider(RPC_URL));
const backgroundSigner2 = Wallet.createRandom().connect(new providers.JsonRpcProvider(RPC_URL));
const backgroundSigner3 = Wallet.createRandom().connect(new providers.JsonRpcProvider(RPC_URL));
const backgroundSigner4 = Wallet.createRandom().connect(new providers.JsonRpcProvider(RPC_URL));

async function getSFUEL() {
        await new Promise((resolve) => setTimeout(resolve, 0));
        await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.DISTRIBUTION_API_KEY
            },
            method: "POST",
            body: JSON.stringify({
                chain: SFUEL_KEY,
                platformId: process.env.PLATFORM_ID,
                address: backgroundSigner.address
            })
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
        await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.DISTRIBUTION_API_KEY
            },
            method: "POST",
            body: JSON.stringify({
                chain: SFUEL_KEY,
                platformId: process.env.PLATFORM_ID,
                address: backgroundSigner2.address
            })
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
        await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.DISTRIBUTION_API_KEY
            },
            method: "POST",
            body: JSON.stringify({
                chain: SFUEL_KEY,
                platformId: process.env.PLATFORM_ID,
                address: backgroundSigner3.address
            })
        });
        
        await new Promise((resolve) => setTimeout(resolve, 0));
        await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.DISTRIBUTION_API_KEY
            },
            method: "POST",
            body: JSON.stringify({
                chain: SFUEL_KEY,
                platformId: process.env.PLATFORM_ID,
                address: backgroundSigner4.address
            })
        });
        await new Promise((resolve) => setTimeout(resolve, 0));
}

(async() => {
    try {
        await getSFUEL();
    } catch (err) {
        console.log(err);
    }
})();

const unwatch = watchWalletClient(
    {
        chainId: 344106930,
    },
    (walletClient) => {
        if (walletClient) primarySigner = walletClient;
    }
);

export {
    primarySigner,
    backgroundSigner,
    backgroundSigner2,
    backgroundSigner3,
    backgroundSigner4,
    getSFUEL
}
