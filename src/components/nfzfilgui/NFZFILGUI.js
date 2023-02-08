import React, { useState } from 'react'

import { FormatTypes, Interface } from "@ethersproject/abi";

import logo from '../../image/logo.png'

import './nfzfilgui.css'

const { ethers } = require("ethers");
const { utils } = require('ethers').utils;
const { BigNumber } = require('ethers').BigNumber;

let network = 'Hyperspace';

//E~ Added for creating OpenSea link
var openSeaPrefixes = {
  Mainnet: 'https://opensea.io/assets/ethereum/',
  Goerli: 'https://testnets.opensea.io/assets/goerli/'
}
let openSeaPrefix = openSeaPrefixes[network];
const openSeaLinkDelay = 8;

let address, signer, provider;
var mintButtonActive = true;

//E~ Update these variables manually according to the smart contract address of your NFT collection,
//   and the URI of the metadata to be minted as an NFT
const jsonAbi = `[
  {
  "inputs": [],
  "stateMutability": "nonpayable",
  "type": "constructor"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "account",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "operator",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
    }
  ],
  "name": "ApprovalForAll",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "operator",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256[]",
      "name": "ids",
      "type": "uint256[]"
    },
    {
      "indexed": false,
      "internalType": "uint256[]",
      "name": "values",
      "type": "uint256[]"
    }
  ],
  "name": "TransferBatch",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "address",
      "name": "operator",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "value",
      "type": "uint256"
    }
  ],
  "name": "TransferSingle",
  "type": "event"
},
{
  "anonymous": false,
  "inputs": [
    {
      "indexed": false,
      "internalType": "string",
      "name": "value",
      "type": "string"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }
  ],
  "name": "URI",
  "type": "event"
},
{
  "inputs": [],
  "name": "INTERFACE_ID_ERC1155",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address[]",
      "name": "accounts",
      "type": "address[]"
    },
    {
      "internalType": "uint256[]",
      "name": "ids",
      "type": "uint256[]"
    }
  ],
  "name": "balanceOfBatch",
  "outputs": [
    {
      "internalType": "uint256[]",
      "name": "",
      "type": "uint256[]"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "newImageURI",
      "type": "string"
    }
  ],
  "name": "changeImageURI",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "characters",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "level",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "exp",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "creativity",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "cunning",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "charisma",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "patience",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "fire",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "water",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "air",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "earth",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "imageURI",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  "name": "getMetadata",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  "name": "getStats",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "level",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "exp",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "creativity",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "cunning",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "charisma",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "patience",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "fire",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "water",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "air",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "earth",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_userAddress",
      "type": "address"
    }
  ],
  "name": "getUserMetadata",
  "outputs": [
    {
      "internalType": "string",
      "name": "metadataUri",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_userAddress",
      "type": "address"
    }
  ],
  "name": "getUserStats",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "level",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "exp",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "creativity",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "cunning",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "charisma",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "patience",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "fire",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "water",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "air",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "earth",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_userAddress",
      "type": "address"
    }
  ],
  "name": "getUserTokenID",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "account",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }
  ],
  "name": "isApprovedForAll",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_id",
      "type": "uint256"
    }
  ],
  "name": "isNonFungible",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "pure",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "_userAddress",
      "type": "address"
    },
    {
      "internalType": "string",
      "name": "imageURI",
      "type": "string"
    }
  ],
  "name": "levelUp",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "fire",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "water",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "air",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "earth",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "imageURI",
      "type": "string"
    }
  ],
  "name": "mint",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "nftCounter",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "_value",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "max",
      "type": "uint256"
    }
  ],
  "name": "random",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "randomInt",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256[]",
      "name": "ids",
      "type": "uint256[]"
    },
    {
      "internalType": "uint256[]",
      "name": "amounts",
      "type": "uint256[]"
    },
    {
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }
  ],
  "name": "safeBatchTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "from",
      "type": "address"
    },
    {
      "internalType": "address",
      "name": "to",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "amount",
      "type": "uint256"
    },
    {
      "internalType": "bytes",
      "name": "data",
      "type": "bytes"
    }
  ],
  "name": "safeTransferFrom",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    },
    {
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
    }
  ],
  "name": "setApprovalForAll",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "_tokenId",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "_metadata",
      "type": "string"
    }
  ],
  "name": "setMetadata",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "bytes4",
      "name": "interfaceId",
      "type": "bytes4"
    }
  ],
  "name": "supportsInterface",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "tokenMetadata",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "tokenOwners",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "level",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "exp",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "creativity",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "cunning",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "charisma",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "patience",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "fire",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "water",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "air",
      "type": "uint256"
    },
    {
      "internalType": "uint256",
      "name": "earth",
      "type": "uint256"
    }
  ],
  "name": "updateCharacter",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "uri",
  "outputs": [
    {
      "internalType": "string",
      "name": "",
      "type": "string"
    }
  ],
  "stateMutability": "view",
  "type": "function"
}
]`;
let contractAddress = '0x62c5136a268d7ddeE73Adbd292E5D5e64bbC279C';


