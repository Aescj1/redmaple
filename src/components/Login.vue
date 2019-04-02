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
                        v-model="name"
                        :rules="nameRules"
                        label="Name"
                        light
                        required
                        ></v-text-field>
                        <v-text-field class="textFields"
                        v-model="password"
                        :type="show1 ? 'text' : 'password'"
                        label="Password"
                        required
                        light
                        ></v-text-field>
                        </div>
                        <div class="text-xs-right">
                        <v-btn
                        :disabled="!valid"
                        @click="submit"
                        >
                        submit
                        </v-btn>
                        <v-btn @click="clear()">clear</v-btn>
                        </div>
                    </v-form>
                    </form>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>
<script>
import {mapState} from 'vuex'

  export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      password: '',
      show1:false,
      json:{"bactnr":"8882",
        "name":"TEST PUT"
        },
    }),

      computed:{
    ...mapState(['ngs'])
  },

    methods: {
      submit () {
        if ((this.$refs.form.validate())&& (this.name == 'User')) {
          // Native form submission is not yet supported
          this.$router.push('/workflow')
          }
        },
        clear () {
        this.$refs.form.reset()
        // eslint-disable-next-line
        console.log(this.ngs)
        this.$store.dispatch('putNgs', this.json)
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
