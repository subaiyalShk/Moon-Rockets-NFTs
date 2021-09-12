const SmartContract = artifacts.require("MoonRockets");

module.exports = function (deployer) {
  deployer.deploy(SmartContract);
};
