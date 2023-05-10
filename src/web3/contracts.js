import GoldConfiguration from "../../contracts/deployments/calypso-staging-v3/Gold.json";
import { backgroundSigner } from "./signer";
import { Contract } from "ethers";

const gold = new Contract(GoldConfiguration.address, GoldConfiguration.abi, backgroundSigner);

export {
    gold
}