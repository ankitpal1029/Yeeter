import deepEqualInAnyOrder from "deep-equal-in-any-order";
import chai, { assert, expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { Address } from "hardhat-deploy/dist/types";
import { describe } from "mocha";
import { SocialMedia } from "../typechain";

chai.use(deepEqualInAnyOrder);

describe("Social Media", async () => {
  let SocialMedia: SocialMedia,
    deployer: Address,
    ipfsLink1: string,
    ipfsLink2: string;

  beforeEach(async () => {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    SocialMedia = await ethers.getContract("SocialMedia", deployer);
    ipfsLink1 = "bafyreig5eoi6wpgcktq5ymn2cwtifan62ouoymwtcdpfxdsv7rffeuueuy";
    ipfsLink2 = "bafyreiaw6pkwnaarieyeei5h4jrcgvaa4drodrtg7sqzdod6dhwwwqat4u";
  });

  describe("Appending posts", async () => {
    it("Should add a post and verify", async () => {
      const newPost = { posterAddress: deployer, ipfsLink: ipfsLink1 };
      await SocialMedia.post(newPost);
      const posts = await SocialMedia.allPosts();
      console.log(posts);
      const refactoredPost = {
        posterAddress: posts[0]["posterAddress"],
        ipfsLink: posts[0]["ipfsLink"],
      };
      expect(refactoredPost).to.deep.equalInAnyOrder(newPost);
    });
  });
});
