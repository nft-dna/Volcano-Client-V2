<template>
    <f-form class="collectioncreateform" v-model="values" @submit="onSubmit" :aria-label="$t('createCollection')">
        <div class="collectioncreateform_title">
            <h1 data-focus>{{ $t('collectioncreateform.createCollection') }}</h1>
        </div>
        <div class="collectioncreateform__desc">
            {{ $t('collectioncreateform.createCollectionDesc') }}
        </div>

        <a-upload-area :validator="imageValidator" @input="setCollectionImage" class="auploadarea-nobackground">
            {{ $t('collectioncreateform.alsoBeUsedForNavigation') }}
        </a-upload-area>
        <div v-if="fileError" class="pat-5 flex juc-center">
            <f-message type="error" with-icon>{{ fileError }}</f-message>
        </div>

        <f-form-input
            type="text"
            field-size="large"
            name="name"
            :label="$t('collectioncreateform.name')"
            :placeholder="$t('collectioncreateform.collectionName')"
            required
            validate-on-input
        />

        <f-form-input
            :label="$t('collectioncreateform.symbol')"
            field-size="large"
            type="text"
            name="symbol"
            :placeholder="$t('collectioncreateform.provideYourSymbol')"
            required
            validate-on-input
        />

        <f-form-input type="toggle" :label="$t('collectioncreateform.publicMintable')" name="publicMintableToogle" />
        <div class="collectioncreateform__publicMintabledesc">
            {{ $t('collectioncreateform.publicMintabledesc') }}
        </div>

        <f-form-input
            :label="$t('collectioncreateform.publicMintFee')"
            v-if="values.publicMintableToogle"
            :validator="publicMintFeeValidator"
            validate-on-change
            validate-on-input
            :error-message="$t('collectioncreateform.publicMintFeeErr')"
            type="number"
            name="publicMintFee"
            field-size="large"
            required
        />
        <div class="collectioncreateform__publicMintFeedesc" v-if="values.publicMintableToogle">
            {{ $t('collectioncreateform.publicMintFeedesc') }}
        </div>

        <f-form-input
            :label="$t('collectioncreateform.maxItems')"
            :validator="maxItemsValidator"
            validate-on-change
            validate-on-input
            :placeholder="$t('collectioncreateform.maxItemsValue')"
            :error-message="$t('collectioncreateform.maxItemsErr')"
            type="number"
            name="maxItems"
            field-size="large"
            required
        />

        <f-form-input type="toggle" :label="$t('collectioncreateform.startdateToogle')" name="startdateToogle" />
        <f-form-input
            v-if="values.startdateToogle"
            type="datetime"
            name="startdate"
            :validator="startdateValidator"
            :in-formatter="datetimeInFormatterTimestamp"
            :out-formatter="dateOutFormatterTimestamp"
            validate-on-input
            field-size="large"
            :label="$t('collectioncreateform.startdate')"
        />

        <f-form-input type="toggle" :label="$t('collectioncreateform.enddateToogle')" name="enddateToogle" />
        <f-form-input
            v-if="values.enddateToogle"
            type="datetime"
            name="enddate"
            :validator="enddateValidator"
            :in-formatter="datetimeInFormatterTimestamp"
            :out-formatter="dateOutFormatterTimestamp"
            validate-on-input
            field-size="large"
            :label="$t('collectioncreateform.enddate')"
        />
		
        <f-form-input type="toggle" :label="$t('collectioncreateform.revealdateToogle')" name="revealdateToogle" />
        <f-form-input
            v-if="values.revealdateToogle"
            type="datetime"
            name="revealdate"
            :validator="revealdateValidator"
            :in-formatter="datetimeInFormatterTimestamp"
            :out-formatter="dateOutFormatterTimestamp"
            validate-on-input
            field-size="large"
            :label="$t('collectioncreateform.revealdate')"
        />
        <f-form-input
            type="text"
            field-size="large"
            :label="$t('collectioncreateform.preRevealUri')"
            v-if="values.revealdateToogle"
            name="preRevealUri"
            :placeholder="$t('collectioncreateform.preRevealUriExample')"
            required
            validate-on-input
        />

        <f-form-input type="toggle" :label="$t('collectioncreateform.isErc1155')" name="isErc1155Toogle" />
        <div class="collectioncreateform__isErc1155desc">
            {{ $t('collectioncreateform.isErc1155desc') }}
        </div>

        <f-form-input
            :label="$t('collectioncreateform.maxReplica')"
            v-if="values.isErc1155Toogle"
            :validator="maxReplicaValidator"
            validate-on-change
            validate-on-input
            :placeholder="$t('collectioncreateform.maxReplicaValue')"
            :error-message="$t('collectioncreateform.maxReplicaErr')"
            type="number"
            name="maxReplica"
            field-size="large"
            required
        />

        <f-form-input
            type="toggle"
            :label="$t('collectioncreateform.useBaseUri')"
            name="useBaseUriToogle"
            v-if="baseUriAvailable()"
        />

        <f-form-input
            type="text"
            field-size="large"
            :label="$t('collectioncreateform.baseUri')"
            v-if="baseUriNeeded()"
            name="baseUri"
            :placeholder="$t('collectioncreateform.baseUriExample')"
            required
            validate-on-input
        />

        <div class="collectioncreateform__useBaseUridesc" v-if="baseUriNeeded()">
            {{ $t('collectioncreateform.useBaseUridesc') }}
        </div>

        <f-form-input
            :label="$t('collectioncreateform.description')"
            field-size="large"
            type="textarea"
            name="description"
            :placeholder="$t('collectioncreateform.provideYourDescription')"
            required
            validate-on-input
            rows="5"
        />

        <f-form-input
            :validator="royaltyValidator"
            validate-on-change
            validate-on-input
            :error-message="$t('collectioncreateform.royaltyErr')"
            type="number"
            name="royalty"
            field-size="large"
        >
            <template #label>
                {{ $t('collectioncreateform.royalty') }}
                <span class="label_btn" :data-tooltip="$t('collectioncreateform.royaltyTooltip')">
                    <app-iconset
                        icon="question"
                        :aria-hidden="false"
                        :aria-label="$t('collectioncreateform.royaltyTooltip')"
                    />
                </span>
            </template>
        </f-form-input>
        <f-form-input
            type="text"
            name="feeRecipient"
            field-size="large"
            :placeholder="$t('collectioncreateform.feeRecipient')"
            required
            validate-on-input
            :validator="addressValidator"
        >
            <template #label>
                {{ $t('collectioncreateform.feeRecipient') }}
                <span class="label_btn" :data-tooltip="$t('collectioncreateform.feesTooltip')">
                    <app-iconset
                        icon="question"
                        :aria-hidden="false"
                        :aria-label="$t('collectioncreateform.feesTooltip')"
                    />
                </span>
            </template>
        </f-form-input>
        <div class="collectioncreateform_categories">
            <div class="collectioncreateform_categories_label">{{ $t('collectioncreateform.category') }}</div>
            <AddCategory @change="values.categories = $event" />
        </div>
        <div class="collectioncreateform_group">
            <!--
			<f-form-input
                type="text"
                field-size="large"
                :placeholder="$t('collectioncreateform.enterCollection')"
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
                :placeholder="$t('collectioncreateform.enterWebsite')"
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
                :placeholder="$t('collectioncreateform.enterDiscord')"
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
                :placeholder="$t('collectioncreateform.enterTwitter')"
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
                :placeholder="$t('collectioncreateform.enterInstagram')"
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
                :placeholder="$t('collectioncreateform.enterMedium')"
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
                :placeholder="$t('collectioncreateform.enterTelegram')"
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
            :placeholder="$t('collectioncreateform.emailAddress')"
            required
            validate-on-input
            :validator="emailValidator"
        >
            <template #label>
                {{ $t('collectioncreateform.contactEmail') }}
                <span class="label_btn" :data-tooltip="$t('collectioncreateform.emailTooltip')">
                    <app-iconset
                        icon="question"
                        :aria-hidden="false"
                        :aria-label="$t('collectioncreateform.emailTooltip')"
                    />
                </span>
            </template>
        </f-form-input>
        <div v-if="fileError" class="pat-5 flex juc-center">
            <f-message type="error" with-icon>{{ fileError }}</f-message>
        </div>
        <div class="collectioncreateform_btn">
            <a-button type="submit" :loading="isLoading">
                {{ $t('collectioncreateform.submit') }}
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
import { datetimeInFormatterTimestamp, dateOutFormatterTimestamp } from '@/utils/date.js';
import dayjs from 'dayjs';
import { bToTokenValue, toHex } from '@/utils/big-number.js';

