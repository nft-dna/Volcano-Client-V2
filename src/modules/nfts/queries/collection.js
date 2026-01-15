import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @param {string} contract
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getCollection(contract = '') {
    const query = {
        query: gql`
            query GetCollection($contract: Address!) {
                collection(contract: $contract) {
                    contract
                    name
                    symbol
                }
            }
        `,
        variables: { contract },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collection');
}

export async function getCollectionDetails(contract = '', user = '') {
    if (user === '') {
        console.warn('User address is empty, using ZERO_ADDRESS. Is Wallet connected ?');
        user = '0x0000000000000000000000000000000000000000';
    }

    if (contract === '') {
        throw new Error('Invalid contract address');
    }

    const query = {
        query: gql`
            query GetCollection($contract: Address!, $user: Address!) {
                collection(contract: $contract, user: $user) {
                    contract
                    name
                    symbol
                    description
                    categories
                    owner
                    ownerUser {
                        address
                        username
                        avatar
                    }
                    feeRecipientUser {
                        address
                        username
                        avatar
                    }
                    royalty
                    site
                    discord
                    telegram
                    medium
                    twitter
                    instagram
                    createdTime
                    isInternal
                    isVerified
                    IsOwnerOnly
                    isErc1155
                    hasBaseUri
                    maxItems
                    maxItemCount
                    mintStartTime
                    mintEndTime
                    revealTime
                    canMint(user: $user)
                }
            }
        `,
        variables: { contract, user },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'collection');
}

/**
 * Collection object.
 * @typedef {Object} Collection
 * @property {string} contract
 * @property {string} type
 * @property {string} name
 * @property {string} symbol
 * @property {string} created
 * @property {boolean} isActive
 */
