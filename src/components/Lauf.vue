<template>
  <v-container fluid grid-list-md class="view-container">
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
            <v-icon light>home</v-icon>
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
              :class="{'is-active': index == activeIndex, 'is-locked': displayLocked(patient)}"
            >
              <v-list-tile-content >
                <v-list-tile-title v-if="sorted.title != 'NGS Projekt' && sorted.title != 'Lauf Nummer' ">{{patient.priority}} | {{patient.bactnr}}</v-list-tile-title>
                <v-list-tile-sub-title  v-if="sorted.title != 'NGS Projekt' && sorted.title != 'Lauf Nummer' ">{{patient.pathogen}} | {{patient.sender}}</v-list-tile-sub-title>
                <v-list-tile-title v-if="sorted.title == 'Lauf Nummer'">Lauf Nummer: {{patient[0].runnr}}</v-list-tile-title>
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
                            <p><b>Eingangsdatum:</b> {{dateformatter2(item.isoentrydate)}}</p>
                            <p><b>Abnahmedatum:</b> {{dateformatter2(item.samplingdate)}}</p>
                            <p><b>Einsender:</b> {{item.sender}}</p>
                            </v-flex>
                            <v-flex
                              xs4
                              md4
                            > 
                              <p><b>Station:</b> {{item.department}}</p>
                              <p><b>Bearbeitungsdatum: </b>{{dateformatter2(item.processingdate)}}</p>
                              <p><b>Material:</b> {{item.material}}</p>
                              <p><b>Bearbeitungsdatum:</b> {{dateformatter2(item.processingdate)}}</p>
                              <p><b>Material:</b> {{item.material}}</p>
                              <p><b>Datum DNA-Prep:</b> {{dateformatter2(item.extractiondate)}}</p>
                              <p><b>DNA Konz. (ng/ul):</b> {{item.concentration}}</p>
                            </v-flex>

                            <v-flex
                              xs4
                              md4
                            > 
                              <p><b>Visum DNA:</b> {{item.extractionvisum}}</p>
                              <p><b>Abnahmedatum:</b> {{dateformatter2(item.samplingdate)}}</p>
                              <p><b>Library Typ:</b> {{item.librarytype}}</p>
                              <p><b>Library Darum:</b> {{dateformatter2(item.librarydate)}}</p>
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
                  <v-text-field v-model="currentDataset1.bactnr" label="Bact Nummer*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.repetition" label="Wiederholung*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.altid" label="alternative ID" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.priority" label="Priority*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.pathogen" label="Pathogen (g)*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.lastname" label="lastName*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.firstname" label="fistName*" readonly></v-text-field>
            </v-card>
                </v-flex>
                <!--Defines the second red square that contains meta data  -->
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="teal  lighten-3">
                  <v-text-field v-model="currentDataset1.birthdate" label="Geburtsdatum*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.isoentrydate" label="Eingang*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.samplingdate" label="Abnahme" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.sender" label="Einsender*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.department" label="Station*" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.processingdate" label="Bearbeitungsdatum" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.material" label="Material*" readonly></v-text-field>
            </v-card>
                </v-flex>

              <!--Defines the third red square that contains meta data  -->
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="teal  lighten-2">
                  <v-text-field v-model="currentDataset1.ngsproject" label="NGS - Projekt" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.extractiondate" label="Datum DNA-Prep" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.concentration" label="DNA Konz. (ng/ul)" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.extractionvisum" label="Visum DNA" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.runtype" label="runtype" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.runnr" label="NGS Run Nummer" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.isorunnr" label="Isolat Run Nummer" readonly></v-text-field>
            </v-card>
                </v-flex>
            <!--Defines the fourth red square that contains meta data  -->
            <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="teal  lighten-2">
                  <v-text-field v-model="currentDataset1.librarytype" label="Library Typ" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.librarydate" label="Datum Library" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.libraryvisum" label="Visum Library" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.sequencingdate" label="Datum Sequenzierung" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.modality" label="NGS-Gerät" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.comment" label="Kommentar" readonly></v-text-field>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
<!----------- THIS is the popup for the additional data input to bring the data to the next processstepp    -->
              <v-dialog
                v-model="dialog"
                width="800" 
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
                  <v-divider></v-divider>
                  <v-layout>
                    <v-flex xs3 md3>
                      <v-text-field v-text="item.bactnr"></v-text-field>
                    </v-flex>
                    <v-flex xs3 md3>
                      <v-text-field v-text="item.priority"></v-text-field>
                    </v-flex>
                    <v-flex xs3 md3>
                      <v-text-field v-text="item.pathogen"></v-text-field>
                    </v-flex>
                    <v-flex xs3 md3>
                      <v-text-field v-text="item.sender"></v-text-field>
                    </v-flex>
                    </v-layout>

                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  flat
                  @click="closePopup()"
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
            <div v-if="sorted.title == 'Lauf Nummer'" class="text-xs-right">
              <v-btn
              color="primary"
              dark
              @click.stop="startRun()"
              v-if="this.selected.length>0"
              >
              Run abschliessen
              </v-btn>
            </div>
  </v-container>
