<template>
    <f-form class="memetokencreateform" v-model="values" @submit="onSubmit" :aria-label="$t('createMemeToken')">
        <div class="memetokencreateform_title">
            <h1 data-focus>{{ $t('memetokencreateform.createMemeToken') }}</h1>
        </div>
        <div class="memetokencreateform__desc">
            {{ $t('memetokencreateform.useOwnerAddressOfCollection') }}
        </div>
        <a-upload-area :validator="imageValidator" @input="setCollectionImage" class="auploadarea-nobackground">
            {{ $t('memetokencreateform.alsoBeUsedForNavigation') }}
        </a-upload-area>
        <div v-if="fileError" class="pat-5 flex juc-center">
            <f-message type="error" with-icon>{{ fileError }}</f-message>
        </div>

        <f-form-input
            type="text"
            field-size="large"
            name="name"
            :label="$t('memetokencreateform.name')"
            :placeholder="$t('memetokencreateform.collectionName')"
            required
            validate-on-input
        />
        <f-form-input
            :label="$t('memetokencreateform.symbol')"
            field-size="large"
            type="text"
            name="symbol"
            :placeholder="$t('memetokencreateform.provideYourSymbol')"
            required
            validate-on-input
        />		
        <f-form-input
            :label="$t('memetokencreateform.description')"
            field-size="large"
            type="textarea"
            name="description"
            :placeholder="$t('memetokencreateform.provideYourDescription')"
            required
            validate-on-input
            rows="5"
        />
		<f-form-input type="toggle" 
			:label="$t('memetokencreateform.publicMintable')" 
			v-if="false"
			name="publicMintableToogle" 
		/>
		<f-form-input
			:label="$t('memetokencreateform.publicMintFee')"
			v-if="values.publicMintableToogle"
            :validator="publicMintFeeValidator"
            validate-on-change
            validate-on-input
            :error-message="$t('memetokencreateform.publicMintFeeErr')"
            type="number"
            name="publicMintFee"
            field-size="large"
		/>		
		<f-form-input
			:label="$t('memetokencreateform.itemsUriPath')"
			v-if="values.publicMintableToogle"
            field-size="large"
            type="text"
            name="itemsUriPath"
            :placeholder="$t('memetokencreateform.provideItemsUriPath')"
            required
            validate-on-input
		/>				
        <f-form-input
            :validator="royaltyValidator"
            validate-on-change
            validate-on-input
            :error-message="$t('memetokencreateform.royaltyErr')"
            type="number"
            name="royalty"
            field-size="large"
        >
            <template #label>
                {{ $t('memetokencreateform.royalty') }}
                <span class="label_btn" :data-tooltip="$t('memetokencreateform.royaltyTooltip')">
                    <app-iconset
                        icon="question"
                        :aria-hidden="false"
                        :aria-label="$t('memetokencreateform.royaltyTooltip')"
                    />
                </span>
            </template>
        </f-form-input>
        <f-form-input
            type="text"
            name="feeRecipient"
            field-size="large"
            :placeholder="$t('memetokencreateform.feeRecipient')"
            required
            validate-on-input
            :validator="addressValidator"
        >
            <template #label>
                {{ $t('memetokencreateform.feeRecipient') }}
                <span class="label_btn" :data-tooltip="$t('memetokencreateform.feesTooltip')">
                    <app-iconset
                        icon="question"
                        :aria-hidden="false"
                        :aria-label="$t('memetokencreateform.feesTooltip')"
                    />
                </span>
            </template>
        </f-form-input>
        <div class="memetokencreateform_categories">
            <div class="memetokencreateform_categories_label">{{ $t('memetokencreateform.category') }}</div>
            <AddCategory @change="values.categories = $event" />
        </div>
        <div class="memetokencreateform_group">
            <!--
			<f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('memetokencreateform.enterCollection')"
                name="contract"
                no-label
                validate-on-input
                :validator="addressValidator"
            >
                <template #prefix>
                    <app-iconset icon="nft" size="24px" />
                </template>
            </f-form-input>
			-->			
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('memetokencreateform.enterWebsite')"
                name="siteUrl"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="web" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('memetokencreateform.enterDiscord')"
                name="discord"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="discord" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('memetokencreateform.enterTwitter')"
                name="twitterHandle"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="twitter-grey" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('memetokencreateform.enterInstagram')"
                name="instagramHandle"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="instagram" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('memetokencreateform.enterMedium')"
                name="mediumHandle"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="medium" size="24px" />
                </template>
            </f-form-input>
            <f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('memetokencreateform.enterTelegram')"
                name="telegram"
                no-label
            >
                <template #prefix>
                    <app-iconset icon="telegram" size="24px" />
                </template>
            </f-form-input>
        </div>
        <f-form-input
            type="email"
            name="email"
            field-size="large"
            :placeholder="$t('memetokencreateform.emailAddress')"
            required
            validate-on-input
            :validator="emailValidator"
        >
            <template #label>
                {{ $t('memetokencreateform.contactEmail') }}
                <span class="label_btn" :data-tooltip="$t('memetokencreateform.emailTooltip')">
                    <app-iconset
                        icon="question"
                        :aria-hidden="false"
                        :aria-label="$t('memetokencreateform.emailTooltip')"
                    />
                </span>
            </template>
        </f-form-input>
        <div v-if="fileError" class="pat-5 flex juc-center">
            <f-message type="error" with-icon>{{ fileError }}</f-message>
        </div>
        <div class="memetokencreateform_btn">
            <a-button type="submit" :loading="isLoading">
                {{ $t('memetokencreateform.submit') }}
            </a-button>
        </div>
		<a-sign-transaction :tx="tx" @transaction-status="onMintTransactionStatus" />
    </f-form>
