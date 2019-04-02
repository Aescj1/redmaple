/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const REST_BASE_URL = 'http://147.87.118.201:3000/api/'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state:{
    ngs: []
  },
  actions: {
    loadNgs ({commit}){
      axios
        .get(REST_BASE_URL + 'ngs')
        .then((result) => {
            console.log(result.data)
            let ngs = result.data
            commit('SET_NGS', ngs)
          
        }).catch((err) => {
            console.log(err)
          
        })
    },

    // eslint-disable-next-line no-unused-vars
    putNgs({state}, json){
      axios
      .put(REST_BASE_URL + 'ngs', json)
      .then((response) => {
          console.log(response.status)
          this.dispatch('loadNgs')
        
      }).catch((err) => {
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