//Recently Added

var user_avatar = "";
var user_metadata = "";
var user_element = "";
var user_stats = {'ID': 0,
                  'Level': 0,
                  'EXP': 0,
                  'Element': '',
                  'Fire': 0,
                  'Water': 0,
                  'Air': 0,
                  'Earth': 0,
                  'Charisma': 0,
                  'Creativity': 0,
                  'Cunning': 0,
                  'Patience': 0};
var user_stats_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const image_uris = {'fire': {1:'bafybeid2oy2tbsig674eh7n4kp4gqribvpr6ajodxokfhyzftl3il7troy', 
                             2:'bafybeiaejbgk6zlz43r4fgubbxv5m3nveb23wt2mtywwqhaoj627vpf7xi'},
                    'water': {1:'bafybeihrxhmnywfxxv6jfe2adfbe22m4r56dfkpgksdn2fdbkdardxcjhu', 
                              2:'bafybeidmkzry7ycmrii5iaibbycocptpbm5x6xo7m5y3yvln3qzdw53xwi'},
                    'air':{1:'bafybeifxei46fbqxdcriqls6bb4bkvehqhs7ibbsx62mena3fisf73tk3a', 
                             2:'bafybeihp5xj3ynypjsl2si2ve47bs4uydm6tvyxvljnbllyrobxom67hxa'},
                    'earth': {1:'bafybeibh7cukho5d2i7gjtuophcw455wnzk5rvy5cp7dwva74izhwst46a', 
                              2:'bafybeicnog62bhxyinwq6f43pkalkr26ahcj3fjpl3nizg5deaaz7cruxm'}}

