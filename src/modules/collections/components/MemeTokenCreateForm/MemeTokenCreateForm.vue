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

        <f-form-input
            :label="$t('memetokencreateform.uri')"
            field-size="large"
            type="text"
            name="uri"
            :placeholder="$t('memetokencreateform.provideUri')"
            required
            validate-on-input
        />

        <f-form-input
            :label="$t('memetokencreateform.capAmount')"
            :validator="capAmountValidator"
            validate-on-change
            validate-on-input
            :placeholder="$t('memetokencreateform.provideCapAmount')"
            :error-message="$t('memetokencreateform.capAmountErr')"
            type="number"
            name="capAmount"
            field-size="large"
            required
        />

        <f-form-input
            :label="$t('memetokencreateform.initialAmount')"
            :validator="initialAmountValidator"
            validate-on-change
            validate-on-input
            :placeholder="$t('memetokencreateform.provideInitialAmount')"
            :error-message="$t('memetokencreateform.initialAmountErr')"
            type="number"
            name="initialAmount"
            field-size="large"
            required
        />

        <f-form-input
            :label="$t('memetokencreateform.initialReceiver')"
            type="text"
            name="initialReceiver"
            field-size="large"
            :placeholder="$t('memetokencreateform.provideInitialReceiver')"
            required
            validate-on-input
            :validator="addressValidator"
        />

        <f-form-input
            :label="$t('memetokencreateform.mintBlocks')"
            :validator="mintBlocksValidator"
            validate-on-change
            validate-on-input
            :placeholder="$t('memetokencreateform.provideMintBlocks')"
            :error-message="$t('memetokencreateform.mintBlocksErr')"
            type="number"
            name="mintBlocks"
            field-size="large"
            required
        />
        <div class="memetokencreateform__umintBlocksdesc">
            {{ $t('memetokencreateform.mintBlocksdesc') }}
        </div>

        <f-form-input
            :label="$t('memetokencreateform.mintBlocksFee')"
            :validator="mintBlocksFeeValidator"
            validate-on-change
            validate-on-input
            :placeholder="$t('memetokencreateform.provideMintBlocksFee')"
            :error-message="$t('memetokencreateform.mintBlocksFeeErr')"
            type="number"
            name="mintBlocksFee"
            field-size="large"
            required
        />
        <div class="memetokencreateform__umintBlocksFeedesc">
            {{ $t('memetokencreateform.mintBlocksFeedesc') }}
        </div>

        <div class="memetokencreateform_group">
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
import { notifications } from 'fantom-vue-components/src/plugins/notifications.js';
import { uploadToken } from '@/utils/upload';
import { checkSignIn } from '@/modules/account/auth';
import AButton from '@/common/components/AButton/AButton';
import { focusElem } from 'fantom-vue-components/src/utils/aria.js';
import { imageValidator } from '@/common/components/AUploadArea/validators.js';
import FMessage from 'fantom-vue-components/src/components/FMessage/FMessage.vue';
import Web3 from 'web3';
//import { bFromWei, toHex } from '@/utils/big-number';
//import { toHex } from '@/utils/big-number';
import contracts from '@/utils/artion-contracts-utils';
import { bToTokenValue, toHex } from '@/utils/big-number.js';

export default {
    name: 'MemeTokenCreateForm',

    components: { AUploadArea, AButton, FMessage, ASignTransaction },

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
        addressValidator(_value) {
            return !(Web3.utils.isHexStrict(_value) && Web3.utils.isAddress(_value))
                ? this.$t('memetokencreateform.invalidAddress')
                : '';
        },

        mintBlocksValidator(_value) {
            if (_value === '') return true;
            _value = Number(_value);
            return !(_value > 0);
        },

        mintBlocksFeeValidator(_value) {
            if (_value === '') return true;
            const val = parseFloat(_value);
            if (isNaN(val) || val <= 0) {
                return true;
            }
            return false;
        },

        initialAmountValidator(_value) {
            if (_value === '') return true;
            _value = Number(_value);
            return !(_value >= 0);
        },

        capAmountValidator(_value) {
            if (_value === '') return true;
            _value = Number(_value);
            return !(_value >= Number(this.values.initialAmount));
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
                symbol: vals.symbol,
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

            const amount = await this.getErc20FactoryContractFee();
            //alert(amount);

            //createERC20TokenContract(nftName, nftSymbol, amount, uri, initialReceiver, initialAmount, capAmount, mintBlocks, mintBlocksFee, web3Client)
            this.tx = contracts.createERC20TokenContract(
                vals.name,
                vals.symbol,
                amount,
                vals.uri,
                vals.initialReceiver,
                toHex(bToTokenValue(vals.initialAmount, 18)), //vals.initialAmount,
                toHex(bToTokenValue(vals.capAmount, 18)), //vals.capAmount,
                vals.mintBlocks,
                toHex(bToTokenValue(vals.mintBlocksFee, 18)), //vals.mintBlocksFee,
                web3
            );

            // not needed I guess..
            // we are observing Factory::event ContractCreated(address creator, address nft, _isprivate)

            /*
            try {
                await uploadToken(this.collectionApplication, this.imageFile);
            } catch (err) {
                console.error('uploadToken failed', err);
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
                await uploadToken(this.collectionApplication, this.imageFile);
            } catch (err) {
                console.error('uploadToken failed', err);
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
            const collectionAddress = contracts.decodeMemeTokenCreatedAddress(receipt, web3);
            //console.log('collectionAddress', collectionAddress, toHex(collectionAddress));
            console.log('collectionAddress', collectionAddress);
            //return toHex(collectionAddress);
            return collectionAddress;
        },

        async getErc20FactoryContractFee() {
            const web3 = this.$wallet.wallet._web3;
            let minABI = [
                {
                    inputs: [],
                    name: 'platformContractFee',
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

            let contract = new web3.eth.Contract(minABI, process.env.VUE_APP_ERC20_FACTORY_CONTRACT_ADDRESS);
            let fee = await contract.methods.platformContractFee().call();
            return fee;
        },

        imageValidator,
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
