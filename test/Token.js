const { expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { ethers, network } = require("hardhat")
const { parseUnits, formatUnits } = require("ethers")

describe("Sample Token Contract", () => {
    async function deployFixtures() {
        /* Reset Hardhat local blockchain */
        await network.provider.send("hardhat_reset")

        /* First account from getSigners() is the deployer */
        const [deployer] = await ethers.getSigners()

        const sampleToken = await ethers.deployContract("SampleToken", [
            "Sample ERC20 Token",
            "SAMPLE",
            18,
            deployer.address
        ],{})
        await sampleToken.waitForDeployment()

        return {
            deployer,
            sampleToken
        }
    }


})
