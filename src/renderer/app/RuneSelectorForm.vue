<script>
    import Vue from 'vue';
    import ElContainer from "element-ui/packages/container/src/main";
    import RuneJson from '../staticJSONs/RuneData'

    var KeyStoneMatrix = [-1, -1, -1, -1];
    var SecondaryTreeMatrix = [-1, -1, -1];
    var selectedSecondaryRunes = 0;


    export default {
        components: {ElContainer},
        data() {
            return {
                RuneData: RuneJson,
                componentKey: 0,
            }
        },
        methods: {
            SetTree: function(TreeId, isPrimary)
            {
                if(isPrimary){
                    this.$store.commit('runes/SetKeystoneTree', TreeId);
                    //reset the selected tree matrix
                    KeyStoneMatrix = [-1, -1, -1, -1];
                }
                else{
                    this.$store.commit('runes/SetSecondaryTree', TreeId);
                    //reset the selected tree matrix
                    SecondaryTreeMatrix = [-1, -1, -1];
                    selectedSecondaryRunes = 0;
                }

            },

            KeyStoneBackGroundColor: function(TreeId)
            {
                if(TreeId === this.$store.state.runes.KeystoneTree)
                {
                    return "background-color: black ;";
                }
                return "background-color: #181818;";
            },
            SecondaryTreeBackGroundColor: function(TreeId)
            {
                if(TreeId === this.$store.state.runes.SecondaryTree)
                {
                    return "background-color: black ;";
                }
                return "background-color: #181818;";
            },
            IsRuneSelected: function(id, isKeyStone)
            {
                if((KeyStoneMatrix.includes(id) && isKeyStone) || (SecondaryTreeMatrix.includes(id) && !isKeyStone))
                {
                    return '';
                }
                return '?image=e_grayscale&v=1';
            },
            onRuneClick: function(id, row, isKeyStone)
            {
                if(isKeyStone)
                {
                    //if selected unselect rune
                    if(KeyStoneMatrix.includes(id))
                    {
                        KeyStoneMatrix[row] = -1;
                        this.componentKey += 1;
                        return;
                    }
                    KeyStoneMatrix[row] = id;
                }
                else
                {
                    //if selected unselect rune
                    if(SecondaryTreeMatrix.includes(id))
                    {
                        SecondaryTreeMatrix[row] = -1;
                        this.componentKey += 1;
                        selectedSecondaryRunes -= 1;
                        return;
                    }
                    if(selectedSecondaryRunes <= 1) //you can only have 2 secondary runes
                    {
                        //todo check if the rune is on the same row and ignore this if statement if it is.
                        SecondaryTreeMatrix[row] = id;
                        selectedSecondaryRunes += 1;
                    }
                }
                //used to force re-render since vue doesnt auto re-render methods.
                this.componentKey += 1;
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
        <div class="runeContainer" >
            <div class="row">
                <img src="../icons/runes/8000.png" v-on:click="SetTree(0,true)" v-bind:style="KeyStoneBackGroundColor(0)"/>
                <img src="../icons/runes/8100.png" v-on:click="SetTree(1,true)" v-bind:style="KeyStoneBackGroundColor(1)"/>
                <img src="../icons/runes/8200.png" v-on:click="SetTree(2,true)" v-bind:style="KeyStoneBackGroundColor(2)"/>
                <img src="../icons/runes/8300.png" v-on:click="SetTree(3,true)" v-bind:style="KeyStoneBackGroundColor(3)"/>
                <img src="../icons/runes/8400.png" v-on:click="SetTree(4,true)" v-bind:style="KeyStoneBackGroundColor(4)"/>
            </div>
            <div :key="componentKey">
                <div class="runerow" id="row1" >
                    <img class="rune" v-for="img in KeyStoneRowOneJSON" v-bind:src="img['icon'] + IsRuneSelected(img['id'], true)" v-bind:id="img['id']" v-on:click="onRuneClick(img['id'], 0, true)"/>
                </div>
                <div class="runerow" id="row2">
                    <img class="rune" v-for="img in KeyStoneRowTwoJSON" v-bind:src="img['icon'] + IsRuneSelected(img['id'], true)" v-bind:id="img['id']" v-on:click="onRuneClick(img['id'], 1, true)" />
                </div>
                <div class="runerow" id="row3">
                    <img class="rune" v-for="img in KeyStoneRowThreeJSON" v-bind:src="img['icon'] + IsRuneSelected(img['id'], true)" v-bind:id="img['id']" v-on:click="onRuneClick(img['id'], 2, true)"/>
                </div>
                <div class="runerow" id="row4">
                    <img class="rune" v-for="img in KeyStoneRowFourJSON" v-bind:src="img['icon'] + IsRuneSelected(img['id'], true)" v-bind:id="img['id']" v-on:click="onRuneClick(img['id'], 3, true)"/>
                </div>
            </div>
        </div>
        <div class="runeContainer">
            <div class="row">
                <img src="../icons/runes/8000.png" v-on:click="SetTree(0, false)" v-bind:style="SecondaryTreeBackGroundColor(0)"/>
                <img src="../icons/runes/8100.png" v-on:click="SetTree(1, false)" v-bind:style="SecondaryTreeBackGroundColor(1)"/>
                <img src="../icons/runes/8200.png" v-on:click="SetTree(2, false)" v-bind:style="SecondaryTreeBackGroundColor(2)"/>
                <img src="../icons/runes/8300.png" v-on:click="SetTree(3, false)" v-bind:style="SecondaryTreeBackGroundColor(3)"/>
                <img src="../icons/runes/8400.png" v-on:click="SetTree(4, false)" v-bind:style="SecondaryTreeBackGroundColor(4)"/>
            </div>
            <div class="runerow" id="row1_2">
                <img class="rune" v-for="img in SecondaryTreeRowOne" v-bind:src="img['icon'] + IsRuneSelected(img['id'], false)" v-bind:id="img['id']" v-on:click="onRuneClick(img['id'], 0, false)"/>
            </div>
            <div class="runerow" id="row2_2">
                <img class="rune" v-for="img in SecondaryTreeRowTwo" v-bind:src="img['icon'] + IsRuneSelected(img['id'], false)" v-bind:id="img['id']" v-on:click="onRuneClick(img['id'], 1, false)"/>
            </div>
            <div class="runerow" id="row3_2">
                <img class="rune" v-for="img in SecondaryTreeRowThree" v-bind:src="img['icon'] + IsRuneSelected(img['id'], false)" v-bind:id="img['id']" v-on:click="onRuneClick(img['id'], 2, false)"/>
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