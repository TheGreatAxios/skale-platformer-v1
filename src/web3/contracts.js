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

import { 
    backgroundSigner
} from "./signer";
import { Contract } from "ethers";
import { getAccount } from "@wagmi/core";
import { utils, BigNumber } from "ethers";

let nonce = 0;



const gold = new Contract(GoldConfiguration.address, GoldConfiguration.abi, backgroundSigner);

const enemies = new Contract(EnemiesConfiguration.address, EnemiesConfiguration.abi, backgroundSigner);

async function collectGold() {

    const { address } = getAccount();
    await gold.publicMint(utils.isAddress(address) ? address : constants.AddressZero);
}

async function destroyEnemy(tokenId) {

    const { address } = getAccount();

    await enemies.destroy(BigNumber.from(tokenId), utils.isAddress(address) ? address : constants.AddressZero);
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