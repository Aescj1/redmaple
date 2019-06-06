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
          <v-layout>
              <v-text-field :value=this.lastIndex+1 type="number" style="max-width:80px; margin-left:80px" hide-details label="Start" solo width="30px"></v-text-field>
              <p style="margin:15px"><b>bis</b></p>
              <v-text-field :value=this.activeIndex+1 type="number" style="max-width:80px" hide-details label="Ende" solo></v-text-field>
              <v-btn color="primary" @click="multiSelectIsolat">Auswählen</v-btn>
          <v-btn style="margin-left:20px; margin-right:150px" color="primary" @click="resetSelected">Auswahl löschen</v-btn>
          </v-layout>
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
        <v-list  fill-height>
          <template v-for="(patient, index) in filteredItems">

            <v-list-tile
              class="tile"
              :key="patient.index"
              @click="setCurrentData(patient,index)"
              :class="{'is-active': index == activeIndex, 'is-locked': displayLocked(patient)}"
            >
            <v-list-tile-action>
              <v-checkbox
                :value ="patient"
                v-model="selected"
                multiple
              ></v-checkbox>
            </v-list-tile-action> 
              <v-list-tile-content >
                <v-list-tile-title >{{patient.priority}} | {{patient.bactnr}} </v-list-tile-title>
                <v-list-tile-sub-title>{{patient.pathogen}} | {{patient.sender}} </v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-divider
              v-if="index + 1 < patientList.length"
              :key="index"
              ></v-divider>
          </template>
        </v-list>
    </v-flex>
        <v-flex d-flex xs9 sm9 md9 xl9 lg9>
          <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <!--Defines the first red square that contains meta data  -->
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="cyan lighten-4">
                  <v-text-field v-model="currentDataset1.bactnr" label="Bact Nummer" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.repetition" label="Wiederholung" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.altid" label="alternative ID" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.priority" :mask="priorityMask" label="Priority" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.pathogen" label="Pathogen (g)" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.lastname" label="lastName" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.firstname" label="fistName" readonly></v-text-field>
            </v-card>
                </v-flex>
                <!--Defines the second red square that contains meta data  -->
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="cyan lighten-3">
                  <v-text-field v-model="currentDataset1.birthdate" :mask="dateMask" label="Geburtsdatum" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.isoentrydate" :mask="dateMask" label="Eingang" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.samplingdate" :mask="dateMask" label="Abnahme"></v-text-field>
                  <v-text-field v-model="currentDataset1.sender" label="Einsender" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.department" label="Station" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.processingdate" :mask="dateMask" label="Bearbeitungsdatum" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.material" label="Material" readonly></v-text-field>
            </v-card>
                </v-flex>

              <!--Defines the third red square that contains meta data  -->
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="cyan lighten-2">
                  <v-text-field v-model="currentDataset1.ngsproject" label="NGS - Projekt" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.extractiondate" :mask="dateMask" label="Datum DNA-Prep" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.concentration" suffix="ng/µl" label="DNA Konzentration" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.extractionvisum" label="Visum DNA" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.comment" label="Kommentar" readonly></v-text-field>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <!--Buttons for that are being used to edit the data -->
           <div class="text-xs-right">
            <v-btn v-if="currentDataset1.bactnr != ''" @click="this.editDataset">Bearbeiten</v-btn>
              <v-dialog v-if="this.$store.state.formDialog==true" v-model="this.$store.state.formDialog" persistent max-width="1000px">
                <NgsFormular></NgsFormular>
              </v-dialog>

            <v-btn v-if="currentDataset1.bactnr != ''" color="red lighten-1" @click="this.deleteStep1">löschen</v-btn>
              <v-dialog v-if="this.$store.state.deleteDialog==true" v-model="this.$store.state.deleteDialog" max-width="1000px">
                <DeleteWindow></DeleteWindow>
              </v-dialog> 
            <v-btn v-if="currentDataset1.bactnr != ''" color="orange lighten-1" @click="this.repeat">Verschieben nach Geplant</v-btn>
              <v-dialog v-if="this.$store.state.repeatDialog==true" v-model="this.$store.state.repeatDialog" max-width="1000px">
                <RepeatWindow></RepeatWindow>
              </v-dialog> 

