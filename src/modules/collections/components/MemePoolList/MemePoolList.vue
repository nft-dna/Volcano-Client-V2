<template>
    <div class="memepoollist">
        <memepool-list
            :collections="items"
            :loading="loading"
            :total-items="totalItems"
            :per-page="perPage"
            root-margin="400px 0px"
            @page-change="_onPageChange"
            @on-search="onSearch"
        />
    </div>
</template>

<script>
import MemeList from '@/modules/collections/components/MemeList/MemeList.vue';
import { getMemeTokens } from '@/modules/collections/queries/memetokens.js';
import { dataPageMixin } from '@/common/mixins/data-page.js';
export default {
    name: 'MemePoolList',
    mixins: [dataPageMixin],
    components: {
        MemeList,
    },
    data() {
        return {
            perPage: 60,
            currPage: 1,
            page: 1,
            search: '',
        };
    },
    watch: {
        loading(value) {
            this.$emit('loading', value);
        },
        search: {
            handler: function(newValue, oldValue) {
                if (newValue !== oldValue) this.loadCollections();
            },
            immediate: true,
        },
    },
    created() {
        this._ignorePageChange = false;
        this._pageInfos = {};
    },
    methods: {
        async loadPage(pagination = { first: this.perPage }, search = this.search) {
            const collections = await getMemeTokens(pagination, search);
            const { page } = this;
            collections.edges.forEach(edge => {
                edge.node._page = page;
            });
            this.$emit('collections-count', this.totalItems);
            return collections;
        },
        async loadCollections() {
            await this._loadPage();
        },
        onSearch(value) {
            this.search = value;
        },
    },
};
</script>
