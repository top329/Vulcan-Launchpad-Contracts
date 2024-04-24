import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  /////Early Liquidity
  const DEW = await ethers.getContractFactory("CryptoSI");
  const token = await DEW.deploy();
  console.log("DEW address:", await token.getAddress());
  //https://sepolia.etherscan.io/address/0x0a86feB19b48Ad6ACDf1A476b4757A1abc3Ee82a#code
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
