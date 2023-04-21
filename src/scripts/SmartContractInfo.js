// To add:
// 1. Use a dict for contract_address for different networks, and use the network as a Context variable




//--------------------------------------------------------------------------------------------------
//# Smart Contract Info - fill out this with your smart contract's information

const contract_address_dict = {'mainnet': '',
                               'goerli': '',
                               'filecoin': ''};

//Used for triggered network switching or if the network is not specified
const default_network = 'goerli';





//--------------------------------------------------------------------------------------------------
//# Functions to Fetch Data

export async function getSmartContractAddress(network_name) {
    if (!network_name) {
        network_name = default_network;
    }
    return contract_address_dict[network_name];
}



export default async function getSmartContractInfo() {
    //code
    let shit = 'balls';
    //return contract_address, json_ABI
}