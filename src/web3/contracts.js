/** Testnet **/

// import AvatarsConfiguration from "../../contracts/deployments/calypso-staging-v3/Avatars.json";
import EnemiesConfiguration from "../../contracts/deployments/calypso-staging-v3/Enemies.json";
import GoldConfiguration from "../../contracts/deployments/calypso-staging-v3/Gold.json";
import MulticallConfiguration from "../../contracts/deployments/calypso-staging-v3/Multicall3.json";
/** Mainnet **/
// import AvatarsConfiguration from "../../contracts/deployments/nebula-mainnet/Avatars.json";
// import EnemiesConfiguration from "../../contracts/deployments/nebula-mainnet/Enemies.json";
// import GoldConfiguration from "../../contracts/deployments/nebula-mainnet/Gold.json";
// import MulticallConfiguration from "../../contracts/deployments/nebula-mainnet/Multicall3.json";

import { backgroundSigner, primarySigner } from "./signer";
import { Contract } from "ethers";
import { getAccount } from "@wagmi/core";
import { providers, utils, BigNumber } from "ethers";
import game from "../game";

let nonce = 0;

const provider = new providers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar");

(async() => {
    nonce = await provider.getTransactionCount(backgroundSigner.address);

    setTimeout(async() => {
        const { address } = getAccount();
        if (address) {
            game.data.gold.balance = parseInt(utils.formatEther(await gold.balanceOf(address)))
        }
    }, 750)
})();

const gold = new Contract(GoldConfiguration.address, GoldConfiguration.abi, backgroundSigner);
// const avatars = new Contract(AvatarsConfiguration.address, AvatarsConfiguration.abi, backgroundSigner);
const enemies = new Contract(EnemiesConfiguration.address, EnemiesConfiguration.abi, backgroundSigner);

async function collectGold() {

    const { address } = getAccount();
    const _nonce = nonce;
    nonce++;

    await gold.publicMint(utils.isAddress(address) ? address : constants.AddressZero, {
        nonce: _nonce
    });
}

async function destroyEnemy(tokenId) {

    console.log("Destroy");

    const { address } = getAccount();
    const _nonce = nonce;
    nonce++;

    await enemies.destroy(BigNumber.from(tokenId), utils.isAddress(address) ? address : constants.AddressZero, {
        nonce: _nonce
    });

}


async function updateBalances(game) {
    const { address } = getAccount();

    const balance = await gold.balanceOf(address);
    game.data.gold.balance = parseInt(utils.formatEther(balance));
}


export {
    collectGold,
    destroyEnemy,
    updateBalances
}
