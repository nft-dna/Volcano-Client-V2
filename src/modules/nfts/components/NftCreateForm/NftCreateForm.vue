<template>
    <f-form v-model="values" class="nftcreate_form" @submit="onSubmit" :aria-label="$t('page.nftCreate.title')">
        <div class="nftcreate_col">
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
        </div>
        <div class="nftcreate_col">
            <div class="nftcreate_wrap">
                <div class="nftcreate_panel">
                    <f-form-input type="toggle" :label="$t('nftcreate.memeToogle')" name="memeToogle" />

                    <f-form-input
                        v-if="!values.memeToogle"
                        ref="collections"
                        type="a-dropdown-listbox"
                        name="collectionId"
                        :label="$t('nftcreate.collection')"
                        class="collection_list"
                        :data="collections"
                        :validator="collectionValidator"
                        :error-message="$t('nftcreate.collectionErr')"
                        required
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
                        v-if="values.memeToogle"
                        ref="memetokens"
                        type="a-dropdown-listbox"
                        name="memetokenId"
                        :label="$t('nftcreate.memetoken')"
                        class="memetokens_list"
                        :data="memetokens"
                        :validator="memetokenValidator"
                        :error-message="$t('nftcreate.memetokenErr')"
                        required
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
                        :label="$t('nftcreate.name')"
                        field-size="large"
                        type="text"
                        name="name"
                        required
                        v-if="false"
                    />
                    <f-form-input
                        :label="$t('nftcreate.tokenUri')"
                        field-size="large"
                        type="text"
                        name="tokenUri"
                        :placeholder="$t('nftcreate.tokenUriPlaceholder')"
                        required
                    />
                    <f-form-input
                        :label="$t('nftcreate.symbol')"
                        field-size="large"
                        type="text"
                        name="symbol"
                        class="fforminput_symbol"
                        v-if="false"
                    />
                    <f-form-input
                        :label="$t('nftcreate.description')"
                        field-size="large"
                        type="textarea"
                        name="description"
                        rows="5"
                        v-if="false"
                    />
                </div>
                <div class="nftcreate_panel">
                    <f-form-input
                        :validator="royaltyValidator"
                        validate-on-change
                        validate-on-input
                        :error-message="$t('nftcreate.royaltyErr')"
                        @input.native="onRoyaltyInput"
                        type="number"
                        name="royalty"
                        field-size="large"
                        v-if="false"
                    >
                        <template #label>
                            {{ $t('nftcreate.royalty') }}
                            <span class="label_btn" :data-tooltip="$t('nftcreate.royaltyTooltip')">
                                <app-iconset
                                    icon="question"
                                    :aria-hidden="false"
                                    :aria-label="$t('nftcreate.royaltyTooltip')"
                                />
                            </span>
                        </template>
                    </f-form-input>
                    <f-form-input field-size="large" type="text" name="linkToIp" v-if="false">
                        <template #label>
                            {{ $t('nftcreate.linkToIp') }}
                            <span class="label_btn" :data-tooltip="$t('nftcreate.linkToIpTooltip')">
                                <app-iconset
                                    icon="question"
                                    :aria-hidden="false"
                                    :aria-label="$t('nftcreate.linkToIpTooltip')"
                                />
                            </span>
                        </template>
                    </f-form-input>
                    <f-form-input type="toggle" :label="$t('nftcreate.unlockContent')" name="unlockContentToogle" />
                    <f-form-input
                        :label="$t('nftcreate.unlockContent')"
                        v-if="values.unlockContentToogle"
                        field-size="large"
                        type="textarea"
                        name="unlockContent"
                    />
                </div>
            </div>
            <div v-if="fileError" class="pat-5 flex juc-center">
                <f-message type="error" with-icon>{{ fileError }}</f-message>
            </div>
            <div v-if="progressMessage" class="pat-5 flex juc-center progress-message">
                <f-message type="info" with-icon>{{ progressMessage }}</f-message>
            </div>
            <div v-if="fee !== null" class="nftcreate_info">
                <f-message type="info" with-icon>{{ $t('nftcreate.messageFtm', { fee }) }}</f-message>
            </div>
            <div class="nftcreate_btn">
                <a-button type="submit" size="large" :loading="isLoading">
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
import AppIconset from '@/modules/app/components/AppIconset/AppIconset';
import AUploadArea from '@/common/components/AUploadArea/AUploadArea.vue';
import { getCollections } from '@/modules/collections/queries/collections.js';
import { getCollectionDetails } from '@/modules/nfts/queries/collection.js';
import { getMemeTokens } from '@/modules/collections/queries/memetokens.js';
import { getMemeTokenDetails } from '@/modules/nfts/queries/memetoken.js';
//import { uploadTokenData } from '@/utils/upload';
import Web3 from 'web3';
import contracts from '@/utils/artion-contracts-utils';
import { notifications } from 'fantom-vue-components/src/plugins/notifications';
import AButton from '@/common/components/AButton/AButton';
import { checkSignIn } from '@/modules/account/auth';
import { setUnlockableContent } from '@/modules/nfts/mutations/unlockables';
import { bFromWei, toHex } from '@/utils/big-number';
import { estimateMintFeeGas } from '@/modules/nfts/queries/estimate-mint';
import { getCollectionImageUrl, getMemeTokenImageUrl } from '@/utils/url.js';
import { tokenExists } from '@/modules/nfts/queries/token';
import appConfig from '@/app.config.js';
import { imageValidator } from '@/common/components/AUploadArea/validators.js';

