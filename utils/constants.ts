import socialMediaLocalDeployments from "../utils/deployments/localhost/SocialMedia.json";
import socialMediaTestNetDeployments from "../utils/deployments/rinkeby/SocialMedia.json";

export const socialMediaContract =
  process.env.NODE_ENV === "development"
    ? socialMediaLocalDeployments.abi
    : socialMediaTestNetDeployments.abi;
export const socialMediaAddress =
  process.env.NODE_ENV === "development"
    ? socialMediaLocalDeployments.address
    : socialMediaTestNetDeployments.address;
