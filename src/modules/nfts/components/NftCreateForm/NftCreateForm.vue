<template>
    <f-form v-model="values" class="nftcreate_form" @submit="onSubmit" :aria-label="$t('page.nftCreate.title')">
        <div class="nftcreate_col">
            <!-- 
			<div>
                <a-upload-area
                    @input="setTokenImage"
                    :max-file-size="maxNFTSize"
                    :validator="imageValidator"
                    class="auploadarea-nobackground"
                    v-if="false"
                >
                    Drop files here or browse <br />
                    JPG, PNG, BMP, GIF, SVG, Max 15mb.
                </a-upload-area>
            </div>
			 -->
        </div>
        <div class="nftcreate_col">
            <!-- <div class="nftcreate_wrap"> -->
            <div>
                <div class="nftcreate_panel">
                    <f-form-input
                        type="toggle"
                        :label="$t('nftcreate.memeToggle')"
                        name="memeToggle"
                        @change="onMemeToggle"
                    />

                    <f-form-input
                        v-if="!values.memeToggle"
                        ref="collectionslist"
                        type="a-dropdown-listbox"
                        name="collectionId"
                        :label="$t('nftcreate.collection')"
                        class="collection_list"
                        :data="collections"
                        @component-change="onSelectedCollection"
                        :error-message="$t('nftcreate.collectionErr')"
                    >
                        <template #button-label="{ item }">
                            <div class="flex ali-center gap-2">
                                <f-image
                                    v-if="item.img"
                                    size="24px"
                                    :src="item.img"
                                    :alt="item.label"
                                    aria-hidden="true"
                                />
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                        <template #item="{ item }">
                            <div class="flex ali-center gap-2">
                                <f-image
                                    v-if="item.img"
                                    size="24px"
                                    :src="item.img"
                                    :alt="item.label"
                                    aria-hidden="true"
                                />
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </f-form-input>

                    <f-form-input
                        v-if="values.memeToggle"
                        ref="memetokenslist"
                        type="a-dropdown-listbox"
                        name="memetokenId"
                        :label="$t('nftcreate.memetoken')"
                        class="memetokens_list"
                        :data="memetokens"
                        @component-change="onSelectedMemeToken"
                        :error-message="$t('nftcreate.memetokenErr')"
                    >
                        <template #button-label="{ item }">
                            <div class="flex ali-center gap-2">
                                <f-image
                                    v-if="item.img"
                                    size="24px"
                                    :src="item.img"
                                    :alt="item.label"
                                    aria-hidden="true"
                                />
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                        <template #item="{ item }">
                            <div class="flex ali-center gap-2">
                                <f-image
                                    v-if="item.img"
                                    size="24px"
                                    :src="item.img"
                                    :alt="item.label"
                                    aria-hidden="true"
                                />
                                <span>{{ item.label }}</span>
                            </div>
                        </template>
                    </f-form-input>

                    <div>
                        <f-form-input
                            type="text"
                            field-size="large"
                            name="contract"
                            no-label
                            validate-on-input
                            :validator="contractValidator"
                            :error-message="$t('nftcreate.contractErr')"
                            required
                        >
                            <!-- <template #prefix>
                                <app-iconset icon="nft" size="24px" />
                            </template> -->
                        </f-form-input>

                        <div class="collectiondetail_collection">
                            <collection-detail-info :info="this.currentselection" ref="collectiondetail" />
                        </div>
                    </div>

                    <div v-if="this.currentselection && this.currentselection.canMint">
                        <f-form-input
                            :label="$t('nftcreate.replica')"
                            :validator="replicaValidator"
                            validate-on-change
                            validate-on-input
                            type="number"
                            name="replica"
                            field-size="large"
                            required
                            v-if="this.allowReplica()"
                        />
                        <f-form-input
                            type="toggle"
                            :label="$t('nftcreate.uploadToggle')"
                            name="uploadToggle"
                            v-if="!values.memeToggle && this.allowMintUri()"
                        />
                        <f-form-input
                            :label="$t('nftcreate.name')"
                            field-size="large"
                            type="text"
                            name="name"
                            v-if="!values.memeToggle && values.uploadToggle && this.allowMintUri()"
                        />
                        <div>
                            <a-upload-area
                                @input="setTokenImage"
                                :max-file-size="maxNFTSize"
                                :validator="imageValidator"
                                class="auploadarea-nobackground"
                                v-if="!values.memeToggle && values.uploadToggle && this.allowMintUri()"
                            >
                                Drop files here or browse <br />
                                JPG, PNG, BMP, GIF, SVG, Max 15mb.
                            </a-upload-area>
                        </div>
                        <f-form-input
                            :label="$t('nftcreate.description')"
                            field-size="large"
                            type="textarea"
                            name="description"
                            rows="5"
                            v-if="!values.memeToggle && values.uploadToggle && this.allowMintUri()"
                        />
                        <f-form-input
                            :label="$t('nftcreate.tokenUri')"
                            field-size="large"
                            type="text"
                            name="tokenUri"
                            :placeholder="$t('nftcreate.tokenUriPlaceholder')"
                            required
                            v-if="!values.memeToggle && !values.uploadToggle && this.allowMintUri()"
                        />
                    </div>
                </div>

                <!-- <div class="nftcreate_panel">
                    <f-form-input type="toggle" :label="$t('nftcreate.unlockContent')" name="unlockContentToggle" />
                    <f-form-input
                        :label="$t('nftcreate.unlockContent')"
                        v-if="values.unlockContentToggle"
                        field-size="large"
                        type="textarea"
                        name="unlockContent"
                    />
                </div> -->
            </div>
            <div v-if="fileError" class="pat-5 flex juc-center">
                <f-message type="error" with-icon>{{ fileError }}</f-message>
            </div>
            <div v-if="progressMessage" class="pat-5 flex juc-center progress-message">
                <f-message type="info" with-icon>{{ progressMessage }}</f-message>
            </div>
            <div v-if="!values.memeToggle && fee !== null" class="nftcreate_info">
                <f-message type="info" with-icon>{{ $t('nftcreate.messageMintNft', { fee }) }}</f-message>
            </div>
            <div v-if="values.memeToggle && fee !== null" class="nftcreate_info">
                <f-message type="info" with-icon>{{ $t('nftcreate.messageMintBlock', { fee }) }}</f-message>
            </div>
            <div class="nftcreate_btn">
                <a-button
                    type="submit"
                    size="large"
                    :loading="isLoading"
                    v-if="this.currentselection"
                    :disabled="this.canMint()"
                >
                    {{ $t('nftcreate.mint') }}
                </a-button>
            </div>
            <a-sign-transaction :tx="tx" @transaction-status="onMintTransactionStatus" />
        </div>
    </f-form>
