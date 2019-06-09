<template>
    <v-layout row justify-center>
        <v-dialog v-model="this.$store.state.repeatDialog" persistent max-width="1000px">
            <v-card>
              <v-card-title
                class=" orange lighten-1"
              >
              <div>
               <div class="headline">Datenset wiederholen</div>
                <span v-if="this.isolat.processnr == 2" class="title">Soll folgendes Datenset tatsächlich neu extrahiert werden?</span>
                <span v-if="this.isolat.processnr == 4" class="title">Sollen folgende Datensets tatsächlich neu sequenziert werden?</span>
              </div>
              </v-card-title>

<!-----------------      THIS PART GETS SHOWN WHEN THE DATASET IS FROM SEQUENCED (PROCESSNR 3)          ----------------------------->

        <v-card-text v-if="this.isolat.length > 0" class="scroll">
            <v-expansion-panel>
                  <v-expansion-panel-content 
                  class="orange lighten-2" 
                  v-for="(item, index) in this.isolat"
                  :key="index"
                  >
                  <div slot="header">
                    <span class="spacer"><b>NGS-Projekt:</b>{{item.ngsproject}}</span>
                    <span class="spacer"><b> Run Nr.:</b> {{item.runnr}}</span>
                    <span class="spacer"><b> NGS-Nr:</b> {{item.isorunnr}}</span>
                    <span class="spacer"><b>Patientenname:</b> {{item.lastname}} {{item.firstname}} </span>

                    </div>
                     <v-card>
                        <v-card-text class="orange lighten-4"> 
                          <v-layout>
                            <v-flex
                                xs4
                                md4
                            >
                                <p><b>Bact. Nr:</b> {{item.bactnr}}</p>
                                <p><b>Vorname</b> {{item.firstname}}</p>
                                <p><b>Nachname</b> {{item.lastname}}</p>
                                <p><b>Geburtsdatum</b> {{dateFormatter(item.birthdate)}}</p>
                                <p><b>Prozessschritt</b> {{item.processnr}}</p>
                                <p><b>Wiederholung:</b> {{item.repetition}}</p>
                                <p><b>alternative ID:</b> {{item.altid}}</p>
                                <p><b>Priorität:</b> {{item.priority}}</p>
                                <p><b>Pathogen:</b> {{item.pathogen}}</p>
                                <p><b>Eingangsdatum Isolat:</b> {{dateFormatter(item.isoentrydate)}}</p>
                                <p><b>Abnahmedatum:</b> {{dateFormatter(item.samplingdate)}}</p>

                            </v-flex>
                            <v-flex
                                xs4
                                md4
                            > 
                                <p><b>Einsender:</b> {{item.sender}}</p>
                                <p><b>Kommentar:</b> {{item.comment}}</p>
                                <p><b>Eingangdatum Auftrag</b> {{dateFormatter(item.entrydate)}}</p>
                                <p><b>NGS-Projekt:</b> {{item.ngsproject}}</p>
                                <p><b>Public ID:</b> {{item.publicid}}</p>
                                <p><b>Abrechnung:</b> {{item.billing}}</p>
                                <p><b>Station:</b> {{item.department}}</p>
                                <p><b>Bearbeitungsdatum: </b>{{dateFormatter(item.processingdate)}}</p>
                                <p><b>Material:</b> {{item.material}}</p>
                                <p><b>Datum DNA-Prep:</b> {{dateFormatter(item.extractiondate)}}</p>
                                <p><b>DNA Konz. (ng/ul):</b> {{item.concentration}}</p>
                            </v-flex>

                            <v-flex
                                xs4
                                md4
                            > 
                                <p><b>Visum DNA:</b> {{item.extractionvisum}}</p>
                                <p><b>Abnahmedatum:</b> {{dateFormatter(item.samplingdate)}}</p>
                                <p><b>Library Typ:</b> {{item.librarytype}}</p>
                                <p><b>Library Darum:</b> {{dateFormatter(item.librarydate)}}</p>
                                <p><b>Library Visum:</b> {{item.libraryvisum}}</p>
                                <p><b>NGS Run Nummer:</b> {{item.runnr}}</p>
                                <p><b>Isolat Run Nummer:</b> {{item.isorunnr}}</p>
                                <p><b>Sequenzierungsdatum:</b> {{dateFormatter(item.sequencingDate)}}</p>
                                <p><b>NGS-Gerät:</b> {{item.modality}}</p>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
          <!-----------------      THIS PART GETS SHOWN WHEN THE DATASET IS FROM EXTRACTED (PROCESSNR 2)          ----------------------------->
                <v-card-text class="orange lighten-4" v-else> 
                  <v-layout >
                    <v-flex
                        xs4
                        md4
                    >
                        <p><b>Bact. Nr:</b> {{this.isolat.bactnr}}</p>
                        <p><b>Vorname</b> {{this.isolat.firstname}}</p>
                        <p><b>Nachname</b> {{this.isolat.lastname}}</p>
                        <p><b>Geburtsdatum</b> {{dateFormatter(this.isolat.birthdate)}}</p>
                        <p><b>Prozessschritt</b> {{this.isolat.processnr}}</p>
                        <p><b>Wiederholung:</b> {{this.isolat.repetition}}</p>
                        <p><b>alternative ID:</b> {{this.isolat.altid}}</p>
                        <p><b>Priorität:</b> {{this.isolat.priority}}</p>
                        <p><b>Pathogen:</b> {{this.isolat.pathogen}}</p>
                        <p><b>Eingangsdatum Isolat:</b> {{dateFormatter(this.isolat.isoentrydate)}}</p>
                        <p><b>Abnahmedatum:</b> {{dateFormatter(this.isolat.samplingdate)}}</p>

                    </v-flex>
                    <v-flex
                        xs4
                        md4
                    > 
                        <p><b>Einsender:</b> {{this.isolat.sender}}</p>
                        <p><b>Kommentar:</b> {{this.isolat.comment}}</p>
                        <p><b>Eingangdatum Auftrag</b> {{dateFormatter(this.isolat.entrydate)}}</p>
                        <p><b>NGS-Projekt:</b> {{this.isolat.ngsproject}}</p>
                        <p><b>Public ID:</b> {{this.isolat.publicid}}</p>
                        <p><b>Abrechnung:</b> {{this.isolat.billing}}</p>
                        <p><b>Station:</b> {{this.isolat.department}}</p>
                        <p><b>Bearbeitungsdatum: </b>{{dateFormatter(this.isolat.processingdate)}}</p>
                        <p><b>Material:</b> {{this.isolat.material}}</p>
                        <p><b>Datum DNA-Prep:</b> {{dateFormatter(this.isolat.extractiondate)}}</p>
                        <p><b>DNA Konz. (ng/ul):</b> {{this.isolat.concentration}}</p>
                    </v-flex>

                    <v-flex
                        xs4
                        md4
                    > 
                        <p><b>Visum DNA:</b> {{this.isolat.extractionvisum}}</p>
                        <p><b>Abnahmedatum:</b> {{dateFormatter(this.isolat.samplingdate)}}</p>
                        <p><b>Library Typ:</b> {{this.isolat.librarytype}}</p>
                        <p><b>Library Darum:</b> {{dateFormatter(this.isolat.librarydate)}}</p>
                        <p><b>Library Visum:</b> {{this.isolat.libraryvisum}}</p>
                        <p><b>NGS Run Nummer:</b> {{this.isolat.runnr}}</p>
                        <p><b>Isolat Run Nummer:</b> {{this.isolat.isorunnr}}</p>
                        <p><b>Sequenzierungsdatum:</b> {{dateFormatter(this.isolat.sequencingDate)}}</p>
                        <p><b>NGS-Gerät:</b> {{this.isolat.modality}}</p>
                    </v-flex>
                </v-layout>
            </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn @click="this.cancel" flat >Abbrechen</v-btn>
                <v-btn v-if="this.isolat.processnr == 2" color="primary" @click="this.submitExtracted">Bestätigen</v-btn>
                <v-btn v-if="this.isolat.processnr != 2" color="primary" @click="this.submitSequenced">Bestätigen</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
