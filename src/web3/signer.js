import { providers, Wallet } from "ethers";
import { watchWalletClient} from "@wagmi/core";
import { RPC_URL, SFUEL_KEY } from "../config";

let primarySigner = undefined;
const backgroundSigner = Wallet.createRandom().connect(new providers.JsonRpcProvider(RPC_URL));

async function getSFUEL() {
    await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.DISTRIBUTION_API_KEY
        },
        method: "POST",
        body: {
            chain: SFUEL_KEY,
            platformId: process.env.PLATFORM_ID,
            address: backgroundSigner.address
        }
    })
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
    getSFUEL
}
