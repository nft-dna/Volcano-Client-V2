// ZERO_AMOUNT represents zero amount transferred on some calls.
const ZERO_AMOUNT = '0x0';


 function createERC721Collection(nftName, nftSymbol, amount, isprivate, mintFee, creatorFee, feeRecipient, baseUri, useDecimalUri, baseUriExt, maxItems, mintStartTime, mintStopTime, revealTime, preRevealUri, contractUri, web3Client, contract = process.env.VUE_APP_ERC721_FACTORY_CONTRACT_ADDRESS) {
	
    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(createERC721TokenContractAbi,[nftName, nftSymbol, isprivate, mintFee, creatorFee, feeRecipient, [baseUri, useDecimalUri, baseUriExt, maxItems, mintStartTime, mintStopTime, revealTime, preRevealUri, contractUri]])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}

 function createERC721Token(toAddress, tokenUri, amount, collectionAddress, web3Client) {

    const abi = {
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "uri",
				"type": "string"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[toAddress, tokenUri])

    // return tx object
    return {
        from: undefined,
        to: collectionAddress,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}

/**
 * createERC721TokenWithRoyalty Mints a new token on Volcano NFT collection contract
 *
 * @param {string} toAddress Address of the owner of newly created NFT
 * @param {string} tokenUri URI address of the NFT json object
 * @param {number|BN|string} amount Amount of FTM tokens in WEI units as platform fee.
 * @param {string} collectionAddress Address of the collection for new NFT.
 * @param {string} royaltyRecipient Address of the royalty recipient
 * @param {number} royaltyValue Royalty value percentage (using 2 decimals - 5000 = 50%)
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string, value string}}
 */
function createERC721TokenWithRoyalty(toAddress, tokenUri, amount, collectionAddress, royaltyRecipient, royaltyValue, web3Client) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_beneficiary",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_tokenUri",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_royaltyRecipient",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_royaltyValue",
                "type": "uint256"
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
        "stateMutability": "payable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[toAddress, tokenUri, royaltyRecipient, royaltyValue])

    // return tx object
    return {
        from: undefined,
        to: collectionAddress,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}

	
 function createERC1155Collection(nftName, nftSymbol, amount, isprivate, mintFee, creatorFee, feeRecipient, baseUri, usebaseUriOnly, useDecimalUri, baseUriExt, maxItems, maxItemSupply, mintStartTime, mintStopTime, revealTime, preRevealUri, contractUri, web3Client, contract = process.env.VUE_APP_ERC1155_FACTORY_CONTRACT_ADDRESS) {

    // encode contract ABI with parameters
    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(createERC1155TokenContractAbi,[nftName, nftSymbol, isprivate, mintFee, creatorFee, feeRecipient, [baseUri, usebaseUriOnly, useDecimalUri, baseUriExt, maxItems, maxItemSupply, mintStartTime, mintStopTime, revealTime, preRevealUri, contractUri]])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}


 function createERC1155Token(toAddress, data, supply, amount, collectionAddress, web3Client) {

    const abi = {
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
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
		"name": "mint",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[toAddress, supply, data])

    // return tx object
    return {
        from: undefined,
        to: collectionAddress,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}

 function createERC20TokenContract(nftName, nftSymbol, amount, uri, initialReceiver, initialAmount, capAmount, mintBlocks, mintBlocksFee, web3Client, contract = process.env.VUE_APP_ERC20_FACTORY_CONTRACT_ADDRESS) {
	
    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(createERC20TokenContractAbi,[nftName, nftSymbol, uri, initialReceiver, initialAmount, capAmount, mintBlocks, mintBlocksFee])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}

 function mintERC20TokenBlock(token, receiver, amount, web3Client, contract = process.env.VUE_APP_ERC20_FACTORY_CONTRACT_ADDRESS) {
	
    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(mintERC20TokenBlockAbi,[token, receiver])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: web3Client.utils.numberToHex(amount),
        data: encodedAbi,
    };
}

/**
 * registerTokenRoyalty Method for setting royalty of NFT token
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {string} tokenID NFT token ID (hex)
 * @param {int} royalty Royalty which is paid to minter of NFT token
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function registerTokenRoyalty(nftAddress, tokenID, royalty, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
            "internalType": "address",
            "name": "_nftAddress",
            "type": "address"
            },
            {
            "internalType": "uint256",
            "name": "_tokenId",
            "type": "uint256"
            },
            {
            "internalType": "uint16",
            "name": "_royalty",
            "type": "uint16"
            }
        ],
        "name": "registerRoyalty",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, royalty])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * createOffer Method for offering item on marketplace
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} payToken Paying token address
 * @param {int} quantity Quantity of items
 * @param {number|BN|string} pricePerItem Price per item
 * @param {string} deadline Offer expiration
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function createOffer(nftAddress, tokenID, payToken, quantity, pricePerItem, deadline, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "contract IERC20",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerItem",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_deadline",
                "type": "uint256"
            }
        ],
        "name": "createOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, quantity, pricePerItem, deadline])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: (payToken == '0x0000000000000000000000000000000000000000') ? web3Client.utils.numberToHex(quantity * pricePerItem) : ZERO_AMOUNT, //ZERO_AMOUNT, MM 'transparent' 'native token' support added
        data: encodedAbi,
    };
}

/**
 * cancelOffer Method for canceling item offer on marketplace
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function cancelOffer(nftAddress, tokenID, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "cancelOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * acceptOffer Method for accepting item offer on marketplace
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} creator Offer creator address
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function acceptOffer(nftAddress, tokenID, creator, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_creator",
                "type": "address"
            }
        ],
        "name": "acceptOffer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, creator])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * listItem Method for listing NFT on marketplace for sale
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {int} quantity Quantity of items (needed for ERC-1155 NFTs, set as 1 for ERC-721)
 * @param {string} payToken Paying token address
 * @param {number|BN|string} pricePerItem Price per item
 * @param {string} startingTime Scheduling for a future sale
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function listItem(nftAddress, tokenID, quantity, payToken, pricePerItem, startingTime, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_pricePerItem",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startingTime",
                "type": "uint256"
            }
        ],
        "name": "listItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, quantity, payToken, pricePerItem, startingTime])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * cancelListing Method for canceling listed NFT
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function cancelListing(nftAddress, tokenID, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "cancelListing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateListing Method for updating listed NFT
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} payToken Paying token address
 * @param {number|BN|string} newPricePerItem Price per item
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function updateListing(nftAddress, tokenID, payToken, newPricePerItem, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_newPrice",
                "type": "uint256"
            }
        ],
        "name": "updateListing",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, newPricePerItem])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * buyListedItemWithPayToken Method for buying listed NFT
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} ownerAddress Payable address of the owner
 * @param {string} payToken Paying token address
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function buyListedItemWithPayToken(nftAddress, tokenID, ownerAddress, payToken, amount, web3Client, contract = process.env.VUE_APP_MARKETPLACE_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "buyItem",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, ownerAddress])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: (payToken == '0x0000000000000000000000000000000000000000') ? web3Client.utils.numberToHex(amount) : ZERO_AMOUNT, //ZERO_AMOUNT, MM 'transparent' 'native token' support added
        data: encodedAbi,
    };
}

/**
 * createAuction Creates a new auction for a given item
 *
 * Only the owner of item can create an auction and must have approved the contract
 * In addition to owning the item, the sender also has to have the MINTER role.
 * End time for the auction must be in the future.
 *
 * @param {string} nftAddress Address of the NFT token
 * @param {int} tokenID NFT token ID
 * @param {string} payToken Paying token address
 * @param {number|BN|string} reservePrice Item cannot be sold for less than this price in wei
 * @param {string} startTimestamp Unix epoch in seconds for the auction start time
 * @param {string} endTimestamp Unix epoch in seconds for the auction end time
 * @param {bool} minBidReserve If set to true, then minimum bid is set to reserve price, otherwise nothing happens
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 * @return {{to: address, data: string, value string}}
 */
 function createAuction(nftAddress, tokenID, payToken, reservePrice, startTimestamp, endTimestamp, minBidReserve, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_payToken",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_reservePrice",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startTimestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "minBidReserve",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "_endTimestamp",
                "type": "uint256"
            }
        ],
        "name": "createAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, payToken, reservePrice, startTimestamp, minBidReserve, endTimestamp])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * placeAuctionBid Places a new bid, out bidding the existing bidder if found and criteria is reached
 *
 * Only callable when the auction is open
 * Bids from smart contracts are prohibited to prevent griefing with always reverting receiver
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT token ID
 * @param {number|BN|string} amount Amount of tokens in auction paytoken in WEI units
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
 function placeAuctionBid(nftAddress, tokenID, payToken, amount, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_bidAmount",
                "type": "uint256"
            }
        ],
        "name": "placeBid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, amount])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: (payToken == '0x0000000000000000000000000000000000000000') ? web3Client.utils.numberToHex(amount) : ZERO_AMOUNT, //ZERO_AMOUNT, MM 'transparent' 'native token' support added
        data: encodedAbi,
    };
}

