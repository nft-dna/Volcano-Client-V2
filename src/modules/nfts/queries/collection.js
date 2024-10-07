import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';

/**
 * @param {string} contract
 * @return {Promise<number|string|*|undefined|null>}
 */
export async function getCollection(contract = '', user = '') {
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
                    isErc1155
                    hasBaseUri
                    maxItems
                    maxItemCount
                    mintStartTime
                    mintEndTime
                    revealTime
                    canMint
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
