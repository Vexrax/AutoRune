<script>
    export default {
        name: "rune-selector-form"
    }
    function ShowRunesTree(TreeId)
    {
        //todo
    }
</script>

<template>
    <div class="runeContainer">
        <div class="row">
            <img src="../icons/runes/8000.png" onclick="ShowRunes(1)"/>
            <img src="../icons/runes/8100.png" onclick="ShowRunes(2)"/>
            <img src="../icons/runes/8200.png" onclick="ShowRunes(3)"/>
            <img src="../icons/runes/8300.png" onclick="ShowRunes(4)"/>
            <img src="../icons/runes/8400.png" onclick="ShowRunes(5)"/>
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