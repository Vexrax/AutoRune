<script>
      import Vue from 'vue';
  import {
    Container,
    Footer,
    Header,
    Main,
    Row,
      Aside
  } from 'element-ui';
  import { store } from './store';
  import FlowStatus from './FlowStatus';
  import PreferenceForm from './PreferenceForm';
  import ChampGridForm from './ChampGridForm'

  Vue.use(Container);
  Vue.use(Footer);
  Vue.use(Header);
  Vue.use(Main);
  Vue.use(Row);
  Vue.use(Aside);

  export default {
    name: 'app',
    components: {
      FlowStatus,
      PreferenceForm,
        ChampGridForm,
    },
    store,
    data() {
      return {
        connectedImageUrl: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/artbook/en_US/f31d8b829b603b4b65fdff2475bd0803ced0179d/assets/content/champion/16_end/end_01.jpg',
        disconnectedImageUrl: 'https://lolstatic-a.akamaihd.net/frontpage/apps/prod/artbook/en_US/f31d8b829b603b4b65fdff2475bd0803ced0179d/assets/content/champion/00_intro/intro_01.jpg',
        overlayCss: 'linear-gradient(rgba(0, 0, 0, 0.3), rgb(204, 229, 255))',
      }
    },
    computed: {
      connectedToLcu() {
        const lcuStatus = this.$store.state.lcu.status;
        const disconnectedStates = ['lcu-offline', 'connecting', 'challenged'];
        return !disconnectedStates.includes(lcuStatus);
      },
      connectedToServer() {
        const lcuStatus = this.$store.state.lcu.status;
        const connectedStates = ['ready', 'queued', 'matched'];
        return connectedStates.includes(lcuStatus);
      },
      backgroundImageUrl() {
        if (this.connectedToLcu) {
          return this.connectedImageUrl;
        } else {
          return this.disconnectedImageUrl;
        }
      },
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');

body {
  height: 100vh;
  margin: 0;
  font-family: 'Roboto Condensed', sans-serif;

  > .el-container {
    height: 100%;
  }
}
</style>

<template>

  <el-container :style="{ background: overlayCss + ', url(' + backgroundImageUrl + ') center/cover' }">
    <el-aside style="width: 200px;">

    </el-aside>

    <el-header>
      <el-row type="flex" justify="center">
        <h1>AutoRune</h1>
      </el-row>
    </el-header>

    <el-main>
        <el-row type="flex" justify="center">
          <champ-grid-form></champ-grid-form>
        </el-row>
    </el-main>

    <el-footer>
      <flow-status></flow-status>
    </el-footer>
  </el-container>
</template>


