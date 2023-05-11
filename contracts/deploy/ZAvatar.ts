import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunction: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();
	
	await deploy(
		"Avatar",
		{
			from: deployer,
			log: true,
			args: [
				(await deployments.get("Gold")).address
			]
		}
	)
}

export default deployFunction;

deployFunction.tags = ["primary", "avatar"];