</template>
<script>
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import FMessage from 'fantom-vue-components/src/components/FMessage/FMessage.vue';
//import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import AUploadArea from '@/common/components/AUploadArea/AUploadArea.vue';
import { getCollections } from '@/modules/collections/queries/collections.js';
import { getCollectionDetails } from '@/modules/nfts/queries/collection.js';
import { getMemeTokens } from '@/modules/collections/queries/memetokens.js';
import { getMemeTokenDetails } from '@/modules/nfts/queries/memetoken.js';
//import { uploadTokenData } from '@/utils/upload';
//import { routeQueryMixin } from '@/common/mixins/route-query.js';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils';
import { notifications } from 'fantom-vue-components/src/plugins/notifications';
import AButton from '@/common/components/AButton/AButton';
import { checkSignIn } from '@/modules/account/auth';
import { setUnlockableContent } from '@/modules/nfts/mutations/unlockables';
import { bFromWei, toHex, toBigNumber } from '@/utils/big-number';
//import { estimateMintFeeGas } from '@/modules/nfts/queries/estimate-mint';
import { getCollectionImageUrl, getMemeTokenImageUrl } from '@/utils/url.js';
import { tokenExists } from '@/modules/nfts/queries/token';
import appConfig from '@/app.config.js';
import { imageValidator } from '@/common/components/AUploadArea/validators.js';
import CollectionDetailInfo from '@/modules/collections/components/CollectionDetailInfo/CollectionDetailInfo.vue';
//import { clone } from 'fantom-vue-components/src/utils';

