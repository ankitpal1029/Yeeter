import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction, DeployResult } from "hardhat-deploy/types";
import { network } from "hardhat";
import { developmentChains } from "../hardhat-helper-config";
// import { verify } from "../utils/verify";
import { ethers } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy, log } = deployments;

  const { deployer } = await getNamedAccounts();
  console.log(deployer);
  const chainId = network.config.chainId;

  const SocialMedia: DeployResult = await deploy("SocialMedia", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: network.name === "hardhat" ? 1 : 6,
  });

  log("------------------------------");
};
export default func;
func.tags = ["all", "socialmedia"];
