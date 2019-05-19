<template>
  <v-container fluid grid-list-md>
    <v-layout  row wrap>
      <!--Defines the length of the toolbar (md12 = use all 12 grid columns on medium devices). the toolbar contains a search(row 29) and a sort button (row 8)  -->
      <v-flex d-flex xs11 sm11 md11 xl11 lg11>
        <v-toolbar>
          <v-menu offset-y>
            <v-btn
              slot="activator"
              color="primary"
              dark
              v-model="this.sorted"
            >
              Sortieren nach: {{this.sorted.title}}
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                @click="setSorted(item)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
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
        <v-flex d-flex xs1 sm1 md1 xl1 lg1>
          <v-btn outline color="blue-grey darken-3" large @click="changeworkflow('workflow')">
            <v-icon light>work</v-icon>
          </v-btn>
        </v-flex>
              </v-layout>

    
    <v-layout row wrap>
      <!--  This part defines the DataList and displays all the bact-Nr and the Priority       -->
        <v-flex  xs2 sm2 md2 xl2 lg2 class="scroll">
        <v-list id="ngsList" fill-height>
          <template v-for="(patient, index) in filteredItems">

            <v-list-tile
              class="tile"
              :key="patient.index"
              @click="setCurrentData(patient,index)"
              :class="{'is-active': index == activeIndex}"
            >
              <v-list-tile-content >
                <v-list-tile-title v-if="sorted.title == 'Bact-Nr' ||sorted.title == 'Priority' ">{{patient.bactnr}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Pathogen'">{{patient.pathogen}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Einsender'">{{patient.sender}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Lauf Nummer'">Run package: {{index}}</v-list-tile-title>
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

    <!------------- This defines the expandables Rows that displays the content of the NGS List (only gets shown when selected Lauf Nummer) -->
        <v-flex d-flex xs9 sm9 md9 xl9 lg9>
          <v-card>
          <v-card-text v-if="this.sorted.value =='runnr'" class="scroll">
            <v-expansion-panel>
                  <v-expansion-panel-content 
                  v-for="(item, index) in orderedRunList "
                  :key="index"
                  >
                  <div slot="header">
                    <span class="spacer"><b>NGS-Projekt:</b>{{item.ngsproject}}</span>
                    <span class="spacer"><b> Run Nr.:</b> {{item.runnr}}</span>
                    <span class="spacer"><b> NGS-Nr:</b> {{item.isorunnr}}</span>
                    <span class="spacer"><b>Patientenname:</b> {{item.lastname}} {{item.firstname}} </span>
                    </div>
                     <v-card>
                        <v-card-text class="teal lighten-4"> 
                          <v-layout>
                            <v-flex
                            xs4
                            md4
                            >
                            <p><b>Wiederholung:</b> {{item.repetition}}</p>
                            <p><b>alternative ID:</b> {{item.altid}}</p>
                            <p><b>Priorität:</b> {{item.priority}}</p>
                            <p><b>Pathogen:</b> {{item.pathogen}}</p>
                            <p><b>Eingangsdatum:</b> {{dateformatter(item.isoentrydate)}}</p>
                            <p><b>Abnahmedatum:</b> {{dateformatter(item.samplingdate)}}</p>
                            <p><b>Einsender:</b> {{item.sender}}</p>
                            </v-flex>
                            <v-flex
                              xs4
                              md4
                            > 
                              <p><b>Station:</b> {{item.department}}</p>
                              <p><b>Bearbeitungsdatum: </b>{{dateformatter(item.processingdate)}}</p>
                              <p><b>Material:</b> {{item.material}}</p>
                              <p><b>Bearbeitungsdatum:</b> {{dateformatter(item.processingdate)}}</p>
                              <p><b>Material:</b> {{item.material}}</p>
                              <p><b>Datum DNA-Prep:</b> {{dateformatter(item.extractiondate)}}</p>
                              <p><b>DNA Konz. (ng/ul):</b> {{item.concentration}}</p>
                            </v-flex>

                            <v-flex
                              xs4
                              md4
                            > 
                              <p><b>Visum DNA:</b> {{item.extractionvisum}}</p>
                              <p><b>Abnahmedatum:</b> {{dateformatter(item.samplingdate)}}</p>
                              <p><b>Library Typ:</b> {{item.librarytype}}</p>
                              <p><b>Library Darum:</b> {{dateformatter(item.librarydate)}}</p>
                              <p><b>Library Visum:</b> {{item.libraryvisum}}</p>
                              <p><b>Sequenzierungsdatum:</b> {{item.sequencingDate}}</p>
                              <p><b>NGS-Gerät:</b> {{item.modality}}</p>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <v-card-text v-else>
            <v-container grid-list-md>
              <v-layout wrap>
                <!--Defines the first red square that contains meta data  -->
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="teal  lighten-4">
                  <v-text-field v-model="currentDataset1.bactnr" label="Bact Nummer*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.repetition" label="Wiederholung*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.altid" label="alternative ID"></v-text-field>
                  <v-text-field v-model="currentDataset1.priority" label="Priority*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.pathogen" label="Pathogen (g)*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.lastname" label="lastName*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.firstname" label="fistName*" required></v-text-field>
            </v-card>
                </v-flex>
                <!--Defines the second red square that contains meta data  -->
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="teal  lighten-3">
                  <v-text-field v-model="currentDataset1.birthdate" label="Geburtsdatum*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.isoentrydate" label="Eingang*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.samplingdate" label="Abnahme"></v-text-field>
                  <v-text-field v-model="currentDataset1.sender" label="Einsender*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.department" label="Station*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.processingdate" label="Bearbeitungsdatum"></v-text-field>
                  <v-text-field v-model="currentDataset1.material" label="Material*" required></v-text-field>
            </v-card>
                </v-flex>

              <!--Defines the third red square that contains meta data  -->
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="teal  lighten-2">
                  <v-text-field v-model="currentDataset1.ngsproject" label="NGS - Projekt"></v-text-field>
                  <v-text-field v-model="currentDataset1.extractiondate" label="Datum DNA-Prep"></v-text-field>
                  <v-text-field v-model="currentDataset1.concentration" label="DNA Konz. (ng/ul)"></v-text-field>
                  <v-text-field v-model="currentDataset1.extractionvisum" label="Visum DNA"></v-text-field>
                  <v-text-field v-model="currentDataset1.runtype" label="runtype"></v-text-field>
                  <v-text-field v-model="currentDataset1.runnr" label="NGS Run Nummer"></v-text-field>
                  <v-text-field v-model="currentDataset1.isorunnr" label="Isolat Run Nummer"></v-text-field>
            </v-card>
                </v-flex>
            <!--Defines the fourth red square that contains meta data  -->
            <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="teal  lighten-2">
                  <v-text-field v-model="currentDataset1.librarytype" label="Library Typ"></v-text-field>
                  <v-text-field v-model="currentDataset1.librarydate" label="Datum Library"></v-text-field>
                  <v-text-field v-model="currentDataset1.libraryvisum" label="Visum Library"></v-text-field>
                  <v-text-field v-model="currentDataset1.sequencingdate" label="Datum Sequenzierung"></v-text-field>
                  <v-text-field v-model="currentDataset1.modality" label="NGS-Gerät"></v-text-field>
                  <v-text-field v-model="currentDataset1.comment" label="Kommentar"></v-text-field>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
            <div v-if="sorted.title == 'Lauf Nummer'" class="text-xs-right">
            <v-btn @click="deleteSet">löschen</v-btn>
              <v-btn
              color="primary"
              dark
              @click.stop="startRun()"
              v-if="this.selected.length>0"
              >
              Run abschliessen
              </v-btn>

<!----------- THIS is the popup for the additional data input to bring the data to the next processstepp    -->
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
               <div class="headline">Folgender Sequenzierungs Run wird abgeschlossen </div>
               <div class="subheading">Folgender Sequenzierungs Run wird abgeschlossen </div>
              </div>
              </v-card-title>
                <v-card-text>
                <v-subheader class="headline">Run Nummer: <b>{{this.currentDataset1.runnr}}</b></v-subheader>
                <v-subheader class="body-2">Enthaltene Datensets</v-subheader>
                <v-divider></v-divider>
                <v-form v-for="item in selected" :key="item.index">
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
                    <v-text-field
                    v-text="item.priority"
                    ></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  color="error"
                  flat
                  @click="dialog=false"
                >
                  Abbrechen
                </v-btn>

                <v-btn
                  color="primary"
                  
                  @click="sendRun"
                >
                  Bestätigen
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </div>
        </v-card>


<!------------------------   THOSE ARE THE BUTTONS ON THE RIGHT SIDE TO NAVIGATE THE WORKPROCESS     -------------------->
       </v-flex>
             <v-item-group class="item-group">
                <v-flex>
                    <v-btn outline @click="changeworkflow('geplant')" class="processButton" id="first" fab dark large color="blue">
                      G
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn outline @click="changeworkflow('extrahiert')" class="processButton" fab dark large color="cyan">
                        E
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn  @click="changeworkflow('lauf')" class="processButton" fab dark large color="teal">
                        L
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn outline @click="changeworkflow('sequenziert')" class="processButton" fab dark large color="green">
                        S
                     </v-btn>
                </v-flex>
                </v-item-group>
            </v-layout>

  </v-container>
</template>


<script>
/* eslint-disable */
import _ from 'lodash';
import {mapState} from 'vuex'


  export default {

    data: () => ({
      activeIndex: null,
      dialog:false,
      show:false,
      search:'',
      notifications: false,
      selected:'',
      sorted: {
        title: 'Lauf Nummer', value: 'runnr'
      },
      runList:[],

      menu: false,
      modal: false,
      libraryDate: new Date().toISOString().substr(0, 10),
      Seqmenu:false,
      sequencingDate:new Date().toISOString().substr(0, 10),

      runNr:0,
      isorunnr:1,


      items: [
        { title: 'Bact-Nr', value: 'bactnr' },
        { title: 'Priority', value:'priority' },
        { title: 'Einsender', value:'sender'},
        { title: 'Pathogen', value:'pathogen' },
        { title: 'Lauf Nummer', value: 'runnr' }
      ],
      patientList:[],
      currentDataset1: {
        bactnr: "",
        processnr: 2,
        received: true,
        firstname: "",
        lastname: "",
        birthdate: "",
        sender: "",
        department: "",
        entrydate: "",
        samplingdate: "",
        material: "",
        repetition: 0,
        altid: "",
        comment: "",
        pathogen: "",
        processingdate: "",
        ngsproject: "",
        publicid: 0,
        priority: "",
        isoentrydate: "",
        billing: "",
        concentration:"",
        extractiondate:"",
        extractionvisum:"",
        runtype:"",
        runnr:"",
        isorunnr:"",
        librarytype:"",
        librarydate:"",
        libraryvisum:"",
        sequencingdate:"",
        modality:"",
      },
      testset:{},
    }),
    mounted(){
      this.$store.dispatch('validateAccessToken')
      .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
    },
    computed: {
          ...mapState(['ngs']),

      //This Method filters the PatientList and builds the V-List that is displayed. 
        filteredItems() {
          var display;
         //   this.NgsList = the list that gets transmitted from the DB to the store
          var method = this.ngs.filter(patient => {
                //gets the list and parsed it for all Data with processNr = 1 (1= geplant, 2= extrahiert, 3=lauf,4=sequenziert)
                if(patient.processnr == 3){
                //the if just checks if the search is null, which happens when you clear the searchfield with the clearSearch() method
                if(!this.search) return this.ngs;
                //that block checks if any search input matches the data in the patientList. It loops trought the Patient and checks if a match results in true.
                //ex. patient.bactNr is the same as this.search then it returns the patients --> this could be written in a loop..couldnt make it work
                return (patient.bactnr.toLowerCase().includes(this.search.toLowerCase())  || 
                patient.pathogen.toLowerCase().includes(this.search.toLowerCase())  || 
                patient.lastname.toLowerCase().includes(this.search.toLowerCase())  || 
                patient.firstname.toLowerCase().includes(this.search.toLowerCase())  || 
                patient.sender.toLowerCase().includes(this.search.toLowerCase())  || 
                patient.material.toLowerCase().includes(this.search.toLowerCase())  || 
                patient.ngsproject.toLowerCase().includes(this.search.toLowerCase())    
                //this.sorted calls the sorted method, which then defines what the filter (sortieren nach) is.
            )}})
            if(this.sorted.value == 'runnr' ){
            display = _.groupBy(method, this.sorted.value);
            }else{
            display =_.sortBy(method, this.sorted.value);
            }
            return display         
        },

        orderedRunList: function () {
    return _.orderBy(this.runList, 'isorunnr')
  }
    },
    watch:{
      ngs(newValue){
        
      }
    },
    methods:{
      changeworkflow(item){
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].selected =false
        }
        this.selected = []
        this.$store.state.export = this.selected;
        this.$router.push('/'+item)

      },
      //clears the search and sets the value null
      clearSearch(){
        this.search='';
        },

        dateformatter(date){  
          var str = date
          if( date != null && str.length >12){
          var day = str.substring(8, 10);
          var month = str.substring(5, 7);
          var year = str.substring(0, 4);
          var newDate = day+"-"+month+"-"+year
          return newDate       }
          else return date
        },
      //sets the currentPatient
      setCurrentData(patient,index){
      this.activeIndex = index
        this.runList = []
      this.$store.state.export = this.selected

        if(this.sorted.title == 'Lauf Nummer'){
          this.selected = patient
          for(var i=0; i<patient.length;i++){
            this.runList.push(patient[i])
          }
          this.$store.state.export = this.runList

        }
      this.currentDataset1 = JSON.parse(JSON.stringify(patient))
      if(this.currentDataset1.birthdate)this.currentDataset1.birthdate = this.dateformatter(this.currentDataset1.birthdate)
      if(this.currentDataset1.samplingdate)this.currentDataset1.samplingdate = this.dateformatter(this.currentDataset1.samplingdate)
      if(this.currentDataset1.isoentrydate)this.currentDataset1.isoentrydate = this.dateformatter(this.currentDataset1.isoentrydate)
      if(this.currentDataset1.processingdate)this.currentDataset1.processingdate = this.dateformatter(this.currentDataset1.processingdate)
      if(this.currentDataset1.extractiondate)this.currentDataset1.extractiondate = this.dateformatter(this.currentDataset1.extractiondate)
      if(this.currentDataset1.librarydate)this.currentDataset1.librarydate = this.dateformatter(this.currentDataset1.librarydate)
      if(this.currentDataset1.sequencingdate)this.currentDataset1.sequencingdate = this.dateformatter(this.currentDataset1.sequencingdate)
      },

      //deletes a dataset
      deleteSet(){
        confirm('Sollen folgende Datensets endgültig gelöscht werden? Dies kann NICHT rückgängig gemacht werden! ') 
      },
      //Adds additionals information to the dataset, so that it is ready to be sent to the next processstep
      startRun(){
        this.dialog=true
        this.currentDataset1.runnr = this.selected[0].runnr
      },
      //sends a dataset to the next processstep (Lauf) and opens a popup 
 sendRun(){
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].processnr = 4
          this.selected[i].sequencingvisum ="User"
          this.selected[i].dataqualityvisum="User"

          this.$store.dispatch('putNgs', this.selected[i])
        }
        this.selected = []
        this.$store.state.export = this.selected
        this.dialog = false
      },
      setSorted(item){
        this.sorted = item
      },
    },

  }
</script>
<style>
    .scroll {
      overflow-y: auto;
      max-height: 72vh;
    }
.item-group{
  text-align: center;
  margin-left:10px;
  margin-top:80px;
}
.spacer{
  margin-left: 10%;
}
</style>