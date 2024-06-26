import AppSectionNft from '@/modules/app/components/AppSectionNft/AppSectionNft.vue';

export default {
    title: 'Components/AppSectionNft',
    components: AppSectionNft,
};

export const Default = () => ({
    components: { AppSectionNft },
    //language=HTML
    template: `
        <div>
            <app-section-nft />
        </div>
    `,
});

export const WithNft = () => ({
    components: { AppSectionNft },
    //language=HTML
    template: `
        <div>
            <app-section-nft :nft="{ title: 'Magma BitBirds', collection: 'MagmaBitBirds', img: 'magmabitbirds.png' }" />
        </div>
    `,
});
