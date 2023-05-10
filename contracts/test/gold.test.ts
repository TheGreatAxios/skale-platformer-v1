import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Gold", function () {
  async function deploy() {
    const [ signer ] = await ethers.getSigners();

    const factory = await ethers.getContractFactory("Gold");
    const gold = await factory.deploy();
    await gold.deployed();

    return { gold, signer };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { gold, signer } = await loadFixture(deploy);
    });
  });
});
