import Vue from 'vue';
import App from './App.vue';

require('./assets/_assets.js');

new Vue({
  el: '#app',
  render: h => h(App)
});
