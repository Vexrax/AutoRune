<script>
    import ElContainer from "element-ui/packages/container/src/main";
    import RuneJson from '../staticJSONs/RuneData'
    import ShardJson from '../staticJSONs/RuneStats'
    import ElForm from "element-ui/packages/form/src/form";
    import ElButton from "element-ui/packages/button/src/button";
    import 'element-ui/lib/theme-chalk/index.css';

    /** Constant Strings **/
    const SelectedRuneStyleColor = "background-color: black ;";
    const DefaultRuneStyleColor = "background-color: #181818;";
    const GreyIconExtensionURL = '?image=e_grayscale&v=1';
    const StatsShardPath = "http://opgg-static.akamaized.net/images/lol/perkShard/";

    /** Update Objects**/
    var componentObj = 0;

    export default {
        components: {
            ElButton,
            ElForm,
            ElContainer},
        data() {
            return {
                RuneData: RuneJson,
                ShardData: ShardJson,
                componentKey: componentObj,
                StatsShardPath: StatsShardPath
            }
        },
        methods: {
            SetTree: function(TreeId, isPrimary)
            {
                if(isPrimary){
                    this.$store.commit('runes/SetKeystoneTree', TreeId);
                    //reset the selected tree matrix
                    this.$store.commit('tempRuneMatrix/ResetKeyStoneMatrix');
                    //KeyStoneMatrix = [-1, -1, -1, -1];
                }
                else{
                    this.$store.commit('runes/SetSecondaryTree', TreeId);
                    //reset the selected tree matrix
                    this.$store.commit('tempRuneMatrix/ResetSecondaryMatrix');
                    //SecondaryTreeMatrix = [-1, -1, -1];
                    //selectedSecondaryRunes = 0;
                }

            },

            KeyStoneBackGroundColor: function(TreeId)
            {
                if(TreeId === this.$store.state.runes.KeystoneTree)
                {
                    return SelectedRuneStyleColor;
                }
                return DefaultRuneStyleColor;
            },
            SecondaryTreeBackGroundColor: function(TreeId)
            {
                if(TreeId === this.$store.state.runes.SecondaryTree)
                {
                    return SelectedRuneStyleColor;
                }
                return DefaultRuneStyleColor;
            },
            IsRuneSelected: function(id, isKeyStone)
            {
                if((this.$store.state.tempRuneMatrix.KeyStoneMatrix.includes(id) && isKeyStone) || (this.$store.state.tempRuneMatrix.SecondaryTreeMatrix.includes(id) && !isKeyStone))
                {
                    return '';
                }
                return GreyIconExtensionURL;
            },
            onRuneClick: function(id, row, isKeyStone)
            {
                if(isKeyStone)
                {
                    //if selected unselect rune
                    if(this.$store.state.tempRuneMatrix.KeyStoneMatrix.includes(id))
                    {
                        this.$store.commit('tempRuneMatrix/SetKeyStoneMatrix', { "row": row, "id": -1}); //we use jsons because mutations only accept 2 params including state
                        this.componentKey += 1;
                        return;
                    }
                    this.$store.commit('tempRuneMatrix/SetKeyStoneMatrix',  { "row": row, "id": id}); //we use jsons because mutations only accept 2 params including state
                }
                else
                {
                    //if selected unselect rune
                    if(this.$store.state.tempRuneMatrix.SecondaryTreeMatrix.includes(id))
                    {
                        this.$store.commit('tempRuneMatrix/SetSecondaryTreeMatrix', { "row": row, "id": -1}); //we use jsons because mutations only accept 2 params including state
                        this.componentKey += 1;
                        this.$store.commit('tempRuneMatrix/SubtractSelectedSecondaryRunes');
                        return;
                    }
                    if(this.$store.state.tempRuneMatrix.selectedSecondaryRunes <= 1) //you can only have 2 secondary runes
                    {
                        //todo check if the rune is on the same row and ignore this if statement if it is.
                        this.$store.commit('tempRuneMatrix/SetSecondaryTreeMatrix', { "row": row, "id": id});
                        this.$store.commit('tempRuneMatrix/AddSelectedSecondaryRunes');
                    }
                }
                //used to force re-render since vue doesnt auto re-render methods.
                this.componentKey += 1;
            },
            OnShardClick: function(id, row)
            {
                this.$store.commit('tempRuneMatrix/SetShardMatrix', { "row": row, "id": id}); //we use jsons because mutations only accept 2 params including state
                this.$forceUpdate();
            },
            IsShardSelected: function(id, row)
            {
                if(this.$store.state.tempRuneMatrix.ShardMatrix[row] === id)
                {
                    return '';
                }
                return GreyIconExtensionURL;
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
            ShardSlots()
            {
                console.log(ShardJson);
                return ShardJson["slots"];
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
            <div class="savecontainer">
                <el-form>
                        <el-button type="primary">Save Runes</el-button>
                </el-form>
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
            <div class="statshardcontainer">
                <div class ="runerow">
                    <img class="rune" v-for="runes in ShardSlots[0]" v-bind:src="StatsShardPath + runes + '.png' + IsShardSelected(runes, 0)" v-on:click="OnShardClick(runes, 0)"/>
                </div>
                <div class ="runerow">
                    <img class="rune" v-for="runes in ShardSlots[1]" v-bind:src="StatsShardPath + runes + '.png' + IsShardSelected(runes, 1)" v-on:click="OnShardClick(runes, 1)"/>
                </div>
                <div class ="runerow">
                    <img class="rune" v-for="runes in ShardSlots[2]" v-bind:src="StatsShardPath + runes + '.png' + IsShardSelected(runes, 2)" v-on:click="OnShardClick(runes, 2)"/>
                </div>
            </div>

        </div>

    </el-container>

</template>

<style scoped>

.runeContainer {
    width: 100%;
    height: fit-content;
    margin-top: 30px;
    margin-left: 30px;
}

.row {
    background-color: #181818;
    opacity: 0.7;
    display: flex;
    padding: 0 0px;

}

.runerow{
    display: flex;
    opacity: 0.7;
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

.savecontainer{
    margin-top: 20px;
}

.statshardcontainer
{
    margin-top: 10px;
}

    
</style>
