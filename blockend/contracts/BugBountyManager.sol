// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BugBountyManager {
    struct Bounty {
        uint256 bountyId;
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

    // Create a new bounty
    function createBounty(address _contractAddress) external payable returns (uint256) {
        require(msg.value > 0, "Must deposit some reward");
        bountyCounter++;

        bounties[bountyCounter] = Bounty({
            bountyId: bountyCounter,
            projectOwner: msg.sender,
            contractAddress: _contractAddress,
            rewardAmount: msg.value,
            isActive: true
        });

        emit BountyCreated(bountyCounter, msg.sender, _contractAddress, msg.value);
        return bountyCounter;
    }

    // AI Agent approves bug and pays hunter
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

    // Owner cancels bounty
    function cancelBounty(uint256 bountyId) external onlyOwner(bountyId) {
        Bounty storage bounty = bounties[bountyId];
        require(bounty.isActive, "Already closed");

        bounty.isActive = false;
        uint256 refund = bounty.rewardAmount;
        bounty.rewardAmount = 0;

        (bool success, ) = bounty.projectOwner.call{value: refund}("");
        require(success, "Refund failed");
    }

    // View single bounty
    function getBounty(uint256 bountyId) external view returns (Bounty memory) {
        return bounties[bountyId];
    }

    // View all active bounties
    function getAllBounties() external view returns (Bounty[] memory) {
        uint256 activeCount = 0;

        // First pass: count active bounties
        for (uint256 i = 1; i <= bountyCounter; i++) {
            if (bounties[i].isActive) {
                activeCount++;
            }
        }

        Bounty[] memory activeBounties = new Bounty[](activeCount);
        uint256 index = 0;

        // Second pass: populate array
        for (uint256 i = 1; i <= bountyCounter; i++) {
            if (bounties[i].isActive) {
                activeBounties[index] = bounties[i];
                index++;
            }
        }

        return activeBounties;
    }

    function getBountyCounter() external view returns (uint256) {
    return bountyCounter;
    }

    receive() external payable {}
}
