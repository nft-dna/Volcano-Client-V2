let appConfig = {
    // app name - used in titles
    name: 'Volcano',
    // app main title
    title: 'Volcano, NFT marketplace',
    // app description
    description: 'Volcano, NFT marketplace',
    // app keywords
    keywords: 'Volcano, NFT, NFTs, Magma',
    // app's favicon
    favicon: 'public/favicon.png',
    // app code
    code: process.env.VUE_APP_MODULE || 'volcano',
    // app routes
    module: process.env.VUE_APP_MODULE || 'volcano',
    // apollo client settings
    apollo: {
        // Volcano api
        volcano: {
            // list of providers. if one of them is unavailable, another is randomly picked
            providers: [
                {
                    //http: 'http://localhost:8080/graphql',
                    // for subscriptions
                    ws: '',
                },
                //{
                //    http: 'http://localhost:9090/graphql',
                //    // for subscriptions
                //    ws: '',
                //},
            ],
            // index into providers array of default provider or 'random' - takes index randomly
            defaultProviderIndex: 'random',
        },
    },
    // app settings
    settings: {
        languages: [
            { label: 'English', value: 'en' },
            // { label: 'русский', value: 'ru' },
        ],
        //networkName: 'Magma Onyx',
        networkName: 'UniSepolia Testnet',
        //nativeToken: 'LAVA',
        nativeToken: 'ETH',
        //wrappedToken: 'wLAVA',
        wrappedToken: 'wETH',
        defaultLanguage: 'en',
        mobileViewBreakpoint: '64em', // set also variable $breakpoint-mw in assets/scss/_variables.scss
        themes: ['default', 'theme-dark'],
        maxNFTSize: 15000000,
    },
    // progressive web application
    usePWA: true,
    // pwa settings
    pwa: {
        // name used in pwa manifest
        name: 'Volcano',
        categories: ['finance'],
        mainColor: '#ffffff',
        assetsVersion: '1',
    },
    appBasePath: '/volcano',
    //appBasePath: '/sepolia-volcano',
    //appBasePath: '',
    // if `true`, every route will be redirected to 'under maintenance' page
    underMaintenance: false,
    // use hash in address
    routerHashMode: true,
    // Opera chain id
    //chainId: '0x19f6d22c9',
    //chainId: '0xaa36a7',
    chainId: '0x515',
    // JSON-RPC endpointAdd
    // rpc: 'https://rpcapi.fantom.network/',
    //rpc: 'https://turbo.magma-rpc.com/',
    //rpc: 'https://rpc2.sepolia.org/',
    rpc: 'https://sepolia.unichain.org/',
    // used in links pointing to fantom explorer
    //explorerUrl: 'https://testnet.magma.foundation/',
    //explorerUrl: 'https://sepolia.etherscan.io/',
    explorerUrl: 'https://sepolia.uniscan.xyz/',
    // used in links pointing to validators
    //explorerUrl2: 'https://magmascan.org/',
    //explorerUrl2: 'https://sepolia.etherscan.io/',
    explorerUrl2: 'https://sepolia.uniscan.xyz/',
    // default options for production build
    build: {
        // output dir for production build
        outputDir: 'dist',
    },
    // feature flags
    flags: {
        moderatorFunctions: true,
        advertisedCollection: false,
    },
};

appConfig.mainnet = {
    chainId: appConfig.chainId,
    rpc: appConfig.rpc,
    explorerUrl: appConfig.explorerUrl,
    explorerUrl2: appConfig.explorerUrl2,
};

module.exports = appConfig;