<!----------- THIS is the popup for the additional data input to bring the data to the next processstepp    -->
              <v-dialog v-model="dialog" width="700" scrollable persistent>
              <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
              <div>
               <div class="headline">Run für die Sequenzierung vorbereiten </div>
              </div>
              </v-card-title>
              <v-card-text>
                <v-expansion-panel v-model="expansionPanel" expand>
                  <v-expansion-panel-content class="grey lighten-2">
                    <div slot="header"  grey>Sequenzierungslauf Einstellungen</div>
                      <v-card>
                        <v-card-text class="grey lighten-4"> <v-layout>
                    <v-flex xs6 md6>
                    <v-text-field v-text="'Run grösse auswählen: '"></v-text-field>
                    </v-flex>
                    <v-flex xs6 md6>
                    <v-select
                      :items="runSize"
                      label="Run size"
                      v-model="chosenSize"
                    ></v-select>
                  </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs6 md6>
                    <v-text-field v-text="'Librarytyp auswählen: '"></v-text-field>
                  </v-flex>
                    <v-flex xs6 md6>
                    <v-select
                      :items="libraryType"
                      label="Library Typ"
                      v-model="chosenLibrary"
                    ></v-select>
                  </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs6 md6>
                    <v-text-field v-text="'NGS-Gerät auswählen: '"></v-text-field>
                  </v-flex>
                    <v-flex xs6 md6>
                    <v-select
                      :items="ngsmodality"
                      label="NGS-Gerät"
                      v-model="chosenModality"
                    ></v-select>
                  </v-flex>
                </v-layout>

                <v-layout>
                    <v-flex xs6 md6>
                    <v-text-field v-text="'NGS Run Nummer eingeben: '"></v-text-field>
                  </v-flex>
                    <v-flex xs6 md6>
                    <v-text-field
                      label="NGS Run Nr"
                      v-model="runNr"
                    ></v-text-field>
                  </v-flex>
                </v-layout>

                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="menu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                  >
                  <v-text-field
                    slot="activator"
                    label="Library Datum auswählen"
                    v-model="libraryDate"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker v-model="libraryDate" no-title scrollable actions @input="menu =false" locale="de">
                      <template>
                      </template>
                    </v-date-picker>
                </v-menu>

                <v-menu
                  lazy
                  :close-on-content-click="false"
                  v-model="Seqmenu"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                  >
                  <v-text-field
                    slot="activator"
                    label="Sequenzierungs Datum auswählen"
                    v-model="sequencingDate"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker v-model="sequencingDate" no-title scrollable actions @input="Seqmenu =false" locale="de">
                    </v-date-picker>
                  </v-menu>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
                <v-subheader class="title">Run-Grösse:  <b>{{ this.selected.length}}</b></v-subheader>
                <v-subheader class="headline">Ausgewählte Datensets: </v-subheader>
                <v-divider></v-divider>
                <v-form v-for="item in selected" :key="item.index">
                  <v-layout>
                    <v-flex xs6 md6>
                  <v-text-field v-text="item.bactnr">
                  </v-text-field>
                    </v-flex>
                    <v-flex xs6 md6>
                    <v-text-field
                    v-text="item.priority"
                    ></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="closePopup()">
                  Abbrechen
                </v-btn>

                <v-btn color="primary" @click="initRun">
                  Starten
                </v-btn>
                  <v-dialog
                  v-if="this.runFillerDialog==true"
                  v-model="this.runFillerDialog"
                  width="800" 
                  persistent 
                >
                <v-card>
                <v-card-title class="cyan lighten-2" primary-title>
                <div>
                  <div class="headline">Sequenzierungslauf auffüllen</div>
                </div>
                </v-card-title>
                <v-card-text class="subheading   text-xs-center" >
                  Wollen Sie den Sequenzierungslauf mit Isolaten der Priorität "D" auffüllen?
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="closeRunFillerDialog('Abbrechen')" flat>Abbrechen</v-btn>
                <v-btn @click="closeRunFillerDialog('Nein')" flat>Nein</v-btn>
                  <v-btn color="primary" @click="fillRun()">Ja</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </div>
          </v-card-text>
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
                    <v-btn @click="changeworkflow('extrahiert')" class="processButton" fab dark large color="cyan">
                        E
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn outline @click="changeworkflow('lauf')" class="processButton" fab dark large color="teal">
                        L
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn outline @click="changeworkflow('sequenziert')" class="processButton" fab dark large color="green">
                        S
                     </v-btn>
                </v-flex>
                </v-item-group>
