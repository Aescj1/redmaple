<template>
        <v-card>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="red lighten-4">
                    <v-flex> 
                  <v-text-field v-model="this.$store.state.currentDataset.bactNr" label="Bact Nummer*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex> 
                  <v-text-field v-model="this.$store.state.currentDataset.wiederholung" label="Wiederholung*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.altId" label="alternative ID"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.priority" label="Priority*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.abbreviation" label="Pathogen (g)*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.lastName" label="lastName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.firstName" label="fistName*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="red lighten-3">
                <v-flex >
                  <v-text-field v-if="this.$route.path == '/geplant'" v-model="this.$store.state.currentDataset.birthdate" label="Geburtsdatum*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.entry" label="Eingang*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.abnahmeDatum" label="Abnahme"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.einsender" label="Einsender*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.station" label="Station*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.bearbeitung" label="Bearbeitungsdatum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-model="this.$store.state.currentDataset.material" label="Material*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
              
                <v-flex d-flex xs3 sm3 md3>
            <v-card row wrap flat color="red lighten-2">
                <v-flex>
                  <v-text-field v-model="this.$store.state.currentDataset.ngsProject" label="NGS - Projekt"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-if="this.$store.state.currentDataset.process>=2" v-model="this.$store.state.currentDataset.datumPrep" label="DNA Vorbereitungsdatum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=2" v-model="this.$store.state.currentDataset.konzentration" label="DNA Konzentration"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field v-if="this.$store.state.currentDataset.process>=2" v-model="this.$store.state.currentDataset.visumDna" label="DNA Visum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.runNr" label="Run NR"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.runProbeNr" label="NGS Nummer"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.libraryTyp" label="Librarytype"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
                <v-flex   v-if="this.$store.state.currentDataset.process>=3" d-flex xs3 sm3 md3>
            <v-card row wrap flat color="red lighten-1">        
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.libraryDatum" label="Library date"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.libraryVisum" label="Library Visum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.seqDatum" label="Sequenzierungs Datum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.modalität" label="NGS Maschine"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=4" v-model="this.$store.state.currentDataset.datenqualVisum" label="Qualitäts Visum"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=3" v-model="this.$store.state.currentDataset.infOldList" label="Information Alteliste"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex >
                  <v-text-field  v-if="this.$store.state.currentDataset.process>=4" v-model="this.$store.state.currentDataset.publicIdentifier" label="Public ID*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
            </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
</template>

<script>
export default{
    data:() =>({

        editedIndex: -1,
    }),
    methods:{
      onSubmit(){
        },
      
      // else statement = wen neuer Pat, if = editedPat. hier muss index und Pat übergeben werden.
      save () {
      }
    },
}
</script>