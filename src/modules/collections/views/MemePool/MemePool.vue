<template>
    <!-- <div class="memepool">MemePool</div> -->
    <div class="memepool">
        <div class="collections_cont">
            <meme-pool-list />
        </div>
    </div>
</template>

<script>
import MemePoolList from '@/modules/collections/components/MemePoolList/MemePoolList.vue';
export default {
    name: 'MemePool',
    components: {
        MemePoolList,
    },
};
</script>

<style lang="scss">
.memepool {
    &_cont {
        padding: 0 var(--f-spacer-4);
    }
}
</style>
