<!-- This is the Login View, which is diesplayed at the beginning of calling the website !-->
<template>
    <v-content class="backgroundholder" >
        <v-container fluid fill-height>
            <v-layout justify-center align-center>
                <v-flex shrink class="formHolder elevation-4" >
                        <div class="text-xs-center">
                        <img class="redMapleHeader" src="../assets/RedMaple_logo.png"/>
                        </div>
                        <hr>


                        <form class="bottomLogin">
                        <v-form ref="form" v-model="valid" lazy-validation>
                        <div class="text-xs-center">
                        <br>
                        <h2 class="text-md-center black--text">Login</h2>
                        <br>
                        <br>
                        <v-text-field class="textFields"
                        v-model="credentials.username"
                        
                        label="Username"
                        light
                        required
                        ></v-text-field>
                        <v-text-field class="textFields"
                        v-model="credentials.password"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        required
                        light
                        @keyup.enter ="submit"
                        ></v-text-field>
                        </div>

                        <div class="text-xs-center">
                        <div class="text-xs-center">
                          <v-btn
                          large
                          :disabled="!valid"
                          @click="submit"
                          color="primary"
                          style="width:50%"
                          >
                            Login
                          </v-btn>
                        </div>
                        <v-btn 
                        small
                         flat
                        color="red" 
                          @click="clear()"
                          style="font-size:80%"
                          >
                          löschen</v-btn>

                        </div>
                    </v-form>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>
<script>
/* eslint-disable */
import { async } from 'q';


  export default {
    data: () => ({
      valid: true,
      credentials: {
        username: '',
        password: ''
      },
      /*
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters'
      ],
      password: '',
      */
      show1:false
    }),

    methods: {
      submit () {
        if ((this.$refs.form.validate())) {
          // Native form submission is not yet supported
          //this.$router.push('/workflow')
          //this.$socket.emit('unlock', 13)
          //this.$store.dispatch('loginWorkaround', {self: this})
          //.then(() => {
            //this.$store.dispatch('loadNgs')
            //console.log("The accessToken is: " + this.$store.state.accessToken)
            //this.$router.push('/workflow')
          //})
          this.$store.dispatch('login', this.credentials)
            .then(() => {
              //this.$store.dispatch('loadNgs')
              console.log("The accessToken is: " + this.$store.state.accessToken)
              this.$router.push('/workflow')
            }).catch((err) => {
              console.log("Ups: " + err.statusCode + ": " + err.statusMessage)
            })
        }
      },

        clear () {
        //this.$refs.form.reset()
        //this.$store.dispatch('putNgs', this.json)
        //this.$socket.emit('lock', 13)
        //this.$store.dispatch('logout', this.credentials)
        this.$router.push('/workflow')
      },


        login () {
         console.log("login method..")
         if(this.$store.state.accessToken != null){
            this.$router.push('/workflow')
          }
        }
      },   
  }
</script>

<style>
.formHolder{
    background-color: white;
    max-width: 720px
}

.redMapleHeader{
   max-width: 40em;
    
}
.input:not{
    color:black;
}
.textFields{
color:black !important;
width: 30rem;
display:inline-block;
}
.bottomLogin{
    background-color: whitesmoke;
}


</style>
