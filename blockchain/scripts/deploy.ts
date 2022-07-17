import { ethers } from "hardhat";
import config from '../hardhat.config';
import { readFileSync, writeFileSync, promises as fsPromises } from 'fs';
import { join } from 'path';


async function foo() {
  const greeting = "what the fuck is up";
  const G = await ethers.getContractFactory("Greeter");
  const g = await G.deploy(greeting);
  await g.deployed();
  console.log("Smart Contract Address:", g.address);

  // write address to file for front-end to read

  const artifactDir = config.paths?.artifacts;

  await fsPromises.writeFile(
    join(artifactDir!, 'smart-contract.json'),
    JSON.stringify({ address: g.address }),
    { flag: 'w' });
}


async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

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
