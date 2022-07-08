import socialMediaLocalDeployments from "../hardhat/deployments/localhost/SocialMedia.json";

export const socialMediaContract =
  process.env.NODE_ENV === "development" ? socialMediaLocalDeployments.abi : "";
export const socialMediaAddress =
  process.env.NODE_ENV === "development"
    ? socialMediaLocalDeployments.address
    : "";
