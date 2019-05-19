<template>
  <v-container fill-height fluid >
    <v-layout row wrap grid-list-md>

    <div>
      <v-btn outline @click="testCreate()">Create Test Dataset</v-btn>
      <v-btn outline @click="testDelete()">Delete Test Dataset</v-btn>
    </div>

    <div>
      <v-btn outline @click="testCreatePathogen()">Create Test Pathogen</v-btn>
      <v-btn outline @click="testDeletePathogen()">Delete Test Pathogen</v-btn>
    </div>

    <div>  
      <v-btn outline @click="testLock()">Request Lock</v-btn>
      <v-btn outline @click="testUnlock()">Request Unlock</v-btn>
      <v-btn outline @click="testUnlockAll()">Unlock all</v-btn>
    </div>

                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                  <v-hover>
                    <v-card color="blue"         
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="processCard" 
                    dark 
                    slot-scope="{hover }"
                    @click="changeworkflow('geplant')">
                    <v-card-title primary class="title">Geplant<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('geplant')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                      :src="require('../assets/geplant.jpg')"
                      height="500"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{count(1)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",1)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",1)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",1)}}</span>
                            <br>
                            <span class="headline">Priorität "D": {{getPriority("D",1)}}</span>                            
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                  </v-hover>
                </v-flex>

                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                  <v-hover>
                    <v-card color="cyan"                     
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="processCard" 
                    dark 
                    slot-scope="{hover }"
                    @click="changeworkflow('extrahiert')">
                    <v-card-title primary class="title">Extrahiert<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('extrahiert')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                      :src="require('../assets/extrahierung.jpg')"
                      height="500"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{count(2)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",2)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",2)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",2)}}</span>
                            <br>
                            <span class="headline">Priorität "D": {{getPriority("D",2)}}</span>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                    </v-hover>
                </v-flex>

                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                  <v-hover>
                    <v-card color="teal"                     
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="processCard" 
                    dark 
                    slot-scope="{hover }"
                    @click="changeworkflow('lauf')">
                    <v-card-title primary class="title">Lauf<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('lauf')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                    :src="require('../assets/lauf.jpg')"
                      height="500"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{count(3)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",3)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",3)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",3)}}</span>
                            <br>
                            <span class="headline">Priorität "D": {{getPriority("D",3)}}</span>                            
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                    </v-hover>
                </v-flex>

                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                  <v-hover>
                    <v-card color="green"                     
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="processCard" 
                    dark 
                    slot-scope="{hover }"
                    @click="changeworkflow('sequenziert')">
                    <v-card-title primary class="title">Sequenziert<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('sequenziert')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                      :src="require('../assets/sequenzierung.jpg')"
                      height="500"

                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{count(4)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",4)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",4)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",4)}}</span>
                            <br>
                            <span class="headline">Priorität "D": {{getPriority("D",4)}}</span>                            
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                    </v-hover>
                </v-flex>

    </v-layout>
            <div>
            <v-layout >
             <v-item-group class="item-group">
                <v-flex>
                    <v-btn outline @click="changeworkflow('geplant')" class="processButton" id="first" fab dark large color="blue">
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
      </div>
  </v-container>
</template>

<script>
/* eslint-disable */
import {mapState} from 'vuex'


  export default {
    components:{
      
    },
    data: () => ({
      json:{
        "bactnr":"8882",
        "name":"TEST PUT"
        },
        pjson:{
        "Abbreviation": "test",
        "Name": "test pathogen",
        },
        id:{
          "id": "5cb064052cda6d5aa3e3c4bb",
        },
        id1:{
          "id": "5cad9f822cda6d5aa3e3c485",
        }
    }),
    mounted(){
      this.$store.dispatch('loadNgs')
      .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      }),
      this.$store.dispatch('loadPathogen')
      .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
    },
    computed:{
      ...mapState(['ngs']),
      ...mapState(['pathogen'])
    },
    methods:{
      changeworkflow(item){
                this.$router.push('/'+item)
      },
      count(item){
        var counter=0;
        this.ngs.filter(patient => {
           if(patient.processnr == item){
           counter++;
           }
        })
        return counter
      },
      getPriority(item, nr){
        var counter=0;
        this.ngs.filter(patient => {
           if(patient.priority == item && patient.processnr == nr){
           counter++;
           }
        })
        return counter
      },
      testCreate(){
        this.$store.dispatch('putNgs', this.json)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
      },
      testDelete(){
        let id = this.ngs[this.ngs.length - 1].id
        console.log(id)
        this.$store.dispatch('deleteNgs', id)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
      },
      testCreatePathogen(){
        this.$store.dispatch('putPathogen', this.pjson)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
      },
      testDeletePathogen(){
        let id = this.pathogen[this.pathogen.length - 1].id
        console.log(id)
        this.$store.dispatch('deletePathogen', id)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
      })
      },
      testLock(){
        console.log("LOCKER")
        console.log(this.id)
        console.log("LOCKER"+this.id)
        this.$store.dispatch('requestLock', this.id)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
                this.$store.dispatch('requestLock', this.id1)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
      },
      testUnlock(){
        this.$store.dispatch('requestUnlock', this.id)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
      },
      testUnlockAll(){
        this.$store.dispatch('unlockAll')
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
      },
    }
  }
</script>

<style>

.item-group{
  text-align: center;
}
.title{
  color: black;
}
.processButton{
  font-size: 3rem;
  margin-bottom: 50px;
}
.processCard{
margin:10px;
max-height:100%;
color:black;
}
.workProcess{
  height: 31vh;
  overflow-y: auto;
}
.picture{
  opacity:0.8;
}
.infoHolder{
  padding-left: 10px;
  padding-top: 10px;
  background-color: rgba(83, 83, 83, 0.555);
  border-radius: 5px;
}


</style>