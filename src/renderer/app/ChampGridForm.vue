<script>
    import Vue from 'vue';
    import { MenuItemGroup } from 'element-ui';

    export default {
        name: 'champion-grid-form',
        computed: {
            runes: {
                get() {
                    return this.$store.state.runes.state.Runes;
                },
                set(value) {
                    this.$store.commit('runes/setRunes', value);
                },
            },
            KeystoneTree: {
                get() {
                    return this.$store.state.runes.state.KeystoneTree;
                },
                set(value) {
                    this.$store.commit('runes/SetKeystoneTree', value);
                },
            },
            SecondaryTree: {
                get() {
                    return this.$store.state.runes.state.SecondTree;
                },
                set(value) {
                    this.$store.commit('runes/SetSecondaryTree', value);
                },
            },

        },
    }
</script>

<template>
    
</template>



<style scoped>

</style>