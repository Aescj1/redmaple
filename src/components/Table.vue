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
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="renderHeader()"
    :items="patients"
    class="elevation-1"
    item-key="bactNr"
    :search="search"
    must-sort
    v-bind:pagination.sync="pagination"
  >
    <template slot="items" slot-scope="props">
      <tr @click="props.expanded = !props.expanded">
        <!--The v-if statements checks the state for the tabs and sets the information accordingly !-->
        <td class="text-xs-left" v-if="headers[0].show"> {{ props.item.bactNr }}</td> 
        <td v-if="headers[1].show" class="text-xs-center">{{ props.item.altId }}</td>
        <td v-if="headers[2].show" class="text-xs-center">{{ props.item.priority }}</td>
        <td v-if="headers[3].show" class="text-xs-center">{{ props.item.abbreviation }}</td>
        <td v-if="headers[4].show" class="text-xs-center"> {{ props.item.lastName }}</td>
        <td v-if="headers[5].show" class="text-xs-center">{{ props.item.birthdate }}</td>
        <td v-if="headers[6].show" class="text-xs-center">{{ props.item.entry }}</td>
        <td v-if="headers[7].show" class="text-xs-center">{{ props.item.abnahmeDatum }}</td>
        <td v-if="headers[8].show" class="text-xs-center">{{ props.item.einsender }}</td>
        <td v-if="headers[9].show" class="text-xs-center">{{ props.item.station }}</td>
        <td v-if="headers[10].show" class="text-xs-center">{{ props.item.bearbeitung }}</td>
        <td v-if="headers[11].show" class="text-xs-center">{{ props.item.material }}</td>
        <td v-if="headers[12].show" class="text-xs-center">{{ props.item.ngsProject }}</td>
        <td v-if="headers[13].show" class="text-xs-center">{{ props.item.datumPrep }}</td>
        <td v-if="headers[14].show" class="text-xs-center">{{ props.item.konzentration }}</td>
        <td v-if="headers[15].show" class="text-xs-center">{{ props.item.visumDna }}</td>
        <td v-if="headers[16].show" class="text-xs-center">{{ props.item.runNr }}</td>
        <td v-if="headers[17].show" class="text-xs-center">{{ props.item.runProbeNr }}</td>
        <td v-if="headers[18].show" class="text-xs-center">{{ props.item.libraryTyp }}</td>
        <td v-if="headers[19].show" class="text-xs-center">{{ props.item.libraryDatum }}</td>
        <td v-if="headers[20].show" class="text-xs-center">{{ props.item.libraryVisum }}</td>
        <td v-if="headers[21].show" class="text-xs-center">{{ props.item.seqDatum }}</td>
        <td v-if="headers[22].show" class="text-xs-center">{{ props.item.modalität }}</td>
        <td v-if="headers[23].show" class="text-xs-center">{{ props.item.seqVisum }}</td>
        <td v-if="headers[24].show" class="text-xs-center">{{ props.item.datenqualVisum }}</td>
        <td v-if="headers[25].show" class="text-xs-center">{{ props.item.publicIdentifier }}</td>
      </tr>
    </template>

    <template slot="expand" slot-scope="props">
      <v-card class="text-xs-center" flat>
        <v-card-text  style="background-color:grey"><b>Current BactNr.: </b>{{props.item.bactNr}} <b>| Current NGS Project:</b> {{props.item.ngsProject}}</v-card-text>
      </v-card>
    </template>
  </v-data-table>
  </v-card>
</v-container>
</template>

