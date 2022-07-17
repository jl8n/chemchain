import { ethers } from "hardhat";

async function foo() {
  const greeting = "what the fuck is up";
  const G = await ethers.getContractFactory("Greeter");
  const g = await G.deploy(greeting);
  await g.deployed();
  console.log("I don't know what I'm doing:", g.address);
}


async function main() {
  foo();

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