</template>

<script>
import ASignTransaction from '@/common/components/ASignTransaction/ASignTransaction.vue';
import AUploadArea from '@/common/components/AUploadArea/AUploadArea.vue';
import AddCategory from '@/modules/collections/components/AddCategory/AddCategory.vue';
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { uploadCollection } from '@/utils/upload';
import { checkSignIn } from '@/modules/account/auth';
import AButton from '@/common/components/AButton/AButton';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
import { imageValidator } from '@/common/components/AUploadArea/validators.js';
import FMessage from 'fantom-vue-components/src/components/FMessage/FMessage.vue';
import Web3 from 'web3';
//import { bFromWei, toHex } from '@/utils/big-number';
//import { toHex } from '@/utils/big-number';
import contracts from '@/utils/artion-contracts-utils';

export default {
    name: 'MemeTokenCreateForm',

    components: { AUploadArea, AddCategory, AButton, FMessage, ASignTransaction },

    data() {
        return {
            values: {
                categories: [],
            },		
            progressMessage: '',
            tx: {},
            collectionAddress: null,
			collectionApplication: {},
            fee: null,			
            imageFile: null,
            isLoading: false,
            fileError: '',
            emailRE: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        };
    },

    computed: {
        isDisabled() {
            return (
                this.values.name === '' ||
                this.values.description === '' ||
                this.values.contract === '' ||
                this.values.feeRecipient === '' ||
                this.values.email === '' ||
                !this.imageFile
            );
        },
    },

    mounted() {
        focusElem(this.$el);
    },

    methods: {
        royaltyValidator(_value) {
            if (_value === '') return _value;
            _value = Number(_value);
            return !(_value >= 1 && _value <= 100);
        },
		
        publicMintFeeValidator(_value) {
            if (_value === '') return _value;
            _value = Number(_value);
            return !(_value >= 0);
        },		

        addressValidator(_value) {
            return !(Web3.utils.isHexStrict(_value) && Web3.utils.isAddress(_value))
                ? this.$t('memetokencreateform.invalidAddress')
                : '';
        },

        emailValidator(_value) {
            return !this.emailRE.test(_value) ? this.$t('memetokencreateform.invalidEmail') : '';
        },

        setCollectionImage(_files) {
            this.imageFile = _files[0] || null;

            if (this.imageFile) {
                if (!imageValidator(this.imageFile)) {
                    this.fileError = this.$t('badFileType');
                    this.imageFile = null;
                } else {
                    this.fileError = '';
                }
            }
        },

        async onSubmit(_data) {
            console.log('onSubmit', _data);
            const vals = _data.values;

            if (!this.imageFile) {
                this.fileError = this.$t('memetokencreateform.fileError');
                return;
            } else {
                this.fileError = '';
            }

            this.isLoading = true;

            let signed = await checkSignIn();
            if (!signed) {
                console.error('not signed');
                notifications.add({
                    type: 'error',
                    text: this.$t('memetokencreateform.signInFirst'),
                });
                this.isLoading = false;
                return;
            }				
			
            this.progressMessage = this.$t('memetokencreateform.signMint');
            notifications.add({
                type: 'info',
                text: this.$t('memetokencreateform.signMint'),
            });
			
            this.collectionApplication = {
                contract: null,
                name: vals.name,
                description: vals.description,
                royalty: vals.royalty ? vals.royalty : 0,
                feeRecipient: vals.feeRecipient,
                categories: vals.categories,
                discord: vals.discord,
                email: vals.email,
                telegram: vals.telegram,
                siteUrl: vals.siteUrl,
                mediumHandle: vals.mediumHandle,
                twitterHandle: vals.twitterHandle,
                instagramHandle: vals.instagramHandle,
            };			
			
            const web3 = new Web3();			
			// itemsUriPath
            this.tx = contracts.createERC721Collection(
                vals.name,
                vals.symbol, // TODO.. symbol
                '50000000000000000',  // TODO.. amount as platformFee for contract creation				
				!vals.publicMintableToogle, // isPrivate
				(vals.publicMintableToogle) ? vals.publicMintFee : 0, // mintFee
				vals.royalty ? vals.royalty : 0, // creatorFee
				vals.feeRecipient,	// FeeRecipient
                web3
            );	
			
			// not needed I guess..
			// we are observing Factory::event ContractCreated(address creator, address nft, _isprivate)

			/*
            try {
                await uploadCollection(this.collectionApplication, this.imageFile);
            } catch (err) {
                console.error('uploadCollection failed', err);
                notifications.add({
                    type: 'error',
                    text: this.$t('memetokencreateform.wasntUploaded') + err,
                });
                this.isLoading = false;
                return;
            }

            notifications.add({
                type: 'success',
                text: this.$t('memetokencreateform.success'),
            });
            this.isLoading = false;	
			*/			
        },
				
        async onMintTransactionStatus(payload) {
            console.log('onMintTransactionStatus', payload);
            if (payload.status === 'error') {
                console.error('mintTransaction failed', payload);
                notifications.add({
                    type: 'error',
                    text: this.$t('memetokencreateform.mintingError'),
                });
                this.progressMessage = '';
                this.isLoading = false;
                return;
            }
            if (payload.status === 'success') {
                console.log('minting transaction succeed - txHash', payload.data);
                await this.waitForCollectionAddressAndFinish(payload.data);
            }
        },		
		
        async waitForCollectionAddressAndFinish(txHash) {
            try {
                this.collectionAddress = await this.getCollectionAddress(txHash);
            } catch (e) {
                console.error('getCollectionAddress failed', e);
                notifications.add({
                    type: 'error',
                    text: this.$t('memetokencreateform.noCollectionAddress'),
                });
                this.progressMessage = '';
                this.isLoading = false;
                return;
            }
            if (this.collectionAddress === null) {
                // token receipt/collectionAddress not available yet
                this.progressMessage = this.$t('memetokencreateform.waitingCollectionAddress');
                // repeat later again
                setTimeout(() => this.waitForCollectionAddressAndFinish(txHash), 1000);
                return;
            }

            // collectionAddress loaded

            //notifications.add({
            //    type: 'success',
            //    text: this.$t('memetokencreateform.success'),
            //});
            //await this.waitForScanAndRedirect();			
			
			this.collectionApplication.contract = this.collectionAddress;
			
			//alert('uploadCreatedCollection: ' + JSON.stringify(this.collectionApplication));			
			console.log('Uploading - collectionApplication: ', JSON.stringify(this.collectionApplication));
			
            try {
                await uploadCollection(this.collectionApplication, this.imageFile);
            } catch (err) {
                console.error('uploadCollection failed', err);
                notifications.add({
                    type: 'error',
                    text: this.$t('memetokencreateform.wasntUploaded') + err,
                });
                this.isLoading = false;
                return;
            }

            notifications.add({
                type: 'success',
                text: this.$t('memetokencreateform.success'),
            });
            this.isLoading = false;				
        },		
		
        async getCollectionAddress(txHash) {
            const web3 = this.$wallet.wallet._web3;
            const receipt = await web3.eth.getTransactionReceipt(txHash);
            console.log('create getTransactionReceipt', txHash, receipt);
            if (receipt === null) {
                console.log('getTransactionReceipt return null receipt for ' + txHash + ' - not in chain yet?');
                return null;
            }
            const collectionAddress = contracts.decodeContractCreatedAddress(receipt, web3);
            //console.log('collectionAddress', collectionAddress, toHex(collectionAddress));
			console.log('collectionAddress', collectionAddress);
            //return toHex(collectionAddress);
			return collectionAddress;
        },		

        imageValidator,
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
