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
                    <v-text-field class="textfield" v-model="name" label="Username" required></v-text-field>
                    <v-text-field class="textfield" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <v-text-field class="textfield" v-model="password"  :type="show1 ? 'text' : 'password'" label="Passwort" required></v-text-field>
                    <v-text-field 
                      class="textfield"
                      v-model="passwordCheck"
                      :type="show1 ? 'text' : 'password'"
                      label="Passwort wiederholen"
                      required
                      :error-messages='passwordCheckError()'
                    ></v-text-field>
                    <v-select class="textfield" v-model="selectedRole" :items="rolle" label="Rolle" required></v-select>
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
                  <td>{{ props.item.role }}</td>
                </template>
              </v-data-table>
            </v-flex>
            <v-flex xs12 md12>
             <v-btn color="orange" class="knopf headline" @click="testUnlockAll()">Alle Datensätze entsperren</v-btn>
            </v-flex>
        </v-layout>    
    </v-container>
</template>
<script>
import {mapState} from 'vuex'

  export default {
    data: () => ({
      counter:0,
      show1:false,
      name: '',
      email: '',
      password:'',
      passwordCheck:'',
      selectedRole:'',
      rolle: [
        'Admin',
        'User',
      ],
      users:[
        {
          username:'Jan',
          email:'jan.aeschimann@bfh.ch',
          role:'admin'
        }
      ],
      headers:[
        {text: 'username', value:'username'},
        {text: 'email',value:'email'},
        {text: 'role', value:'role'},
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],

    }),

    computed: {
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      passwordCheckError () { 
        return (this.passwordCheck === this.password) ? '' : 'Die Passwörter stimmen nicht überein.'
      },
      submit () {
        if(this.passwordCheck === this.password){
          alert("WOHOOO")
        }
      },
      clear () {
        this.passwordCheck=''
        this.password =''
        this.name = ''
        this.email = ''
        this.select = null
      },
      testUnlockAll(){
        this.$store.dispatch('unlockAll')
        .catch((error) => {
        console.log("Ups: " + error.statusCode + ": " + error.statusMessage)
        this.counter++
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
  height:200%;
  width:30%
}
</style>