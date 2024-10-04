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
                }
            }
        `,
        variables: { contract },
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
