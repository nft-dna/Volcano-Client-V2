import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';
import { getFTMBalance } from '@/modules/wallet/queries/ftm-balance.js';

export async function getErc20TokenBalance(ownerAddress = '', tokenAddress = '') {
	
	if (tokenAddress == '0x0000000000000000000000000000000000000000')
		return getFTMBalance(ownerAddress);
	
    const query = {
        /*
		query: gql`
            query GetErc20TokenBalance($owner: Address!, $token: Address!) {
                ercTokenBalance(owner: $owner, token: $token)
            }
        `,
		*/
		query: gql`
		  query GetTokenBalance($owner: String!, $token: String!) {
			account(id: $owner) {
			  tokenBalance(where: { token: $token }) {
				value
			  }
			}
		  }`
		,		  
        variables: {
            owner: ownerAddress,
            token: tokenAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'ercTokenBalance', fantomApolloClient);
}
