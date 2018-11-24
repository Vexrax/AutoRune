<script>
    import ElContainer from "element-ui/packages/container/src/main";

    export default {
        components: {ElContainer},
        name: "rune-selector-form",
        methods: {
            ShowRunesTree: function(TreeId, isPrimary)
            {
                console.log("Tree " + TreeId + " " + isPrimary );
            }

        }
    }

</script>

<template>
    <el-container>
        <div class="runeContainer">
            <div class="row">
                <img src="../icons/runes/8000.png" v-on:click="ShowRunesTree(1,true)"/>
                <img src="../icons/runes/8100.png" v-on:click="ShowRunesTree(2,true)"/>
                <img src="../icons/runes/8200.png" v-on:click="ShowRunesTree(3,true)"/>
                <img src="../icons/runes/8300.png" v-on:click="ShowRunesTree(4,true)"/>
                <img src="../icons/runes/8400.png" v-on:click="ShowRunesTree(5,true)"/>
            </div>
            <div class="row" id="row1">

            </div>
            <div class="row" id="row2">

            </div>
            <div class="row" id="row3">

            </div>
            <div class="row" id="row4">

            </div>
        </div>
        <div class="runeContainer">
            <div class="row">
                <img src="../icons/runes/8000.png" v-on:click="ShowRunesTree(1, false)"/>
                <img src="../icons/runes/8100.png" v-on:click="ShowRunesTree(2, false)"/>
                <img src="../icons/runes/8200.png" v-on:click="ShowRunesTree(3, false)"/>
                <img src="../icons/runes/8300.png" v-on:click="ShowRunesTree(4, false)"/>
                <img src="../icons/runes/8400.png" v-on:click="ShowRunesTree(5, false)"/>
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
    height: 60%;
    margin-top: 30px;
    margin-left: 30px;
}

.row {
    display: inline-flex;
    flex-wrap: wrap;
    padding: 0 4px;

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