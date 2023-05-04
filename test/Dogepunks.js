const { ethers } = require("hardhat");
const { assert, expect } = require("chai");

describe("Dogepunks", function () {
  let noteFactory, contract;

  beforeEach(async function () {
    testFactory = await ethers.getContractFactory("Dogepunks");
    contract = await testFactory.deploy();
  });

  it("Should mint 10 tokens", async function () {
    const mintAmount = 10;
    await contract.mint(mintAmount);
    const totalSupply = await contract.totalSupply();
    expect(mintAmount).to.be.equal(totalSupply);
  });

  it("Should revert if max mint limit reached", async function () {
    contract.mint(10);
    await expect(contract.mint(1)).to.be.revertedWith(
      "Exceeded the limit"
    );
  });
  it("Should revert if not enough tokens to withdraw", async function () {
    await expect(contract.withdraw()).to.be.revertedWith(
      "Not enough balance"
    );
  });

});