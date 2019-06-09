<template>
    <v-layout row justify-center>
        <v-dialog v-model="this.$store.state.deleteDialog" persistent max-width="1000px">
            <v-card>
              <v-card-title
                class=" red lighten-1"
              >
              <div>
               <div class="headline">Datenset löschen</div>
                <span class="title">Soll folgendes Datenset tatsächlich gelöscht werden?</span>
              </div>
              </v-card-title>
                <v-card-text class="red lighten-4"> 
                  <v-layout>
                    <v-flex
                        xs4
                        md4
                    >
                        <p><b>Bact. Nr:</b> {{this.isolat.bactnr}}</p>
                        <p><b>Vorname</b> {{this.isolat.firstname}}</p>
                        <p><b>Nachname</b> {{this.isolat.lastname}}</p>
                        <p><b>Geburtsdatum</b> {{this.isolat.birthdate}}</p>
                        <p><b>Prozessschritt</b> {{this.isolat.processnr}}</p>
                        <p><b>Wiederholung:</b> {{this.isolat.repetition}}</p>
                        <p><b>alternative ID:</b> {{this.isolat.altid}}</p>
                        <p><b>Priorität:</b> {{this.isolat.priority}}</p>
                        <p><b>Pathogen:</b> {{this.isolat.pathogen}}</p>
                        <p><b>Eingangsdatum Isolat:</b> {{this.isolat.isoentrydate}}</p>
                        <p><b>Abnahmedatum:</b> {{this.isolat.samplingdate}}</p>

                    </v-flex>
                    <v-flex
                        xs4
                        md4
                    > 
                        <p><b>Einsender:</b> {{this.isolat.sender}}</p>
                        <p><b>Kommentar:</b> {{this.isolat.comment}}</p>
                        <p><b>Eingangdatum Auftrag</b> {{this.isolat.entrydate}}</p>
                        <p><b>NGS-Projekt:</b> {{this.isolat.ngsproject}}</p>
                        <p><b>Public ID:</b> {{this.isolat.publicid}}</p>
                        <p><b>Abrechnung:</b> {{this.isolat.billing}}</p>
                        <p><b>Station:</b> {{this.isolat.department}}</p>
                        <p><b>Bearbeitungsdatum: </b>{{this.isolat.processingdate}}</p>
                        <p><b>Material:</b> {{this.isolat.material}}</p>
                        <p><b>Bearbeitungsdatum:</b> {{this.isolat.processingdate}}</p>
                        <p><b>Material:</b> {{this.isolat.material}}</p>
                    </v-flex>

                    <v-flex
                        xs4
                        md4
                    > 
                        <p><b>Datum DNA-Prep:</b> {{this.isolat.extractiondate}}</p>
                        <p><b>DNA Konz. (ng/ul):</b> {{this.isolat.concentration}}</p>
                        <p><b>Visum DNA:</b> {{this.isolat.extractionvisum}}</p>
                        <p><b>Abnahmedatum:</b> {{this.isolat.samplingdate}}</p>
                        <p><b>Library Typ:</b> {{this.isolat.librarytype}}</p>
                        <p><b>Library Darum:</b> {{this.isolat.librarydate}}</p>
                        <p><b>Library Visum:</b> {{this.isolat.libraryvisum}}</p>
                        <p><b>NGS Run Nummer:</b> {{this.isolat.runnr}}</p>
                        <p><b>Isolat Run Nummer:</b> {{this.isolat.isorunnr}}</p>
                        <p><b>Sequenzierungsdatum:</b> {{this.isolat.sequencingDate}}</p>
                        <p><b>NGS-Gerät:</b> {{this.isolat.modality}}</p>
                    </v-flex>
                </v-layout>
            </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
              <v-btn @click="cancel()" flat >Abbrechen</v-btn>
                <v-dialog
                  v-if="this.dialog==true"
                  v-model="this.dialog"
                  width="800" 
                  persistent 
                >
                <v-card>
                <v-card-title
                  class="red"
                  primary-title
                >
                <div>
                <div class="display-2">Datenset löschen</div>
                </div>
                </v-card-title>
                <v-card-text class="title text-xs-center" >
                  DAS DATENSET WIRD ENDGÜLTIG UND UNWIEDERRUFLICH GELÖSCHT!
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                <v-btn @click="this.cancel" color="primary">Abbrechen</v-btn>
                  <v-btn
                    color="red"
                    @click="this.deletefinal"
                  >
                    Bestätigen
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
                <v-btn
                  color="primary"
                  @click="this.submit"
                >
                  Bestätigen
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import {mapState} from 'vuex'
import {bus} from '../main.js'

export default {
      data:() =>({
      dataset:[],
      menuBirthday:false,
      menuIsoentry:false,
      menuProcessingdate:false,
      menuExtractiondate:false,
      menuSampling:false,
      menuLibrary:false,
      menuSequencing:false,

      dialog:false,

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
     // this.isolat = this.selectedIsolat
      if(this.isolat.birthdate)this.isolat.birthdate = this.dateFormatter(new Date(this.isolat.birthdate))
      if(this.isolat.entrydate) this.isolat.entrydate = this.dateFormatter(new Date(this.isolat.entrydate))
      if(this.isolat.samplingdate)this.isolat.samplingdate = this.dateFormatter(new Date(this.isolat.samplingdate))
      if(this.isolat.processingdate)this.isolat.processingdate = this.dateFormatter(new Date(this.isolat.processingdate))
      if(this.isolat.isoentrydate)this.isolat.isoentrydate = this.dateFormatter(new Date(this.isolat.isoentrydate))
      if(this.isolat.extractiondate)this.isolat.extractiondate = this.dateFormatter(new Date(this.isolat.extractiondate))
      if(this.isolat.librarydate) this.isolat.librarydate = this.dateFormatter(new Date(this.isolat.librarydate))
      if(this.isolat.sequencingdate) this.isolat.sequencingdate = this.dateFormatter(new Date(this.isolat.sequencingdate))


    },
    methods:{
      dateFormatter(date){
          var month = '' + (date.getMonth() + 1)
          var day = '' + date.getDate()
          var  year = date.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
      },
      //Method that submits the changes made to the isolat, submits it to the database and unlocks the isolatdataset again.
      submit(){
        this.dialog = true

        },
        //Method that deletes the isolatdataset
        deletefinal(){
        this.$store.dispatch('deleteNgs', this.selectedIsolat.id)
          .then(response => {
            bus.$emit('positiveNotification', true)
          }, error => {
            console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
            bus.$emit('negativeNotification', error)
          })
        this.dialog = false
        this.$store.state.deleteDialog = false
        },

        //Method that closes the Popup Form to edit the current Isolat and unlocks it again.
        cancel(){
        this.$store.dispatch('requestUnlock', this.lockedId)
          .then(response => {
          }, error => {
            console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
            bus.$emit('negativeNotification', error)
          })
        this.dialog = false
        this.$store.state.deleteDialog = false
        }
    },
}
</script>