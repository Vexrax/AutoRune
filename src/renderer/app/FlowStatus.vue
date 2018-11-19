<script>
  import Vue from 'vue';
  import { Alert } from 'element-ui';

  Vue.use(Alert);

  const attrsByStatus = {
    'lcu-offline': {
      main: 'League of Legends client is offline',
      sub: 'Launch League of Legends.',
      level: 'info',
    },
    'lcu-online': {
      main: 'League of Legends client is online',
        sub: 'Sign into the League of Legends application.',
      level: 'info',
    },
    'ready': {
      main: 'Profile loaded and ready to begin!',
      sub: 'Runes are ready to be autoloaded!',
      level: 'success',
    }
  };

  export default {
    name: 'flow-status',
    computed: {
      attrs() {
        return attrsByStatus[this.$store.state.lcu.status];
      },
    }
  }
</script>

<template>
  <div>
    <el-alert
      v-bind:title="attrs.main"
      v-bind:type="attrs.level"
      v-bind:description="attrs.sub"
      :closable="false"
      show-icon>
    </el-alert>
  </div>
</template>
