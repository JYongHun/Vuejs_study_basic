// import { createApp } from 'vue'
// import App from './App.vue'
// createApp(App).mount('#app')


import Vue from "vue";
import App from "../App";
import VueDragscroll from "vue-dragscroll";

Vue.use(VueDragscroll);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App)
});

