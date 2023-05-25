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
    backgroundSigner,
    // backgroundSigner2,
    // backgroundSigner3,
    // backgroundSigner4
} from "./signer";
import Queue from "../queue";
import { Contract } from "ethers";
import { getAccount } from "@wagmi/core";
import { providers, utils, BigNumber } from "ethers";
import { RPC_URL } from "../config";
import game from "../game";

let goldIter = 0;
let enemyIter = 0;

let nonce = 0;
// let nonce2 = 0;
// let nonce3 = 0;
// let nonce4 = 0;

let queue = [];

const provider = new providers.JsonRpcProvider(RPC_URL);

async function initialize() {
    nonce = await provider.getTransactionCount(backgroundSigner.address);
    // [nonce, nonce2, nonce3, nonce4] = await Promise.all([
        // provider.getTransactionCount(backgroundSigner.address),
        // provider.getTransactionCount(backgroundSigner2.address),
        // provider.getTransactionCount(backgroundSigner3.address),
        // provider.getTransactionCount(backgroundSigner4.address),
    // ])

    const { address } = getAccount();
    game.data.gold.balance = parseInt(utils.formatEther(await gold.balanceOf(address)))
}



const gold = new Contract(GoldConfiguration.address, GoldConfiguration.abi, backgroundSigner);
// const gold2 = new Contract(GoldConfiguration.address, GoldConfiguration.abi, backgroundSigner2);

const enemies = new Contract(EnemiesConfiguration.address, EnemiesConfiguration.abi, backgroundSigner);
// const enemies2 = new Contract(EnemiesConfiguration.address, EnemiesConfiguration.abi, backgroundSigner4);

// function getGoldNonce(iter) {
//     if (iter % 2 === 0) {
//         const _nonce = nonce;
//         nonce++;
//         return _nonce;
//     } else {
//         const _nonce = nonce2;
//         nonce2++;
//         return _nonce;
//     }   
// }

// function getEnemyNonce(iter) {
//     if (iter % 2 === 0) {
//         const _nonce = nonce3;
//         nonce3++;
//         return _nonce;
//     } else {
//         const _nonce = nonce4;
//         nonce4++;
//         return _nonce;
//     }   
// }

function getNonce() {
    const _nonce = nonce;
    nonce++;
    return _nonce;
}

async function collectGold() {

    const { address } = getAccount();
    // const _nonce = getNonce();
    // let _contract = goldIter % 2 === 0 ? gold : gold2;
    // let _signer = goldIter % 2 === 0 ? backgroundSigner : backgroundSigner2;
    // goldIter++;
    
    // await _contract.publicMint(utils.isAddress(address) ? address : constants.AddressZero, {
    //     nonce: _nonce
    // });
    queue.push({
        to: gold.address,
        data: gold.interface.encodeFunctionData(
            "publicMint",
            [utils.isAddress(address) ? address : constants.AddressZero]
        )
    });

    // await new Promise((resolve) => setTimeout(resolve, 0));
}

async function destroyEnemy(tokenId) {

    const { address } = getAccount();
    // const _nonce = getNonce();
// ?    let _signer = enemyIter % 2 === 0 ? backgroundSigner3 : backgroundSigner4;
    // enemyIter++;

    // await new Promise((resolve) => setTimeout(resolve, 0));

    queue.push({
        to: enemies.address,
        data: enemies.interface.encodeFunctionData(
            "destroy",
            [BigNumber.from(tokenId), utils.isAddress(address) ? address : constants.AddressZero]
        )
    })    ;

    // await _contract.destroy(BigNumber.from(tokenId), utils.isAddress(address) ? address : constants.AddressZero, {
    //     nonce: _nonce
    // });
}


async function updateBalances(game) {
    const { address } = getAccount();

    setTimeout(async() => {
        const balance = await gold.balanceOf(address);
        game.data.gold.balance = parseInt(utils.formatEther(balance));
    }, 1000);
}

async function broadcast() {
    const length = queue.length;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            const tx = queue[0];
            delete queue[0];
            await backgroundSigner.sendTransaction({
                ...tx,
                nonce: getNonce()
            });
            await new Promise((resolve) => setTimeout(resolve, 0));
        }
    }
    await broadcast();
}

export {
    collectGold,
    destroyEnemy,
    updateBalances
}


initialize();
broadcast();