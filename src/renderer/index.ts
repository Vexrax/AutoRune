// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import Vue from 'vue';

import { store } from './app/store';

import { UiController } from './ui_controller';

import App from './app/App.vue';


(self as any).controller = new UiController(store);


new Vue({
    el: '#app',
    render: h => h(App),
});