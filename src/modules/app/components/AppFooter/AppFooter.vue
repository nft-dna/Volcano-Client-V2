<template>
    <div class="appfooter">
        <div class="appfooter_item">
            <router-link to="/">
                <img src="volcano-logo-white.svg" width="138px" height="35px" alt="volcano logo" />
            </router-link>
        </div>
        <div class="appfooter_item">
            <a
                target="_blank"
                href="https://app.termly.io/document/privacy-policy/7db4b9fc-aa5d-4f80-bfa1-27120ff982ba"
                rel="noopener"
            >
                Privacy Policy
            </a>
        </div>
        <div class="appfooter_item">
            <a
                target="_blank"
                href="https://app.termly.io/document/cookie-policy/c79f1a78-08a2-4da2-85f0-846a461cde81"
                rel="noopener"
            >
                Cookie Policy
            </a>
        </div>
        <div class="appfooter_item">
            <a
                target="_blank"
                href="https://app.termly.io/document/terms-of-use-for-online-marketplace/1f69b33f-65ba-40d9-bf63-b28e357f7c34"
                rel="noopener"
            >
                Terms of Service
            </a>
        </div>
        <div class="appfooter_item">
            <a target="_blank" href="" rel="noopener">
                <img src="magma_logo.svg" width="135px" height="35px" alt="magma logo" />
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppFooter',
};
</script>

<style lang="scss">
@use "style";
</style>
