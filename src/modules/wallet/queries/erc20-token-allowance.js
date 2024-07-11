//import gql from 'graphql-tag';
//import { gqlQuery } from '@/utils/gql.js';
//import { fantomApolloClient } from '@/plugins/apollo/apollo-provider.js';
// MM
import { wallet } from '@/plugins/wallet/Wallet.js';
import { getFTMBalance } from '@/modules/wallet/queries/ftm-balance.js';

export async function getErc20TokenAllowance(ownerAddress = '', tokenAddress = '', spenderAddress = '') {
	
	// MM 'transparent' 'native token' support added
	if (tokenAddress == '0x0000000000000000000000000000000000000000')
		return getFTMBalance(ownerAddress);	
    // MM avoid using specific ('not standard') grpahql network api
	return wallet.getErc20Allowance(tokenAddress, ownerAddress, spenderAddress);
	/*
	const query = {
        query: gql`
            query GetErc20TokenAllowance($token: Address!, $owner: Address!, $spender: Address!) {
                ercTokenAllowance(token: $token, owner: $owner, spender: $spender)
            }
        `,
        variables: {
            owner: ownerAddress,
            token: tokenAddress,
            spender: spenderAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'ercTokenAllowance', fantomApolloClient);
	*/
}

/*
export async function getErc20Token(ownerAddress = '', tokenAddress = '') {
    const query = {
        query: gql`
            query GetErc20Token($token: Address!, $owner: Address!) {
                erc20Token(token: $token) {
                    address
                    name
                    symbol
                    decimals
                    totalSupply
                    balanceOf(owner: $owner)
                }
            }
        `,
        variables: {
            owner: ownerAddress,
            token: tokenAddress,
        },
        fetchPolicy: 'network-only',
    };

    return gqlQuery(query, 'erc20Token', fantomApolloClient);
}
*/
