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
          <v-btn style="margin-left:10px; margin-right:40px" color="primary" @click="resetSelected">Auswahl löschen</v-btn>
          <v-btn color="primary" @click="createDataset">Datensatz erstellen</v-btn>
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
            <v-icon light>home</v-icon>
          </v-btn>
        </v-flex>
              </v-layout>

    
    <v-layout row wrap>
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
                :ripple="false"
              ></v-checkbox>
            </v-list-tile-action> 
              <v-list-tile-content >
                <v-list-tile-title >{{patient.priority}} | {{patient.bactnr}} </v-list-tile-title>
                <v-list-tile-sub-title>{{patient.pathogen}} | {{patient.sender}} </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-btn fab flat  small color="transparent" 
              @click.stop="isolatReceived(patient)"
              >
                  <v-icon
                  v-if="patient.received"
                  color="success"
                >
                  how_to_reg
                </v-icon>
                <v-icon
                  v-else
                  color="grey lighten-1"
                >
                  how_to_reg
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
        <v-flex d-flex xs9 sm9 md9 xl9 lg9 style="max-height: -webkit-fill-available">
          <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap >
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="light-blue lighten-4">
                  <v-text-field v-model="currentDataset1.bactnr" label="Bact Nummer" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.repetition" label="Wiederholung" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.altid" label="alternative ID" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.priority" label="Priority" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.pathogen" label="Pathogen (g)" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.lastname" label="Nachname" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.firstname" label="Vorname" readonly></v-text-field>
            </v-card>
                </v-flex>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="light-blue lighten-3">
                  <v-text-field v-model="currentDataset1.birthdate" label="Geburtsdatum" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.isoentrydate" label="Eingang" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.samplingdate" label="Abnahme" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.sender" label="Einsender" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.department" label="Station" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.processingdate" label="Bearbeitungsdatum" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.material" label="Material" readonly></v-text-field>
            </v-card>
                </v-flex>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="light-blue lighten-2">
                  <v-text-field v-model="currentDataset1.ngsproject" label="NGS - Projekt" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.billing" label="Abrechnung" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.comment" label="Kommentar" readonly></v-text-field>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
            <!--Buttons for that are being used to edit the data -->
            <div class="text-xs-right">
            <v-btn v-if="currentDataset1.bactnr != null" color="red lighten-1" @click="this.deleteStep1">löschen</v-btn>
              <v-dialog v-if="this.$store.state.deleteDialog==true" v-model="this.$store.state.deleteDialog" max-width="1000px">
                <DeleteWindow></DeleteWindow>
              </v-dialog>
              <v-btn v-if="currentDataset1.bactnr != null" @click="this.editDataset">Bearbeiten</v-btn>
              <v-dialog v-if="this.$store.state.formDialog==true" v-model="this.$store.state.formDialog" persistent max-width="1000px">
                <NgsFormular></NgsFormular>
              </v-dialog>
              <v-dialog
                v-if="this.dialog==true"
                v-model="this.dialog"
                width="700" 
                scrollable
                persistent 
              >
              <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
              <div>
               <div class="headline">Datenset extrahieren</div>
                <span class="subheading grey--text">Sollen folgende Datensets extrahiert werden?</span>
              </div>
              </v-card-title>
              <v-card-text>
                Sollen folgende Datensets extrahiert werden?
                <v-form v-for="item in selected" :key="item.index">
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
                    <v-text-field
                      label="DNA Konzentration"
                      single-line
                      color="red"
                      type="number"
                      suffix="ng/µl"
                      v-model ="item.concentration"
                    ></v-text-field>
                    </v-flex>
                    </v-layout>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn @click="closePopup" flat >Abbrechen</v-btn>
                <v-btn
                  color="primary"
                  @click="extrahieren"
                >
                  Bestätigen
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          </div>
          </v-card-text>
        </v-card>
       </v-flex>
             <v-item-group class="item-group">
                <v-flex>
                    <v-btn @click="changeworkflow('geplant')" class="processButton" id="first" fab dark large color="blue">
                      G
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn outline @click="changeworkflow('extrahiert')" class="processButton" fab dark large color="cyan">
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
            </v-layout>
            <div class="text-xs-right">
              <v-btn v-if="this.selected.length>1" color="red lighten-1" @click="deleteGroupStep1()">Alle löschen</v-btn>
              <v-btn
              color="primary"
              dark
              @click.stop="startExtraction"
              v-if="this.selected.length>0"
              >
                Extrahieren
              </v-btn>
            </div>
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
      </v-container>
</template>


