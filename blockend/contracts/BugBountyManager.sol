// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BugBountyManager {
    struct Bounty {
        address projectOwner;
        address contractAddress; 
        uint256 rewardAmount;    
        bool isActive;           
    }

    uint256 public bountyCounter;
    mapping(uint256 => Bounty) public bounties; 

    event BountyCreated(uint256 bountyId, address indexed owner, address indexed contractAddress, uint256 rewardAmount);
    event BountyClosed(uint256 bountyId, address indexed hunter, uint256 rewardPaid);

    modifier onlyOwner(uint256 bountyId) {
        require(msg.sender == bounties[bountyId].projectOwner, "Not bounty owner");
        _;
    }

    // User creates a new bounty
    function createBounty(address _contractAddress) external payable returns (uint256) {
        require(msg.value > 0, "Must deposit some reward");
        bountyCounter++;

        bounties[bountyCounter] = Bounty({
            projectOwner: msg.sender,
            contractAddress: _contractAddress,
            rewardAmount: msg.value,
            isActive: true
        });

        emit BountyCreated(bountyCounter, msg.sender, _contractAddress, msg.value);
        return bountyCounter;
    }

    // AI Agent approves a bug report and pays hunter
    function approveBug(uint256 bountyId, address payable hunter) external {
        

        Bounty storage bounty = bounties[bountyId];
        require(bounty.isActive, "Bounty closed");
        require(address(this).balance >= bounty.rewardAmount, "Insufficient funds");

        bounty.isActive = false; 
        uint256 reward = bounty.rewardAmount;
        bounty.rewardAmount = 0;

        (bool success, ) = hunter.call{value: reward}("");
        require(success, "Payment failed");

        emit BountyClosed(bountyId, hunter, reward);
    }

    // Project owner can cancel bounty and withdraw 
    function cancelBounty(uint256 bountyId) external onlyOwner(bountyId) {
        Bounty storage bounty = bounties[bountyId];
        require(bounty.isActive, "Already closed");

        bounty.isActive = false;
        uint256 refund = bounty.rewardAmount;
        bounty.rewardAmount = 0;

        (bool success, ) = bounty.projectOwner.call{value: refund}("");
        require(success, "Refund failed");
    }

    // View function to list all active bounties 
    function getBounty(uint256 bountyId) external view returns (Bounty memory) {
        return bounties[bountyId];
    }

    
    receive() external payable {}
}
