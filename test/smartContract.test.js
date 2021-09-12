const { assert } = require("chai");

const SmartContract = artifacts.require("./MoonRockets.sol");

require("chai").use(require("chai-as-promised")).should();

contract("MoonRockets", (accounts) => {
  let smartContract;

  before(async () => {
    smartContract = await SmartContract.deployed();
  });

  describe("smartContract deployment", async () => {
    it("deploys successfully", async () => {
      const address = await smartContract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
    });

    it("has correct name", async () => {
      const name = await smartContract.name();
      assert.equal(name, "MoonRockets");
    });
  });

  describe("minting", async () => {
    it("minted successfully", async () => {
      const uri ="https://example.com"
      await smartContract.mintNFT(accounts[0], uri);
      const tokenUri = await smartContract.tokenURI(0);
      const balanceOfOwner = await smartContract.balanceOf(accounts[0])
      assert.equal(tokenUri, uri)
      assert.equal(balanceOfOwner, 1)
    });
  })
});
