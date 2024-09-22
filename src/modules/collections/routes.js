import Collection from '@/modules/collections/views/Collection/Collection.vue';
import Collections from '@/modules/collections/views/Collections/Collections.vue';
import CollectionCreate from '@/modules/collections/views/CollectionCreate/CollectionCreate.vue';
import CollectionRegister from '@/modules/collections/views/CollectionRegister/CollectionRegister.vue';
import MemeTokenCreate from '@/modules/collections/views/MemeTokenCreate/MemeTokenCreate.vue';
import { i18n } from '@/plugins/vue-i18n.js';

export function getCollectionsRoutes() {
    return [
        {
            path: '/collection',
            name: 'collection',
            component: Collection,
            children: [
                {
                    path: 'create',
                    name: 'collection-create',
                    component: CollectionCreate,
                    meta: {
                        title: i18n.t('page.collectionCreate.title'),
                    },
                },
                {
                    path: 'register',
                    name: 'collection-register',
                    component: CollectionRegister,
                    meta: {
                        title: i18n.t('page.collectionRegister.title'),
                    },
                },
				{
                    path: 'meme',
                    name: 'memetoken-create',
                    component: MemeTokenCreate,
                    meta: {
                        title: i18n.t('page.memeTokenCreate.title'),
                    },
                },
            ],
        },
        {
            path: '/collections',
            name: 'collections',
            component: Collections,
        },
    ];
}
