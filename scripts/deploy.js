const { ethers, run, network } = require("hardhat");

async function main() {
  const testFactory = await ethers.getContractFactory("Dogepunks");
  const contract = await testFactory.deploy();
  await contract.deployed();

  console.log(`Contract address ${contract.address}`);
  //console.log(network.config);

  if (network.config.chainId === 5) {
    contract.deployTransaction.wait(10);
    verify(contract.address, []);
  }
}

async function verify(contractAddress, arguments) {
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: arguments,
    });
  } catch (e) {
    if (e.message.includes("already verified")) {
      console.log("The contract already verified");
    } else {
      console.log(e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });