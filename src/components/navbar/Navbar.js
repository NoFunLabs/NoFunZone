import React, { useState } from 'react'

//import { ReactComponent as MobileMenu } from '../../icons/MobileMenu.svg'
//import { ReactComponent as Close } from '../../icons/Close.svg'
//import { ReactComponent as Logo } from '../../icons/AlchmLogo.svg'

import logo from '../../image/logo.png'

import walletButton from '../../image/button_4x1.png'

//import header1 from '../../image/header1.png'
//import header2 from '../../image/header2.png'

import { FormatTypes, Interface } from "@ethersproject/abi";

import './navbar.css'

// Recenty added for user_icon

import fire_1_icon from '../../image/LMNTLfire1.png';
import fire_2_icon from '../../image/LMNTLfire2-icon.png';
import water_1_icon from '../../image/LMNTLwater1.png';
import water_2_icon from '../../image/LMNTLwater2-icon.png';
import air_1_icon from '../../image/LMNTLair1.png';
import air_2_icon from '../../image/LMNTLair2-icon.png';
import earth_1_icon from '../../image/LMNTLearth1.png';
import earth_2_icon from '../../image/LMNTLearth2-icon.png';


const { ethers } = require("ethers");

let address, signer, provider;

let network = 'Goerli';

var onLoadExecuted = false;

var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile = true;
};

//Recently Added

let contractName = 'LMNTL';

let contractAddressList = {'Mainnet': '',
                           'Goerli': '0xE914eCA2a17f7d402a5095fF44c92ECCCD26F912',
                           'Hyperspace': '0xB4fECac2F5BdEc2eD15547cF857464c8691b9849'}
let contractAddress = contractAddressList[network];

let jsonAbiList = {'Mainnet': `[]`,
                   'Goerli': `[
                    
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
                          "internalType": "uint8",
                          "name": "",
                          "type": "uint8"
                        }
                      ],
                      "name": "attributes",
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
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
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
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
                        }
                      ],
                      "name": "characters",
                      "outputs": [
                        {
                          "internalType": "uint8",
                          "name": "element",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
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
                          "internalType": "uint8",
                          "name": "",
                          "type": "uint8"
                        }
                      ],
                      "name": "elements",
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
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        }
                      ],
                      "name": "gainEXP",
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
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        }
                      ],
                      "name": "gainUserEXP",
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
                      "inputs": [
                        {
                          "internalType": "uint8",
                          "name": "num",
                          "type": "uint8"
                        }
                      ],
                      "name": "getAttribute",
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
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        }
                      ],
                      "name": "getCurrentLevel",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "currentLevel",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        }
                      ],
                      "name": "getCurrentStats",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "currentLevel",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint16",
                          "name": "fire",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "water",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "air",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "earth",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "charisma",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "creativity",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "cunning",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "patience",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint8",
                          "name": "num",
                          "type": "uint8"
                        }
                      ],
                      "name": "getElement",
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
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
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
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        }
                      ],
                      "name": "getPrimaryStats",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "element",
                          "type": "string"
                        },
                        {
                          "internalType": "uint16",
                          "name": "level",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
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
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserCurrentStats",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "currentLevel",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint16",
                          "name": "fire",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "water",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "air",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "earth",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "charisma",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "creativity",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "cunning",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "patience",
                          "type": "uint16"
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
                      "name": "getUserPrimaryStats",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "element",
                          "type": "string"
                        },
                        {
                          "internalType": "uint16",
                          "name": "level",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
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
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserTokenID",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "largestTokenId",
                          "type": "uint16"
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
                          "internalType": "uint8",
                          "name": "element",
                          "type": "uint8"
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
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
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
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
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
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
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
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint8",
                          "name": "element",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
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
                   
                   ]`,
                   'Hyperspace': `[
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
                          "name": "largestTokenId",
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
                  ]`}

const jsonAbi = jsonAbiList[network];


//Recently Added

var user_avatar = "";
var user_element = "";
var user_metadata = "";
var user_tokenID = "";
var user_primary_stats = [];
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

const elements = {0: 'Fire',
                1: 'Water',
                2: 'Air',
                3: 'Earth'};

const ipfs_prefixes = {
  Pinata: 'https://gateway.pinata.cloud/ipfs/',
  Infura: '',
  Filecoin: 'https://ipfs.io/ipfs/'
}
const network_ipfs_dict = {'Mainnet': 'Pinata',
                           'Goerli': 'Pinata',
                           'Hyperspace': 'Filecoin'};
var network_default_ipfs = network_ipfs_dict[network]
var ipfs_prefix = ipfs_prefixes[network_default_ipfs];

