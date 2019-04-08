<template>
  <v-container fill-height fluid >
    <v-layout row wrap grid-list-md>


                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                    <v-card color="blue lighten-4" class="processCard" dark>
                    <v-card-title primary class="title">Geplant<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('geplant')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                      :src="require('../assets/geplant.jpg')"
                      height="500"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{getGeplant(1)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",1)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",1)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",1)}}</span>                            
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                </v-flex>

                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                    <v-card color="blue lighten-4" class="processCard" dark>
                    <v-card-title primary class="title">Extrahiert<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('extrahiert')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                      :src="require('../assets/extrahierung.jpg')"
                      height="500"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{getGeplant(2)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",2)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",2)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",2)}}</span>                            
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                </v-flex>

                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                    <v-card color="blue lighten-4" class="processCard" dark>
                    <v-card-title primary class="title">Lauf<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('lauf')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                    :src="require('../assets/lauf.jpg')"
                      height="500"
                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{getGeplant(3)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",3)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",3)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",3)}}</span>                            
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                </v-flex>

                <v-flex d-flex xs3 sm3 md3 xl3 lg3>
                    <v-card color="blue lighten-4" class="processCard"  dark>
                    <v-card-title primary class="title">Sequenziert<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('sequenziert')" right>open_in_new</v-icon></v-card-title>
                    <v-img
                    class="picture"
                      :src="require('../assets/sequenzierung.jpg')"
                      height="500"

                    >
                      <v-container fill-height fluid>
                        <v-layout fill-height>
                          <v-flex class="infoHolder" xs12 align-end flexbox>
                            <span class="headline">Anzahl Datensätze: {{getGeplant(4)}}</span>
                            <br>
                            <span class="headline">Priorität "A": {{getPriority("A",4)}}</span>
                            <br>
                            <span class="headline">Priorität "B": {{getPriority("B",4)}}</span>
                            <br>
                            <span class="headline">Priorität "C": {{getPriority("C",4)}}</span>                            
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-img>
                    </v-card>
                </v-flex>

    </v-layout>
            <div>
            <v-layout >
             <v-item-group class="item-group">
                <v-flex>
                    <v-btn @click="changeworkflow('geplant')" class="processButton" id="first" fab dark large color="purple">
                      G
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn @click="changeworkflow('extrahiert')" class="processButton" fab dark large color="red">
                        E
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn @click="changeworkflow('lauf')" class="processButton" fab dark large color="blue">
                        L
                     </v-btn>
                </v-flex>
                <v-flex>
                    <v-btn @click="changeworkflow('sequenziert')" class="processButton" fab dark large color="green">
                        S
                     </v-btn>
                </v-flex>
                </v-item-group>
            </v-layout>
      </div>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'


  export default {
    components:{
      
    },
    data: () => ({
    
    }),
    computed:{
      ...mapState(['ngs']),
    },
    methods:{
            changeworkflow(item){
                this.$router.push('/'+item)
      },
      getGeplant(item){
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
             console.log(item)
           counter++;
           }
        })
        return counter
      }
    },
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