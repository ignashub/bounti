const { ethers, upgrades } = require("hardhat");
const { expect } = require("chai");

const setup = async () => {
  const Proposals = await ethers.getContractFactory("Proposals");
  const proposals = await Proposals.deploy();

  return proposals;
};

const objectId = "WAx6L1NB6oNW6yGgFoBZVty3";
const completeThreshold = 50;
const daoContractAddress = "0xD533a949740bb3306d119CC777fa900bA034cd52";

const emptyId = "";

const voterAddress = "0x5936a9f06aB60F397c79568864429A9347cC0462";

describe("Create Proposal", () => {
  it("revert because proposal already exists", async () => {
    const proposals = await setup();
    const createdProposal = await proposals.createProposal(
      objectId,
      completeThreshold,
      daoContractAddress
    );

    await expect(
      proposals.createProposal(emptyId, completeThreshold, daoContractAddress)
    ).to.be.revertedWith("The proposal already exists");
  });

  it("Should revert proposal because entered empty id", async () => {
    const proposals = await setup();

    await expect(
      proposals.createProposal(emptyId, completeThreshold, daoContractAddress)
    ).to.be.revertedWith("You have not entered proposal Id");
  });
});

describe("Get Proposal", () => {
  it("get proposal", async () => {
    const proposals = await setup();

    await expect(proposals.getProposal(objectId)).to.be.revertedWith(
      "The proposal does not exists"
    );
  });
});

describe("Voters", () => {
  it("get voter", async () => {
    const proposals = await setup();

    await expect(proposals.getVoter(objectId, voterAddress)).to.be.revertedWith(
      "Voter does not exists"
    );
  });

  it("vote for", async () => {
    const proposals = await setup();

    await expect(proposals.voteFor(objectId)).to.be.revertedWith(
      "The proposal does not exists"
    );

    const createdProposal = await proposals.createProposal(
      objectId,
      completeThreshold,
      daoContractAddress
    );

    await expect(proposals.voteFor(objectId)).to.be.revertedWith(
      "Voter already voted"
    );
  });

  it("vote against", async () => {
    const proposals = await setup();

    await expect(proposals.voteAgainst(objectId)).to.be.revertedWith(
      "The proposal does not exists"
    );

    const createdProposal = await proposals.createProposal(
      objectId,
      completeThreshold,
      daoContractAddress
    );

    await expect(proposals.voteAgainst(objectId)).to.be.revertedWith(
      "Voter already voted"
    );
  });

  it("voters for count", async () => {
    const proposals = await setup();

    await expect(proposals.votersForCount(objectId)).to.be.revertedWith(
      "The proposal does not exists"
    );
  });

  it("voters for count", async () => {
    const proposals = await setup();

    await expect(proposals.votersAgainstCount(objectId)).to.be.revertedWith(
      "The proposal does not exists"
    );
  });
});
