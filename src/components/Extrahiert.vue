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
              :key="patient.bactNr"
              avatar
              @click="setCurrentData(patient)"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{patient.bactNr}}</v-list-tile-title>
                <v-list-tile-sub-title>{{patient.priority}}</v-list-tile-sub-title>
              </v-list-tile-content>
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
                  <v-text-field v-model="this.$store.state.currentDataset2.bactNr" label="Bact Nummer*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex> 
                  <v-text-field v-model="this.$store.state.currentDataset2.wiederholung" label="Wiederholung*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.altId" label="alternative ID"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.priority" label="Priority*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.abbreviation" label="Pathogen (g)*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.lastName" label="lastName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.firstName" label="fistName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-3">
                <v-flex >
                  <v-text-field  v-model="this.$store.state.currentDataset2.birthdate" label="Geburtsdatum*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.entry" label="Eingang*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.abnahmeDatum" label="Abnahme"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.einsender" label="Einsender*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.station" label="Station*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.bearbeitung" label="Bearbeitungsdatum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset2.material" label="Material*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
              
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-2">
                <v-flex>
                  <v-text-field v-model="this.$store.state.currentDataset2.ngsProject" label="NGS - Projekt"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-if="this.$store.state.currentDataset2.process>=2" v-model="this.$store.state.currentDataset2.datumPrep" label="DNA Vorbereitungsdatum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset2.process>=2" v-model="this.$store.state.currentDataset2.konzentration" label="DNA Konzentration"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-if="this.$store.state.currentDataset2.process>=2" v-model="this.$store.state.currentDataset2.visumDna" label="DNA Visum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field   v-model="this.$store.state.currentDataset2.runNr" label="Run NR"></v-text-field>
                </v-flex>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
       </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
import _ from 'lodash';



  export default {

    data: () => ({
      search:'',
      items: [
        { title: 'Bact-Nr' },
        { title: 'Priority' },
        { title: 'Einsender' },
        { title: 'Pathogen' }
      ],
      patientList:[
      ],
      currentDataset2: {
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
        datumPrep: '',
        konzentration: '',
        visumDna: '',
        runNr: '',
        runProbeNr: '',
        libraryTyp: '',
        libraryDatum: '',
        libraryVisum: '',
        seqDatum: '',
        modalität: '',
        datenqualVisum: '',
        publicIdentifier: '',
        process:'',
      },
    }),
    computed: {

      //This Method filters the PatientList and builds the V-List that is displayed. 
        filteredItems() {
         //   this.patientList = this.$store.state.NgsList
            return _.orderBy(this.patientList.filter(patient => {
              //the if just checks if the search is null, which happens when you clear the searchfield with the clearSearch() method
              if(!this.search) return this.items;
              //that block checks if any search input matches the data in the patientList. It loops trought the Patient and checks if a match results in true.
              //ex. patient.bactNr is the same as this.search then it returns the patients
                for (var item in patient){
                    return patient[item].toLowerCase().includes(this.search.toLowerCase())
                }
            }));
        }
    },
    methods:{
      changeworkflow(){
        this.$router.push('/workflow')

      },
           created(){
          for(var i=0; i< this.$store.state.NgsList.length; i++ ){
          if(this.$store.state.NgsList[i].process == 2){
          this.currentDataset2 = this.$store.state.NgsList[i]
          this.patientList.push(this.currentDataset2)
          }
          }
      },
      //clears the search and sets the value null
        clearSearch(){
          this.search='';
          },
          //sets the currentPatient
          setCurrentData(patient){
            this.$store.state.currentDataset2 = patient
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