/**
 * withdrawAuctionBid Allows the hightest bidder to withdraw the bid (after 12 hours post auction's end)
 *
 * Only callable by the existing top bidder
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
 function withdrawAuctionBid(nftAddress, tokenID, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "withdrawBid",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * resultAuction Closes a finished auction and rewards the highest bidder
 *
 * Only the item owner or the auction winner
 * Auction can only be resulted if there has been a bidder and reserve met.
 * If there have been no bids, the auction needs to be cancelled instead using `cancelAuction()`
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
 function resultAuction(nftAddress, tokenID, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "resultAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * resultFailedAuction Results an auction that failed to meet the auction.reservePrice
 *
 * Only item owner
 * Auction can only be fail-resulted if the auction has expired and the auction.reservePrice has not been met.
 * If there have been no bids, the auction needs to be cancelled instead using `cancelAuction()`
 *
 * @since Volcano-Contracts v0
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
function resultFailedAuction(nftAddress, tokenID, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "resultFailedAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * cancelAuction Cancels an un-resulted auctions, returning the funds to the top bidder if found
 *
 * Only item owner
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
 function cancelAuction(nftAddress, tokenID, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "cancelAuction",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateAuctionReservePrice Update the current reserve price for an auction
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {number|BN|string} reservePrice New auction reserve price in WEI units
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
 function updateAuctionReservePrice(nftAddress, tokenID, reservePrice, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_reservePrice",
                "type": "uint256"
            }
        ],
        "name": "updateAuctionReservePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, reservePrice])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateAuctionStartTime Update the current start time for an auction
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {int} startTime New start time (unix epoch in seconds)
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
 function updateAuctionStartTime(nftAddress, tokenID, startTime, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            }
        ],
        "name": "updateAuctionStartTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, startTime])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * updateAuctionEndTime Update the current end time for an auction
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {int} tokenID NFT Token ID of the item being auctioned
 * @param {int} endTime New end time (unix epoch in seconds)
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @param {string} [contract] Contract address
 */
 function updateAuctionEndTime(nftAddress, tokenID, endTime, web3Client, contract = process.env.VUE_APP_AUCTION_CONTRACT_ADDRESS) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_nftAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_endTimestamp",
                "type": "uint256"
            }
        ],
        "name": "updateAuctionEndTime",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[nftAddress, tokenID, endTime])

    // return tx object
    return {
        from: undefined,
        to: contract,
        value: ZERO_AMOUNT,
        data: encodedAbi,
    };
}

