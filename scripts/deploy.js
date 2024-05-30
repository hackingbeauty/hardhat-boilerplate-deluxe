// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");
const hre = require("hardhat");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  const accountBalance = await deployer.provider.getBalance(deployer.address);
  
  console.log("------- Account balance: ", accountBalance);
  console.log("------- Deployer address is: ------- ", deployer.address);

  const sampleToken = await hre.ethers.deployContract("SampleToken", [
    "Sample Token",
    "ST",
    18,
    deployer.address
  ], {});
  await sampleToken.waitForDeployment();

  console.log('--- Deployed Contract address: ', sampleToken.target)
  
  // Also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(sampleToken);
}

function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", "frontend", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: token.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("SampleToken");

  fs.writeFileSync(
    path.join(contractsDir, "SampleToken.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