<script>
import {bus} from '../main.js';
//import axios from 'axios';

  export default {
    data: () => ({
      bufferresults:"",
      pagination : {'sortBy': 'priority', 'ascending': true, 'rowsPerPage': 25},
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
    patients: [{
        bactNr: '31251-18',
        infOldList: '',
        altId: '',
        priority:'A',
        abbreviation: 'aciint',
        lastName: 'Walter Reyes',
        birthdate: '12.03.1950',
        entry: '13.11.2018',
        abnahmeDatum: '14.11.2018',
        einsender: 'Spital Basel',
        station: 'Intensiv',
        bearbeitung: '16.11.2018',
        material: 'Blut',
        ngsProject: 'NGS000012',
        datumPrep: '10.11.2018',
        konzentration: '34',
        visumDna: 'BMA',
        runNr: '00542',
        runProbeNr: 'NGS4230498',
        libraryTyp: 'next Generation',
        libraryDatum: '20.08.2017',
        libraryVisum:'BMA',
        seqDatum: '20.11.2018',
        modalität: 'NextSeq',
        datenqualVisum: 'BMA',
        publicIdentifier: '00003',
          },
         {
        bactNr: '31251-18',
        infOldList: '',
        altId: '',
        priority:'A',
        abbreviation: 'aciint',
        lastName: 'Walter Reyes',
        birthdate: '12.03.1950',
        entry: '13.11.2018',
        abnahmeDatum: '14.11.2018',
        einsender: 'Spital Basel',
        station: 'Intensiv',
        bearbeitung: '16.11.2018',
        material: 'Blut',
        ngsProject: 'NGS000012',
        datumPrep: '10.11.2018',
        konzentration: '34',
        visumDna: 'BMA',
        runNr: '00542',
        runProbeNr: 'NGS4230498',
        libraryTyp: 'next Generation',
        libraryDatum: '20.08.2017',
        libraryVisum:'BMA',
        seqDatum: '20.11.2018',
        modalität: 'NextSeq',
        datenqualVisum: 'BMA',
        publicIdentifier: '00003',
          },{
        bactNr: '31251-18',
        infOldList: '',
        altId: '',
        priority:'A',
        abbreviation: 'aciint',
        lastName: 'Walter Reyes',
        birthdate: '12.03.1950',
        entry: '13.11.2018',
        abnahmeDatum: '14.11.2018',
        einsender: 'Spital Basel',
        station: 'Intensiv',
        bearbeitung: '16.11.2018',
        material: 'Blut',
        ngsProject: 'NGS000012',
        datumPrep: '10.11.2018',
        konzentration: '34',
        visumDna: 'BMA',
        runNr: '00542',
        runProbeNr: 'NGS4230498',
        libraryTyp: 'next Generation',
        libraryDatum: '20.08.2017',
        libraryVisum:'BMA',
        seqDatum: '20.11.2018',
        modalität: 'NextSeq',
        datenqualVisum: 'BMA',
        publicIdentifier: '00003',
          },{
        bactNr: '31251-18',
        infOldList: '',
        altId: '',
        priority:'A',
        abbreviation: 'aciint',
        lastName: 'Walter Reyes',
        birthdate: '12.03.1950',
        entry: '13.11.2018',
        abnahmeDatum: '14.11.2018',
        einsender: 'Spital Basel',
        station: 'Intensiv',
        bearbeitung: '16.11.2018',
        material: 'Blut',
        ngsProject: 'NGS000012',
        datumPrep: '10.11.2018',
        konzentration: '34',
        visumDna: 'BMA',
        runNr: '00542',
        runProbeNr: 'NGS4230498',
        libraryTyp: 'next Generation',
        libraryDatum: '20.08.2017',
        libraryVisum:'BMA',
        seqDatum: '20.11.2018',
        modalität: 'NextSeq',
        datenqualVisum: 'BMA',
        publicIdentifier: '00003',
          },
           ],
      editedIndex: -1,
      editedPatient: {
        bactNr: '',
        wiederholung:'',
        infOldList: '',
        altId: '',
        priority:'',
        abbreviation: '',
        lastName: '',
        firstName:'',
        patName: '',
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
      },
       defaultPatient: {
        bactNr: '',
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
        seqVisum:'',
        datenqualVisum: '',
        publicIdentifier: '',
      }
    }),
       computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    }, 

    created () {
      bus.$on('newPatientCreated', (data) =>{
      this.editedPatient = data;
      this.patients.push(this.editedPatient)
      
      });
      bus.$on('patientHasChanged', (data) =>{
      this.editedPatient = data;

      });
      bus.$on('editedIndex', (data) =>{
      this.editedIndex = data;
      this.patients.splice(this.editedIndex,1,this.editedPatient)
      });
      bus.$on('searchChanged', (data) =>{
      this.search = data;
      });
      bus.$on('hideHeader', (data) =>{
      this.headerindex = data;
      this.headers[this.headerindex].show = !this.headers[this.headerindex].show
      });
    },
    methods: {
          editItem (item) {
        //ursprünglicher Code der den PatID mitgibt!
        this.editedIndex = this.patients.indexOf(item)
        this.editedPatient = Object.assign({}, item)
      },
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
