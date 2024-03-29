/** Testnet **/

// import AvatarsConfiguration from "../../contracts/deployments/calypso-staging-v3/Avatars.json";
// import EnemiesConfiguration from "../../contracts/deployments/calypso-staging-v3/Enemies.json";
// import GoldConfiguration from "../../contracts/deployments/calypso-staging-v3/Gold.json";
// import MulticallConfiguration from "../../contracts/deployments/calypso-staging-v3/Multicall3.json";
/** Mainnet **/
// import AvatarsConfiguration from "../../contracts/deployments/nebula/Avatars.json";
import EnemiesConfiguration from "../../contracts/deployments/nebula/Enemies.json";
import GoldConfiguration from "../../contracts/deployments/nebula/Gold.json";
// import MulticallConfiguration from "../../contracts/deployments/nebula-mainnet/Multicall3.json";

import { backgroundSigner } from "./signer";
import { Contract } from "ethers";
import { getAccount } from "@wagmi/core";
import { providers, utils, BigNumber } from "ethers";
import { RPC_URL } from "../config";
import game from "../game";

const provider = new providers.JsonRpcProvider(RPC_URL);
const { address } = getAccount();

(async() => {
    game.nonce = await provider.getTransactionCount(backgroundSigner.address);

    setTimeout(async() => {
        const { address } = getAccount();
        if (address) {
            game.data.gold.balance = parseInt(utils.formatEther(await gold.balanceOf(address)))
        }
    }, 750)
})();

const gold = new Contract(GoldConfiguration.address, GoldConfiguration.abi, backgroundSigner);
const enemies = new Contract(EnemiesConfiguration.address, EnemiesConfiguration.abi, backgroundSigner);

async function write(contractName, tokenId = null) {
    let contract = contractName === "gold" ? gold : enemies;
    await backgroundSigner.sendTransaction({
        to: contract.address,
        data: contract.interface.encodeFunctionData(
            contractName === "gold" ? "publicMint": "destroy",
            contractName === "gold" ? [address] : [BigNumber.from(tokenId), address]
        ),
        nonce: game.nonce++
    });
}

async function collectGold() {

    // const { address } = getAccount();
    // const _nonce = nonce;
    // nonce++;

    // gold.publicMint(utils.isAddress(address) ? address : constants.AddressZero, {
    //     nonce: _nonce
    // });
    await write("gold");
}

async function destroyEnemy(tokenId) {

    // const { address } = getAccount();
    // const _nonce = nonce;
    // nonce++;

    // enemies.destroy(BigNumber.from(tokenId), utils.isAddress(address) ? address : constants.AddressZero, {
    //     nonce: _nonce
    // });
    //
    await write("enemies", tokenId);

}


async function updateBalances(game) {
    const { address } = getAccount();

    setTimeout(async() => {
        const balance = await gold.balanceOf(address);
        game.data.gold.balance = parseInt(utils.formatEther(balance));
    }, 1000);
}

export {
    collectGold,
    destroyEnemy,
    updateBalances
}
