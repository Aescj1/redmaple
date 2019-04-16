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
                v-model="filteredItems[index].selected"
                @click.capture.stop="selectRun(filteredItems[index])"
              ></v-checkbox>
            </v-list-tile-action> 
              <v-list-tile-content >
                <v-list-tile-title v-if="sorted.title == 'Bact-Nr' ||sorted.title == 'Priority' ">{{patient.bactnr}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Pathogen'">{{patient.pathogen}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Einsender'">{{patient.sender}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'Lauf Nummer'">Run package: {{index}}</v-list-tile-title>
                <v-list-tile-title v-if="sorted.title == 'NGS Projekt'">NGS Projekt: {{index}}</v-list-tile-title>
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
        <v-flex d-flex xs9 sm9 md9 xl9 lg9>
          <v-card>
            <!-------          This Parte defines the V-Card that gets displayed when the Filter is set to Run Nummer     ----------------------------------->
          <v-card-text v-if="this.sorted.value =='runnr'" class="scroll">
            <v-expansion-panel>
                  <v-expansion-panel-content 
                  class="grey lighten-2" 
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
                        <v-card-text class="grey lighten-4"> 
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
          <!---------          This Parte defines the V-Card that gets displayed when the Filter is set to NGS Nummer     ----------------------------------->
          <v-card-text v-else-if="this.sorted.value =='ngsproject'" class="scroll">
              <!-- defines the Sortingbutton that is displayed when filter is set to NGS Nummer - contains Bact. Nr and so on ------------------>
            <v-layout style="max-height: -webkit-fill-available">
              <v-flex  xs3 sm3 md3 class="scroll">
                <v-menu offset-y>
                  <v-btn
                    slot="activator"
                    color="primary"
                    dark
                    v-model="this.innerSorted"
                  >
                    Sortieren nach: {{this.innerSorted.title}}
                  </v-btn>
                  <v-list>
                    <v-list-tile
                      v-for="(item, index) in innerFilter"
                      :key="index"
                      @click="setInnerSorted(item)"
                    >
                      <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
              <!---------- Displays the List of the metadata inside a NGS project -------------->
                <v-list  fill-height>
                  <template v-for="(patient, index) in orderedRunList">
                    <v-divider :key="index"></v-divider>
                    <v-list-tile
                      :key="patient.index"
                      @click="setCurrentInnerData(patient,index)"
                      :class="{'is-active': index == innerActiveIndex}"
                    >
                    <v-list-tile-action>
                      <v-checkbox
                        v-model="orderedRunList[index].selected"
                        @click.capture.stop="selectRun(orderedRunList[index])"
                      ></v-checkbox>
                    </v-list-tile-action>
                      <v-list-tile-content>
                        <v-list-tile-title v-if="innerSorted.title == 'Bact-Nr' ||innerSorted.title == 'Priority' ">{{patient.bactnr}}</v-list-tile-title>
                        <v-list-tile-title v-if="innerSorted.title == 'Pathogen'">{{patient.pathogen}}</v-list-tile-title>
                        <v-list-tile-title v-if="innerSorted.title == 'Einsender'">{{patient.sender}}</v-list-tile-title>
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
              <v-flex xs2 md2> 
                <v-text-field v-model="currentDataset1.bactnr" label="Bact Nummer"  readonly></v-text-field>
                <v-text-field v-model="currentDataset1.repetition" label="Wiederholung" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.altid" label="alternative ID" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.priority" label="Priority" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.pathogen" label="Pathogen (g)" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.lastname" label="Nachname" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.firstname" label="Vorname" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.birthdate" label="Geburtsdatum" readonly></v-text-field>           
                <v-text-field v-model="currentDataset1.isoentrydate" label="Eingang" readonly></v-text-field>
              </v-flex>
              <v-flex xs2 md2> 
                <v-text-field v-model="currentDataset1.sender" label="Einsender" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.department" label="Station" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.processingdate" label="Bearbeitungsdatum" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.material" label="Material" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.ngsproject" label="NGS - Projekt" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.extractiondate" label="Datum DNA-extraktion" readonly></v-text-field>  
                <v-text-field v-model="currentDataset1.concentration" label="DNA Konz. (ng/ul)" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.extractionvisum" label="Visum DNA" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.samplingdate" label="Abnahme" readonly></v-text-field>              
              </v-flex>
              <v-flex xs2 md2>
                <v-text-field v-model="currentDataset1.runtype" label="Runtype" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.runnr" label="NGS Run Nummer" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.isorunnr" label="Isolat Run Nummer" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.librarytype" label="Library Typ" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.librarydate" label="Datum Library" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.libraryvisum" label="Visum Library" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.sequencingdate" label="Datum Sequenzierung" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.modality" label="NGS-Gerät" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.comment" label="Kommentar" readonly></v-text-field>  
              </v-flex>
              <v-flex xs2 md2>
                <v-text-field v-model="currentDataset1.sequencingvisum" label="Sequenzierungs Visum" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.dataqualityvisum" label="Datenqualität Visum" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.oldinformation" label="Alte Information" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.publicid" label="Public ID" readonly></v-text-field>
                <v-text-field v-model="currentDataset1.billing" label="Abrechnung" readonly></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <!---------          This Parte defines the V-Card that gets displayed when the Filter is NOT set to Run Nummer OR NGS Project     ---------------->
          <v-card-text v-else>
            <v-container grid-list-md>
              <v-layout wrap>
                <!--Defines the first red square that contains meta data  -->
                <v-flex d-flex xs2 sm2 md2>
            <v-card row wrap flat color="red lighten-4">
                    <v-flex> 
                  <v-text-field v-model="currentDataset1.bactnr" label="Bact Nummer*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex> 
                  <v-text-field v-model="currentDataset1.repetition" label="Wiederholung*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.altid" label="alternative ID"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.priority" label="Priority*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.pathogen" label="Pathogen (g)*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.lastname" label="lastName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.firstname" label="fistName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
                <!--Defines the second red square that contains meta data  -->
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="red lighten-3">
                <v-flex >
                  <v-text-field v-model="currentDataset1.birthdate" label="Geburtsdatum*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.isoentrydate" label="Eingang*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.samplingdate" label="Abnahme"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.sender" label="Einsender*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.department" label="Station*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.processingdate" label="Bearbeitungsdatum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="currentDataset1.material" label="Material*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>

              <!--Defines the third red square that contains meta data  -->
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="red lighten-2">
                <v-flex>
                  <v-text-field v-model="currentDataset1.ngsproject" label="NGS - Projekt"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.extractiondate" label="Datum DNA-Prep"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.concentration" label="DNA Konz. (ng/ul)"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.extractionvisum" label="Visum DNA"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.runtype" label="runtype"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.runnr" label="NGS Run Nummer"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.isorunnr" label="Isolat Run Nummer"></v-text-field>
                </v-flex>
            </v-card>
                </v-flex>
            <!--Defines the fourth red square that contains meta data  -->
            <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="red lighten-2">
                <v-flex>
                  <v-text-field v-model="currentDataset1.librarytype" label="Library Typ"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.librarydate" label="Datum Library"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.libraryvisum" label="Visum Library"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.sequencingdate" label="Datum Sequenzierung"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.modality" label="NGS-Gerät"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="currentDataset1.comment" label="Kommentar"></v-text-field>
                </v-flex>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          
          </v-card-text>
          <!-- div that contains the buttons to delete or repeate a sequencing (sets the data back to extrahiert (processNr 2))----------->
            <div v-if="sorted.title == 'Lauf Nummer'" class="text-xs-right">
            <v-btn @click="deleteSet">löschen</v-btn>
              <v-btn
              color="primary"
              dark
              @click.stop="startRepetition"
              v-if="this.selected.length>0"
              >
                Sequenzierung wiederholen
              </v-btn>

<!----------- THIS is the popup for the additional data input to bring the data to the next processstepp    -->
              <v-dialog v-model="dialog" width="700"  scrollable>
              <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
              <div>
               <div class="headline">Wollen Sie folgendes Datenset wiederholen? </div>
              </div>
              </v-card-title>
                <v-card-text>
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
                    <v-btn outline @click="changeworkflow('geplant')" class="processButton" id="first" fab dark large color="purple">
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
                    <v-btn  @click="changeworkflow('sequenziert')" class="processButton" fab dark large color="green">
                        S
                     </v-btn>
                </v-flex>
                </v-item-group>
            </v-layout>

  </v-container>
</template>


<script>
import _ from 'lodash';
import {mapState} from 'vuex'



  export default {

    data: () => ({
      activeIndex: null,
      innerActiveIndex:null,
      isLoading:false,
      dialog:false,
      show:false,
      search:'',
      notifications: false,
      selected:'',
      sorted: {
        title: 'NGS Projekt', value: 'ngsproject'
      },
      runList:[],

      menu: false,
      modal: false,
      libraryDate: new Date().toISOString().substr(0, 10),
      Seqmenu:false,
      sequencingDate:new Date().toISOString().substr(0, 10),

      runNr:0,
      isorunnr:1,

      innerSorted:{
         title: 'Bact-Nr', value: 'bactnr'
      },
      innerFilter:[
        { title: 'Bact-Nr', value: 'bactnr' },
        { title: 'Priority', value:'priority' },
        { title: 'Einsender', value:'sender'},
        { title: 'Pathogen', value:'pathogen' },
      ],

      items: [
        { title: 'Bact-Nr', value: 'bactnr' },
        { title: 'Priority', value:'priority' },
        { title: 'Einsender', value:'sender'},
        { title: 'Pathogen', value:'pathogen' },
        { title: 'Lauf Nummer', value: 'runnr' },
        { title: 'NGS Projekt', value: 'ngsproject' }

      ],
      patientList:[],
      currentDataset1: {
        bactnr: "",
        processnr: 4,
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
    computed: {
          ...mapState(['ngs']),

      //This Method filters the PatientList and builds the V-List that is displayed. 
        filteredItems() {
          var display;
         //   store.NgsList = the list that gets transmitted from the DB to the store
          var method = this.ngs.filter(patient => {
                //gets the list and parsed it for all Data with processNr = 1 (1= geplant, 2= extrahiert, 3=lauf,4=sequenziert)
                if(patient.processnr == 4){
                
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
            }else if(this.sorted.value == 'ngsproject'){
            display =_.groupBy(method, this.sorted.value);
            }else{
            display =_.sortBy(method, this.sorted.value);
            }
            return display
            
        },
        //Function that gets the runList (which contains the Array with all Dataset belonging to 1 Run) and then sorts it ascending to the Iso Run Nmmer. 
        orderedRunList: function () {
          if(this.sorted.value =='ngsproject'){
            return _.orderBy(this.runList, this.innerSorted.value)
          }else{
            return _.orderBy(this.runList, 'isorunnr')
          }
  }
    },
    methods:{
      //Method that changes the URL and allows to change between the different views. Sets the selected property of the checkbox to false.
      changeworkflow(item){
        for(var i=0; i<this.selected.length;i++){
          this.selected[i].selected =false
        }
        this.selected = []
        this.$router.push('/'+item)

      },
      //clears the search and sets the value null
      clearSearch(){
        this.search='';
        },
        //Method that formats the date into the EU standard DD-MM-YYYY
        dateformatter(date){  
          var str = date
          if(str &&str.length >12){
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
        var i=0
        if(this.sorted.title == 'Lauf Nummer'){
          for(i=0; i<patient.length;i++){
            this.runList.push(patient[i])
          }
        }else if(this.sorted.value == 'ngsproject'){
          for(i=0; i<patient.length;i++){
            this.runList.push(patient[i])
          }
        }
           this.setCurrentInnerData(patient)
      },

      //Method that copied the data from the ngs information, creates a new object ad applies it to the currentDataset which then gets displayed in textfields.
      setCurrentInnerData(patient,index){
      this.innerActiveIndex = index
        this.isLoading =!this.isLoading
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
      startRepetition(){
        this.dialog=true
      },
      //sends a dataset to extraced, to repeat the workflow incase of an error, and opens a popup 
      sendRun(){
  /*      DIESE METHODE IS TODO - REPEAT
        for(var i=0; i<this.selected.length;i++){

          this.$store.dispatch('putNgs', this.selected[i])
        }*/
        this.selected = []
        this.dialog = false
      },
      //Method that is being used for the checkboxes. It adds or removes the datasets to a list, which is used for handling the data that need to be send 
      //to the next processstep. The if checks what the outersorting is, if it is ngs projekt it will check the checkboxes of the dataset inside a NGS Project on selection.
      selectRun(run){
        this.selected =run
        if(this.sorted.value =='ngsproject'){
          for(var i=0;i<run.length;i++){
           run[i].selected = run.selected
          }
        }
      },
      //Method that sets the filter for the Sorted Property (Card where the Lists (Lauf NR or NGS Project NR) gets displayed)
      setSorted(item){
        this.sorted = item
      },
      //Method that sets the filter for the innerSorted Property (Card where the Dataset gets displayed)
      setInnerSorted(item){
        this.innerSorted = item
      }
    }
  }
</script>
<style>
.scroll {
  max-height: 71vh;
}
.item-group{
  text-align: center;
  margin-left:10px;
  margin-top:80px;
}
.spacer{
  margin-left: 10%;
}
.is-active{
background-color:rgba(224, 21, 21, 0.226);
}
</style>