<!------------------------   This is the notification that popsup when the transaction was successful    -------------------->    
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
            </v-layout>
            <div class="text-xs-right">
              <v-btn
                color="primary"
                dark
                @click.stop="startRun"
                v-if="this.selected.length>0"
              >
                Run konfigurieren
              </v-btn>
            </div>
  </v-container>
</template>


<script>
/* eslint-disable */
import _ from 'lodash';
import {mapState} from 'vuex'
import NgsFormular from './NgsFormular.vue'
import DeleteWindow from './DeleteWindow.vue'
import RepeatWindow from './RepeatWindow.vue'
import Papa from 'papaparse'





  export default {
    components: {
      NgsFormular,
      DeleteWindow,
      RepeatWindow
    },
    data: () => ({
      runFilled: false,
      expansionPanel: [true],
      dateMask:'##-##-####',
      lockedList:[],
      priorityMask:'A',
      activeIndex: null,
      lastIndex:null,
      snackText:'',
      snackColor:'',
      snackbar:false,
      dialog:false,
      runFillerDialog:false,
      show:false,
      search:'',
      notifications: false,
      selected:[],
      sorted: {
        title: 'Bact-Nr', value: 'bactnr'
      },
      libraryType:['Nextera XT'],
      chosenLibrary: 'Nextera XT',
      runSize:['4','24','48','96'],
      chosenSize:'',
      ngsmodality:['NextSeq'],
      chosenModality:'NextSeq',
      menu: false,
      modal: false,
      libraryDate: new Date().toISOString().substr(0, 10),
      Seqmenu:false,
      sequencingDate:new Date().toISOString().substr(0, 10),
      runNr:1,
      isorunnr:1,
      items: [
        { title: 'Bact-Nr', value: 'bactnr' },
        { title: 'Priority', value:'priority' },
        { title: 'Einsender', value:'sender'},
        { title: 'Pathogen', value:'pathogen' }
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
      },
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
          ...mapState(['locks']),
          ...mapState(['selectedIsolat']),
          ...mapState(['currentUser']),
          ...mapState(['lockedId']),


      //This Method filters the PatientList and builds the V-List that is displayed. 
        filteredItems() {
                this.lockedList = this.locks

            return _.orderBy(
              this.ngs.filter(patient => {
                //gets the list and parsed it for all Data with processNr = 1 (1= geplant, 2= extrahiert, 3=lauf,4=sequenziert)
                if(patient.processnr == 2){
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
            )}}),this.sorted.value );
        },
    },
    watch:{
      locks(newValue, oldValue){
        this.lockedList = newValue
      },
      selected(newValue, oldValue){
        this.$store.state.export = newValue
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
  //Methods that define the snackbars and notify the user
      positiveNotification(){
        this.snackColor="success"
        this.snackText="Übertragung erfolgreich"
        this.snackbar =true
      },
      negativeNotification(){
        this.snackColor="error"
        this.snackText="Der Datensatz wird bereits bearbeitet."
        this.snackbar=true
      },
      neutralNotification(){
          this.snackColor="warning"
          this.snackText="Sie können den Datensatz nun bearbeiten"
          this.snackbar=true
      },
      //closes the window when cancel get pressed in lauf vorbereiten view
      closePopup(){
        this.$store.dispatch('requestUnlock', this.lockedId)
        this.dialog = false
        this.runFilled = false
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
      this.lastIndex = this.activeIndex
      this.activeIndex = index
      this.currentDataset1 = JSON.parse(JSON.stringify(patient))
      this.$store.commit('SET_SELECTEDISOLAT', patient)
      if(this.currentDataset1.birthdate)this.currentDataset1.birthdate = this.dateformatter(this.currentDataset1.birthdate)
      if(this.currentDataset1.samplingdate)this.currentDataset1.samplingdate = this.dateformatter(this.currentDataset1.samplingdate)
      if(this.currentDataset1.isoentrydate)this.currentDataset1.isoentrydate = this.dateformatter(this.currentDataset1.isoentrydate)
      if(this.currentDataset1.processingdate)this.currentDataset1.processingdate = this.dateformatter(this.currentDataset1.processingdate)
      if(this.currentDataset1.extractiondate)this.currentDataset1.extractiondate = this.dateformatter(this.currentDataset1.extractiondate)

      },
      //This was the old Method that gets called when a Checkbox is clicked. Is the template for multiSelectIsolat. 
      //Checks if Isolat is in list, if yes it removes otherwise selects it.
      selectIsolat(patient){
        if (this.selected.includes(patient)) {
        // Removing the data
        this.selected.splice(this.selected.indexOf(patient), 1);
      } else {
        this.selected.push(patient);
      }
      this.$store.state.export = this.selected
      },
      //Method to select multiple IsolatDatasets. Is the function inside the toolbar. Chose from activeIndex to lastIndex
      multiSelectIsolat(patient){
        if(this.lastIndex<this.activeIndex && this.lastIndex !=null && this.activeIndex !=null){
          var i = this.lastIndex
          var o = this.activeIndex
          while(i<=o){
            if (this.selected.includes(this.filteredItems[i])) {
              // Removing the data
              this.selected.splice(this.selected.indexOf(i), 1);
            } else {
              this.selected.push(this.filteredItems[i]);
            }
            i++
          }
         this.$store.state.export = this.selected
        }else{
        alert("bitte gültige Auswahl treffen: 'kleinere Zahl' bis 'grössere Zahl'")
        }
      },
      resetSelected(){
        this.selected = []
      },
//Method that allows to edit the selected Isolat dataset. locks the dataset and opens the ngsformular component
      editDataset(){
        this.$store.commit('PUSH_LOCKEDID', this.selectedIsolat.id)
        this.$store.dispatch('requestLock', this.lockedId)
            .catch((error) => {
              console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification()
              this.$store.state.formDialog = false
          })
            .then(
              this.$store.state.formDialog = true,
              this.neutralNotification()
            )
        
      },
      //method that initializes the delete dataset process. locks the dataset with the id and then opens the deleteWindow component by changig the deleteDialog value.
      deleteStep1(){
         this.$store.commit('PUSH_LOCKEDID', this.selectedIsolat.id)
        this.$store.dispatch('requestLock', this.lockedId)
            .catch((error) => {
              console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification()
              this.$store.state.deleteDialog = false
          })
            .then(
              this.$store.state.deleteDialog = true,
              this.neutralNotification()
            )
      },
      //Method to put a selected dataset back to an earlier processstepp. opens the dialog window
      repeat(){
               this.$store.commit('PUSH_LOCKEDID', this.selectedIsolat.id)
        this.$store.dispatch('requestLock', this.lockedId)
            .catch((error) => {
              console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification()
              this.$store.state.repeatDialog = false
          })
            .then(
              this.$store.state.repeatDialog = true,
              this.neutralNotification()
            )
      },
      //Adds additionals information to the dataset, so that it is ready to be sent to the next processstep
      startRun(){
        for(var i=0; i<this.selected.length;i++){
          this.$store.commit('PUSH_LOCKEDID', this.selected[i].id)
        }
        this.$store.dispatch('requestLock', this.lockedId)
        this.dialog=true
      },
      //This Method parses the locks arraylist in $store and sets according to the locks a css class to the locked dataset. gets colored red
      displayLocked(patient){  
       if(this.lockedList.includes(patient.id)) return true  
      },
      //checks if the run is filled 
      initRun(){
          if(this.selected.length < this.chosenSize){
            if(this.runFilled){
              this.sendRun()
            }else{
            this.runFillerDialog = true
            }
          }else if(this.selected.length == this.chosenSize){
            this.sendRun()
          }else if(this.chosenSize < this.selected.length){
            alert("Die Rungrösse ist zu klein!")
          }
      },
    //sends a dataset to the next processstep (Lauf) 
      sendRun(){
          this.downloadCSV()
          var myDate = new Date();
          var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
          var date = ('0' + myDate.getDate()).slice(-2);
          var year = myDate.getFullYear();
          var formattedDate = year + '-' + month + '-' + date;

        for(var i=0; i<this.selected.length;i++){
          this.selected[i].processnr = 3
          this.selected[i].runnr = this.runNr
          this.selected[i].runtype = formattedDate
          this.selected[i].isorunnr = this.isorunnr
          this.selected[i].librarytype = this.chosenLibrary
          this.selected[i].librarydate = this.libraryDate
          this.selected[i].libraryvisum = this.currentUser
          this.selected[i].sequencingdate = this.sequencingDate
          this.selected[i].modality = this.chosenModality
          this.isorunnr++
          delete this.selected[i].selected
          this.$store.dispatch('putNgs', this.selected[i])
        }
        this.$store.dispatch('requestUnlock', this.lockedId)
        this.snackColor="success"
        this.snackText="Übertragung erfolgreich"
        this.selected = []
        this.$store.state.export = this.selected
        this.dialog = false
        this.snackbar =true
        this.selected = []
        this.closePopup()
      },
      //Method that closes the runFiller Dialog Window when user decides to either cancel or press "No". 
      closeRunFillerDialog(decision){
        if(decision === "Nein"){
          this.runFillerDialog = false
          this.runFilled = true
        }else{
          this.runFillerDialog = false
        }
      },
      //Method that fills up the run with Isolat datasets that have priority D
      fillRun(){
        var listD = this.filteredItems.filter(obj  =>{
          return obj.priority == "D"
        })
         console.log(listD)
        if(listD.length >0){
          while((this.selected.length < this.chosenSize) && listD.length != 0){
            var isolatD = listD.pop()
            if(this.selected.includes(isolatD)){
              console.log("throw it")
            }else{
              var lockArray={
                idArray: [isolatD.id]
              }
              this.selected.push(isolatD)
              this.$store.commit('PUSH_LOCKEDID', isolatD.id)
              this.$store.dispatch('requestLock', lockArray)

            }
         }
          this.runFillerDialog = false
        }else{
          this.runFillerDialog = false
        } 
      },
      //method for the sorting algorithm, sets the item.
      setSorted(item){
        this.sorted = item
        this.currentDataset1 = {}
      },
      downloadCSV(){
        var konzList = this.selected.map(element => ({BactNummer: element.bactnr, Konzentration: element.concentration}))
        var csv = Papa.unparse(konzList, {
          quotes: false, //or array of booleans
          quoteChar: ' ',
          escapeChar: ' ',
          delimiter: ';', //sets the delimiter, each delimiter gets read as new column
          header: true,
          skipEmptyLines: false, //or 'greedy', greedy will grab all the information and not skip
          columns: '' //or array of strings
        });

        var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        var csvURL =  null;
        if (navigator.msSaveBlob)
        {
            csvURL = navigator.msSaveBlob(csvData, 'KonzentrationsListe_LaufNR'+this.runNr+'.csv');
        }
        else
        {
            csvURL = window.URL.createObjectURL(csvData);
        }

        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'KonzentrationsListe_LaufNR'+this.runNr+'.csv');
        tempLink.click();
    }
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
.is-active{
background-color:rgba(21, 109, 224, 0.226);
}
.is-locked{
background-color:rgba(224, 21, 21, 0.226);
}
.view-container{
  padding:0px
}
</style>