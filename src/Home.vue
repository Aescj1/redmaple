<!-- This is the main View which defines the Frame of the application. Every Link/Path/Route is displayed in the router-view!-->
<template>
  
  <v-app id="inspire" class="main" :dark="isDark">
    <v-navigation-drawer
      v-if="this.$route.path != '/'"
      v-model="drawer"
      clipped
      fixed
      app
      temporary
     >
    <UserTab></UserTab>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon  v-if="this.$route.path != '/'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><img class="header-logo" src="./assets/Red_Maple.png"> <p class="header-text">Red Maple</p></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" v-if="this.$route.path != '/'" @click="$refs.inputUpload.click()">Import</v-btn>
      <input v-show="false" ref="inputUpload" type="file" @change="fileSelection" >
      <v-btn @click="downloadCSV" v-if="this.$route.path == '/geplant' || this.$route.path == '/extrahiert' || this.$route.path == '/lauf' || this.$route.path == '/sequenziert' ">Export</v-btn>
        <v-dialog
          v-model="dialog"
          width="700" 
          scrollable
        >
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
            <div>
            <div class="headline">Datensets importieren</div>
              <span class="subheading grey--text">Sollen folgende Datensets importiert werden?</span>
            </div>
            </v-card-title>
              <v-card-text>
                <v-form v-for="item in ngsList" :key="item.index">
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex
                    xs6
                    md6
                    >
                  <v-text-field v-text="item.bactnr">
                  </v-text-field>
                    </v-flex>
                    <v-flex
                    xs6
                    md6>
                    <v-text-field v-text ="item.priority"></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="primary"
                  flat
                  @click="importDataset"
                >
                  Bestätigen
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </v-toolbar>
    <v-content class="board-background">
      <v-container fluid>
        <router-view :key="$route.fullPath"></router-view>
      </v-container>
              <v-snackbar
              v-model="snackbar"
              :color="snackColor"
              multi-line
              :timeout="4000"
            >
              {{ snackText }}
              <v-btn
                dark
                flat
                @click="snackbar = false"
              >
                Close
              </v-btn>
            </v-snackbar>
    </v-content> 
    <v-footer app fixed>
      <span>&copy; 2019 - Berner Fachhochschule Medizininformatik </span>
    </v-footer>
 </v-app>
</template>

<script>
/* eslint-disable */
import UserTab from './components/UserTab.vue'
import {bus} from './main.js'
import Papa from 'papaparse'
import axios from 'axios'
import store from './store/store.js'


  export default {
  methods:{

          //Methods that define the snackbars and notify the user
      positiveNotification(){
        this.snackColor="success"
        this.snackText="Aktion erfolgreich"
        this.snackbar =true
      },
      negativeNotification(error){
        this.snackColor="error"
        this.snackText= error.statusCode + ": " + error.statusMessage
        this.snackbar=true
      },
      neutralNotification(){
          this.snackColor="warning"
          this.snackText="Sie können den Datensatz nun bearbeiten"
          this.snackbar=true
      },
      //var csv is the CSV file with headers
    fileSelection(csv){
      var file = csv.target.files[0];
      Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete:(results) => {
            this.ngsList = results.data
            this.dialog = true
          }
      })
    },
    importDataset(){
      for(var i=0; i<this.ngsList.length;i++){
        if(this.ngsList[i].bactnr != null){
        if(this.ngsList[i].birthdate)this.ngsList[i].birthdate = this.dateFormat(this.ngsList[i].birthdate)
       if(this.ngsList[i].entrydate)this.ngsList[i].entrydate = this.dateFormat(this.ngsList[i].entrydate)
       if(this.ngsList[i].entrydate)this.ngsList[i].isoentrydate = this.dateFormat(this.ngsList[i].isoentrydate)
       if(this.ngsList[i].entrydate)this.ngsList[i].samplingdate = this.dateFormat(this.ngsList[i].samplingdate)
        this.ngsList[i].processnr = 1
        this.$store.dispatch('putNgs', this.ngsList[i])
        }
        }
        this.ngsList = []
        this.dialog = false
    },
    dateFormat(date){
      var str = date
       if(str.length >9 && str){
          var day = str.substring(0, 2);
          var month = str.substring(3, 5);
          var year = str.substring(6, 10);
          var newDate = year+"-"+month+"-"+day
          return newDate       }
          else return date
    },
    downloadCSV(){
    var csv = Papa.unparse(this.$store.state.export, {
      quotes: false, //or array of booleans
      quoteChar: ' ',
      escapeChar: ' ',
      delimiter: ';', //sets the delimiter, each delimiter gets read as new column
      header: true,
      skipEmptyLines: false, //or 'greedy', greedy will grab all the information and not skip
      columns: null //or array of strings

    });

    var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    var csvURL =  null;
    if (navigator.msSaveBlob)
    {
        csvURL = navigator.msSaveBlob(csvData, 'download.csv');
    }
    else
    {
        csvURL = window.URL.createObjectURL(csvData);
    }

    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'download.csv');
    tempLink.click();
}
  },
  components: {
    UserTab,
  },

    data: () => ({
      dialog: false,
      ngsList:[],
      ngsData:'',
      isDark:false,
      drawer: false,
      state: 0,
      snackText:'',
      snackColor:'',
      snackbar:false,
    }),
    props: {
      source: String
    },
    created(){

      axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function () {
          const AUTH_REQUIRED = "AUTHORIZATION_REQUIRED"
          const INVALID_TOKEN = "INVALID_TOKEN"
          if (err.response.status === 401 && err.config && (err.response.data.error.code === AUTH_REQUIRED || err.response.data.error.code === INVALID_TOKEN)) {
            store.commit('KICK')  
          }
          throw err;
        });
      });

/*
      axios.interceptors.response.use(undefined, function (err) {
          console.log(err)
          if (err.status === 401) {
            this.$store.dispatch('logout')
          }
          return Promise.reject(err);
      });
*/     
       
      bus.$on('drawerReset', (data) =>{
        this.drawer = data;
      })

      bus.$on('changeTheme', (data) =>{
        this.isDark = data;
      })

      bus.$on('positiveNotification', (data) =>{
        this.positiveNotification()
      })

      bus.$on('neutralNotification', (data) =>{
        this.neutralNotification()
      })

      bus.$on('negativeNotification', (error) =>{
        this.negativeNotification(error)
      })
    }
  }
</script>

<style>
.header-logo{
    width: 6%;
    float: left;
    margin-right: 10px;
}
.header-text{
display:inline;
font-size:larger;
}
.board-background{
  background-image: url("./assets/background3.jpg");
  background-size: cover;
  background-position: 50% 50%;
}
.vue-holder{
  display:block;
}
/*sets the size of the table so that there is a inframe scrollbar*/
.table{
max-height:700px;
overflow:auto;
}
/*removes the scrollbar of the main frame*/
.main{
    overflow-y: unset !important;
    height:100vh;
}
.test{
  font-size: 3em;
}
</style>
