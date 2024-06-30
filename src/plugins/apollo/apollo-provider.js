import Vue from 'vue';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import VueApollo from 'vue-apollo';
import appConfig from '@/app.config.js';
import { FApolloClient } from './FApolloClient.js';

export const artionFApolloClient = new FApolloClient({
    apolloProviders: appConfig.apollo.volcano.providers,
    defaultProviderIndex: appConfig.apollo.volcano.defaultProviderIndex,
});

export const fantomFApolloClient = new FApolloClient({
    apolloProviders: appConfig.apollo.apinet.providers,
    defaultProviderIndex: appConfig.apollo.apinet.defaultProviderIndex,
});

export const artionApolloClient = new ApolloClient({
    link: ApolloLink.from([
        artionFApolloClient.getNetErrorLink(),
        artionFApolloClient.getRetryLink(),
        artionFApolloClient.getErrorLink(),
        artionFApolloClient.getHttpAuthLink(),
        artionFApolloClient.getHttpLink(),
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

export const fantomApolloClient = new ApolloClient({
    link: ApolloLink.from([
        fantomFApolloClient.getNetErrorLink(),
        fantomFApolloClient.getRetryLink(),
        fantomFApolloClient.getErrorLink(),
        fantomFApolloClient.getHttpLink(),
    ]),
    cache: new InMemoryCache(),
    connectToDevTools: true,
});

Vue.use(VueApollo);

export const apolloProvider = new VueApollo({
    clients: {
        volcano: artionApolloClient,
        magma: fantomApolloClient,
    },
    defaultClient: artionApolloClient,
    defaultOptions: {
        $query: {
            fetchPolicy: 'network-only', // 'cache-and-network', 'network-only', 'cache-first'
        },
    },
});
