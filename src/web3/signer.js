import { providers, Wallet } from "ethers";

const backgroundSigner = Wallet.createRandom().connect(new providers.JsonRpcProvider("https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar"));

(async() => {
    
    try {
        /// process.env.DISTRIBUTION_API
        const res = await fetch(process.env.DISTRIBUTION_API + "/sfuel", {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": process.env.DISTRIBUTION_API_KEY
            },
            method: "POST",
            body: {
                chain: "calypso-testnet",
                platformId: process.env.PLATFORM_ID,
                address: backgroundSigner.address
            }
        })
        console.log("RES: ", res)
    } catch (err) {
        console.log(err);
    }
})();

export {
    backgroundSigner
}