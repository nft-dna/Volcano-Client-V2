import AppSectionNftCard from '@/modules/app/components/AppSectionNftCard/AppSectionNftCard.vue';

export default {
    title: 'Components/AppSectionNftCard',
    components: AppSectionNftCard,
};

export const Default = () => ({
    components: { AppSectionNftCard },
    //language=HTML
    template: `
        <div style="max-width: 496px">
            <app-section-nft-card />
        </div>
    `,
});

export const WithNft = () => ({
    components: { AppSectionNftCard },
    //language=HTML
    template: `
        <div style="max-width: 496px">
            <app-section-nft-card :nft="{ title: 'Magma BitBirds', collection: 'MagmaBitBirds', img: 'magmabitbirds.png' }" />
        </div>
    `,
});
