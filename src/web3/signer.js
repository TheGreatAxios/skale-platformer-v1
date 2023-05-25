import { providers, Wallet } from "ethers";
import { watchWalletClient} from "@wagmi/core";
import { RPC_URL, SFUEL_KEY } from "../config";
import { NonceManager } from "@ethersproject/experimental";

let primarySigner = undefined;
const wallet = Wallet.createRandom().connect(new providers.JsonRpcProvider(RPC_URL));
const backgroundSigner = new NonceManager(wallet);

async function getSFUEL() {
    console.log("Signer: ", backgroundSigner);
    await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.DISTRIBUTION_API_KEY
        },
        method: "POST",
        body: JSON.stringify({
            chain: SFUEL_KEY,
            platformId: process.env.PLATFORM_ID,
            address: wallet.address
        })
    });
}

(async() => {
    try {
        await getSFUEL();
    } catch (err) {
        console.log("Error Getting sFUEL: ", err);
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
