<template>
    <v-container class="view-container" fluid grid-list-md>
        <v-layout  row wrap>
            <v-flex xs6 md6 >
              <v-card class="formHolder elevation-4">
                <v-card-title class="grey lighten-2">
                  <div class="headline">Neuen Benutzeraccount erstellen</div>
                </v-card-title>
                <v-flex shrink class="formHolder elevation-4" >
                <form>
                  <div class="text-xs-center">
                    <v-text-field class="textfield" v-model="credentials.username" label="Username" required></v-text-field>
                    <v-text-field class="textfield" v-model="credentials.email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <v-text-field class="textfield" v-model="credentials.password"  :type="show1 ? 'text' : 'password'" label="Passwort" required></v-text-field>
                    <v-text-field 
                      class="textfield"
                      v-model="passwordCheck"
                      :type="show1 ? 'text' : 'password'"
                      label="Passwort wiederholen"
                      required
                      :error-messages='passwordCheckError()'
                    ></v-text-field>
                    <v-select class="textfield" v-model="selectedRole" :items="role" label="role" required></v-select>
                    </div>
                    <div class="text-xs-right">
                    <v-btn color="primary" @click="submit">Account anlegen</v-btn>
                    <v-btn @click="clear">Reset</v-btn>
                    </div>
                </form>
                </v-flex>
              </v-card>
            </v-flex>
            <v-flex xs6 md6>
              <v-data-table
              :headers="headers"
              :items="users"
              class="elevation-1">
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.username }}</td>
                  <td>{{ props.item.email }}</td>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12 md12>
             <v-btn color="orange" class="knopf subheading" @click="testUnlockAll()">Alle Datensätze entsperren</v-btn>
            </v-flex>
        </v-layout>    
    </v-container>
</template>
<script>
/* eslint-disable */
import {mapState} from 'vuex'
import Axios from 'axios';

  export default {
    data: () => ({
      counter:0,
      csvUrl: './assets/template.csv',
      show1:false,
      credentials: {
        username: '',
        email: '',
        password:'',
      },
      passwordCheck:'',
      selectedRole:'',
      role: [
        'admin',
        'user',
      ],
      headers:[
        {text: 'username', value:'username'},
        {text: 'email',value:'email'}
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],

    }),

    computed: {
      ...mapState(['users']),

      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.credentials.username.$dirty) return errors
        !this.$v.credentials.username.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.credentials.username.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.credentials.email.$dirty) return errors
        !this.$v.credentials.email.email && errors.push('Must be valid e-mail')
        !this.$v.credentials.email.required && errors.push('E-mail is required')
        return errors
      }
    },

      created() {
      if(this.users.length === 0){
        this.$store.dispatch('loadUsers')
        .catch((error) => {
          console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
      }
    },

    methods: {
      passwordCheckError () { 
        return (this.passwordCheck === this.credentials.password) ? '' : 'Die Passwörter stimmen nicht überein.'
      },
      submit () {
        if(this.passwordCheck === this.credentials.password){
        this.$store.dispatch('createNewUser', this.credentials)
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        })
        }
      },
      clear () {
        this.passwordCheck=''
        this.credentials.password =''
        this.credentials.name = ''
        this.credentials.email = ''
        this.select = null
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
.textfield{
color:black !important;
width: 80%;
display:inline-block;
}
.knopf{
  margin-top: 30px;
  height:100%;
  width:2 0%
}
</style>