// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

// This import is automatically injected by Remix
import "remix_tests.sol";

// This import is required to use custom transaction context
// Although it may fail compilation in 'Solidity Compiler' plugin
// But it will work fine in 'Solidity Unit Testing' plugin
import "remix_accounts.sol";
import "../contracts/Proposals.sol";

// File name has to end with '_test.sol', this file can contain more than one testSuite contracts
contract testSuite {
    Proposals proposalsTest;

    struct Proposal {
        address daoContractAddress;
        address owner;
        string id;
        Voter[] votersFor;
        Voter[] votersAgainst;
    }

    struct Voter {
        address voterAddress;
        uint256 weight; // weight is accumulated by delegation
        bool voted; // if true, that person already voted
    }

    /// 'beforeAll' runs before all other tests
    /// More special functions are: 'beforeEach', 'beforeAll', 'afterEach' & 'afterAll'
    function beforeAll() public {
        // <instantiate contract>
        proposalsTest = new Proposals();
    }

    function checkCreateProposals() public returns (bool) {
        // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        return
            Assert.equal(
                proposalsTest.createProposal("CID123"),
                true,
                "it didnt create the proposal"
            );
    }

    function checkGetAllProposals() public returns (bool) {
        // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        return
            Assert.equal(
                proposalsTest.getAllProposals(),
                [
                    "DocumentTemplate",
                    "Definition",
                    "RepAndWarranty",
                    "Restriction",
                    "Entitlement"
                ],
                "no proposals were returned"
            );
    }

    function checkGetProposal() public returns (bool) {
        // Use 'Assert' methods: https://remix-ide.readthedocs.io/en/latest/assert_library.html
        return
            Assert.equal(
                proposalsTest.getProposal(),
                Proposal({
                    daoContractAddress: "0xD533a949740bb3306d119CC777fa900bA034cd52",
                    owner: "0xD533a949740bb3306d119CC777fa900bA034cd52",
                    id: "cid123",
                    votersFor: [
                        Voter({
                            voterAddress: "0xD533a949740bb3306d119CC777fa900bA034cd52",
                            voted: true,
                            weight: 1
                        })
                    ],
                    votersAgainst: [
                        Voter({
                            voterAddress: "0xD533a949740bb3306d119CC777fa900bA034cd52",
                            voted: true,
                            weight: 1
                        })
                    ]
                }),
                "no proposal was returned"
            );
    }
}
