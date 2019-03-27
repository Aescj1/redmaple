<template>
  <v-container fluid grid-list-md>
    <v-layout  row wrap>
      <v-flex d-flex xs12 sm12 md12 xl12 lg12>
        <v-toolbar>
          <v-menu offset-y>
            <v-btn
              slot="activator"
              color="primary"
              dark
            >
              Sortieren nach:
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, index) in items"
                :key="index"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="created()">Refresh</v-btn>
          <v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow()" right>transit_enterexit</v-icon>
          <v-spacer></v-spacer>
          <v-text-field
            hide-details
             prepend-inner-icon="search"
            single-line
            color="red"
            solo-inverted
            v-model='search'
            clearable 
            @click:clear="clearSearch"
            >
          </v-text-field>
        </v-toolbar>
        </v-flex>
              </v-layout>

    
    <v-layout row wrap>
        <v-flex  xs2 sm2 md2 xl2 lg2 class="scroll">
        <v-list  fill-height>
          <template v-for="(patient, index) in filteredItems">

            <v-list-tile
              class="tile"
              :key="patient.bactNr"
              @click="setCurrentData(patient)"
            >
                        <v-list-tile-action>
              <v-checkbox
                v-model="filteredItems[index].selected"
              ></v-checkbox>
            </v-list-tile-action> 
              <v-list-tile-content >
                <v-list-tile-title>{{patient.bactNr}}</v-list-tile-title>
                <v-list-tile-sub-title>{{patient.priority}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn fab flat  small color="transparent" 
              @click.stop="filteredItems[index].received = !filteredItems[index].received"
              >
                  <v-icon
                  v-if="filteredItems[index].received"
                  color="yellow darken-2"
                >
                  star
                </v-icon>

                <v-icon
                  v-else
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>
              </v-btn>
            </v-list-tile>
             <v-divider
              v-if="index + 1 < patientList.length"
              :key="index"
              ></v-divider>
          </template>
        </v-list>
    </v-flex>
        <v-flex d-flex xs10 sm10 md10 xl10 lg10>
          <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-4">
                    <v-flex> 
                  <v-text-field v-model="this.$store.state.currentDataset1.bactNr" label="Bact Nummer*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex> 
                  <v-text-field v-model="this.$store.state.currentDataset1.wiederholung" label="Wiederholung*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.altId" label="alternative ID"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.priority" label="Priority*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.abbreviation" label="Pathogen (g)*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.lastName" label="lastName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.firstName" label="fistName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-3">
                <v-flex >
                  <v-text-field v-if="this.$route.path == '/geplant'" v-model="this.$store.state.currentDataset1.birthdate" label="Geburtsdatum*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.entry" label="Eingang*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.abnahmeDatum" label="Abnahme"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.einsender" label="Einsender*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.station" label="Station*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.bearbeitung" label="Bearbeitungsdatum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset1.material" label="Material*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-2">
                <v-flex>
                  <v-text-field v-model="this.$store.state.currentDataset1.ngsProject" label="NGS - Projekt"></v-text-field>
                </v-flex>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
       </v-flex>
      </v-layout>
      <v-btn>löschen</v-btn>
      <v-btn
          color="primary"
          dark
          @click.stop="dialog = true"
        >
          Extrahieren
        </v-btn>
        <v-dialog
          v-model="dialog"
          width="700" 
        >
        <v-card>
          <v-card-title
          class="headline grey lighten-2"
          primary-title
          >
          Datenset extrahieren
          </v-card-title>
          <v-card-text>
            Sollen folgende Datensets extrahiert werden?
            {{this.selectedPatients()}}
          </v-card-text>
          <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>


<script>
import _ from 'lodash';



  export default {

    data: () => ({
      dialog:false,
      search:'',
      notifications: false,
      selectedPatientsList:[],

      items: [
        { title: 'Bact-Nr' },
        { title: 'Priority' },
        { title: 'Einsender' },
        { title: 'Pathogen' }
      ],
      patientList:[
      ],
      currentDataset1: {
        bactNr: '',
        wiederholung:'',
        infOldList: '',
        altId: '',
        priority:'',
        abbreviation: '',
        lastName: '',
        firstName:'',
        birthdate: '',
        entry: '',
        abnahmeDatum: '',
        einsender: '',
        station: '',
        bearbeitung: '',
        material: '',
        ngsProject: '',
        selected:false,
        received:false,
      },
    }),
    computed: {

      //This Method filters the PatientList and builds the V-List that is displayed. 
        filteredItems() {
         //   this.patientList = this.$store.state.NgsList
            return _.orderBy(this.patientList.filter(patient => {
              //the if just checks if the search is null, which happens when you clear the searchfield with the clearSearch() method
              if(!this.search) return this.patientList;
              //that block checks if any search input matches the data in the patientList. It loops trought the Patient and checks if a match results in true.
              //ex. patient.bactNr is the same as this.search then it returns the patients --> this could be written in a loop..couldnt make it work
              return patient.bactNr.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.wiederholung.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.infOldList.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.altId.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.priority.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.abbreviation.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.lastName.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.firstName.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.birthdate.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.abnahmeDatum.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.einsender.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.bearbeitung.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.material.toLowerCase().includes(this.search.toLowerCase())  || 
              patient.ngsProject.toLowerCase().includes(this.search.toLowerCase())    
            }));
        }
    },
    methods:{
      changeworkflow(){
        this.$router.push('/workflow')

      },
           created(){
          for(var i=0; i< this.$store.state.NgsList.length; i++ ){
          if(this.$store.state.NgsList[i].process == 1){
          this.currentDataset1 = this.$store.state.NgsList[i]
          this.patientList.push(this.currentDataset1)
          }
          }
      },
      //clears the search and sets the value null
      clearSearch(){
        this.search='';
        },
      //sets the currentPatient
      setCurrentData(patient){
      this.$store.state.currentDataset1 = patient
      },
      //deletes a dataset
      delete(){

      },
      //sends a dataset to the next processstep (extrahiert) and opens a popup 
      extrahieren(){

      },
      selectedPatients(){
        for(var patient in this.patientList){
          if(patient.selected){
            this.selectedPatientsList.push(patient)
          }
          return "hello"
        } 
      }
    }
  }
</script>
<style>
    .scroll {
      overflow-y: auto;
      max-height: 72vh;
    }

</style>