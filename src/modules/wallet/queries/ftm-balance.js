import gql from 'graphql-tag';
import { gqlQuery } from '@/utils/gql.js';
import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';

export async function getFTMBalance(ownerAddress = '') {
    const query = {
        /*
		query: gql`
            query GetFTMBalance($address: Address!) {
                account(address: $address) {
                    balance
                }
            }
        `,
		*/
		query: gql`
		  query GetEthBalance($ownerAddress: String!) {
			ethereum {
			  address(address: {is: $ownerAddress}) {
				balance {
				  value
				}
			  }
			}
		  }`
		,		
        variables: {
            address: ownerAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'account.balance', fantomApolloClient);
}