const MintGUI = () => {

const [isConnected, toggleConnected] = useState(0);
const [isMinted, toggleMinted] = useState(0);  

const iface = new Interface(jsonAbi);
iface.format(FormatTypes.full);


function pause(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function setAddress(ethaddy) {
    address = ethaddy;
    if (address != null) {  toggleConnected ( !isConnected ); }
    console.log("Account:", address);
    //alert("Connected: " + address);
}

function handleMintClick(event) {
  user_element = event.target.textContent.split(" ")[1].toLowerCase();
  if (mintButtonActive) {
    if (!isConnected) {connectWallet()}
      else {mintNFT(user_element);
    }
  }
}

async function connectWallet() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  console.log(signer);
  setAddress( await signer.getAddress() );
  let balance = await signer.getBalance();
  console.log(await ethers.utils.formatEther(balance));
  user_metadata = await getUserMetadata();
  console.log(user_metadata);
  user_avatar = user_metadata;
  document.getElementById('userAvatar').src = user_metadata;
  user_stats = await getUserStats();
}


async function mintNFT(user_element) {
  const nftContract = new ethers.Contract(contractAddress, iface,signer);
  var transactionInfo;
  var imageURI = image_uris[user_element][1];
  if (user_element === 'fire') {
    transactionInfo = await nftContract.mint(1, 0, 0, 0, imageURI);
  } else if (user_element === 'water') {
    transactionInfo = await nftContract.mint(0, 1, 0, 0, imageURI);
  } else if (user_element === 'air') {
    transactionInfo = await nftContract.mint(0, 0, 1, 0, imageURI);
  } else if (user_element === 'earth') {
    transactionInfo = await nftContract.mint(0, 0, 0, 1, imageURI);
  }  
  toggleMinted ( !isMinted );
  console.log("Transaction info: ", transactionInfo);
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);
  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);
  document.getElementById('mintButton').textContent = "MINTING"
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      document.getElementById('mintButton').textContent = "MINTING"
      loop_count = 0;
    } else {
      document.getElementById('mintButton').insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }
  console.log("Mined transaction receipt: ", transactionReceipt);
  var wait_count = 0;
  while ( wait_count < (2 * openSeaLinkDelay) ) {
    await pause(500);
    if (loop_count > 3) {
      document.getElementById('mintButton').textContent = "MINTING"
      loop_count = 0;
    } else {
      document.getElementById('mintButton').insertAdjacentText('beforeEnd', '.');
    }
    loop_count+=1;
    wait_count+=1;
  }
  document.getElementById('mintButton').textContent = "MINT SUCCESS!"
  const tokenID = parseInt(transactionReceipt.logs[0].topics[3], 16);
  console.log("Token ID: ", tokenID);
  console.log("Transaction Info: ", transactionInfo);
  document.getElementById('openSeaLink').style.visibility = 'visible';
  //document.getElementById('openSeaLink').style.marginBottom = '-60px';
  document.getElementById('openSeaLink').href = openSeaPrefix + contractAddress + '/' + tokenID.toString();
  user_metadata = await getUserMetadata();
  console.log("User Metadata: ", user_metadata);
  user_avatar = user_metadata;
  document.getElementById('userAvatar').src = user_metadata;
  user_stats = await getUserStats();
}


// Recently Added
async function getUserMetadata() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  let userMetadata = await contract.getUserMetadata(address);
  return userMetadata;
}

async function getUserStats() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  user_stats_list = await contract.getUserStats(address);

  user_stats['ID'] = parseInt(user_stats_list[0], 16);
  user_stats['Level'] = parseInt(user_stats_list[1], 16);
  user_stats['EXP'] = parseInt(user_stats_list[2], 16);
  user_stats['Creativity'] = parseInt(user_stats_list[3], 16);
  user_stats['Cunning'] = parseInt(user_stats_list[4], 16);
  user_stats['Charisma'] = parseInt(user_stats_list[5], 16);
  user_stats['Patience'] = parseInt(user_stats_list[6], 16);
  user_stats['Fire'] = parseInt(user_stats_list[7], 16);
  user_stats['Water'] = parseInt(user_stats_list[8], 16);
  user_stats['Air'] = parseInt(user_stats_list[9], 16);
  user_stats['Earth'] = parseInt(user_stats_list[10], 16);
  
  const max_element_value = Math.max(user_stats['Fire'], user_stats['Water'], user_stats['Air'], user_stats['Earth']);
  if (user_stats['Fire'] === max_element_value) {
    user_element = 'fire';
  } else if (user_stats['Water'] === max_element_value) {
    user_element = 'water';
  } else if (user_stats['Air'] === max_element_value) {
    user_element = 'air';
  } else if (user_stats['Earth'] === max_element_value) {
    user_element = 'earth';
  };
  user_stats['Element'] = user_element;

  console.log('User Stats: ', user_stats);
  return user_stats;
}


