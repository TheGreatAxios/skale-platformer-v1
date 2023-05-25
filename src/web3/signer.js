import { providers, Wallet } from "ethers";
import { watchWalletClient} from "@wagmi/core";
import { RPC_URL, SFUEL_KEY } from "../config";
import { NonceManager } from "@ethersproject/experimental";

let wallets = [];
let signers = [];

let primarySigner = undefined;

async function getSFUEL() {
    
    for (let i = 0; i < 10; i++) {
        wallets.push(Wallet.createRandom().connect(new providers.JsonRpcProvider(RPC_URL)));
    }

    const res = await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.DISTRIBUTION_API_KEY
        },
        method: "POST",
        body: JSON.stringify({
            chain: SFUEL_KEY,
            platformId: process.env.PLATFORM_ID,
            address: wallets[0].address
        })
    });

    for (let i = 1; i < signers.length; i++) {
        await wallets[0].sendTransaction({
            to: wallets[i].address,
            value: "0.000005",
            nonce: i - 1
        });
    }

    signers = wallets.map((w) => new NonceManager(w));
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
    signers,
    getSFUEL
}
