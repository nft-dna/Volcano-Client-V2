<template>
    <!-- <div class="memetokencreate">MemeTokenCreate</div> -->
    <div class="memetokencreate">
        <meme-token-create-form />
    </div>
</template>

<script>
import MemeTokenCreateForm from '@/modules/collections/components/MemeTokenCreateForm/MemeTokenCreateForm.vue';
export default {
    name: 'MemeTokenCreate',

    components: { MemeTokenCreateForm },
};
</script>
