import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @param {string} contract
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getMemeToken(contract = '') {
    const query = {
        query: gql`
            query GetMemeToken($contract: Address!) {
                memeToken(contract: $contract) {
                    contract
                    name
                    symbol
                }
            }
        `,
        variables: { contract },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'memeToken');
}

export async function getMemeTokenDetails(contract = '', user = '') {
    const query = {
        query: gql`
            query getMemeTokenDetails($contract: Address!, $user: Address!) {
                memeToken(contract: $contract, user: $user) {
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
                    initialReserve
                    blocksAmount
                    blocksFee
                    blocksMaxSupply
                    canMint(user: $user)
                }
            }
        `,
        variables: { contract, user },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'memeToken');
}

/**
 * MemeToken object.
 * @typedef {Object} MemeToken
 * @property {string} contract
 * @property {string} type
 * @property {string} name
 * @property {string} symbol
 * @property {string} created
 * @property {boolean} isActive
 */
