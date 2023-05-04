// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dogepunks is ERC721A, Ownable {

    // max mint limit per wallet
    uint256 MAX_MINTS = 10;
    // total supply
    uint256 MAX_SUPPLY = 10;
    uint256 public mintFee = 0 ether;


    string public baseTokenURI;

    constructor() ERC721A("Dogepunks", "DP") {
    }

    function mint(uint256 quantity) external payable {
        require(quantity + _numberMinted(msg.sender) <= MAX_MINTS, "Exceeded the limit");
        require(totalSupply() + quantity <= MAX_SUPPLY, "Not enough tokens left");
        require(msg.value >= (mintFee * quantity), "Not enough ether sent");
        _safeMint(msg.sender, quantity);
    }


    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        return bytes(baseURI).length != 0 ? string(abi.encodePacked(baseURI, _toString(tokenId))) : '';
    }

    function setBaseTokenURI(string memory _baseTokenURI) public {
        baseTokenURI = _baseTokenURI;
    }

    function withdraw() external payable onlyOwner {
        require(address(this).balance > 0, "Not enough balance");
        payable(owner()).transfer(address(this).balance);
    }
}