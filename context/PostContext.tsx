import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { socialMediaAddress, socialMediaContract } from "../utils/constants";

declare global {
  interface Window {
    ethereum: any;
  }
}

interface IPostContext {
  connectWallet: () => void;
  connectedAccount: string;
  getSocialMediaContract: () => ethers.Contract;
  isLoading: boolean;
}

export const PostContext = createContext<IPostContext>({
  connectWallet: () => {},
  connectedAccount: "",
  getSocialMediaContract: () => {
    const { ethereum } = window;
    return new ethers.Contract(
      "0x0",
      socialMediaContract,
      new ethers.providers.Web3Provider(ethereum)
    );
  },
  isLoading: false,
});

export const usePostContext = () => useContext(PostContext);
export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [connectedAccount, setConnectedAccount] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const isWalletConnected = async () => {
    console.log("Checking if wallet connected...");
    if (!window.ethereum) {
      return alert("Please Install metamask");
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    try {
      if (!accounts.length) {
        setConnectedAccount(accounts[0]);
        console.log("calling it..");
      } else {
        console.log("No Accounts found");
      }
      console.log(accounts);
    } catch (error) {
      console.error(error);

      // throw new Error();
      console.log("No Ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please Install metamask");
        return;
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedAccount(accounts[0]);
      console.log("set account", accounts[0]);
    } catch (err) {
      console.warn(err);
      // throw new Error("No Ethereum object");
    }
  };

  const getSocialMediaContract = () => {
    console.log(window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const SocialMediaContract = new ethers.Contract(
      socialMediaAddress,
      socialMediaContract,
      signer
    );
    console.log({ SocialMediaContract });
    return SocialMediaContract;
  };

  useEffect(() => {
    isWalletConnected();
  }, []);
  return (
    <PostContext.Provider
      value={{
        connectWallet,
        connectedAccount,
        getSocialMediaContract,
        isLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
