<template>
    <div class="memetokencard">
        <router-link :to="{ name: 'nft-create', query: { memetoken: collection.contract } }">
            <div class="collectioncard_name">{{ collection.name }}</div>
            <div class="collectioncard_cont">
                <f-image
                    size="100%"
                    fit="cover"
                    :src="getMemeTokenImageUrl(collection.contract)"
                    :alt="collection.name"
                />
            </div>
        </router-link>
    </div>
</template>

<script>
import { getMemeTokenImageUrl } from '@/utils/url.js';
export default {
    name: 'MemeTokenCard',
    props: {
        collection: {
            type: Object,
        },
    },
    methods: {
        getMemeTokenImageUrl,
    },
};
</script>

<style lang="scss">
@use "style";
</style>
