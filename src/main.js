/* eslint-disable no-console */
import Vue from 'vue'
import './plugins/vuetify'
import VueRouter from 'vue-router'
import 'babel-polyfill'
import Home from './Home.vue'
import {routes} from './routes'
import store from './store/store.js'
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
debug: false,
    connection: SocketIO('http://147.87.118.201:3000'), //Change to localhost for development
    //'http://147.87.118.201:3000'
    //'http://127.0.0.1:3000'
    vuex: {
      store,
      actionPrefix: 'socket_',
      mutationPrefix: 'socket_'
    }
  })
);


Vue.use(VueRouter);

export const router = new VueRouter({
    store,
    routes,
    mode:'history',

})

Vue.config.productionTip = false 
export const bus = new Vue()

new Vue({
 router,
 store,
 beforeCreate() {
  this.$store.commit('initialiseStore');
},
 render: h => h(Home)
}).$mount('#app')
