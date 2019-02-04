import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketio from 'vue-socket.io-extended';
import io from 'socket.io-client';
import Chat from 'vue-beautiful-chat';

Vue.use(Chat);

Vue.use(VueSocketio, io('127.0.0.1:3000'));

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
