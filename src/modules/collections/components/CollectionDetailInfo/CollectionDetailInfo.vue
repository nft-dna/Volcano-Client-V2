<template>
    <a-details-group class="collectiondetailinfo" rounded>
        <a-details class="collectiondetailinfo_block tes-3" :open="info.contract && info.contract.length > 0">
            <template #label>
                <div class="collectiondetail_details_wrap">
                    <h2><app-iconset icon="property" /> {{ $t('collectiondetail.properties') }}</h2>
                </div>
            </template>
            <template>
                <div class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.symbol') }}:</span><span>{{ info.symbol }}</span>
                </div>
                <div v-if="info.ownerUser" class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.owned') }}:</span>
                    <router-link :to="{ name: 'account', params: { address: info.ownerUser.address } }">
                        <a-address
                            :address="info.ownerUser.address"
                            :name="info.ownerUser.username"
                            :image="info.ownerUser.avatarThumb"
                            is-account
                        />
                    </router-link>
                </div>
                <div v-if="!info.isMeme && info.royalty" class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.royalty') }}:</span><span>{{ info.royalty }}%</span>
                </div>
                <div v-if="!info.isMeme && info.feeRecipientUser" class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.recipient') }}:</span>
                    <router-link :to="{ name: 'account', params: { address: info.feeRecipientUser.address } }">
                        <a-address
                            :address="info.feeRecipientUser.address"
                            :name="info.feeRecipientUser.username"
                            :image="info.feeRecipientUser.avatarThumb"
                            is-account
                        />
                    </router-link>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.ipRights') }}:</span>
                    <a v-if="info.ipRights" :href="info.ipRights">{{ info.ipRights }}</a>
                    <span v-else>{{ $t('collectiondetail.notAvailable') }}</span>
                </div>
                <div class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.collection') }}:</span>
                    <collection-detail-collection :collection="info" />
                </div>
                <div class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.contract') }}:</span>
                    <a :href="'https://sepolia.uniscan.xyz/address/' + info.contract" target="_blank">{{
                        'sepolia explorer'
                    }}</a>
                </div>
                <div class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.createdTime') }}:</span><span>{{ info.createdTime }}</span>
                </div>
                <div class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.isVerified') }}:</span><span>{{ info.isVerified }}</span>
                </div>

                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.standard') }}:</span
                    ><span>{{ info.isErc1155 ? 'Erc-1155' : 'Erc-721' }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.publicMint') }}:</span><span>{{ !info.isOwnerble }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.allowSpecificUri') }}:</span
                    ><span>{{ !info.isErc1155 && !info.hasBaseUri }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.creatorMintFee') }}:</span><span>{{ info.mintFeeEth }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.platformMintFee') }}:</span><span>{{ info.platformFeeEth }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.mintStartTime') }}:</span
                    ><span>{{ info.mintStartTime ? info.mintStartTime : '-' }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.mintEndTime') }}:</span
                    ><span>{{ info.mintEndTime ? info.mintEndTime : '-' }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.revealTime') }}:</span
                    ><span>{{ info.revealTime ? info.revealTime : '-' }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.maxReplicaItems') }}:</span
                    ><span>{{ info.maxReplicaItems ? info.maxReplicaItems : '-' }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.maxItems') }}:</span
                    ><span>{{ info.maxItems ? info.maxItems : '-' }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="!info.isMeme">
                    <span>{{ $t('collectiondetail.currentSupply') }}:</span><span>{{ info.currentSupply }}</span>
                </div>

                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.standard') }}:</span><span>Erc-20</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.initialReserve') }}:</span><span>{{ info.initialReserveEth }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.blocksAmount') }}:</span><span>{{ info.blocksAmountEth }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.blocksFee') }}:</span><span>{{ info.blocksFeeEth }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.blocksMaxSupply') }}:</span><span>{{ info.blocksMaxSupply }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.blocksSupply') }}:</span><span>{{ info.blocksSupply }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.cap') }}:</span><span>{{ info.capEth }}</span>
                </div>
                <div class="collectiondetailinfo_row" v-if="info.isMeme">
                    <span>{{ $t('collectiondetail.supply') }}:</span><span>{{ info.supplyEth }}</span>
                </div>
            </template>
        </a-details>

        <a-details class="collectiondetailinfo_block tes-3" v-if="info">
            <template #label>
                <div class="collectiondetail_details_wrap">
                    <h2><app-iconset icon="about" /> {{ $t('collectiondetail.about') }} {{ info.name }}</h2>
                </div>
            </template>
            <template>
                <p>
                    {{ info.description }}
                </p>
                <social-links :info="info" />
            </template>
        </a-details>

        <!-- -->
        <a-details class="collectiondetailinfo_block tes-3">
            <template #label>
                <div class="collectiondetail_details_wrap">
                    <h2><app-iconset icon="chain" /> {{ $t('collectiondetail.chainInfo') }}</h2>
                </div>
            </template>
            <template>
                <div class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.network') }}</span>
                    <span>{{ $t('collectiondetail.networkName') }}</span>
                </div>
                <div class="collectiondetailinfo_row">
                    <span>{{ $t('collectiondetail.chainId') }}</span>
                    <span>{{ $t('collectiondetail.chainIdName') }}</span>
                </div>
            </template>
        </a-details>
        <!-- -->
    </a-details-group>
</template>

<script>
import ADetailsGroup from '@/common/components/ADetailsGroup/ADetailsGroup';
import ADetails from '@/common/components/ADetails/ADetails';
import CollectionDetailCollection from '@/modules/collections/components/CollectionDetailCollection/CollectionDetailCollection.vue';
//import FEllipsis from 'fantom-vue-components/src/components/FEllipsis/FEllipsis.vue';
import { toInt, toBigNumber } from '@/utils/big-number.js';
import AAddress from '@/common/components/AAddress/AAddress';
import SocialLinks from '@/modules/nfts/components/SocialLinks/SocialLinks';

export default {
    name: 'CollectionDetailInfo',

    props: {
        info: {
            type: Object,
            required: true,
        },
    },

    components: {
        SocialLinks,
        ADetailsGroup,
        ADetails,
        CollectionDetailCollection,
        //FEllipsis,
        AAddress,
    },

    methods: {
        toInt,
        toBigNumber,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
