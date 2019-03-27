<template>
  <v-container fill-height fluid >
    <v-layout row wrap grid-list-md>

        <v-flex d-flex xs6 sm6 md6 xl6 lg6>
            <v-layout row wrap>
                <v-flex>
                    <v-card color="blue lighten-4" class="processCard" dark>
                    <v-card-title primary class="title">Geplant<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('geplant')" right>open_in_new</v-icon></v-card-title>
                      <geplant class="workProcess"></geplant>
                    </v-card>
                </v-flex>

                <v-flex>
                    <v-card color="blue lighten-4" class="processCard" dark>
                    <v-card-title primary class="title">Lauf<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('lauf')" right>open_in_new</v-icon></v-card-title>
                    <Lauf class="workProcess"></Lauf>
                    </v-card>
                </v-flex>
            </v-layout>
      </v-flex>

        <v-flex d-flex xs6 sm6 md6 xl6 lg6>
            <v-layout row wrap>
                <v-flex>
                    <v-card color="blue lighten-4" class="processCard" dark>
                    <v-card-title primary class="title">Extrahiert<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('extrahiert')" right>open_in_new</v-icon></v-card-title>
                    <Extrahiert class="workProcess"></Extrahiert>
                    </v-card>
                </v-flex>

                <v-flex>
                    <v-card color="blue lighten-4" class="processCard"  dark>
                    <v-card-title primary class="title">Sequenziert<v-spacer></v-spacer><v-icon class="mr-1" @click="changeworkflow('sequenziert')" right>open_in_new</v-icon></v-card-title>
                    <Sequenziert class="workProcess"></Sequenziert>
                    </v-card>
                </v-flex>
            </v-layout>
      </v-flex>
    </v-layout>
            <v-flex fluid>
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
      </v-flex>
  </v-container>
</template>

<script>
import Geplant from './Geplant.vue'
import Extrahiert from './Extrahiert.vue'
import Lauf from './Lauf.vue'
import Sequenziert from './Sequenziert.vue'


  export default {
    components:{
      Geplant,
      Extrahiert,
      Lauf,
      Sequenziert
    },
    data: () => ({
    
    }),
    methods:{
      changeworkflow(item){
                this.$router.push('/'+item)
      },
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

</style>