export default {
    name: 'NftCreateForm',

    components: { AUploadArea, AButton, FMessage, AppIconset, ASignTransaction },

    data() {
        return {
            values: {
                // collectionId: '0xac7a698a85102f7b1dc7345e7f17ebca74e5a9e7', // Default Volcano Collection
            },
            collections: [],
            collection: {},
            memetokens: [],
            memetoken: {},
            imageFile: null,
            fileError: '',
            progressMessage: '',
            tx: {},
            tokenId: null,
            isLoading: false,
            fee: null,
            maxNFTSize: appConfig.settings.maxNFTSize,
        };
    },

    async created() {
        let mintableBy = this.$wallet.account || '0x0000000000000000000000000000000000000000';
        console.log('loading collections mintable by', mintableBy);
        const collections = await getCollections({ first: 5000 }, null, mintableBy);
        this.collections = collections.edges.map(edge => {
            return {
                label: edge.node.name,
                value: edge.node.contract,
                img: getCollectionImageUrl(edge.node.contract),
            };
        });
        /*
		if (Object.keys(this.collections).length > 0) {
			this.$refs.collections.selectedIndex = 0;	
			alert(JSON.stringify(this.collections[0]))
			this.$refs.collections.validate();
		}
		*/
        const memetokens = await getMemeTokens({ first: 5000 }, null, null);
        this.memetokens = memetokens.edges.map(edge => {
            return {
                label: edge.node.name,
                value: edge.node.contract,
                img: getMemeTokenImageUrl(edge.node.contract),
            };
        });
        /*
		if (Object.keys(this.memetokens).length > 0) {
			this.$refs.memetokens.selectedIndex = 0;
			alert(JSON.stringify(this.memetokens[0]))
			this.$refs.memetokens.validate();
		}
		*/
    },

    watch: {
        ['values.collectionId']: {
            handler() {
                this.$nextTick(() => {
                    this.$refs.collections.validate();
                });
            },
            immediate: true,
        },
        ['values.memetokenId']: {
            handler() {
                this.$nextTick(() => {
                    this.$refs.memetokens.validate();
                });
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

        async collectionValidator(_collectionId) {
            //alert('collectionValidator: ' + _collectionId);
            /* MM		
            const estimation = await this.getEstimation(_collectionId, 1000);
            console.log('collectionValidator', _collectionId, 'estimation error:', estimation.error);
            await this.setFee(estimation.platformFee);
            return estimation.error != null;
			*/
            console.log('collectionValidator', _collectionId);
            const collection = await getCollectionDetails(_collectionId, this.$wallet.account);
            console.log('collection', collection);
            await this.setFee(0);
            return collection == null;
        },

        async memetokenValidator(_collectionId) {
            //alert('memetokenValidator: ' + _collectionId);
            /* MM		
            const estimation = await this.getEstimation(_collectionId, 1000);
            console.log('collectionValidator', _collectionId, 'estimation error:', estimation.error);
            await this.setFee(estimation.platformFee);
            return estimation.error != null;
			*/
            console.log('memetokenValidator', _collectionId);
            const memetoken = await getMemeTokenDetails(_collectionId, this.$wallet.account);
            console.log('memetoken', memetoken);
            await this.setFee(0);
            return memetoken == null;
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
            const val = _data.values;

            this.collection = this.collections.filter(col => col.value === val.collectionId)[0];

            /*
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

            /*
			this.progressMessage = this.$t('nftcreate.estimatingFeeGas');
            const royalty = this.getRoyalty();
            const estimation = await this.getEstimation(val.collectionId, royalty);
            console.log('estimation', estimation);
            if (estimation.error != null) {
                console.error('estimateMintFeeGas (server estimation) fail', estimation);
                notifications.add({
                    type: 'error',
                    text: this.$t('nftcreate.collectionErr') + ' ' + estimation.error,
                });
                this.progressMessage = '';
                this.isLoading = false;
                return;
            }
			*/

            let tokenUri = val.tokenUri;
            /*
			this.progressMessage = this.$t('nftcreate.uploading');
            let tokenUri;
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
            /*
			this.tx = contracts.createERC721TokenWithRoyalty(
                this.$wallet.account, // owner of the created token
                tokenUri,
                estimation.platformFee,
                val.collectionId,
                this.$wallet.account, // royalty recipient
                royalty,
                web3
            );
			*/
            this.tx = contracts.createERC721Token(
                this.$wallet.account, // owner of the created token
                tokenUri,
                0, // estimation.platformFee,
                val.collectionId,
                web3
            );
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

            // tokedId loaded
            if (this.values.unlockContentToogle) {
                try {
                    let res = await setUnlockableContent(
                        this.collection.value,
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
        },

        async waitForScanAndRedirect() {
            console.log('waiting for scanning token', this.collection.value, this.tokenId);
            let exists = await tokenExists(this.collection.value, this.tokenId);
            if (!exists) {
                // token not scanned by the server yet
                this.progressMessage = this.$t('nftcreate.scanWaiting');
                setTimeout(() => this.waitForScanAndRedirect(), 1000);
                return;
            }

            // new token scanned by the server
            await this.$router.push({
                name: 'nft-detail',
                params: { tokenContract: this.collection.value, tokenId: this.tokenId },
            });
        },

        async setFee(platformFee) {
            if (platformFee) {
                this.fee = bFromWei(platformFee).toNumber();
            } else {
                this.fee = null;
            }
        },

        /**
         * @param {string} collectionId
         * @param {number} royalty
         * @return {Promise<Object>}
         */
        getEstimation(collectionId, royalty = 0) {
            return estimateMintFeeGas(
                this.$wallet.account || '0x0000000000000000000000000000000000000001',
                collectionId,
                'https://minter.artion.io/default/access/minter/estimation.json',
                royalty
            );
        },

        async getMintedTokenId(txHash) {
            const web3 = this.$wallet.wallet._web3;
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            console.log('mint getTransactionReceipt', txHash, receipt);
            if (receipt === null) {
                console.log('getTransactionReceipt return null receipt for ' + txHash + ' - not in chain yet?');
                return null;
            }
            const tokenId = contracts.decodeMintedNftTokenId(receipt, web3);
            console.log('tokenId', tokenId, toHex(tokenId));
            return toHex(tokenId);
        },

        /**
         * @return {number}
         */
        getRoyalty() {
            return Math.round(Number(this.values.royalty || 0) * 100);
        },

        /**
         * @param {InputEvent} event
         */
        onRoyaltyInput(event) {
            const { value } = event.target;

            // allow max 4 characters
            if (value.length > 4) {
                event.target.value = value.slice(0, 4);
            }
        },

        imageValidator,
    },
};
</script>
<style lang="scss">
@use 'style';
</style>
