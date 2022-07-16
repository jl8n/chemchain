import { ethers } from "hardhat";

async function foo() {
  const greeting = "what the fuck is up";
  const G = await ethers.getContractFactory("Greeter");
  const g = await G.deploy(greeting);
  await g.deployed();
  console.log("I don't know what I'm doing:", g.address);
}

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;


  // Parse the etherString representation of ether into a BigNumber instance of the amount of wei
  const lockedAmount = ethers.utils.parseEther("1");

  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

  await lock.deployed();

  console.log("Lock with 1 ETH deployed to:", lock.address);
  foo();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
