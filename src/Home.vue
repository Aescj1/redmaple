<!-- This is the main View which defines the Frame of the application. Every Link/Path/Route is displayed in the router-view!-->
<template>
  
  <v-app id="inspire" class="main" :dark="isDark">
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
     >
    <UserTab></UserTab>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon  v-if="this.$route.path != '/'" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><img class="header-logo" src="./assets/Red_Maple.png"> <p class="header-text">Red Maple</p></v-toolbar-title>
    </v-toolbar>
    <v-content class="board-background">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content> 
    <v-footer app fixed>
      <span>&copy; 2018 - Universitätsspital Basel NGS Webportal </span>
    </v-footer>
 </v-app>
</template>

<script>
import UserTab from './components/UserTab.vue'
import {bus} from './main.js'

  export default {
    mounted(){
      this.$store.dispatch('loadNgs')
    },
  components: {
    UserTab,
  },

    data: () => ({
      isDark:true,
      drawer: false,
      state: 0,
    }),
    props: {
      source: String
    },
    created(){
       bus.$on('drawerReset', (data) =>{
        this.drawer = data;
      });

      bus.$on('changeTheme', (data) =>{
        this.isDark = data;
      });
    }
  }
</script>

<style>
.header-logo{
    width: 6%;
    float: left;
    margin-right: 10px;
}
.header-text{
display:inline;
font-size:larger;
}
.board-background{
  background-image: url("./assets/background3.jpg");
  background-size: cover;
  background-position: 50% 50%;
}
.vue-holder{
  display:block;
}
/*sets the size of the table so that there is a inframe scrollbar*/
.table{
max-height:700px;
overflow:auto;
}
/*removes the scrollbar of the main frame*/
.main{
    overflow-y: unset !important;
    height:100vh;
}
</style>
