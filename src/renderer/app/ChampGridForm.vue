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
            Name: {
                get() {
                    return this.$store.state.runes.state.Name;
                },
                set(value) {
                    this.$store.commit('runes/SetName', value);
                },
            },

        },
    }
</script>

<template>
<div>
    <div class="row">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
    </div>
    <div class="row">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
    </div>
    <div class="row">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
    </div>
    <div class="row">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
    </div>
    <div class="row">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
    </div>
    <div class="row">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
        <img src="../icons/Jinx.png">
    </div>
</div>
</template>



<style scoped>
    .row {
        display: flex;
        flex-wrap: wrap;
        padding: 0 4px;
    }

    .row img {
        margin-top: 8px;
        vertical-align: middle;
        max-width: 70px;
        max-height: 70px;
    }
    /* Responsive layout - makes a two row-layout instead of four columns */
    @media screen and (max-width: 800px) {
        .row {
            flex: 50%;
            max-width: 50%;
        }
    }

    /* Responsive layout - makes the two row stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
        .row {
            flex: 100%;
            max-width: 100%;
        }
    }

</style>