/* eslint-disable */
import {mapState} from 'vuex'
import {bus} from '../main.js'


export default {
      data:() =>({
      dataset:[],
      isolat: {
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
        id:""
      },
    }),
    computed:{
      ...mapState(['selectedIsolat']),
      ...mapState(['lockedId']),
    
    },
    created(){
      this.isolat = JSON.parse(JSON.stringify(this.selectedIsolat)) //this method just places it as a json..
    },
    methods:{
      dateFormatter(date){
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
      //Method that submits the changes made to the isolat, submits it to the database and unlocks the isolatdataset again.
      submitExtracted(){
        console.log(this.$store.state.accessToken)
        this.isolat.processnr = 1
        delete this.isolat.concentration
        delete this.isolat.extractiondate
        delete this.isolat.extractionvisum
        this.$store.dispatch('putNgs', this.isolat )
          .then(response => {
              bus.$emit('positiveNotification', true)
          }, error => {
              console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
              bus.$emit('negativeNotification', error)
            }) 
        this.$store.dispatch('requestUnlock', this.lockedId)
        .then(response => {
          }, error => {
            console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
            bus.$emit('negativeNotification', error)
          })
        this.$store.state.repeatDialog = false
        console.log(this.$store.state.accessToken)
        },
      //Method that to repeat a ngs sequencing process. puts the wiederholen property to +1
      submitSequenced(){
        console.log("sequenced")
        if(this.isolat.length > 0){
          console.log("list")
          let list =this.isolat
          for(var i= 0; i<list.length; i++){
              list[i].processnr = 2
              var nr = list[i].repetition
              nr++
              list[i].repetition = nr
              delete list[i].runtype
              delete list[i].librarytype
              delete list[i].librarydate
              delete list[i].libraryvisum
              delete list[i].sequencingdate
              delete list[i].runnr
              delete list[i].isorunnr
              delete list[i].modality
              delete list[i].sequencingvisum
              delete list[i].dataqualityvisum
              this.$store.dispatch('putNgs', list[i] )
                  .then(response => {
                  bus.$emit('positiveNotification', true)
              }, error => {
                  console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
                  bus.$emit('negativeNotification', error)
              })
          }

        }else{
          console.log("object")
          let obj = this.isolat
          obj.processnr = 2
          var nr = obj.repetition
          nr++
          obj.repetition = nr
          delete obj.runtype
          delete obj.librarytype
          delete obj.librarydate
          delete obj.libraryvisum
          delete obj.sequencingdate
          delete obj.runnr
          delete obj.isorunnr
          delete obj.modality
          delete obj.sequencingvisum
          delete obj.dataqualityvisum
          this.$store.dispatch('putNgs', obj )
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
        this.$store.state.repeatDialog = false
        },
        //Method that closes the Popup Form to edit the current Isolat and unlocks it again.
        cancel(){
        this.$store.dispatch('requestUnlock', this.lockedId)
        .then(response => {
          }, error => {
            console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
            bus.$emit('negativeNotification', error)
          })
        this.$store.state.repeatDialog = false
        },
    },
}
</script>