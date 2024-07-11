//import gql from 'graphql-tag';
//import { gqlQuery } from '@/utils/gql.js';
//import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';
import { getFTMBalance } from '@/modules/wallet/queries/ftm-balance.js';
// MM
import { wallet } from '@/plugins/wallet/Wallet.js';

export async function getErc20TokenBalance(ownerAddress = '', tokenAddress = '') {
	
	// MM 'transparent' 'native token' support added
	if (tokenAddress == '0x0000000000000000000000000000000000000000')
		return getFTMBalance(ownerAddress);
	
	return wallet.getErc20TokenBalance(ownerAddress, tokenAddress);//.toFixed();
	////////////////////////////////////////////////////////////////////
    /*
	const query = {
		query: gql`
            query GetErc20TokenBalance($owner: Address!, $token: Address!) {
                ercTokenBalance(owner: $owner, token: $token)
            }
        `, 
        variables: {
            owner: ownerAddress,
            token: tokenAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'ercTokenBalance', fantomApolloClient);
	*/

}
