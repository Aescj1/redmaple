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
            v-for="header in headers"
            :key="header.value"
            @click="hideHeader(header)" 
            v-model="header.show"
            >
            <v-list-tile-action>
              <v-switch
                readonly
                v-model="header.show"
                color= red
                :label="header.text"
              ></v-switch>
            </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-tile @click="userManagement">
          <v-list-tile-action>
            <v-icon>group</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Admin Dashboard</v-list-tile-title>
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
      headers: [
        { index: 0, class:'dataSet', text: 'Bact Nr', sortable: true, value: 'bactnr', show: true},
        { index: 1, text: 'Alternative ID', value: 'altid', show: false },
        { index: 2, text: 'Prozessschritt', value: 'processnr', show: true },
        { index: 3, text: 'priority', value: 'priority' , show: true},
        { index: 4, text: 'Pathogen', value: 'pathogen' , show: true},
        { index: 5, class:'dataSet',text: 'Vorname', value: 'firstname' , show: true},
        { index: 6, class:'dataSet',text: 'Nachname', value: 'lastname' , show: true},
        { index: 7, text: 'Geburtsdatum', value: 'birthdate', show: true },
        { index: 8, text: 'Eingang', value: 'entrydate', sortable: false, show: true },
        { index: 9, text: 'Abnahme', value: 'samplingdate', show: false },
        { index: 10, text: 'Einsender', value: 'sender', show: true },
        { index: 11, text: 'Station', value: 'department', show: false },
        { index: 12, text: 'Bearbeitungsdatum', value: 'processingdate', show: false },
        { index: 13, text: 'Material', value: 'material', show: true },
        { index: 14, text: 'NGS-Projekt', value: 'ngsproject', show: true },
        { index: 15, text: 'Datum DNA-Extraktion', value: 'extractiondate', show: false },
        { index: 16, text: 'DNA-Konz (ng/ul)', value: 'concentration', show: false },
        { index: 17, text: 'Visum DNA', value: 'extractionvisum', show: false },
        { index: 18, text: 'NGS Nummer', value: 'runnr', show: false },
        { index: 19, text: 'Isolat Run Nummer', value: 'isorunnr', show: false },
        { index: 20, text: 'Library Typ', value: 'librarytype', show: true },
        { index: 21, text: 'Datum Library', value: 'librarydate', show: false },
        { index: 22, text: 'Visum Library', value: 'libraryvisum', show: false },
        { index: 23, text: 'Datum Sequenzierung', value: 'sequencingdate', show: false },
        { index: 24, text: 'NGS Gerät', value: 'modality' , show: true},
        { index: 25, text: 'Visum Sequenzierung', value: 'sequencingvisum' , show: false},
        { index: 26, text: 'Visum Datenqualität', value: 'dataqualityvisum' , show: false},
        { index: 27, text: 'Information alte Liste', value: 'oldinformation' , show: false},
        { index: 28, text: 'Public identifier', value: 'id' , show: false}
      ],
      dark:true,
      }
    ),
    methods:{
      userManagement(){
        this.$router.push('/admin')
      },
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
      hideHeader(header){
        let index = this.headers.indexOf(header)
        this.headers[index].show = !header.show
        console.log(this.headers[index])
       this.$store.commit('SET_HEADERS', this.headers)
        //bus.$emit('hideHeader',item.index)
      },
      testUnlockAll(){
        this.$store.dispatch('unlockAll')
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
      },
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