var image_uris, base_image_uri;
var base_image_uri = '';
if (network_default_ipfs === 'Filecoin') {
  image_uris = {'Fire': {1:'https://ipfs.io/ipfs/bafybeid2oy2tbsig674eh7n4kp4gqribvpr6ajodxokfhyzftl3il7troy/LMNTLfire1.png', 
                               2:'https://ipfs.io/ipfs/bafybeiaejbgk6zlz43r4fgubbxv5m3nveb23wt2mtywwqhaoj627vpf7xi/LMNTLfire2.png'},
                      'Water': {1:'https://ipfs.io/ipfs/bafybeihrxhmnywfxxv6jfe2adfbe22m4r56dfkpgksdn2fdbkdardxcjhu/LMNTLwater1.png',
                                2:'https://ipfs.io/ipfs/bafybeidmkzry7ycmrii5iaibbycocptpbm5x6xo7m5y3yvln3qzdw53xwi/LMNTLwater2.png'},
                      'Air':{1:'https://ipfs.io/ipfs/bafybeifxei46fbqxdcriqls6bb4bkvehqhs7ibbsx62mena3fisf73tk3a/LMNTLair1.png',
                             2:'https://ipfs.io/ipfs/bafybeihp5xj3ynypjsl2si2ve47bs4uydm6tvyxvljnbllyrobxom67hxa/LMNTLair2.png'},
                      'Earth': {1:'https://ipfs.io/ipfs/bafybeibh7cukho5d2i7gjtuophcw455wnzk5rvy5cp7dwva74izhwst46a/LMNTLearth1.png',
                                2:'https://ipfs.io/ipfs/bafybeicnog62bhxyinwq6f43pkalkr26ahcj3fjpl3nizg5deaaz7cruxm/LMNTLearth2.png'}}
} else if (network_default_ipfs === 'Pinata') {
  base_image_uri = 'QmPF4nrDbTnGk2UWduZDw2FCHZcF6HJicYDdsDAkEqJgH7';
  image_uris = {'Fire': {1:'/LMNTLfire1.png', 
                         2:'/LMNTLfire2.png'},
                'Water': {1:'/LMNTLwater1.png',
                          2:'/LMNTLwater2.png'},
                'Air':{1:'/LMNTLair1.png',
                       2:'/LMNTLair2.png'},
                'Earth': {1:'/LMNTLearth1.png',
                          2:'/LMNTLearth2.png'}}
}


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const Navbar = () => {

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

function handleConnectClick() {
  if (!isConnected) {connectWallet()}
  else {
    if (address) {
      window.location.href = window.location['origin'] + '/avatar';
    }
  }
}

async function connectWallet() {
  console.log('A');
  var count = 0;
  count++;
  console.log(count);
  provider = new ethers.providers.Web3Provider(window.ethereum);
  // Prompt user for account connections
  count++;
  console.log(count);
  if (provider) {
    await provider.send("eth_requestAccounts", []);
    count++;
    console.log(count);
    signer = provider.getSigner();
    count++;
    console.log(count);
    console.log(signer);
    setAddress( await signer.getAddress() );
    count++;
    console.log(count);
    let balance = await signer.getBalance();
    count++;
    console.log(count);
    console.log(await ethers.utils.formatEther(balance));
    count++;
    console.log(count);
  }
}




const handleMint = () => {}
const handleAbout = () => {}
const handleRoadmap = () => {
  var scroll = document.getElementsByClassName('roadmapBC')
  window.scroll({ behavior: 'smooth', top: scroll[0].offsetTop - 40 })
}
const handleTeam = () => {
  var scroll = document.getElementsByClassName('teamAnchor')
  window.scroll({ behavior: 'smooth', top: scroll[0].offsetTop - 40 })
}
const handleFaq = () => {
  var scroll = document.getElementsByClassName('faqScroll')
  window.scroll({ behavior: 'smooth', top: scroll[0].offsetTop + 20 })
}

// Recently Added
async function getUserMetadata() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  let userMetadata = await contract.getUserMetadata(address);
  return userMetadata;
}

