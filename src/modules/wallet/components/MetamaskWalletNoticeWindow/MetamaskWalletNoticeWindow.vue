<template>
    <a-window ref="window" :title="$t('notice')" class="fwindow-width-3">
        Please, select <b> {{ networkLabel }} </b> network in the Metamask.
    </a-window>
</template>

<script>
import appConfig from '@/app.config.js';
import { copyMethods } from 'fantom-vue-components/src/utils/vue-helpers.js';
import AWindow from '@/common/components/AWindow/AWindow.vue';
import { mapState } from 'vuex';

export default {
    name: 'MetamaskWalletNoticeWindow',

    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        ...mapState('wallet', {
            chainId: 'chainId',
        }),
        networkLabel() {
            return appConfig.settings.networkName;
        },
    },

    watch: {
        chainId: {
            handler() {
                const { $wallet } = this;

                if ($wallet.is('metamask') && !this.disabled) {
                    if ($wallet.isCorrectChainId()) {
                        this.hide();
                    } else {
                        this.show();
                    }
                }
            },
            immediate: true,
        },
    },

    methods: {
        ...copyMethods(AWindow, ['show', 'hide'], 'window'),
    },
};
</script>
