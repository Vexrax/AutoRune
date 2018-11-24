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

            },

            KeyStoneBackGroundColor: function(TreeId)
            {
                if(TreeId === this.$store.state.runes.KeystoneTree)
                {
                    return "background-color: black ;";
                }
                return "background-color: #181818;";
            }


        },
        computed:{
            KeyStoneRowOneJSON()
            {
                const tree = this.$store.state.runes.KeystoneTree;
                return RuneJson[tree]["slots"][0]["runes"];
            },
            KeyStoneRowTwoJSON()
            {
                const tree = this.$store.state.runes.KeystoneTree;
                return RuneJson[tree]["slots"][1]["runes"];
            },
            KeyStoneRowThreeJSON()
            {
                const tree = this.$store.state.runes.KeystoneTree;
                return RuneJson[tree]["slots"][2]["runes"];
            },
            KeyStoneRowFourJSON()
            {
                const tree = this.$store.state.runes.KeystoneTree;
                return RuneJson[tree]["slots"][3]["runes"];
            },
            SecondaryTreeRowOne()
            {
                const tree = this.$store.state.runes.SecondaryTree;
                return RuneJson[tree]["slots"][1]["runes"];
            },
            SecondaryTreeRowTwo()
            {
                const tree = this.$store.state.runes.SecondaryTree;
                return RuneJson[tree]["slots"][2]["runes"];
            },
            SecondaryTreeRowThree()
            {
                const tree = this.$store.state.runes.SecondaryTree;
                return RuneJson[tree]["slots"][3]["runes"];
            },


        }
    }


</script>

<template>
    <el-container>
        <div class="runeContainer">
            <div class="row">
                <img src="../icons/runes/8000.png" v-on:click="SetTree(0,true)" v-bind:style="KeyStoneBackGroundColor(0)"/>
                <img src="../icons/runes/8100.png" v-on:click="SetTree(1,true)" v-bind:style="KeyStoneBackGroundColor(1)"/>
                <img src="../icons/runes/8200.png" v-on:click="SetTree(2,true)" v-bind:style="KeyStoneBackGroundColor(2)"/>
                <img src="../icons/runes/8300.png" v-on:click="SetTree(3,true)" v-bind:style="KeyStoneBackGroundColor(3)"/>
                <img src="../icons/runes/8400.png" v-on:click="SetTree(4,true)" v-bind:style="KeyStoneBackGroundColor(4)"/>
            </div>

            <div class="runerow" id="row1">
                <img class="rune" v-for="img in KeyStoneRowOneJSON" v-bind:src="img['icon']" v-bind:id="img['id']"/>
            </div>
            <div class="runerow" id="row2">
                <img class="rune" v-for="img in KeyStoneRowTwoJSON" v-bind:src="img['icon']" v-bind:id="img['id']"/>
            </div>
            <div class="runerow" id="row3">
                <img class="rune" v-for="img in KeyStoneRowThreeJSON" v-bind:src="img['icon']" v-bind:id="img['id']"/>
            </div>
            <div class="runerow" id="row4">
                <img class="rune" v-for="img in KeyStoneRowFourJSON" v-bind:src="img['icon']" v-bind:id="img['id']"/>
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
            <div class="runerow" id="row1_2">
                <img class="rune" v-for="img in SecondaryTreeRowOne" v-bind:src="img['icon']" v-bind:id="img['id']"/>
            </div>
            <div class="runerow" id="row2_2">
                <img class="rune" v-for="img in SecondaryTreeRowTwo" v-bind:src="img['icon']" v-bind:id="img['id']"/>
            </div>
            <div class="runerow" id="row3_2">
                <img class="rune" v-for="img in SecondaryTreeRowThree" v-bind:src="img['icon']" v-bind:id="img['id']"/>
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
    display: flex;
    flex-wrap: wrap;
    padding: 0 0px;

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
    vertical-align: middle;
    width: 26px;
    height: 26px;
    padding: 8px;
}

    
</style>