async function updateUserStats() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  user_tokenID = await contract.getUserTokenID(address);
  user_primary_stats = await contract.getUserPrimaryStats(address);
  user_stats_list = await contract.getUserCurrentStats(address);
  user_element = capitalize(user_primary_stats[0]);
  
  user_stats['ID'] = parseInt(user_tokenID, 10);
  user_stats['Element'] = user_element;
  user_stats['Level'] = parseInt(user_stats_list[0], 10);
  user_stats['EXP'] = parseInt(user_stats_list[1], 10);
  user_stats['Image URI'] = user_primary_stats[3];
  user_stats['Fire'] = parseInt(user_stats_list[2], 10);
  user_stats['Water'] = parseInt(user_stats_list[3], 10);
  user_stats['Air'] = parseInt(user_stats_list[4], 10);
  user_stats['Earth'] = parseInt(user_stats_list[5], 10);
  user_stats['Charisma'] = parseInt(user_stats_list[6], 10);
  user_stats['Creativity'] = parseInt(user_stats_list[7], 10);
  user_stats['Cunning'] = parseInt(user_stats_list[8], 10);
  user_stats['Patience'] = parseInt(user_stats_list[9], 10);


  // Recently added for user_icon
  console.log(user_element, user_stats['Level'] % 2);
  user_icon = icon_dict[user_element][(2 - (user_stats['Level'] % 2))];
  console.log("User Icon: ", user_icon);
  const walletButtonImage = document.getElementById('navbarWalletButtonImage');
  walletButtonImage.src = user_icon;
  walletButtonImage.style.width = '12.5%';
  walletButtonImage.style.color = "var(--color-nfzorange)";
  walletButtonImage.style.border = 'solid';
  walletButtonImage.style.borderWidth = '5px 5px 5px 5px';
  walletButtonImage.style.borderRadius = '10px';
  document.getElementById('navbarWalletButtonText').textContent = '';
  
  

  console.log('User Stats: ', user_stats);
  return user_stats;
}


async function levelUp() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, signer);
  const previous_user_exp = user_stats['EXP'];

  user_primary_stats = await contract.getUserPrimaryStats(address);
  user_stats['Level'] = user_primary_stats[1];
  console.log('User Primary Stats: ', user_primary_stats);
  
  var imageURI = image_uris[user_stats['Element']][(user_stats['Level'] % 2) + 1];
  console.log('New Image URI: ', imageURI);

  const transactionInfo = await contract.levelUp(address, imageURI);

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
  while (previous_user_exp === user_stats['EXP']) {
    user_stats = await updateUserStats();
    pause(500);
  }
  user_metadata = await getUserMetadata();
  console.log("User Metadata: ", user_metadata);
  user_avatar = await setAvatarURI(user_metadata);
  document.getElementById('userAvatar').src = user_avatar;
}

async function setAvatarURI(user_metadata) {
  if (user_metadata) {
    if ('https://' !== user_metadata.substr(0, 8)) {
      user_avatar = ipfs_prefix + base_image_uri + user_metadata;
    } else {
      user_avatar = user_metadata;
    };
  } else {
    user_avatar = 'some_default_image'
  }
  console.log('User Avatar: ', user_avatar);
  return(user_avatar);
}



// Recently added for user_icon
var onLoadExecuted = false;
if (!onLoadExecuted) {
  onLoadExecuted = true;
  if (!isConnected) {
    connectWallet();
    updateUserStats();
  };
};

var user_icon = false;


const icon_dict = {'Fire': {1: fire_1_icon, 
                            2: fire_2_icon},
                  'Water': {1: water_1_icon,
                            2: water_2_icon},
                  'Air':{1: air_1_icon,
                         2: air_2_icon},
                  'Earth': {1: earth_1_icon,
                            2: earth_2_icon}}




return (
  <div className='navbar'>
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
    <div className='navbarContainer SlideRightAnimation'>
      <div className='navbarLeft'>
        <div id="navbarLogo" className='navbarLogo'>
          <a href={window.location['origin']}>
            <img className="navbarLogoImage" id="navbarLogoImage" src={logo} alt='Home' />
          </a>
        </div>
      </div>
      <div className='navbarCenter'>
        {/*<div className='navbarLogo'>
          <img src={logo} alt='' className='navbarBoxImage' />
        </div>*/}
        <div className='navbarButton' onClick={handleMint}>
          <a href={window.location['origin'] + '/module0'}>
            <div className='navbarButton1'>
              Lessons
            </div>
          </a>
        </div>
        <div className='navbarButton' onClick={handleAbout}>
          <a href={window.location['origin'] + '/avatar'}>
            <div className='navbarButton2'>
              Your NFTs
            </div>
          </a>
        </div>
        <div className='navbarButton' onClick={handleRoadmap}>
          <div className='navbarButton3'>
            About Us
          </div>
        </div>
        <div className='navbarButton' onClick={handleTeam}>
          <div className='navbarButton4'>
            Blog
          </div>
        </div>
        <div className='navbarButton' onClick={handleFaq}>
          <div className='navbarButton5'>
            Contact Us
          </div>
        </div>
      </div>
      <div className='navbarRight'>
        <div id="navbarWalletButton" className='navbarWalletButton' onClick={handleConnectClick}>
          <img id="navbarWalletButtonImage" className='navbarWalletButtonImage' src={walletButton} alt='Wallet Connect' />
          <div id="navbarWalletButtonText" className='navbarWalletButtonText'>{(isConnected) ? 'Wallet Connected' : 'Connect Wallet'}</div>
        </div>
      </div>
    </div>
  </div>
)
}


export default Navbar