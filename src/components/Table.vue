<!-- This is the View for the table! Important: it is read only!!-->
<template>
<v-container fluid>
  <v-card>
    <v-card-title>
      <v-btn color="primary" @click="downloadCSV">Export</v-btn>
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
    :items="ngs"
    class="elevation-1"
    :item-key="bactnr"
    :search="search"
    must-sort
    select-all
    v-model="selected"  
    v-bind:pagination.sync="pagination"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <!--The v-if statements checks the state for the tabs and sets the information accordingly !-->
        <td> <v-checkbox v-model="props.selected" primary hide-details></v-checkbox> </td>
        <td class="text-xs-left" v-if="headers[0].show"> {{ props.item.bactnr }}</td> 
        <td v-if="headers[1].show" class="text-xs-center">{{ props.item.altid }}</td>
        <td v-if="headers[2].show" class="text-xs-center">{{ props.item.processnr }}</td>
        <td v-if="headers[3].show" class="text-xs-center">{{ props.item.priority }}</td>
        <td v-if="headers[4].show" class="text-xs-center">{{ props.item.pathogen }}</td>
        <td v-if="headers[5].show" class="text-xs-center"> {{ props.item.firstname }}</td>
        <td v-if="headers[6].show" class="text-xs-center"> {{ props.item.lastname }}</td>
        <td v-if="headers[7].show" class="text-xs-center">{{ props.item.birthdate }}</td>
        <td v-if="headers[8].show" class="text-xs-center">{{ props.item.entrydate }}</td>
        <td v-if="headers[9].show" class="text-xs-center">{{ props.item.samplingdate }}</td>
        <td v-if="headers[10].show" class="text-xs-center">{{ props.item.sender }}</td>
        <td v-if="headers[11].show" class="text-xs-center">{{ props.item.department }}</td>
        <td v-if="headers[12].show" class="text-xs-center">{{ props.item.processingdate }}</td>
        <td v-if="headers[13].show" class="text-xs-center">{{ props.item.material }}</td>
        <td v-if="headers[14].show" class="text-xs-center">{{ props.item.ngsproject }}</td>
        <td v-if="headers[15].show" class="text-xs-center">{{ props.item.extractiondate }}</td>
        <td v-if="headers[16].show" class="text-xs-center">{{ props.item.concentration }}</td>
        <td v-if="headers[17].show" class="text-xs-center">{{ props.item.extractionvisum }}</td>
        <td v-if="headers[18].show" class="text-xs-center">{{ props.item.runnr }}</td>
        <td v-if="headers[19].show" class="text-xs-center">{{ props.item.isorunnr }}</td>
        <td v-if="headers[20].show" class="text-xs-center">{{ props.item.librarytype }}</td>
        <td v-if="headers[21].show" class="text-xs-center">{{ props.item.librarydate }}</td>
        <td v-if="headers[22].show" class="text-xs-center">{{ props.item.libraryvisum }}</td>
        <td v-if="headers[23].show" class="text-xs-center">{{ props.item.sequencingdate }}</td>
        <td v-if="headers[24].show" class="text-xs-center">{{ props.item.modality }}</td>
        <td v-if="headers[25].show" class="text-xs-center">{{ props.item.sequencingvisum }}</td>
        <td v-if="headers[26].show" class="text-xs-center">{{ props.item.dataqualityvisum }}</td>
        <td v-if="headers[27].show" class="text-xs-center">{{ props.item.oldinformation }}</td>
        <td v-if="headers[28].show" class="text-xs-center">{{ props.item.publicIdentifier }}</td>
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
import Papa from 'papaparse'


  export default {
    data: () => ({
      pagination : {'sortBy': 'priority', 'ascending': true, 'rowsPerPage': 10},
      headerindex:0,
      selected: [],
      search:'',
      headers: [
        { class:'dataSet', text: 'Bact Nr-', sortable: true, value: 'bactnr', show: true},
        { text: 'Alternative ID', value: 'altid', show: false },
        { text: 'Prozessschritt', value: 'processnr', show: true },
        { text: 'priority', value: 'priority' , show: true},
        { text: 'Pathogen', value: 'pathogen' , show: true},
        { class:'dataSet',text: 'Vorname', value: 'firstname' , show: true},
        { class:'dataSet',text: 'Nachname', value: 'lastname' , show: true},
        { text: 'Geburtsdatum', value: 'birthdate', show: true },
        { text: 'Eingang', value: 'entrydate', sortable: false, show: true },
        { text: 'Abnahme', value: 'samplingdate', show: false },
        { text: 'Einsender', value: 'sender', show: true },
        { text: 'Station', value: 'department', show: false },
        { text: 'Bearbeitungsdatum', value: 'processingdate', show: false },
        { text: 'Material', value: 'material', show: true },
        { text: 'NGS-Projekt', value: 'ngsproject', show: true },
        { text: 'Datum DNA-Extraktion', value: 'extractiondate', show: false },
        { text: 'DNA-Konz (ng/ul)', value: 'concentration', show: false },
        { text: 'Visum DNA', value: 'extractionvisum', show: false },
        { text: 'NGS Nummer', value: 'runnr', show: false },
        { text: 'Isolat Run Nummer', value: 'isorunnr', show: false },
        { text: 'Library Typ', value: 'librarytype', show: true },
        { text: 'Datum Library', value: 'librarydate', show: false },
        { text: 'Visum Library', value: 'libraryvisum', show: false },
        { text: 'Datum Sequenzierung', value: 'sequencingdate', show: false },
        { text: 'NGS Gerät', value: 'modality' , show: true},
        { text: 'Visum Sequenzierung', value: 'sequencingvisum' , show: false},
        { text: 'Visum Datenqualität', value: 'dataqualityvisum' , show: false},
        { text: 'Information alte Liste', value: 'oldinformation' , show: false},
        { text: 'Public identifier', value: 'id' , show: false},
      ],
  
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
      downloadCSV(){
        var csv = Papa.unparse(this.selected, {
          quotes: false, //or array of booleans
          quoteChar: ' ',
          escapeChar: ' ',
          delimiter: ';', //sets the delimiter, each delimiter gets read as new column
          header: true,
          skipEmptyLines: false, //or 'greedy', greedy will grab all the information and not skip
          columns: null //or array of strings

        });

        var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
        var csvURL =  null;
        if (navigator.msSaveBlob)
        {
            csvURL = navigator.msSaveBlob(csvData, 'download.csv');
        }
        else
        {
            csvURL = window.URL.createObjectURL(csvData);
        }

        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'download.csv');
        tempLink.click();
    }
    }
  }
  </script>

<style>
.dataSet{
  max-height: 50px;
  min-width: 130px;
}
</style>
