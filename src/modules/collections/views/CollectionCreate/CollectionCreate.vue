<template>
    <!-- <div class="collectioncreate">CollectionCreate</div> -->
    <div class="collectioncreate">
        <collection-create-form />
    </div>
</template>

<script>
import CollectionCreateForm from '@/modules/collections/components/CollectionCreateForm/CollectionCreateForm.vue';
export default {
    name: 'CollectionCreate',

    components: { CollectionCreateForm },
};
</script>
