// import gql from 'graphql-tag';
// import { gqlQuery } from '@/utils/gql.js';
// import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';
// MM
import { wallet } from '@/plugins/wallet/Wallet.js';

export async function getFTMBalance(ownerAddress = '') {
    // MM avoid using grpahql network api's (not standard here)
    return wallet.getBalance(ownerAddress);

    /*
    const query = {

		query: gql`
            query GetFTMBalance($address: Address!) {
                account(address: $address) {
                    balance
                }
            }
        `,
		//query: gql`query AddressBalance( $hash : AddressHash!) {address (hash: $hash) { fetchedCoinBalance  }}`
		//,		
        variables: {
            hash: ownerAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'account.balance', fantomApolloClient);
	*/
}
