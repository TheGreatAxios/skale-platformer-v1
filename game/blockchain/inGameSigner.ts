import { createPublicClient, createWalletClient, http, webSocket } from "viem";
import { skaleNebula } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { Signal } from "@preact/signals-react";
import { distributeSFuel } from "./sfuel";

class InGameSigner {
    
    public nonce: number = 0;
    
    public client;
    public wallet;

    private __initializeClient() {
        return createPublicClient({
            chain: skaleNebula,
            transport: http()
          });
    }

    private __initializeWallet() {
        return createWalletClient({
            chain: skaleNebula,
            transport: webSocket("wss://mainnet.skalenodes.com/v1/ws/green-giddy-denebola"),
            account: privateKeyToAccount(generatePrivateKey())
          });
    }

    private async setupNonce() {
        // console.log(this.client);
        // const res = await this.client.getTransactionCount({ address: this.wallet.account.address, blockTag: "pending" });
        // console.log("Res: ", res);
    }

    constructor() {
        this.client = this.__initializeClient();
        this.wallet = this.__initializeWallet();
        this.setupNonce();
        distributeSFuel({ recipient: this.wallet.account.address });
    }
}

const inGameSigner = new Signal<InGameSigner>(new InGameSigner());

export {
    inGameSigner
}