export default {
    name: 'NftCreateForm',

    //mixins: [routeQueryMixin('filters')],

    components: { AUploadArea, AButton, FMessage, /*AppIconset,*/ ASignTransaction, CollectionDetailInfo },

    data() {
        return {
            values: {
                // collectionId: '0xac7a698a85102f7b1dc7345e7f17ebca74e5a9e7', // Default Volcano Collection
            },
            collections: [],
            collection: {},
            querycollection: null,
            memetokens: [],
            memetoken: {},
            querymemetoken: null,
            currentselection: {},
            imageFile: null,
            fileError: '',
            progressMessage: '',
            tx: {},
            mintingContract: null,
            tokenId: null,
            tokenUri: null,
            mintingErc1155: false,
            fee: null,
            isLoading: false,
            maxNFTSize: appConfig.settings.maxNFTSize,
        };
    },

    async created() {
        let mintableBy = this.$wallet.account || '0x0000000000000000000000000000000000000000';
        console.log('loading collections mintable by', mintableBy);
        const collections = await getCollections({ first: 5000 }, null, mintableBy);
        this.collections = [
            {
                label: 'Choose a collection',
                value: '0x0000000000000000000000000000000000000000',
                img: '',
            },
            ...collections.edges.map(edge => {
                return {
                    label: edge.node.name,
                    value: edge.node.contract,
                    img: getCollectionImageUrl(edge.node.contract),
                };
            }),
        ];
        console.log('collections mintable by loaded');

        console.log('loading memetokens mintable by', mintableBy);
        const memetokens = await getMemeTokens({ first: 5000 }, null, null);
        this.memetokens = [
            {
                label: 'Choose a meme',
                value: '0x0000000000000000000000000000000000000000',
                img: '',
            },
            ...memetokens.edges.map(edge => {
                return {
                    label: edge.node.name,
                    value: edge.node.contract,
                    img: getMemeTokenImageUrl(edge.node.contract),
                };
            }),
        ];
        console.log('memetokens mintable by loaded');
        if (this.querymemetoken) {
            console.log('query memetoken selecting', this.querymemetoken);
            this.values.memeToggle = true;
            this.values.memetokenId = this.querymemetoken;
            this.values.contract = this.querymemetoken;
            //let met = this.memetokens.find(memetoken => memetoken.value.toLowerCase() === this.querymemetoken.toLowerCase());
            //console.log('query memetoken selected', met);
            //if (met)
            //met.selected = true;
            ////this.memetoken = met;
        } else if (this.querycollection) {
            console.log('query collection selecting', this.querycollection);
            this.values.memeToggle = false;
            this.values.collectionId = this.querycollection;
            this.values.contract = this.querycollection;
            //let col = this.collections.find(collection => collection.value.toLowerCase() === this.querycollection.toLowerCase());
            //console.log('query collection selected', col);
            //if (col)
            //col.selected = true;
            ////this.collection = col;
        }
    },

    watch: {
        /*
		['values.collectionId']: {
            handler() {
                this.$nextTick(() => {
                    this.$refs.collectionslist.validate();
                });
            },
            immediate: true,
        },
        ['values.memetokenId']: {
            handler() {
                this.$nextTick(() => {
                    this.$refs.memetokenslist.validate();
                });
            },
            immediate: true,
        },
		*/

        $route: {
            async handler(value) {
                console.log('route: ', value);
                if (!this.__ignoreRouteChange) {
                    this.__ignorePropertyChange = true;
                    //console.log('route: ' + toString(value) + ' params: ' + toString(this.$route.params));
                    //console.log('route-query: ', value.query);
                    console.log('route-memetoken: ', value.query.memetoken);
                    console.log('route-collection: ', value.query.collection);
                    if (value.query.memetoken) {
                        //let met = this.memetokens.find(memetoken => memetoken.value.toLowerCase() === value.query.memetoken.toLowerCase());
                        //console.log('met', met);
                        //this.memetoken = met;
                        this.querymemetoken = value.query.memetoken;
                    } else if (value.query.collection) {
                        //let col = this.collections.find(collection => collection.value.toLowerCase() === value.query.collection.toLowerCase());
                        //console.log('col', col);
                        //this.collection = col;
                        this.querycollection = value.query.collection;
                    }
                    //let query;
                    //let transformCollectionQuery = await this.transformCollectionQuery(value.query, this.filters);
                    //console.log('transformCollectionQuery: ', transformCollectionQuery);
                    //query = clone(value.query);
                    //console.log('route-query: ', query);
                    //if (isArray(transformCollectionQuery)) {
                    //	query.collections = [...transformCollectionQuery];
                    //} else if (typeof transformCollectionQuery.collections === 'string') {
                    //	query.collections = [transformCollectionQuery.collections];
                    //}
                    //this[propertyName] = { ...query };

                    this.$nextTick(() => {
                        this.__ignorePropertyChange = false;
                    });
                }
            },
            immediate: true,
        },
    },

    methods: {
        royaltyValidator(_value) {
            if (_value === '') return false;
            _value = Number(_value);
            return !(_value >= 0 && _value <= 100);
        },

        allowMintUri() {
            return (
                !this.values.memeToggle &&
                this.currentselection &&
                this.currentselection.isErc1155 == false &&
                this.currentselection.hasBaseUri == false
            );
        },

        allowReplica() {
            return (
                this.currentselection &&
                this.currentselection.isErc1155 == true &&
                (this.currentselection.maxReplicaItems == null || this.currentselection.maxReplicaItems != 0)
            );
        },

        replicaValidator(_value) {
            if (_value === '') return true;
            _value = Number(_value);
            if (_value <= 0) return true;
            if (this.currentselection.maxReplicaItems == null || this.currentselection.maxReplicaItems == 0)
                return false;
            return _value > this.currentselection.maxReplicaItems;
        },

        isAddress(value) {
            return Web3.utils.isHexStrict(value) && Web3.utils.isAddress(value);
        },

        onSelectedCollection(item) {
            console.log('onSelectedCollection');
            if (item && item.value != '0x0000000000000000000000000000000000000000')
                this.onSelectedContract(item, false);
        },

        onSelectedMemeToken(item) {
            console.log('onSelectedMemeToken');
            if (item && item.value != '0x0000000000000000000000000000000000000000') this.onSelectedContract(item, true);
        },

        onSelectedContract(item, ismeme) {
            if (item) {
                if (!this.values.contract || !item.value || this.values.contract != item.value) {
                    this.currentselection = {};
                }
                this.values.memeToggle = ismeme;
                this.values.contract = item.value;
            }
        },

        async contractValidator(_contract) {
            if (!_contract) return false;
            this.currentselection = {};
            const contract = await (this.values.memeToggle
                ? getMemeTokenDetails(_contract, this.$wallet.account)
                : getCollectionDetails(_contract, this.$wallet.account));
            console.log('contract', contract);
            if (contract != null) {
                contract.isMeme = this.values.memeToggle;
                contract.factory = await this.getContractFactory(contract);
                if (!contract.isMeme) {
                    contract.mintFee = await this.collectionCreatorFee(_contract);
                    contract.mintFeeEth = contract.mintFee ? bFromWei(contract.mintFee).toNumber() : null;
                    contract.platformFee = await this.collectionPlatformFee(contract);
                    contract.platformFeeEth = contract.platformFee ? bFromWei(contract.platformFee).toNumber() : null;
                    contract.maxReplicaItems = contract.maxItemCount ? Number(contract.maxItemCount) : null;
                    contract.maxItems = contract.maxItems ? Number(contract.maxItems) : null;
                    contract.currentSupply = await this.collectionCurrentSupply(_contract, contract.isErc1155);
                    if (contract.platformFee && contract.mintFee) {
                        let totFee = toBigNumber(contract.platformFee).plus(toBigNumber(contract.mintFee));
                        this.fee = bFromWei(totFee).toNumber();
                    }
                } else {
                    contract.initialReserveEth = contract.initialReserve
                        ? bFromWei(contract.initialReserve).toNumber()
                        : null;
                    contract.stakingPoolSizeEth = contract.stakingPoolSize
                        ? bFromWei(contract.stakingPoolSize).toNumber()
                        : null;
                    contract.blocksAmountEth = contract.blocksAmount
                        ? bFromWei(contract.blocksAmount).toNumber()
                        : null;
                    contract.blocksFeeEth = contract.blocksFee ? bFromWei(contract.blocksFee).toNumber() : null;
                    contract.blocksMaxSupply = contract.blocksMaxSupply ? Number(contract.blocksMaxSupply) : null;
                    contract.blocksSupply = await this.memeBlocksSupply(_contract);
                    contract.cap = await this.memeTotalSupply(_contract);
                    contract.capEth = contract.cap ? bFromWei(contract.cap).toNumber() : null;
                    contract.supply = await this.memeCurrentSupply(_contract);
                    contract.supplyEth = contract.supply ? bFromWei(contract.supply).toNumber() : null;
                    this.fee = bFromWei(contract.blocksFee).toNumber();
                }
                this.currentselection = contract;
            } else {
                this.currentselection = {};
            }

            return contract == null;
        },

        async collectionCurrentSupply(_contract, isErc1155) {
            if (isErc1155) {
                const web3 = this.$wallet.wallet._web3;
                let minABI = [
                    {
                        inputs: [],
                        name: 'itemsSupply',
                        outputs: [
                            {
                                internalType: 'uint256',
                                name: '',
                                type: 'uint256',
                            },
                        ],
                        stateMutability: 'view',
                        type: 'function',
                    },
                ];

                let contract = new web3.eth.Contract(minABI, _contract);
                let val = await contract.methods.itemsSupply().call();
                return val;
            } else {
                const web3 = this.$wallet.wallet._web3;
                let minABI = [
                    {
                        inputs: [],
                        name: 'totalSupply',
                        outputs: [
                            {
                                internalType: 'uint256',
                                name: '',
                                type: 'uint256',
                            },
                        ],
                        stateMutability: 'view',
                        type: 'function',
                    },
                ];

                let contract = new web3.eth.Contract(minABI, _contract);
                let val = await contract.methods.totalSupply().call();
                return val;
            }
        },

        async collectionTokenUri(_contract, tokenId, isErc1155) {
            if (isErc1155) {
                const web3 = this.$wallet.wallet._web3;
                let minABI = [
                    {
                        inputs: [
                            {
                                internalType: 'uint256',
                                name: 'tokenId',
                                type: 'uint256',
                            },
                        ],
                        name: 'uri',
                        outputs: [
                            {
                                internalType: 'string',
                                name: '',
                                type: 'string',
                            },
                        ],
                        stateMutability: 'view',
                        type: 'function',
                    },
                ];

                let contract = new web3.eth.Contract(minABI, _contract);
                let val = await contract.methods.uri(tokenId).call();
                return val;
            } else {
                const web3 = this.$wallet.wallet._web3;
                let minABI = [
                    {
                        inputs: [
                            {
                                internalType: 'uint256',
                                name: 'tokenId',
                                type: 'uint256',
                            },
                        ],
                        name: 'tokenURI',
                        outputs: [
                            {
                                internalType: 'string',
                                name: '',
                                type: 'string',
                            },
                        ],
                        stateMutability: 'view',
                        type: 'function',
                    },
                ];

                let contract = new web3.eth.Contract(minABI, _contract);
                let val = await contract.methods.tokenURI(tokenId).call();
                return val;
            }
        },

        async memeBlocksSupply(_contract) {
            const web3 = this.$wallet.wallet._web3;
            let minABI = [
                {
                    inputs: [],
                    name: 'mintBlocksSupply',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ];

            let contract = new web3.eth.Contract(minABI, _contract);
            let val = await contract.methods.mintBlocksSupply().call();
            return val;
        },

        async memeTotalSupply(_contract) {
            const web3 = this.$wallet.wallet._web3;
            let minABI = [
                {
                    inputs: [],
                    name: 'cap',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ];

            let contract = new web3.eth.Contract(minABI, _contract);
            let val = await contract.methods.cap().call();
            return val;
        },

        async memeCurrentSupply(_contract) {
            const web3 = this.$wallet.wallet._web3;
            let minABI = [
                {
                    inputs: [],
                    name: 'totalSupply',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ];

            let contract = new web3.eth.Contract(minABI, _contract);
            let val = await contract.methods.totalSupply().call();
            return val;
        },

        async getContractFactory(contractinfo) {
            if (this.currentselection && this.currentselection.factory) return this.currentselection.factory;
            let f;
            try {
                const web3 = this.$wallet.wallet._web3;
                let minABI = [
                    {
                        inputs: [],
                        name: 'factory',
                        outputs: [
                            {
                                internalType: 'address',
                                name: '',
                                type: 'address',
                            },
                        ],
                        stateMutability: 'view',
                        type: 'function',
                    },
                ];

                let contract = new web3.eth.Contract(minABI, contractinfo.contract);
                f = await contract.methods.factory().call();
            } catch (error) {
                console.log('factory error', error);
            }
            console.log('factory', f);
            if (!f) {
                if (contractinfo.isMeme) {
                    f = process.env.VUE_APP_ERC20_FACTORY_CONTRACT_ADDRESS;
                } else if (contractinfo.isErc1155) {
                    f = process.env.VUE_APP_ERC1155_FACTORY_CONTRACT_ADDRESS;
                } else {
                    f = process.env.VUE_APP_ERC721_FACTORY_CONTRACT_ADDRESS;
                }
            }
            contractinfo.factory = f;
            return f;
        },

        async collectionPlatformFee(contractinfo) {
            let f = await this.getContractFactory(contractinfo);
            const web3 = this.$wallet.wallet._web3;
            let minABI = [
                {
                    inputs: [],
                    name: 'platformMintFee',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ];

            let contract = new web3.eth.Contract(minABI, f);
            let fee = await contract.methods.platformMintFee().call();
            return fee;
        },

        async collectionCreatorFee(_contract) {
            const web3 = this.$wallet.wallet._web3;
            let minABI = [
                {
                    inputs: [],
                    name: 'mintCreatorFee',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ];

            let contract = new web3.eth.Contract(minABI, _contract);
            let fee = await contract.methods.mintCreatorFee().call();
            return fee;
        },

        setTokenImage(_files) {
            let file = _files[0] || null;
            let fileError = '';

            if (file) {
                if (file.size > this.maxNFTSize) {
                    fileError = this.$t('maxFileSizeReached');
                    file = null;
                } else if (!imageValidator(file)) {
                    fileError = this.$t('badFileType');
                    file = null;
                }
            }

            this.fileError = fileError;

            this.imageFile = file;
        },

        onMemeToggle() {
            console.log('onMemeToggle');
            this.values.contract = null;
            this.currentselection = {};
        },

        canMint() {
            console.log('canMint currentselection', this.currentselection);
            if (this.currentselection) console.log('canMint currentselection.canMint', this.currentselection.canMint);
            return !(this.currentselection && this.currentselection.canMint);
        },

        async onSubmit(_data) {
            console.log('onSubmit', _data);
            /*
            if (!this.imageFile) {
                this.fileError = this.$t('nftcreate.fileError');
                return;
            } else {
                this.fileError = '';
            }
			*/

            this.isLoading = true;
            this.mintingContract = this.currentselection.contract;
            this.mintingErc1155 = this.currentselection.isErc1155;
            const val = _data.values;

            /*
            this.collection = this.collections.filter(col => col.value === val.collectionId)[0];
			
			const _metadata = {
                name: val.name,
                description: val.description,
                properties: {
                    symbol: val.symbol,
                    royalty: Number(val.royalty) ? val.royalty : null,
                    IP_Rights: val.linkToIp,
                    collection: this.collection.label,
                },
            };
			*/

            let signed = await checkSignIn();
            if (!signed) {
                console.error('not signed');
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.signInFirst'),
                });
                this.isLoading = false;
                return;
            }

            let tokenUri = val.tokenUri ? val.tokenUri : '';
            let replica = val.replica ? val.replica : 1;
            /*
			this.progressMessage = this.$t('nftcreate.uploading');
            try {
                tokenUri = await uploadTokenData(_metadata, this.imageFile);
            } catch (err) {
                console.error('uploadTokenData fail', err);
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.wasntUploaded') + err,
                });
                this.progressMessage = '';
                this.isLoading = false;
                return;
            }
			*/

            this.progressMessage = this.$t('nftcreate.signMint');
            notifications.add({
                type: 'info',
                text: this.$t('nftcreate.signMint'),
            });
            const web3 = new Web3();

            if (this.currentselection.isMeme) {
                //mintERC20TokenBlocks(token, receiver, count, refund, amount, web3Client)
                this.tx = contracts.mintERC20TokenBlocks(
                    this.currentselection.contract,
                    this.$wallet.account, // receiver
                    1,
                    true,
                    this.currentselection.blocksFee, // blockFee,
                    web3,
                    this.currentselection.factory // contract = process.env.VUE_APP_ERC20_FACTORY_CONTRACT_ADDRESS
                );
            } else {
                console.log('tokenUri', tokenUri);
                console.log('replica', replica);
                let totalfee = toBigNumber(this.currentselection.platformFee).plus(
                    toBigNumber(this.currentselection.mintFee)
                );
                if (this.currentselection.isErc1155) {
                    this.tx = contracts.createERC1155Token(
                        this.$wallet.account, // owner of the created token
                        [], // data
                        replica, // supply
                        toHex(totalfee), // platformFee + mintFee,
                        this.currentselection.contract,
                        web3
                    );
                } else {
                    this.tx = contracts.createERC721Token(
                        this.$wallet.account, // owner of the created token
                        tokenUri,
                        toHex(totalfee), // platformFee + mintFee,
                        this.currentselection.contract,
                        web3
                    );
                }
            }
        },

        async onMintTransactionStatus(payload) {
            console.log('onMintTransactionStatus', payload);
            if (payload.status === 'error') {
                console.error('mintTransaction failed', payload);
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.mintingError'),
                });
                this.progressMessage = '';
                this.isLoading = false;
                return;
            }
            if (payload.status === 'success') {
                console.log('minting transaction succeed - txHash', payload.data);
                await this.waitForTokenIdAndFinish(payload.data);
            }
        },

        async waitForTokenIdAndFinish(txHash) {
            if (!this.values.memeToggle) {
                try {
                    this.tokenId = await this.getMintedTokenId(txHash);
                } catch (e) {
                    console.error('getMintedTokenId failed', e);
                    notifications.add({
                        type: 'error',
                        text: this.$t('nftcreate.noNewTokenId'),
                    });
                    this.progressMessage = '';
                    this.isLoading = false;
                    return;
                }
                if (this.tokenId === null) {
                    // token receipt/tokenId not available yet
                    this.progressMessage = this.$t('nftcreate.waitingForTokenId');
                    // repeat later again
                    setTimeout(() => this.waitForTokenIdAndFinish(txHash), 1000);
                    return;
                }

                this.tokenUri = await this.collectionTokenUri(this.mintingContract, this.tokenId, this.mintingErc1155);
                console.log('minted tokenUri', this.tokenUri);

                // tokedId loaded
                if (this.values.unlockContentToggle) {
                    try {
                        let res = await setUnlockableContent(
                            this.mintingContract,
                            this.tokenId,
                            this.values.unlockContent
                        );
                        console.log('setUnlockableContent', res);
                    } catch (e) {
                        console.error('setUnlockableContent failed', e);
                        notifications.add({
                            type: 'error',
                            text: this.$t('nftcreate.unlockableNotAttached'),
                        });
                    }
                }

                notifications.add({
                    type: 'success',
                    text: this.$t('nftcreate.success'),
                });
                await this.waitForScanAndRedirect();
            } else {
                try {
                    let receiver = await this.getMintedBlockReceiver(txHash);
                    console.log('receiver', receiver);
                } catch (e) {
                    console.error('getMintedBlockReceiver failed', e);
                    notifications.add({
                        type: 'error',
                        text: this.$t('nftcreate.noNewTokenId'),
                    });
                    this.progressMessage = '';
                    this.isLoading = false;
                    return;
                }
                notifications.add({
                    type: 'success',
                    text: this.$t('nftcreate.success'),
                });
                this.tokenId = null;
                this.fee = null;
                this.progressMessage = '';
                this.isLoading = false;
            }
        },

        async waitForScanAndRedirect() {
            console.log('waiting for scanning token', this.mintingContract, this.tokenId);
            let exists = await tokenExists(this.mintingContract, this.tokenId);
            if (!exists) {
                // token not scanned by the server yet
                this.progressMessage = this.$t('nftcreate.scanWaiting');
                setTimeout(() => this.waitForScanAndRedirect(), 1000);
                return;
            }

            // new token scanned by the server
            await this.$router.push({
                name: 'nft-detail',
                params: { tokenContract: this.mintingContract, tokenId: this.tokenId },
            });
        },

        async getMintedTokenId(txHash) {
            const web3 = this.$wallet.wallet._web3;
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            console.log('mint getTransactionReceipt', txHash, receipt);
            if (receipt === null) {
                console.log('getTransactionReceipt return null receipt for ' + txHash + ' - not in chain yet?');
                return null;
            }

            const tokenId = this.mintingErc1155
                ? contracts.decodeMintedErc1155TokenId(receipt, web3)
                : contracts.decodeMintedErc721TokenId(receipt, web3);
            console.log('tokenId', tokenId, toHex(tokenId));
            return toHex(tokenId);
        },

        async getMintedBlockReceiver(txHash) {
            const web3 = this.$wallet.wallet._web3;
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            console.log('mint getTransactionReceipt', txHash, receipt);
            if (receipt === null) {
                console.log('getTransactionReceipt return null receipt for ' + txHash + ' - not in chain yet?');
                return null;
            }

            const receiver = contracts.decodeMintedErc20Block(receipt, web3);
            //console.log('receiver', receiver, toHex(receiver));
            return receiver;
        },

        imageValidator,
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
