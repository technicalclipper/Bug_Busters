require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

module.exports = {

solidity: "0.8.28",

networks: {

goerli: {

url: process.env.ALCHEMY_API_URL,

accounts: [process.env.PRIVATE_KEY],

},

},

};