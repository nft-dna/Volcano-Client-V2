import gql from 'graphql-tag';
import { gqlMutation } from '@/utils/gql.js';
import { toHex } from '@/utils/big-number.js';

/**
 * @param {string} contract
 * @param {string} tokenId
 */
export async function refreshTokenMetadata({ contract, tokenId }) {
    const mutation = {
        mutation: gql`
            mutation RefreshTokenMetadata($contract: Address!, $tokenId: BigInt!) {
                refreshTokenMetadata(contract: $contract, tokenId: $tokenId)
            }
        `,
        variables: { contract, tokenId: toHex(tokenId) },
    };

    return gqlMutation(mutation, 'refreshTokenMetadata');
}
