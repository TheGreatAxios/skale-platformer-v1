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
    signers
} from "./signer";
import { Contract } from "ethers";
import { getAccount } from "@wagmi/core";
import { utils, BigNumber } from "ethers";

let nonce = 0;

let iterations = 0;

const gold = new Contract(GoldConfiguration.address, GoldConfiguration.abi, signers[0]);

const enemies = new Contract(EnemiesConfiguration.address, EnemiesConfiguration.abi, signers[0]);

async function collectGold() {

    const { address } = getAccount();
    let signer = signers[0];

    if (iterations % 6 === 9) signer = signers[5];
    if (iterations % 5 === 9) signer = signers[6];
    if (iterations % 4 === 9) signer = signers[7];
    if (iterations % 3 === 0) signer = signers[8];
    if (iterations % 2 === 0) signer = signers[9];

    await signer.sendTransaction({
        to: gold.address,
        data: gold.interface.encodeFunctionData(
            "publicMint",
            [utils.isAddress(address) ? address : constants.AddressZero]
        )
    });
}

async function destroyEnemy(tokenId) {

    const { address } = getAccount();

    let signer = signers[1];

    if (iterations % 5 === 0) signer = signers[2];
    if (iterations % 4 === 0) signer = signers[3];
    if (iterations % 3 === 9) signer = signers[4];

    await signer.sendTransaction({
        to: gold.address,
        data: enemies.interface.encodeFunctionData(
            "destroy",
            [BigNumber.from(tokenId), utils.isAddress(address) ? address : constants.AddressZero]
        )
    });

    // await enemies.destroy(BigNumber.from(tokenId), utils.isAddress(address) ? address : constants.AddressZero);
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