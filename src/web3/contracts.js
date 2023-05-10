import GoldConfiguration from "../../contracts/deployments/calypso-staging-v3/Gold.json";
import { backgroundSigner } from "./signer";
import { Contract } from "ethers";
import { getAccount } from "@wagmi/core";
import { providers, utils } from "ethers";

let nonce = 0;

(async() => {
    const provider = new providers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar")
    nonce = await provider.getTransactionCount(backgroundSigner.address);
})();

const gold = new Contract(GoldConfiguration.address, GoldConfiguration.abi, backgroundSigner);

async function collectGold() {
    const _nonce = nonce;
    nonce++;
    const { address } = getAccount();
    await gold.publicMint(utils.isAddress(address) ? address : constants.AddressZero, {
        nonce: _nonce,
        gasLimit: 50000
    });
    
}


export {
    collectGold
}