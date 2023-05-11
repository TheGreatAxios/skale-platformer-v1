import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";  
import "@nomiclabs/hardhat-etherscan";      /// etherscan
import "hardhat-deploy";                    /// deploy
import "hardhat-deploy-ethers";             /// yarn run hardhat deploy
import "hardhat-contract-sizer";            /// yarn run contract-sizer
import '@primitivefi/hardhat-dodoc';        /// 
import "@typechain/hardhat";                /// yarn hardhat prepare-package
import "hardhat-packager";                  /// yarn hardhat prepare-package
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

task("update-uri", "Update URI on ERC-1155")
  .addParam("name", "Contract Name")
  .addParam("uri", "New URI")
  .setAction(async(taskArgs, hre) => {
    const config = await hre.deployments.get(taskArgs.name);
    const [ signer ] = await hre.ethers.getSigners();
    const contract = new hre.ethers.Contract(config.address, config.abi, signer);

    await contract.setURI(taskArgs.uri);
  })


const config: HardhatUserConfig = {
  solidity: "0.8.9",
  namedAccounts: {
    deployer: 0 
  },
  networks: {
    "calypso-staging-v3": {
      url: "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar",
      accounts: [(process.env.PRIVATE_KEY as string)]
    },
    calypso: {
      url: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague",
      accounts: [(process.env.PRIVATE_KEY as string)]
    }
  },
  etherscan: {
    apiKey: {
      "calypso-staging-v3": "does-not-matter",
      "calypso": "does-not-matter"
    },
    customChains: [
      {
        network: "calypso-staging-v3",
        chainId: 344106930,
        urls: {
          apiURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com/api",
          browserURL: "https://staging-utter-unripe-menkar.explorer.staging-v3.skalenodes.com"
        }
      },
      {
        network: "calypso",
        chainId: 1564830818,
        urls: {
            apiURL: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com/api",
            browserURL: "https://honorable-steel-rasalhague.explorer.mainnet.skalenodes.com"
        }
      }
    ]
  },
  packager: {
    contracts: ["Gold", "Avatar"]
  }
};

export default config;