/**
 * randomPurchase Books a random NFT token on the given trade contract.
 *
 * @param {string} tradeAddress Address of the trading contract.
 * @param {string} payToken Address of the ERC20 token to pay in.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string}}
 */
function randomPurchase(tradeAddress, payToken, web3Client) {
    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token",
                "type": "address"
            }
        ],
        "name": "purchase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    };

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[payToken]);

    // return tx object
    return {
        from: undefined,
        to: tradeAddress,
        data: encodedAbi,
    };
}

/**
 * volcanoERC721Burn Executes an NFT token burn on Volcano Tradable contract.
 *
 * @param {string} nftContract Address of the ERC-721 Volcano NFT contract.
 * @param {string} tokenID Identifier of the NFT token within the contract.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {{to: address, data: string}}
 */
function artionERC721Burn(nftContract, tokenID, web3Client) {

    const abi = {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_tokenId",
                "type": "uint256"
            }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    };

    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[tokenID]);

    // return tx object
    return {
        from: undefined,
        to: nftContract,
        data: encodedAbi,
    };
}

/**
 * setApprovalForAll Sets or unsets the approval of a given operator
 * An operator is allowed to transfer all tokens of the sender on their behalf.
 *
 * @param {string} nftAddress Address of the NFT token, ERC721 address
 * @param {string} operator Address of the operator (Marketplace or Auction contract)
 * @param {boolean} approved Whether to allow or disallow
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 */
function setApprovalForAll(nftAddress, operator, approved, web3Client) {

    const abi = {
        "inputs": [
            {
                "internalType": "address",
                "name": "_operator",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "_approved",
                "type": "bool"
            }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
	
    const encodedAbi = web3Client.eth.abi.encodeFunctionCall(abi,[operator, approved])

    // return tx object
    return {
        from: undefined,
        to: nftAddress,
        data: encodedAbi,
    };
}

/**
 * decodeMintedNftTokenId decodes tokenId of minted token from the transaction receipt.
 *
 * @param {TransactionReceipt} receipt The minting transaction receipt.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {string|null} The tokenId
 */
function decodeMintedErc721TokenId(receipt, web3Client) {
    const mintedTopic = '0x997115af5924f5e38964c6d65c804d4cb85129b65e62eb20a8ca6329dbe57e18';
    const abiInputs = [
        {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "beneficiary",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "string",
            "name": "tokenUri",
            "type": "string"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "minter",
            "type": "address"
        }
    ];

    const log = receipt.logs.find(log => log.topics.includes(mintedTopic));
    if (!log) throw "Minted topic not present in the transaction log";
    const decoded = web3Client.eth.abi.decodeLog(abiInputs, log.data, log.topics.slice(1));
    console.log('decodedMinted', decoded);
    return decoded.tokenId;
}

function decodeMintedErc1155TokenId(receipt, web3Client) {
    const mintedTopic = '0xd1390903c6e0d21c236d4f87b8f6b8ed0c107dd8ab79fc5aeb0b654bb99039bd';
    const abiInputs = [
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "tokenId",
			"type": "uint256"
		},
		{
			"indexed": false,
			"internalType": "uint256",
			"name": "amount",
			"type": "uint256"
		},
		{
			"indexed": false,
			"internalType": "address",
			"name": "beneficiary",
			"type": "address"
		},
		{
			"indexed": false,
			"internalType": "string",
			"name": "uri",
			"type": "string"
		},
		{
			"indexed": false,
			"internalType": "bytes",
			"name": "data",
			"type": "bytes"
		},
		{
			"indexed": false,
			"internalType": "address",
			"name": "minter",
			"type": "address"
		}
    ];

    const log = receipt.logs.find(log => log.topics.includes(mintedTopic));
    if (!log) throw "Minted topic not present in the transaction log";
    const decoded = web3Client.eth.abi.decodeLog(abiInputs, log.data, log.topics.slice(1));
    console.log('decodedMinted', decoded);
    return decoded.tokenId;
}

function decodeMintedErc20Block(receipt, web3Client) {
    const mintedTopic = '0x0e9a1ec107d573764d20047a2ac52b16c549f7366e25e13cc1c8437d3fe98b5d';
    const abiInputs = [
		{
			"indexed": false,
			"internalType": "address",
			"name": "to",
			"type": "address"
		}
    ];

    const log = receipt.logs.find(log => log.topics.includes(mintedTopic));
    if (!log) throw "Minted topic not present in the transaction log";
    const decoded = web3Client.eth.abi.decodeLog(abiInputs, log.data, log.topics.slice(1));
    console.log('decodedMinted', decoded);
    return decoded.to;
}

/**
 * decodeContractCreatedAddress decodes address of the created contract from the transaction receipt.
 *
 * @param {TransactionReceipt} receipt The minting transaction receipt.
 * @param {Web3} web3Client Instance of an initialized Web3 client.
 * @return {string|null} The address
 
 // event ContractCreated(address creator, address nft, bool isprivate);
 */
function decodeContractCreatedAddress(receipt, web3Client) {
    const createdTopic = '0xbbe78d8749296d5db350f8a76bbc6f2f85649a62516790be41dc6a67393aecde';
    const abiInputs = [
        {
            "indexed": false,
            "internalType": "address",
            "name": "creator",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "nft",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "bool",
            "name": "isprivate",
            "type": "bool"
        }
    ];

    const log = receipt.logs.find(log => log.topics.includes(createdTopic));
    if (!log) throw "Created topic not present in the transaction log";
    const decoded = web3Client.eth.abi.decodeLog(abiInputs, log.data, log.topics.slice(1));
    console.log('decodeContractCreated', decoded);
    return decoded.nft;
}

function decodeMemeTokenCreatedAddress(receipt, web3Client) {
    const createdTopic = '0xd5f9bdf12adf29dab0248c349842c3822d53ae2bb4f36352f301630d018c8139';
    const abiInputs = [
        {
            "indexed": false,
            "internalType": "address",
            "name": "caller",
            "type": "address"
        },
        {
            "indexed": false,
            "internalType": "address",
            "name": "token",
            "type": "address"
        }
    ];

    const log = receipt.logs.find(log => log.topics.includes(createdTopic));
    if (!log) throw "Created topic not present in the transaction log";
    const decoded = web3Client.eth.abi.decodeLog(abiInputs, log.data, log.topics.slice(1));
    console.log('decodeMemeTokenCreated', decoded);
    return decoded.token;
}

export default {
    createERC721Collection,
    createERC721Token,
    createERC721TokenWithRoyalty,
    createERC1155Collection,
    createERC1155Token,
	createERC20TokenContract,
	mintERC20TokenBlock,
    registerTokenRoyalty,
    listItem,
    cancelListing,
    updateListing,
    buyListedItemWithPayToken,
    createOffer,
    cancelOffer,
    acceptOffer,
    createAuction,
    placeAuctionBid,
    withdrawAuctionBid,
    resultAuction,
    resultFailedAuction,
    cancelAuction,
    updateAuctionReservePrice,
    updateAuctionStartTime,
    updateAuctionEndTime,
    randomPurchase,
    artionERC721Burn,
    decodeMintedErc721TokenId,
	decodeMintedErc1155TokenId,
	decodeMintedErc20Block,
	decodeContractCreatedAddress,
	decodeMemeTokenCreatedAddress,
    setApprovalForAll,
}

const createERC721TokenContractAbi = {
	"inputs": [
		{
			"internalType": "string",
			"name": "_name",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_symbol",
			"type": "string"
		},
		{
			"internalType": "bool",
			"name": "_isprivate",
			"type": "bool"
		},
		{
			"internalType": "uint256",
			"name": "_mintFee",
			"type": "uint256"
		},
		{
			"internalType": "uint96",
			"name": "_creatorFeePerc",
			"type": "uint96"
		},
		{
			"internalType": "address payable",
			"name": "_feeRecipient",
			"type": "address"
		},
		{
			"components": [
				{
					"internalType": "string",
					"name": "baseUri",
					"type": "string"
				},				
				{
					"internalType": "bool",
					"name": "useDecimalUri",
					"type": "bool"
				},				
				{
					"internalType": "string",
					"name": "baseUriExt",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "maxItems",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "mintStartTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "mintStopTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "revealTime",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "preRevealUri",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "contractUri",
					"type": "string"
				}
			],
			"internalType": "struct VolcanoERC721Tradable.contractERC721Options",
			"name": "_options",
			"type": "tuple"
		}
	],
	"name": "createNFTContract",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "payable",
	"type": "function"
}

const createERC1155TokenContractAbi = {
	"inputs": [
		{
			"internalType": "string",
			"name": "_name",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_symbol",
			"type": "string"
		},
		{
			"internalType": "bool",
			"name": "_private",
			"type": "bool"
		},
		{
			"internalType": "uint256",
			"name": "_mintFee",
			"type": "uint256"
		},
		{
			"internalType": "uint96",
			"name": "_creatorFeePerc",
			"type": "uint96"
		},
		{
			"internalType": "address payable",
			"name": "_feeRecipient",
			"type": "address"
		},
		{
			"components": [
				{
					"internalType": "string",
					"name": "baseUri",
					"type": "string"
				},
				{
					"internalType": "bool",
					"name": "usebaseUriOnly",
					"type": "bool"
				},				
				{
					"internalType": "bool",
					"name": "useDecimalUri",
					"type": "bool"
				},				
				{
					"internalType": "string",
					"name": "baseUriExt",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "maxItems",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "maxItemSupply",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "mintStartTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "mintStopTime",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "revealTime",
					"type": "uint256"
				},
				{
					"internalType": "string",
					"name": "preRevealUri",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "contractUri",
					"type": "string"
				}
			],
			"internalType": "struct VolcanoERC1155Tradable.contractERC1155Options",
			"name": "_options",
			"type": "tuple"
		}
	],
	"name": "createNFTContract",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "payable",
	"type": "function"	
}

const createERC20TokenContractAbi = {
	"inputs": [
		{
			"internalType": "string",
			"name": "_name",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_symbol",
			"type": "string"
		},
		{
			"internalType": "string",
			"name": "_uri",
			"type": "string"
		},
		{
			"internalType": "address",
			"name": "_initialReceiver",
			"type": "address"
		},
		{
			"internalType": "uint256",
			"name": "_initialAmount",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "_capAmount",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "_mintBlocks",
			"type": "uint256"
		},
		{
			"internalType": "uint256",
			"name": "_mintBlocksFee",
			"type": "uint256"
		}
	],
	"name": "createTokenContract",
	"outputs": [
		{
			"internalType": "address",
			"name": "",
			"type": "address"
		}
	],
	"stateMutability": "payable",
	"type": "function"	
}

const mintERC20TokenBlockAbi = {
	"inputs": [
		{
			"internalType": "address",
			"name": "tokenContractAddress",
			"type": "address"
		},
		{
			"internalType": "address",
			"name": "to",
			"type": "address"
		}
	],
	"name": "mintTokenBlock",
	"outputs": [],
	"stateMutability": "payable",
	"type": "function"	
}