export default {
    name: 'CollectionCreateForm',

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
            if (_value === '') return false;
            const val = parseFloat(_value);
            if (isNaN(val) || val <= 0) {
                return true;
            }
            return false;
        },

        maxItemsValidator(_value) {
            if (_value === '') return true;
            _value = Number(_value);
            if (this.values.publicMintableToogle) return !(_value > 0);
            else return !(_value >= 0);
        },

        maxReplicaValidator(_value) {
            if (_value === '') return true;
            _value = Number(_value);
            return !(_value >= 0);
        },

        addressValidator(_value) {
            return !(Web3.utils.isHexStrict(_value) && Web3.utils.isAddress(_value))
                ? this.$t('collectioncreateform.invalidAddress')
                : '';
        },

        emailValidator(_value) {
            return !this.emailRE.test(_value) ? this.$t('collectioncreateform.invalidEmail') : '';
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

        baseUriNeeded() {
            return this.values.useBaseUriToogle || this.values.isErc1155Toogle || this.values.publicMintableToogle;
        },

        baseUriAvailable() {
            return !this.values.isErc1155Toogle && !this.values.publicMintableToogle;
        },

        startdateValidator(value) {
            //alert(value);
            if (value == 0) return '';
            const now = dayjs().valueOf();
            if (dayjs(value).valueOf() < now) return this.$t('collectioncreateform.badstartdate');
            if (this.values.enddateToogle) {
                const end = dayjs(this.values.enddate).valueOf();
                if (dayjs(value).valueOf() >= end) return this.$t('collectioncreateform.badstartdate');
            }
            return '';
        },

        enddateValidator(value) {
            //alert(value);
            if (value == 0) return '';
            const now = dayjs().valueOf();
            if (dayjs(value).valueOf() <= now) return this.$t('collectioncreateform.badenddate');
            if (this.values.startdateToogle) {
                const start = dayjs(this.values.startdate).valueOf();
                if (dayjs(value).valueOf() <= start) return this.$t('collectioncreateform.badenddate');
            }
            return '';
        },
		
		revealdateValidator(value) {
            //alert(value);
            if (value == 0) return '';
            const now = dayjs().valueOf();
            if (dayjs(value).valueOf() <= now) return this.$t('collectioncreateform.badrevealdate');
            return '';
        },

        async onSubmit(_data) {
            console.log('onSubmit', _data);
            const vals = _data.values;

            if (!this.imageFile) {
                this.fileError = this.$t('collectioncreateform.fileError');
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
                    text: this.$t('collectioncreateform.signInFirst'),
                });
                this.isLoading = false;
                return;
            }

            this.progressMessage = this.$t('collectioncreateform.signMint');
            notifications.add({
                type: 'info',
                text: this.$t('collectioncreateform.signMint'),
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

            /*
			name
			symbol
			publicMintableToogle
			publicMintFee
			maxItems
			startdateToogle startdate
			enddateToogle enddate
			revealdateToogle revealdate preRevealUri
			isErc1155Toogle
			maxReplica
			useBaseUriToogle
			baseUri
			royalty
			feeRecipient
			*/
            //createERC1155Collection(nftName, nftSymbol, amount, isprivate, mintFee, creatorFee, feeRecipient, baseUri, usebaseUriOnly, baseUriExt, maxItems, maxItemSupply, mintStartTime, mintStopTime, revealTime, preRevealUri, web3Client
            //createERC721Collection(nftName, nftSymbol, amount, isprivate, mintFee, creatorFee, feeRecipient, baseUri, baseUriExt, maxItems, mintStartTime, mintStopTime, revealTime, preRevealUri, web3Client
            const web3 = new Web3();

            let useBaseUri = vals.useBaseUriToogle;
            if (vals.isErc1155Toogle || vals.publicMintableToogle) {
                if (vals.baseUri != null && vals.baseUri.length) {
                    useBaseUri = true;
                } else {
                    alert('baseUri must be set');
                    return;
                }
            }

            let baseUri = '';
            let baseUriExt = '';
            let usebaseUriOnly = false;
            if (useBaseUri) {
                baseUri = vals.baseUri;
                //alert(baseUri);
                const idtoken = '/{id}';
                const idtokenIndex = baseUri.toLowerCase().indexOf(idtoken);
                usebaseUriOnly = idtokenIndex === -1;
                if (!usebaseUriOnly) {
                    baseUriExt = baseUri.slice(idtokenIndex + idtoken.length);
                    baseUri = baseUri.slice(0, idtokenIndex);
                }
                //alert(baseUri + ' - ' + baseUriExt);
            }

            let startdate = 0;
            let enddate = 0;
			let revealdate = 0;
            if (vals.startdateToogle) {
                startdate = dayjs(this.values.startdate).valueOf() / 1000;
            }
            if (vals.enddateToogle) {
                enddate = dayjs(this.values.enddate).valueOf() / 1000;
            }
            if (vals.revealdateToogle) {
                revealdate = dayjs(this.values.revealdate).valueOf() / 1000;
            }			

            const amount = await (vals.isErc1155Toogle
                ? this.getErc1155FactoryContractFee()
                : this.getErc721FactoryContractFee());
            //alert(amount);

            if (vals.isErc1155Toogle) {
                this.tx = contracts.createERC1155Collection(
                    vals.name,
                    vals.symbol,
                    amount,
                    !vals.publicMintableToogle, // isPrivate
                    vals.publicMintableToogle ? toHex(bToTokenValue(vals.publicMintFee, 18)) : 0, // mintFee
                    vals.royalty ? vals.royalty : 0, // creatorFee
                    vals.feeRecipient, // FeeRecipient
                    baseUri,
                    usebaseUriOnly,
                    baseUriExt,
                    vals.maxItems,
                    vals.maxReplica,
                    startdate,
                    enddate,
					revealdate,
					revealdate ? vals.preRevealUri : "",
                    web3
                );
            } else {
                this.tx = contracts.createERC721Collection(
                    vals.name,
                    vals.symbol,
                    amount,
                    !vals.publicMintableToogle, // isPrivate
                    vals.publicMintableToogle ? toHex(bToTokenValue(vals.publicMintFee, 18)) : 0, // mintFee
                    vals.royalty ? vals.royalty : 0, // creatorFee
                    vals.feeRecipient, // FeeRecipient
                    baseUri,
                    baseUriExt,
                    vals.maxItems,
                    startdate,
                    enddate,
					revealdate,
					revealdate ? vals.preRevealUri : "",
                    web3
                );
            }

            // not needed I guess..
            // we are observing Factory::event ContractCreated(address creator, address nft, _isprivate)

            /*
            try {
                await uploadCollection(this.collectionApplication, this.imageFile);
            } catch (err) {
                console.error('uploadCollection failed', err);
                notifications.add({
                    type: 'error',
                    text: this.$t('collectioncreateform.wasntUploaded') + err,
                });
                this.isLoading = false;
                return;
            }

            notifications.add({
                type: 'success',
                text: this.$t('collectioncreateform.success'),
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
                    text: this.$t('collectioncreateform.mintingError'),
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
                    text: this.$t('collectioncreateform.noCollectionAddress'),
                });
                this.progressMessage = '';
                this.isLoading = false;
                return;
            }
            if (this.collectionAddress === null) {
                // token receipt/collectionAddress not available yet
                this.progressMessage = this.$t('collectioncreateform.waitingCollectionAddress');
                // repeat later again
                setTimeout(() => this.waitForCollectionAddressAndFinish(txHash), 1000);
                return;
            }

            // collectionAddress loaded

            //notifications.add({
            //    type: 'success',
            //    text: this.$t('collectioncreateform.success'),
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
                    text: this.$t('collectioncreateform.wasntUploaded') + err,
                });
                this.isLoading = false;
                return;
            }

            notifications.add({
                type: 'success',
                text: this.$t('collectioncreateform.success'),
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

        async getErc721FactoryContractFee() {
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

            let contract = new web3.eth.Contract(minABI, process.env.VUE_APP_ERC721_FACTORY_CONTRACT_ADDRESS);
            let fee = await contract.methods.platformContractFee().call();
            return fee;
        },

        async getErc1155FactoryContractFee() {
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

            let contract = new web3.eth.Contract(minABI, process.env.VUE_APP_ERC1155_FACTORY_CONTRACT_ADDRESS);
            let fee = await contract.methods.platformContractFee().call();
            return fee;
        },

        imageValidator,
        datetimeInFormatterTimestamp,
        dateOutFormatterTimestamp,
    },
};
</script>

<style lang="scss">
@use 'style';
</style>