<script>
/* eslint-disable */
import _ from 'lodash';
import {mapState} from 'vuex'
import NgsFormular from './NgsFormular.vue'
import DeleteWindow from './DeleteWindow.vue'


  export default {
    components: {
      NgsFormular,
      DeleteWindow,
    },
    data: () => ({
      lockedList:[],
      activeIndex: null,
      lastIndex:null,
      snackText:'',
      snackColor:'',
      snackbar:false,
      dialog:false,
      search:'',
      notifications: false,
      selected:[],
      sorted: {
        title: 'Bact-Nr', value: 'bactnr'
      },

      items: [
        { title: 'Bact-Nr', value: 'bactnr' },
        { title: 'Priority', value:'priority' },
        { title: 'Einsender', value:'sender'},
        { title: 'Pathogen', value:'pathogen' }
      ],
      patientList:[],
      currentDataset1: {
        bactnr: null,
        processnr: 1,
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
         //   store.NgsList = the list that gets transmitted from the DB to the store
            return _.orderBy(
              this.ngs.filter(patient => {
                //gets the list and parsed it for all Data with processNr = 1 (1= geplant, 2= extrahiert, 3=lauf,4=sequenziert)
                if(patient.processnr == 1){
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
      //Method that allows to change the view.
      changeworkflow(item){
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].selected =false
        }
        this.selected = []
        this.$store.state.export = this.selected;   // HIER überprüfen
        this.$store.commit('SET_SELECTEDISOLAT', [])
        this.$router.push('/'+item)

      },
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
      closePopup(){
        this.dialog = false
        this.$store.dispatch('requestUnlock', this.lockedId)
        .then(response => {
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification(error)
        })   
      },
      //clears the search and sets the value null
      clearSearch(){
        this.search='';
        },
      //Method to format the date into DD-MM-YYYY instead of the default JSON date
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
      //sets the currentPatient. Does a copy of the JS.Object which allows to change information without changing the source object. (needed for the date property)
      setCurrentData(patient,index){
      this.lastIndex = this.activeIndex
      this.activeIndex = index
      this.currentDataset1 = JSON.parse(JSON.stringify(patient))
     // this.$store.commit('SET_SELECTEDISOLAT', patient)
      this.currentDataset1.birthdate = this.dateformatter2(this.currentDataset1.birthdate)
      this.currentDataset1.samplingdate = this.dateformatter2(this.currentDataset1.samplingdate)
      this.currentDataset1.isoentrydate = this.dateformatter2(this.currentDataset1.isoentrydate)
      this.currentDataset1.processingdate = this.dateformatter2(this.currentDataset1.processingdate)
      },
      selectIsolat(patient){
        if (this.selected.includes(patient)) {
        // Removing the data
        this.selected.splice(this.selected.indexOf(patient), 1);
      } else {
        this.selected.push(patient);
      }
      this.$store.state.export = this.selected
      },

      //Method to select multiple IsolatDatasets
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
      //This Method parses the locks arraylist in $store and sets according to the locks a css class to the locked dataset. gets colored red
      displayLocked(patient){  
       if(this.lockedList.includes(patient.id)) return true  
      },
      isolatReceived(patient){
        patient.received = !patient.received
        console.log(patient.received)
        this.$store.dispatch('putNgs', patient)
        .then(response => {
            this.positiveNotification()
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
          this.negativeNotification(error)
          })
        },
       //method that initializes the delete dataset process. locks the dataset with the id and then opens the deleteWindow component by changig the deleteDialog value.
      deleteStep1(){
        this.$store.commit('SET_SELECTEDISOLAT', this.currentDataset1)
        this.$store.commit('PUSH_LOCKEDID', this.selectedIsolat.id)
        this.$store.dispatch('requestLock', this.lockedId)
          .then(response => {
          this.$store.state.deleteDialog = true
          this.neutralNotification()
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification(error)
              this.$store.state.deleteDialog = false
        })   
      },
      deleteGroupStep1(){
        for(var i=0; i<this.selected.length;i++){
         this.$store.commit('PUSH_LOCKEDID', this.selected[i].id)
        }
        this.$store.commit('SET_SELECTEDISOLAT', this.selected)
        this.$store.dispatch('requestLock', this.lockedId)
          .then(response => {
          this.neutralNotification()
          this.$store.state.deleteDialog = true
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
          this.negativeNotification(error)
          this.$store.state.deleteDialog = false
        })
      },
      //functio
      startExtraction(){
        for(var i=0; i<this.selected.length;i++){
         this.$store.commit('PUSH_LOCKEDID', this.selected[i].id)
        }
      /*    .catch((error) => {
            console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
            this.negativeNotification()
          })
            .then(
              this.neutralNotification()
            )*/
        for(var i=0; i<this.selected.length;i++){
          if(!this.selected[i].received){
            return alert("Probe noch nicht erhalten. Überprüfen Sie die Markierungen")
          }
          }
        this.$store.dispatch('requestLock', this.lockedId)
          .then(response => {
          this.dialog = true
          this.neutralNotification()
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification(error)
              this.dialog = false
        })   
        
      },
      //sends a dataset to the next processstep (extrahiert) and opens a popup 
 extrahieren(){
        var myDate = new Date();
        var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
        var day = ('0' + myDate.getDate()).slice(-2);
        var year = myDate.getFullYear();
        var formattedDate = year + '-' + month + '-' + day;
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].concentration = ''
          this.selected[i].extractiondate = formattedDate
          this.selected[i].extractionvisum = this.currentUser
          this.selected[i].processnr = 2
          this.$store.dispatch('putNgs', this.selected[i])
          .then(response => {
            this.positiveNotification()
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
          this.negativeNotification(error)
          })
        }
        this.$store.dispatch('requestUnlock', this.lockedId)
        .then(response => {
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification(error)
        })   
        this.selected = []
        this.$store.state.export = this.selected
        this.dialog = false
      
      },
      setSorted(item){
        this.sorted = item
        this.currentDataset1 = {}
        this.setCurrentData([])
      },
//Method that allows to edit the selected Isolat dataset. locks the dataset and opens the ngsformular component
      editDataset(){
        this.$store.commit('SET_SELECTEDISOLAT', this.currentDataset1)
        this.$store.commit('PUSH_LOCKEDID', this.selectedIsolat.id)
        this.$store.dispatch('requestLock', this.lockedId)
        .then(response => {
          this.$store.state.formDialog = true
          this.neutralNotification()
        }, error => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              this.negativeNotification(error)
              this.$store.state.formDialog = false
        })       
      },
      //Method that allows to create a new Dataset. locks the dataset and opens the ngsformular component
      createDataset(){
          var isolat = {}
          this.$store.commit('SET_SELECTEDISOLAT', isolat)
          this.$store.state.formDialog = true
          this.neutralNotification()
      }
    }
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