<script>
    import Vue from 'vue';
    import ElContainer from "element-ui/packages/container/src/main";
    import RuneJson from '../staticJSONs/RuneData'

    // const DominationMatrix =
    //     [
    //         [8112, 8124, 8124, 9923],
    //         [8126, 8139, 8143],
    //         [8136, 8120, 8138],
    //         [8135,8134,8105,8106]
    //     ];
    export default {
        components: {ElContainer},
        data() {
            return {
                RuneData: RuneJson,
            }
        },
        methods: {
            SetTree: function(TreeId, isPrimary)
            {
                if(isPrimary){
                    this.$store.commit('runes/SetKeystoneTree', TreeId);
                }
                else{
                    this.$store.commit('runes/SetSecondaryTree', TreeId);
                }
                console.log(RuneJson);
                console.log(this.$store.state.runes.state);
            }
        },
        computed:{
            //todo Set it so that it isnt hardcoded to persicion tree
            KeyStoneRowOneJSON()
            {
                const tree = 0;
                return RuneJson[tree]["slots"][0]["runes"];
            },
            KeyStoneRowTwoJSON()
            {
                const tree = 0;
                return RuneJson[tree]["slots"][1]["runes"];
            },
            KeyStoneRowThreeJSON()
            {
                const tree = 0;
                return RuneJson[tree]["slots"][2]["runes"];
            },
            KeyStoneRowFourJSON()
            {
                const tree = 0;
                return RuneJson[tree]["slots"][3]["runes"];
            },
            KeyStone(data)
            {

            }

        }
    }


</script>

<template>
    <el-container>
        <div class="runeContainer">
            <div class="row">
                <img src="../icons/runes/8000.png" v-on:click="SetTree(0,true)"/>
                <img src="../icons/runes/8100.png" v-on:click="SetTree(1,true)"/>
                <img src="../icons/runes/8200.png" v-on:click="SetTree(2,true)"/>
                <img src="../icons/runes/8300.png" v-on:click="SetTree(3,true)"/>
                <img src="../icons/runes/8400.png" v-on:click="SetTree(4,true)"/>
            </div>

            <div class="runerow" id="row1">
                <img class="rune" v-for="img in KeyStoneRowOneJSON" v-bind:src="img['icon']" />
            </div>
            <div class="runerow" id="row2">
                <img class="rune" v-for="img in KeyStoneRowTwoJSON" v-bind:src="img['icon']" />
            </div>
            <div class="runerow" id="row3">
                <img class="rune" v-for="img in KeyStoneRowThreeJSON" v-bind:src="img['icon']" />
            </div>
            <div class="runerow" id="row4">
                <img class="rune" v-for="img in KeyStoneRowFourJSON" v-bind:src="img['icon']" />
            </div>
        </div>
        <div class="runeContainer">
            <div class="row">
                <img src="../icons/runes/8000.png" v-on:click="SetTree(0, false)"/>
                <img src="../icons/runes/8100.png" v-on:click="SetTree(1, false)"/>
                <img src="../icons/runes/8200.png" v-on:click="SetTree(2, false)"/>
                <img src="../icons/runes/8300.png" v-on:click="SetTree(3, false)"/>
                <img src="../icons/runes/8400.png" v-on:click="SetTree(4, false)"/>
            </div>
            <div class="row" id="row1_2">

            </div>
            <div class="row" id="row2_2">

            </div>
            <div class="row" id="row3_2">

            </div>
        </div>
    </el-container>

</template>

<style scoped>

.runeContainer {
    background-color: #181818;
    opacity: 0.7;
    width: 100%;
    height: fit-content;
    margin-top: 30px;
    margin-left: 30px;
}

.row {
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0 4px;

}

.runerow{
    display: flex;
    padding: 0 4px;
    background-color: black;

}

.runerow img {
    margin-top: 8px;
    vertical-align: middle;
    width: 30px;
    height: 30px;

    display: block;
    margin-left: auto;
    margin-right: auto;

    padding-left: 8px;
    padding-right: 8px;
    padding-bottom: 8px;

}


.row img {
    margin-top: 8px;
    vertical-align: middle;
    width: 26px;
    height: 26px;

    padding-left: 8px;
    padding-right: 8px;
}

    
</style>