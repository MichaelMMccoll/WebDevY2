<template>
   <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;" id="navBar">
            <div class="navbar" id="navBar">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
      <router-link class="nav-link" to="/">Home</router-link>
    </li>
    
      </ul>
            </div>
    </nav>


    <h1 class="text-center" >Login</h1>
    
        
    <form @submit.prevent="handleSubmit">

            <div id="FormL" class="form-outline mb-4">
                <label class="form-label" for="FormE">Email</label>
            <input id="FormE" class="form-control" type="email" v-model="email"/>
           
            <div v-show="submitted && !email">Email is required</div>
       
           </div>

        <br/><br/>
    
        <div id="FormL" class="form-outline mb-4">
            <label class="form-label" for="FormP">Password</label>
        <input id="FormP" class="form-control" type="password"  v-model="password"/>
        
        <div v-show="submitted && !password">Password is required</div>

</div>
        <br/><br/>

        <button id="FormL" class="btn btn-primary btn-block mb-4">Login</button>
        
        
    </form>
    

</template>

<script>

import * as EmailValidator from 'email-validator';
import { loginServices } from '../../services/login.service';

export default{
    data(){
        return{
            email:"",
            password:"",
            submitted: false
        }
    },
    methods:{
        Login(){
            loginServices.login(this.email,this.password)
            .then(result =>{
                console.log("Auth - go to dash")
                this.$router.push("/:dashboard")
            })
            .catch(error => {
                this.error =error;
                
            })

        },
        handleSubmit(e){
            this.submitted=true
            const {email,password}=this

            if(!(email && password)){
                return;
            }
            if(!(EmailValidator.validate(email))){
                this.error="Email must be a valid email."
                return;
            }

            // const pattern = /^.{3}$/
            // this.output = pattern.test(this.testinput)
            // alert(pattern.test(password) + " " + password)
    

            const password_pattern =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
            if(!(password_pattern.test(password))){
                this.error="Password not strong enough."
                alert("Pass invalid")
                return;
            }
            this.Login();
            alert("All info is good")
        }
    }
}
</script>
<style>
#FormL{
   margin-left: 35%;
   margin-right: 35%;
    justify-content: center;

}
</style>