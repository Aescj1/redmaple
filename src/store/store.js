/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

//Check if this works on the server
const REST_BASE_URL = 'http://147.87.118.201:3000/api/'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state:{
    ngs: [],
    locks: [],
    responseStatus: {
      status: '',
      statusText: ""
    }
  },
  actions: {
    loadNgs (context){
      axios
        .get(REST_BASE_URL + 'ngs')
        .then((response) => {
            console.log("These are all ngs datasets:")
            console.log(response)
            context.commit('SET_NGS', response)
          
        }).catch((err) => {
            console.log(err)
        })
    },

    loadNgsById (context, id){
      //TODO: axios GET request for a specific ID
      let filter = {where:{id: id}}
      axios
       .get(REST_BASE_URL + 'ngs/findOne', filter)
       .then((response) => {
        context.commit('PUSH_NGS', response)
       }).catch((err) => {
         console.log(err)
       })
    },

    putNgs(context, json){
      axios
      .put(REST_BASE_URL + 'ngs', json)
      .then((response) => {
          console.log(response.status)
          //this.dispatch('loadNgs')
        
      }).catch((err) => {
          console.log(err)
        })
      
    },

    deleteNgs(context, id){
      axios
      .delete(REST_BASE_URL + 'ngs', id)
      .then((response) => {
          console.log(response.status)
          //this.dispatch('loadNgs')
        
      }).catch((err) => {
          console.log(err)
        })
      
    },

    //This method is depricated and was only used for development purposes
    socket_lockNotification(context, id) {
      //console.log('lock notificaiton:  ' + id);
      //enable this to enable the lock array
      //context.commit('SET_LOCK', id)
      },

    socket_clientLocks(context, clientLocks){
      context.commit('SET_LOCKS', clientLocks)

    },

    socket_updateNotify(context, id){
      //TODO: Call action to get the dataset by ID
      console.log("loading id " + id + " ..");
      this.dispatch('loadNgsById', id)
      
    }
  },
  mutations: {
    SET_NGS (state, response){
      state.ngs = response.data,
      state.responseStatus.status = response.status,
      state.responseStatus.statusText = response.statusText
    },

    PUSH_NGS (state, response){
      state.ngs.push(response.data)
      state.responseStatus.status = response.status,
      state.responseStatus.statusText = response.statusText
      console.log("This is the new ngs array:")
      console.log(state.ngs)

    },

    //This method is depricated and was only used for development purposes
    SET_LOCK(state, id){
      state.locks.push(id)
    },

    SET_LOCKS(state, clientLocks){
      state.locks = clientLocks
      console.log("These are the currently locked datasets:")
      console.log(state.locks)
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