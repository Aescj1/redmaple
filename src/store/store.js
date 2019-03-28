import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state:{
<<<<<<< HEAD
=======
    ngs: []
>>>>>>> 9e755b80e95164acd76c5c93a3ad3028a35b53b3
  },
  actions: {
    loadNgs ({commit}){
      axios
        .get('http://147.87.118.201:3000/api/ngs')
        .then((result) => {
            // eslint-disable-next-line no-console
            console.log(result.data)
            let ngs = result.data
            commit('SET_NGS', ngs)
          
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
          
        })
    }
  },
  mutations: {
    SET_NGS (state, ngs){
      state.ngs = ngs;
    }
  }
}) 












//This can be used but the store import in the main.js has to be altered to {store}
/*
export const store = new Vuex.Store({
    state:{
        ngs:[]
           
    },
    setters:{
    }
})
*/