async function levelUp() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, signer);
  const gasLimit = 1000000; // set gas limit in Gwei
  const gasPrice = ethers.BigNumber.from("1000000000"); // set gas price in wei
  const estimatedGas = await contract.estimateGas({
    to: contract.address,
    data: contract.interface.functions.levelUp.encode([address]),
    gasPrice: gasPrice
  });
  const finalGasLimit = gasLimit > estimatedGas ? gasLimit : estimatedGas;
  
  const transactionInfo = await contract.levelUp(address, image_uris[user_element][Math.min(user_stats['Level'] + 1)],
                        {gasPrice: gasPrice,
                         gasLimit: finalGasLimit});
                         
  console.log("Transaction info: ", transactionInfo);
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);
  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);
  document.getElementById('mintButton').textContent = "LEVELING"
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      document.getElementById('mintButton').textContent = "LEVELING"
      loop_count = 0;
    } else {
      document.getElementById('mintButton').insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }

  console.log("Mined transaction receipt: ", transactionReceipt);
  document.getElementById('mintButton').textContent = "LEVEL UP!"
  console.log("Transaction Info: ", transactionInfo);
  user_metadata = await getUserMetadata();
  console.log("User Metadata: ", user_metadata);
  user_avatar = user_metadata;
  document.getElementById('userAvatar').src = user_metadata;
  user_stats = await getUserStats();
}


return (
  <div className='mintgui'>
    {/* <div className='navbarMobile'>
      <div className='navbarCenterIcon'>
        <div className='navbarMobileTopRight '>MobileLeftTitle</div>
      </div>
    </div>
    <div className='navbarMobileButton'>
      <MobileMenu className={Mobile ? 'Mobile' : 'Mobile'} onClick={HandleMobileMenu} />
      <div className={Mobile ? 'navbarMobileContainerActive' : 'navbarMobileContainer'}>
        <div className={Mobile ? 'navbarMenu active' : 'navbarMenu'}>
          <div className='navbarMenuContainer'>
            <div className='navbarMobileTop'>
              <div className='navbarMobileTopRight menuOpen'>MobileMenuText</div>
              <div className='navbarMobileTopLeft'>
                <Close className='CloseIcon' onClick={HandleMobileMenu} />
              </div>
            </div>
            <div className='navbarMobileMain'>
              <div className='navbarCenterLink opacity7'>MobileMenuMiddleText</div>
              <div className='navbarCenterLink navbarRightButton'>MobileMenuButton</div>
            </div>
          </div>
        </div>
      </div>
    </div>*/}
    <div>
      <div className='navbarLogo SlideRightAnimation'>
        <img src={logo} alt='' className='navbarBoxImage' />
      </div>
    </div>

    <div className='navbarContainer SlideRightAnimation'>
      {/*<div className='navbarLeft'>
        <img src={header1} alt='' className='navbarBoxImage' />
      </div>*/}
      <div className='navbarCenter'>
        <div className='navbarBox'>
          <div className='navbarBoxTitle'>
            <span className='textHighlight'>Alchm</span>
          </div>
          <div className='navbarBoxSubTitle'>Astrology NFTs unique to you.<br></br>Own Your Alchemy.</div>

          <div id="mintButton" className='mintButton' onClick={getUserStats}>GET STATS</div>
          <div id="mintButton" className='mintButton' onClick={levelUp}>LEVEL UP</div>
          <div id="mintButton" className='mintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT FIRE' : 'CONNECT WALLET'}</div>
          <div id="mintButton" className='mintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT WATER' : 'CONNECT WALLET'}</div>
          <div id="mintButton" className='mintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT AIR' : 'CONNECT WALLET'}</div>
          <div id="mintButton" className='mintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT EARTH' : 'CONNECT WALLET'}</div>
          <a className='openSeaLink'
            id='openSeaLink'
            href='#'
            target="_blank"
            rel="noreferrer">
            {(isMinted) ? 'View on OpenSea ->' : ''}getUserStats
          </a>
        </div>
      </div>
    </div>
    <img id="userAvatar" className="userAvatar" src="" alt="LMNTL"></img>
  </div>
)
}


export default MintGUI
