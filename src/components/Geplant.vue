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
        <v-flex  xs2 sm2 md2 xl2 lg2 class="scroll">
        <v-list  fill-height>
          <template v-for="(patient, index) in filteredItems">

            <v-list-tile
              class="tile"
              :key="patient.index"
              @click="setCurrentData(patient,index)"
              :class="{'is-active': index == activeIndex}"
            >
                        <v-list-tile-action>
              <v-checkbox
                v-model="selected"
                :value ="filteredItems[index]"
              ></v-checkbox>
            </v-list-tile-action> 
              <v-list-tile-content >
                <v-list-tile-title v-if="sorted.title == 'Bact-Nr' ||sorted.title == 'Priority' ">{{patient.bactnr}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Pathogen'">{{patient.pathogen}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Einsender'">{{patient.sender}}</v-list-tile-title>
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
        <v-flex d-flex xs9 sm9 md9 xl9 lg9 style="max-height: -webkit-fill-available">
          <v-card>
          <v-card-text>
              <v-layout wrap >
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-4">
                  <v-text-field v-model="currentDataset1.bactnr" label="Bact Nummer" required></v-text-field>
                  <v-text-field v-model="currentDataset1.repetition" label="Wiederholung" required></v-text-field>
                  <v-text-field v-model="currentDataset1.altid" label="alternative ID"></v-text-field>
                  <v-text-field v-model="currentDataset1.priority" :mask="priorityMask" label="Priority" required></v-text-field>
                  <v-text-field v-model="currentDataset1.pathogen" label="Pathogen (g)" required></v-text-field>
                  <v-text-field v-model="currentDataset1.lastname" label="Nachname" required></v-text-field>
                  <v-text-field v-model="currentDataset1.firstname" label="Vorname" required></v-text-field>
            </v-card>
                </v-flex>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-3">
                  <v-text-field v-model="currentDataset1.birthdate" :mask="dateMask" label="Geburtsdatum*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.isoentrydate" :mask="dateMask" label="Eingang*" required></v-text-field>
                  <v-text-field v-model="currentDataset1.samplingdate" :mask="dateMask" label="Abnahme"></v-text-field>
                  <v-text-field v-model="currentDataset1.sender" label="Einsender" required></v-text-field>
                  <v-text-field v-model="currentDataset1.department" label="Station" required></v-text-field>
                  <v-text-field v-model="currentDataset1.processingdate" :mask="dateMask" label="Bearbeitungsdatum"></v-text-field>
                  <v-text-field v-model="currentDataset1.material" label="Material" required></v-text-field>
            </v-card>
                </v-flex>
                <v-flex d-flex xs4 sm4 md4>
            <v-card row wrap flat color="red lighten-2">
                  <v-text-field v-model="currentDataset1.ngsproject" label="NGS - Projekt"></v-text-field>
                  <v-text-field v-model="currentDataset1.billing" label="Abrechnung" readonly></v-text-field>
                  <v-text-field v-model="currentDataset1.comment" label="Kommentar"></v-text-field>
            </v-card>
                </v-flex>
              </v-layout>
            <div class="text-xs-right">
            <v-btn @click="deleteSet">löschen</v-btn>
              <v-btn
              color="primary"
              dark
              @click.stop="startExtraction"
              v-if="this.selected.length>0"
              >
                Extrahieren
              </v-btn>
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
                <v-btn
                  color="primary"
                  flat
                  @click="extrahieren"
                >
                  accept
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
                    <v-btn @click="changeworkflow('geplant')" class="processButton" id="first" fab dark large color="purple">
                      G
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn outline @click="changeworkflow('extrahiert')" class="processButton" fab dark large color="red">
                        E
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn outline @click="changeworkflow('lauf')" class="processButton" fab dark large color="blue">
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
      </v-container>
</template>


<script>
import _ from 'lodash';
import {mapState} from 'vuex'



  export default {

    data: () => ({
      dateMask:'##-##-####',
      priorityMask:'A',
      activeIndex: null,
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
        bactnr: "",
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
        billing: ""
      },
      testset:{},
    }),
    computed: {
          ...mapState(['ngs']),

      //This Method filters the PatientList and builds the V-List that is displayed. 
        filteredItems() {
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
    methods:{
      //Method that allows to change the view.
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
      //Method to format the date into DD-MM-YYYY instead of the default JSON date
      dateformatter(date){  
          var str = date
          if(str.length >12){
          var day = str.substring(8, 10);
          var month = str.substring(5, 7);
          var year = str.substring(0, 4);
          var newDate = day+"-"+month+"-"+year
          return newDate       }
          else return date
        },
      //sets the currentPatient. Does a copy of the JS.Object which allows to change information without changing the source object. (needed for the date property)
      setCurrentData(patient,index){
      this.activeIndex = index
      this.currentDataset1 = JSON.parse(JSON.stringify(patient))
      if(this.currentDataset1.birthdate)this.currentDataset1.birthdate = this.dateformatter(this.currentDataset1.birthdate)
      if(this.currentDataset1.samplingdate)this.currentDataset1.samplingdate = this.dateformatter(this.currentDataset1.samplingdate)
      if(this.currentDataset1.isoentrydate)this.currentDataset1.isoentrydate = this.dateformatter(this.currentDataset1.isoentrydate)
      if(this.currentDataset1.processingdate)this.currentDataset1.processingdate = this.dateformatter(this.currentDataset1.processingdate)

      },

      //deletes a dataset
      deleteSet(){
        confirm('Sollen folgende Datensets wirklich gelöscht werden? ') 
      },
      //functio
      startExtraction(){
        var myDate = new Date();
        var month = ('0' + (myDate.getMonth() + 1)).slice(-2);
        var date = ('0' + myDate.getDate()).slice(-2);
        var year = myDate.getFullYear();
        var formattedDate = year + '-' + month + '-' + date;
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].concentration = ''
          this.selected[i].extractiondate = formattedDate
          this.selected[i].extractionvisum = 'User'
        }
        this.dialog=true
      },
      //sends a dataset to the next processstep (extrahiert) and opens a popup 
 extrahieren(){

        for(var i=0; i<this.selected.length;i++){
          this.selected[i].processnr = 2
          delete this.selected[i].selected
          this.$store.dispatch('putNgs', this.selected[i])
        }
        this.snackColor="success"
        this.snackText="Übertragung erfolgreich"
        this.selected = []
        this.dialog = false
        this.snackbar =true

      },
      setSorted(item){
        this.sorted = item
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

</style>