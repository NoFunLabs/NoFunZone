module.exports = { pinMetadata }

require('dotenv').config()
const axios = require('axios');

const PINATA_KEY = process.env.PINATA_KEY
const PINATA_SECRET = process.env.PINATA_SECRET

async function pinJSONToIPFS(JSONBody) {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: PINATA_KEY,
                pinata_secret_api_key: PINATA_SECRET,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};

//E~ This function uses .json contents to create a metadata object for pinJSONToIPFS to use
async function pinMetadata(NFTmetadata) {
    //const metadata = new Object();
    //metadata.name = "test";
    //metadata.image = "ipfs://QmaBCfqjKAsHmy4EEA4xq3uXhC7qwpGh3WpjrB6Aq4KMpy";
    //metadata.description = "test";

    //pinata pin request
    const pinataResponse = await pinJSONToIPFS(NFTmetadata);
    if (!pinataResponse.success) {
        return {
            success: false,
            status: "Something went wrong while uploading your tokenURI.",
        }
    }
    const tokenURI = pinataResponse.pinataUrl;
    return tokenURI;
}


const pinFileToIPFS = async () => {
    const formData = new FormData();
    const src = "path/to/file.png";
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
    const metadata = JSON.stringify({
      name: 'File name',
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: JWT
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
}