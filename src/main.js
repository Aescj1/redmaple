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
debug: true,
    connection: SocketIO('http://127.0.0.1:3000'), //options object is optional
    vuex: {
      store,
      actionPrefix: 'socket_',
      mutationPrefix: 'socket_'
    }
  })
);


Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    mode:'history',

})

Vue.config.productionTip = false 
export const bus = new Vue()

new Vue({
 router,
 store,
 render: h => h(Home)
}).$mount('#app')
