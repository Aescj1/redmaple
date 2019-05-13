<!-- This is the View for the table! Important: it is read only!!-->
<template>
<v-container fluid>
  <v-card>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        color=red
        v-model="search"
        append-icon="search"
        label="Suchen"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="renderHeader()"
    :items="this.ngs"
    class="elevation-1"
    item-key="bactNr"
    :search="search"
    must-sort
    v-bind:pagination.sync="pagination"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <!--The v-if statements checks the state for the tabs and sets the information accordingly !-->
        <td class="text-xs-left" v-if="headers[0].show"> {{ props.item.bactnr }}</td> 
        <td v-if="headers[1].show" class="text-xs-center">{{ props.item.altid }}</td>
        <td v-if="headers[2].show" class="text-xs-center">{{ props.item.priority }}</td>
        <td v-if="headers[3].show" class="text-xs-center">{{ props.item.pathogen }}</td>
        <td v-if="headers[4].show" class="text-xs-center"> {{ props.item.firstname }}</td>
        <td v-if="headers[5].show" class="text-xs-center">{{ props.item.birthdate }}</td>
        <td v-if="headers[6].show" class="text-xs-center">{{ props.item.entrydate }}</td>
        <td v-if="headers[7].show" class="text-xs-center">{{ props.item.entrydate }}</td>
        <td v-if="headers[8].show" class="text-xs-center">{{ props.item.sender }}</td>
        <td v-if="headers[9].show" class="text-xs-center">{{ props.item.department }}</td>
        <td v-if="headers[10].show" class="text-xs-center">{{ props.item.samplingdate }}</td>
        <td v-if="headers[11].show" class="text-xs-center">{{ props.item.material }}</td>
        <td v-if="headers[12].show" class="text-xs-center">{{ props.item.ngsproject }}</td>
        <td v-if="headers[13].show" class="text-xs-center">{{ props.item.processingdate }}</td>
        <td v-if="headers[14].show" class="text-xs-center">{{ props.item.concentration }}</td>
        <td v-if="headers[15].show" class="text-xs-center">{{ props.item.extractionvisum }}</td>
        <td v-if="headers[16].show" class="text-xs-center">{{ props.item.runnr }}</td>
        <td v-if="headers[17].show" class="text-xs-center">{{ props.item.isorunnr }}</td>
        <td v-if="headers[18].show" class="text-xs-center">{{ props.item.librarytype }}</td>
        <td v-if="headers[19].show" class="text-xs-center">{{ props.item.librarydate }}</td>
        <td v-if="headers[20].show" class="text-xs-center">{{ props.item.libraryvisum }}</td>
        <td v-if="headers[21].show" class="text-xs-center">{{ props.item.sequencingdate }}</td>
        <td v-if="headers[22].show" class="text-xs-center">{{ props.item.modality }}</td>
        <td v-if="headers[23].show" class="text-xs-center">{{ props.item.sequencingvisum }}</td>
        <td v-if="headers[24].show" class="text-xs-center">{{ props.item.dataqualityvisum }}</td>
        <td v-if="headers[25].show" class="text-xs-center">{{ props.item.publicIdentifier }}</td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <v-card class="text-xs-center" flat>
        <v-card-text  style="background-color:grey"><b>Current BactNr.: </b>{{props.item.bactnr}} <b>| Current NGS Project:</b> {{props.item.ngsproject}}</v-card-text>
      </v-card>
    </template>
  </v-data-table>
  </v-card>
</v-container>
</template>

<script>
/* eslint-disable */
import {mapState} from 'vuex'
import {bus} from '../main.js';

  export default {
    data: () => ({
      pagination : {'sortBy': 'priority', 'ascending': true, 'rowsPerPage': 10},
      headerindex:0,
      headers: [
        { class:'dataSet', text: 'Bact Nr-', sortable: true, value: 'bactNr', show: true},
        { text: 'Alternative ID', value: 'altId', show: false },
        { text: 'priority', value: 'priority' , show: true},
        { text: 'Pathogen', value: 'abbreviation' , show: true},
        { class:'dataSet',text: 'Patient', value: 'lastName' , show: true},
        { text: 'Geburtsdatum', value: 'birthdate', show: true },
        { text: 'Eingang', value: 'entry', sortable: false, show: true },
        { text: 'Abnahmedatum', value: 'abnahmeDatum', show: false },
        { text: 'Einsender', value: 'einsender', show: true },
        { text: 'Station', value: 'station', show: false },
        { text: 'Bearbeitung', value: 'bearbeitung', show: false },
        { text: 'Material', value: 'material', show: true },
        { text: 'NGS-Projekt', value: 'ngsProject', show: true },
        { text: 'Datum DNA-Prep', value: 'datumPrep', show: false },
        { text: 'DNA-Konz (ng/ul)', value: 'konzentration', show: false },
        { text: 'Visum DNA', value: 'visumDna', show: false },
        { text: 'Run Nummer', value: 'runNr', show: true },
        { text: 'NGS Nummer', value: 'runProbeNr', show: true },
        { text: 'Library Typ', value: 'libraryTyp', show: true },
        { text: 'Datum Library', value: 'libraryDatum', show: false },
        { text: 'Visum Library', value: 'libraryVisum', show: false },
        { text: 'Datum Sequenzierung', value: 'seqDatum', show: false },
        { text: 'NGS Gerät', value: 'modalität' , show: true},
        { text: 'Visum Datenqualität', value: 'datenqualVisum' , show: false},
        { text: 'Information alte Liste', value: 'infOldList' , show: false},
        { text: 'Public identifier', value: 'publicIdentifier' , show: false},
      ],
      search:'',
    }),
       computed: {
         ...mapState(['ngs']),
        pages () {
          if (this.pagination.rowsPerPage == null ||
            this.pagination.totalItems == null
          ) return 0
          return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
        } 
      }, 
    mounted(){
      this.$store.dispatch('loadNgs')
      .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
    },
    created () {
      bus.$on('hideHeader', (data) =>{
      this.headerindex = data;
      this.headers[this.headerindex].show = !this.headers[this.headerindex].show
      });
    },
    methods: {
           renderHeader(){
        return this.headers.filter(h => h.show == true)
      },
    }
  }
  </script>

<style>
.dataSet{
  max-height: 50px;
  min-width: 130px;
}
</style>
