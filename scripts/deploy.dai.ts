import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  /////Early Liquidity
  const DAI = await ethers.getContractFactory("DAI");
  const token = await DAI.deploy(1000000000);
  console.log("DAI address:", await token.getAddress());
  //0xdc1a36bc15d5255Bb7061ec78e735e5C4dA4Ce5e#readContract
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
