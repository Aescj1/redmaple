<!-- This is the View for the UserTab that extends when clicking the hamburger symbol on the top left. !-->
<template>
  <v-card >
      <v-toolbar flat class="transparent, user_status">
        <v-list class="pa-0">
          <v-list-tile avatar >
            <v-list-tile-avatar >
              <img src="../assets/User.jpg" class="user-image"  >
            </v-list-tile-avatar>
            <v-list-tile-content class="mt-5">
              <v-list-tile-title class="text-md-center"><b>Admin User</b></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>
            <v-list-tile @click="changeTheme">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Change Theme</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click="viewWorkflow">
          <v-list-tile-action>
            <v-icon>work</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Workflow</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

          <v-list-tile @click="viewTable">
          <v-list-tile-action>
            <v-icon>format_list_numbered</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Datatable</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      <!-- Defines the function groupd "Actions" !-->
        <v-list-group
          prepend-icon="remove_red_eye"
          no-action
          v-if="this.$route.path == '/table'"
        >
          <v-list-tile slot="activator">
            <v-list-tile-title>Actions</v-list-tile-title>
          </v-list-tile>
            <v-list-tile 
            v-for="item in headers"
            :key="item.value"
            @click="hideHeader(item)" 
            v-model="item.show"
            >
            <v-list-tile-action>
              <v-switch
                readonly
                v-model="item.show"
                color= red
                :label="item.text"
              ></v-switch>
            </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-tile>
          <v-list-tile-action>
            <v-icon>group</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>User management</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>

        <v-list-tile @click="logout()">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
          </v-list-tile>

      </v-list>
  </v-card>
</template>

<script>
import {bus} from '../main.js'

  export default {

    data: ()=>({
      /**This is the Information for the Toggle Buttons */
      headers:[
        {  index:0, text: 'Bact Nr-', show:true},
        {  index:1, text: 'Alternative ID', show:false },
        {  index:2, text: 'Priority', show:true},
        {  index:3, text: 'Pathogen', show:true},
        {  index:4, text: 'Patient', show:true},
        {  index:5, text: 'Geburtsdatum', show:true},
        {  index:6, text: 'Eingang', show:true},
        {  index:7, text: 'Abnahme', show:false},
        {  index:8, text: 'Einsender', show:true},
        {  index:9, text: 'Station', show:false},
        {  index:10, text: 'Bearbeitung', show:false},
        {  index:11, text: 'Material', show:true},
        {  index:12, text: 'NGS-Projekt', show:true},
        {  index:13, text: 'Datum DNA-Prep', show:false},
        {  index:14, text: 'DNA-Konz (ng/ul)', show:false},
        {  index:15, text: 'Visum DNA', show:false},
        {  index:16, text: 'Run Nummer', show:true},
        {  index:17, text: 'NGS Nummer', show:true},
        {  index:18, text: 'Library Typ', show:true},
        {  index:19, text: 'Datum Library', show:false},
        {  index:20, text: 'Visum Library', show:false},
        {  index:21, text: 'Datum Sequenzierung', show:false},
        {  index:22, text: 'NGS Gerät', show:true},
        {  index:23, text: 'Visum Datenqualität', show:false},
        {  index:24, text: 'Information alte Liste', show:false},
        {  index:25, text: 'Public identifier', show:false},
      ],
      dark:true,
      }
    ),
    methods:{
      logout(){
        this.$store.dispatch('logout')
        bus.$emit('drawerReset',false)
      },

      viewWorkflow(){
        this.$router.push('/workflow')
      },

      viewTable(){
        this.$router.push('/table')
      },

      changeTheme(){
        this.dark = !this.dark
        bus.$emit('changeTheme',this.dark);
      },

      /** Function that sends the information of the toggle button to the Table View and deactivates the chosen column */
      hideHeader(item){
        item.show = !item.show
        bus.$emit('hideHeader',item.index)
      }
    }
  }
</script>

<style>
.user_status{
  height: 100px;
}
.user-image{
min-width:90px; 
min-height:90px;
margin-top:40px;
margin-left: 30px;

}
</style>
