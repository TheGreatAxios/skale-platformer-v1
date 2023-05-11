import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deployFunction: DeployFunction = async function(hre: HardhatRuntimeEnvironment) {

	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	await deploy(
		"Enemies",
		{
			from: deployer,
			log: true
		}
	)
}

export default deployFunction;

deployFunction.tags = ["primary", "avatar"];