</template>


<script>
/* eslint-disable */
import _ from 'lodash';
import {mapState} from 'vuex'
import {bus} from '../main.js'


  export default {
    data: () => ({
      activeIndex: null,
      lockedList:[],
      dialog:false,
      show:false,
      search:'',
      snackColor:'',
      snackbar:false,
      snackText:'',
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
        bactnr: null,
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
      this.$store.dispatch('getCurrentUser')
      .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
    },

    created() {
      if(this.ngs.length === 0){
        this.$store.dispatch('loadNgs')
        .catch((error) => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
      }
      if(this.pathogen.length === 0){
        this.$store.dispatch('loadPathogen')
        .catch((error) => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
      }

    },

    computed: {
          ...mapState(['ngs']),
          ...mapState(['pathogen']),
          ...mapState(['currentUser']),
          ...mapState(['lockedId']),
          ...mapState(['locks']),



      //This Method filters the PatientList and builds the V-List that is displayed. 
        filteredItems() {
          this.lockedList = this.locks
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
              var newDisplayList=[];
            display = _.groupBy(method, this.sorted.value)
            var keys =  Object.keys(display)
            // Sort the keys in descending order
            keys.sort( function ( a, b ) { return b - a; } );

            // Iterate through the array of keys and access the corresponding object properties
            for ( var i = 0; i < keys.length; i++ ) {
              newDisplayList.push(( keys[i], display[ keys[i] ] ))
            }
            display = newDisplayList
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
      },
      locks(newValue, oldValue){
        this.lockedList = newValue
      },
    },
    methods:{

      //Method that changes the view/ component
      changeworkflow(item){
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].selected =false
        }
        this.selected = []
        this.$store.state.export = this.selected;
        this.$store.commit('SET_SELECTEDISOLAT', [])
        this.$router.push('/'+item)

      },
      //clears the search and sets the value null
      clearSearch(){
        this.search='';
        },

        dateformatter2(date){
          if(date){
          var date = new Date(date)
            var month = '' + (date.getMonth() + 1)
            var day = '' + date.getDate()
            var  year = date.getFullYear()

          if (month.length < 2) month = '0' + month
          if (day.length < 2) day = '0' + day
          return [year, month, day].join('-')
          }
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
      this.currentDataset1.birthdate = this.dateformatter2(this.currentDataset1.birthdate)
      this.currentDataset1.samplingdate = this.dateformatter2(this.currentDataset1.samplingdate)
      this.currentDataset1.isoentrydate = this.dateformatter2(this.currentDataset1.isoentrydate)
      this.currentDataset1.processingdate = this.dateformatter2(this.currentDataset1.processingdate)
      this.currentDataset1.extractiondate = this.dateformatter2(this.currentDataset1.extractiondate)
      this.currentDataset1.librarydate = this.dateformatter2(this.currentDataset1.librarydate)
      this.currentDataset1.sequencingdate = this.dateformatter2(this.currentDataset1.sequencingdate)
      },

      //Adds additionals information to the dataset, so that it is ready to be sent to the next processstep
      startRun(){
        for(var i=0; i<this.selected.length;i++){
         this.$store.commit('PUSH_LOCKEDID', this.selected[i].id)
        }
        this.$store.dispatch('requestLock', this.lockedId)
          .then(response => {
          this.dialog = true
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
          bus.$emit('negativeNotification', error)
          this.dialog = false
        })  
        this.currentDataset1.runnr = this.selected[0].runnr
      },
      //sends a dataset to the next processstep (Lauf) and opens a popup 
      sendRun(){
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].processnr = 4
          this.selected[i].sequencingvisum = this.currentUser
          this.selected[i].dataqualityvisum="User"
          this.$store.dispatch('putNgs', this.selected[i])
          .then(response => {
              bus.$emit('positiveNotification', true)
          }, error => {
              console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              bus.$emit('negativeNotification', error)
            })
        }
        this.$store.dispatch('requestUnlock', this.lockedId)
        .then(response => {
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
          bus.$emit('negativeNotification', error)
        })  
        this.selected = []
        this.$store.state.export = this.selected
        this.dialog = false

      },
      setSorted(item){
        this.sorted = item
        this.setCurrentData([])
      },
       //closes the window when cancel get pressed in lauf vorbereiten view
      closePopup(){
        this.$store.dispatch('requestUnlock', this.lockedId)
        .then(response => {
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
          bus.$emit('negativeNotification', error)
        }) 
        this.dialog = false
        this.runFilled = false
      },
      //This Method parses the locks arraylist in $store and sets according to the locks a css class to the locked dataset. gets colored red
      displayLocked(patient){  
        if(this.sorted.value == 'runnr'){
          if(this.lockedList.includes(patient[0].id)) return true  
        }else if(this.lockedList.includes(patient.id)) return true  
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
.view-container{
  padding:0px
}
</style>