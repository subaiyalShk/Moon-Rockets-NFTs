# Lucky Coin 
## Proprietary Crypto Token 

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

In this project we will be creating a crypto token from scratch using Solidity to code the smart contract and then deploy to local testnet and Ropsten testnet.
## Project Features

- Transfer token to any wallet address on Ethereum
- Random rewards for buyers and holders
- login feature to access the platform using Decentralized ID

## Tech
To accomplish this we will leverage the following tools and technologies:
- [React.JS] - for the Frontend to interact with our smart contract
- [Hardhat.JS] which is a tool kit built for smart contract development and deployment.
- [Ethers.JS] and [Web3.JS] are usefull libraries we will be leveraging to communicate with our smart contract aswell as with MetaMask.

## Installation

>NodeJS [Node.js](https://nodejs.org/) v10+ to run.
>Ethers
>Hardhat
>@nomiclabs/hardhat-waffle
>chai for testing
>@nomiclabs/hardhat-ethers

Clone this project and cd into root folder.

```sh
cd dillinger
npm i
node app
```

## Development

#### Create React App
```sh
npx create-react-app client
cd client
```

#### Hardhat Ethereum development tooling
Basic configuration for Ethereum development. Creates a basic smart contract, deployment script and some more useful goodies right out the box.
```sh
npx create-react-app client
cd client
```