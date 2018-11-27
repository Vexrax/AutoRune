<script>
    import Vue from 'vue';
    import { MenuItemGroup } from 'element-ui';
    import ChampJson from '../staticJSONs/champion'

    /** Client Side Vars **/
    var CurrentChampSelected = '';


    export default {
        name: 'champion-grid-form',
        data() {
            return {
                ChampData: ChampJson,
            }
        },
        methods:{
            getLocalChampImages: function(id)
            {
                return 'http://ddragon.leagueoflegends.com/cdn/8.23.1/img/champion/' + id + '.png'
                //return './../icons/' + id + '.png' //todo need to switch these to local data files.
            },
            onIconClick: function(id)
            {
                CurrentChampSelected = id;
                this.$store.commit('tempRuneMatrix/ResetAllMatricies');
                this.$forceUpdate();
            },
            GetChampSelectedStyleData: function(id)
            {
                if(id === CurrentChampSelected)
                {
                    return "border-radius: 0%; border: 3px solid #00dd16;"
                }
                return '';
            },
        },
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
    <div class="row">
        <img v-for="data in ChampData['data']" v-bind:src="getLocalChampImages(data['id'])" v-on:click="onIconClick(data['id'])" v-bind:style="GetChampSelectedStyleData(data['id'])">
    </div>
</template>



<style scoped>
    .row {
        display: flex;
        padding: 0 4px;
        flex-wrap: wrap;
    }

    .row img {
        margin-top: 8px;
        vertical-align: middle;
        margin-left: 2px;
        margin-right: 2px;
        max-width: 70px;
        max-height: 70px;
        border: 3px solid #05060a;
        border-radius: 50%;

    }
    /* Responsive layout - makes a two row-layout instead of four columns */
    @media screen and (max-width: 800px) {
        .row {
            flex: 50%;
            max-width: 60%;
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