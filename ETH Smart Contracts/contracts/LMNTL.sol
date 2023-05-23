pragma solidity ^0.8.0;
import "../@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../@openzeppelin/contracts/utils/Counters.sol";
import "../@openzeppelin/contracts/interfaces/IERC721.sol";
import "../@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "../@openzeppelin/contracts/utils/math/Math.sol";




contract LMNTL is ERC1155 {
    using SafeMath for uint256;
    using SafeMath for uint16;
    using SafeMath for uint8;
    using Counters for Counters.Counter;

    string private _name = "LMNTL";
    string private _symbol = "LMNTL";

    string public constant INTERFACE_ID_ERC1155 = "0x780e9d63";

    mapping (address => uint16[]) public tokenOwners;

    mapping(address => uint16) public holderMainAvatars;

    // Allows for converting from an element int to an element or its corresponding stat
    mapping(uint8 => string) public elements;
    mapping(uint8 => string) public attributes;


    constructor() ERC1155(INTERFACE_ID_ERC1155) {
        _name = _name;
        _symbol = _symbol;

        // Initialize the token URI
        // _setURI("https://ipfs.io/ipfs/Qmc3L5TFsFoQqQBpUXLgtNwECXrPXU8MdA6TZV7ZEWkMmf");

         // Allows for converting from an element int to an element or its corresponding stat
        elements[0] = "fire";
        elements[1] = "water";
        elements[2] = "air";
        elements[3] = "earth";

        attributes[0] = "charisma";
        attributes[1] = "creativity";
        attributes[2] = "cunning";
        attributes[3] = "patience";
    }

    // Define the structure for character traits
    struct Character {
        uint8 element;
        uint256 exp;
        string metadataURI;
    }



    // Store the characters in a mapping
    mapping (uint16 => Character) public characters;


    // Create a counter for the NFTs
    Counters.Counter public nftCounter;
    

    // Readable functions for getting an NFT character's element or favored attribute
    function getElement(uint8 num) public view returns (string memory) {
        require(num < 4, "Number must be between 0 and 3.");
        return elements[num];
    }
    function getAttribute(uint8 num) public view returns (string memory) {
        require(num < 4, "Number must be between 0 and 3.");
        return attributes[num];
    }

    // Function to mint a new character NFT
    function mint(uint8 element, string memory metadataURI) public returns (uint16) {
        // Get the next NFT id
        nftCounter.increment();
        uint16 tokenID = uint16(nftCounter.current());

        tokenOwners[msg.sender].push(tokenID);

        // Mint the new NFT
        _mint(msg.sender, tokenID, 1, abi.encode(0));

        // Set the token URI for the NFT
        _setURI(metadataURI);


        // set the token metadata
        setMetadata(tokenID, metadataURI);


        // Store the character's properties with all stats starting at 0
        characters[tokenID] = Character({
            exp: 0,
            element: element,
            metadataURI: metadataURI
        });

    // Temporarily made automatic for testing
        // Set as the user's main avatar if they have no other LMNTLs
        //if (tokenOwners[msg.sender].length == 1) {
        //    setMainAvatar(msg.sender, tokenID);
        //}
        setMainAvatar(msg.sender, tokenID);

        // Return the current value of nftCounter
        return tokenID;
    }

    // Function to change the URI of a character NFT's image
    function changeImageURI(uint16 tokenID, string memory newMetadataURI) public {
        // Update the character's image URI
        characters[tokenID].metadataURI = newMetadataURI;

        // Update the token URI for the NFT
        _setURI(newMetadataURI);
    }

    // Function to change the base URI of all NFT metadata
    function changeBaseMetadataURI(string memory newMetadataURI) public {
        _setURI(newMetadataURI);
    }


    // Function to update the traits of a character
    function updateCharacter(uint16 tokenID, uint8 element, uint256 exp, string memory metadataURI) public {
        // Update the character's traits
        characters[tokenID].exp = exp;
        characters[tokenID].element = element;
        characters[tokenID].metadataURI = metadataURI;
    }

    function gainEXP(uint16 tokenID, uint256 exp) public returns (uint256) {
        characters[tokenID].exp += exp;
        return characters[tokenID].exp;
    }

    function gainUserEXP(address _userAddress, uint256 exp) public returns (uint256) {
        return(gainEXP(getUserTokenID(_userAddress), exp));
    }

    

    function levelUp(address _userAddress, string memory metadataURI) public {
        // Ensure that the NFT with the given id exists
        uint16 tokenID = getUserTokenID(_userAddress);

        // Set the token URI for the NFT
        //changeImageURI(id, imageURI);

        // set the token metadata
        setMetadata(tokenID, metadataURI);

        // Set the token URI for the NFT
        _setURI(metadataURI);

        // Declare temporary variables for character traits
        //uint256 level = characters[id].level;
        uint256 exp = characters[tokenID].exp;
        uint16 currentLevel = getCurrentLevel(tokenID);

        // Update the character's traits
        //level += 1;
        exp += ((2**(uint256(currentLevel - 1))) * 100);
        

        // Update the character's traits
        //characters[id].level = level;
        characters[tokenID].exp = exp;
        characters[tokenID].metadataURI = metadataURI;
    }

    // Functions for updating and getting the tokenMetadata
    mapping (uint16 => string) public tokenMetadata;





/*    function getUserTokenID(address _userAddress) public view returns (uint16 largestTokenId) {
        uint16[] memory tokenIds = tokenOwners[_userAddress];

        // Return 0 since the lowest tokenID in the entire collection is always 1
        if (tokenIds.length == 0) {
            return (0);
        }

        largestTokenId = tokenIds[0];
        for (uint16 i = 1; i < tokenIds.length; i++) {
            if (tokenIds[i] > largestTokenId) {
                largestTokenId = tokenIds[i];
            }
        }

        return(largestTokenId);
    }
*/

    function getUserTokenID(address _userAddress) public view returns (uint16 tokenID) {
        tokenID = holderMainAvatars[_userAddress];
        return(tokenID);
    }

    function getPrimaryStats(uint16 tokenID) public view returns (string memory element, uint16 level, uint256 exp, string memory metadataURI) {
        element = getElement(characters[tokenID].element);
        level = getCurrentLevel(tokenID);
        exp = characters[tokenID].exp;
        metadataURI = characters[tokenID].metadataURI; 
        return(element, level, exp, metadataURI);
    }

    function getCurrentLevel(uint16 tokenID) public view returns (uint16 currentLevel) {
        uint256 exp = characters[tokenID].exp;
        uint256 tnl = 100;
        currentLevel = 1;
        while (exp >= tnl) {
            currentLevel++;
            exp = exp - tnl;
            tnl = tnl * 2;
        }
        return(currentLevel);
    }

    function getCurrentStats(uint16 tokenID) public view returns (
      uint16 fire, uint16 water, uint16 air, uint16 earth,
      uint16 charisma, uint16 creativity, uint16 cunning, uint16 patience) {
        uint16 currentLevel = getCurrentLevel(tokenID);

        // Set base level 1 stats
        fire = 0;
        water = 0;
        air = 0;
        earth = 0;
        charisma = 0;
        creativity = 0;
        cunning = 0;
        patience = 0;
        if (characters[tokenID].element == 0) {
            fire += 3;
            earth += 2;
            air += 1;
            charisma++;
        } else if (characters[tokenID].element  == 1) {
            water += 3;
            air += 2;
            earth += 1;
            creativity++;
        } else if (characters[tokenID].element == 2) {
            air += 3;
            water += 2;
            fire += 1;
            cunning++;
        } else if (characters[tokenID].element == 3) {
            earth += 3;
            fire += 2;
            water += 1;
            patience++;
        }



        // Iterate through levels
        for (uint16 level = 1; level < currentLevel; level++) {
            if (characters[tokenID].element == 0) {
                fire += uint16(Math.max(1, (level + tokenID) % 3)); // 2, 1, 1...
                earth += uint16(Math.min(1, (level + tokenID) % 4)); // 1, 1, 1, 0...
                air += ((tokenID + level) % 2); // 0, 1...
                water += uint16(Math.max(0, (level + tokenID) % 4 - 2)); // 0, 1, 0, 0...
        
            } else if (characters[tokenID].element  == 1) {
                water += uint16(Math.max(1, (level + tokenID) % 3)); // 2, 1, 1...
                air += uint16(Math.min(1, (level + tokenID) % 4)); // 1, 1, 1, 0...
                earth += ((tokenID + level) % 2); // 0, 1...
                fire += uint16(Math.max(0, (level + tokenID) % 4 - 2)); // 0, 1, 0, 0...

            } else if (characters[tokenID].element == 2) {
                air += uint16(Math.max(1, (level + tokenID) % 3)); // 2, 1, 1...
                water += uint16(Math.min(1, (level + tokenID) % 4)); // 1, 1, 1, 0...
                fire += ((tokenID + level) % 2); // 0, 1...
                earth += uint16(Math.max(0, (level + tokenID) % 4 - 2)); // 0, 1, 0, 0...

            } else if (characters[tokenID].element == 3) {
                earth += uint16(Math.max(1, (level + tokenID) % 3)); // 2, 1, 1...
                fire += uint16(Math.min(1, (level + tokenID) % 4)); // 1, 1, 1, 0...
                water += ((tokenID + level) % 2); // 0, 1...
                air += uint16(Math.max(0, (level + tokenID) % 4 - 2)); // 0, 1, 0, 0...
            }

            charisma += ((fire / 5) + ((tokenID + level) % 2));
            creativity += ((water / 5) + ((tokenID + level) % 2));
            cunning += ((air / 5) + ((tokenID + level) % 2));
            patience += ((earth / 5) + ((tokenID + level) % 2));
        }

        return(fire, water, air, earth, charisma, creativity, cunning, patience);
    }

    function setMetadata(uint16 tokenID, string memory _metadata) public {
        tokenMetadata[tokenID] = _metadata;
    }

    function getMetadata(uint16 tokenID) public view returns (string memory) {
        return tokenMetadata[tokenID];
    }

    function setMainAvatar (address _userAddress, uint16 tokenID) public {
        holderMainAvatars[_userAddress] = tokenID;
    }

    function getUserMetadata(address _userAddress) public view returns (string memory metadataURI) {
        metadataURI = getMetadata(getUserTokenID(_userAddress));
        return(metadataURI);
    }

    function getUserCurrentStats(address _userAddress) public view returns (
      uint16 fire, uint16 water, uint16 air, uint16 earth, 
      uint16 charisma, uint16 creativity, uint16 cunning, uint16 patience) {
        return getCurrentStats(getUserTokenID(_userAddress));
    }

    function getUserPrimaryStats(address _userAddress) public view returns (string memory element, uint16 level,
      uint256 exp, string memory metadataURI) {
        return getPrimaryStats(getUserTokenID(_userAddress));
    }
}