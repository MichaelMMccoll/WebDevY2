<template>
   <nav class=" navbar-expand-lg navbar-light" style="background-color: #e3f2fd;" id="navBar">
            <div class="navbar" id="navBar">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
      <router-link class="nav-link" to ="/:dashboard"> HomePage</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to ="/NewArticle">Add Article</router-link>
    </li>
    
</ul>

    <form class=" form-inline my-2 my-lg-0" @submit.prevent="Logoot">
            <button  id="Button" class="btn btn-outline-success my-2 my-sm-0 float-right " >LogOut</button>
        </form>
    
            </div>
    </nav>

<em v-if="loading">Loading article info...</em>


<div class="container border border-dark mt-5">
<div class="row">
    <div class="col-sm">
                        <h3>User ID</h3>
                    </div>
                    <div class="col-sm">
                        <h3>First Name</h3>
                    </div>
                    <div class="col-sm">
                        <h3>Second Name</h3> 
                    </div>
                    <div class="col-sm">
                    <h3>Email</h3>
                    </div>
                </div>
            </div>


            

            <div v-if="users.length" v-for="user in users" :key="user.user_id" class="container">

                
                <div class=" border row">
                    <div class="col-sm">
                        {{ user.user_id }}
                    </div>
                    <div class="col-sm">
                        {{ user.first_name }}
                    </div>
                    <div class="col-sm">
                        {{ user.last_name }}
                    </div>
                    <div class="col-sm">
                        {{ user.email }}
                    </div>
                   
                </div>
            </div>
           
            
  
    <div class="mb-5 mt-5">
            <h2 class="text-center "> New User </h2>
            <form id="Form" @submit.prevent="handleSubmit">
                <div class="form-group ">
                <label for="Form_Name">First_Name: </label>
            <input type="text"  class="form-control" id="title" name="user" v-model="first_name"/>
                </div>
                
                <div class="form-group">
                <label for="Last_name">Last_Name: </label>
            <input type="text"  class="form-control" id="title" name="user" v-model="last_name"/>
                </div>
                
                <div class="form-group">
                <label for="email">Email: </label>
            <input type="text"  class="form-control" id="title" name="user" v-model="email"/>
            <div v-show="submitted && !email">Email is required</div>
                </div>
                
                <div class="form-group">
                <label for="Password">Password: </label>
            <input type="text"  class="form-control" id="title" name="user" v-model="password"/>
            <div v-show="submitted && !password">Password is required</div>
                </div>
                
                

                <button id="Button" class="btn btn-outline-success ">CREATE USER </button>
            </form>
            </div>

            
</template>

<script>

import {commentsService} from "../../services/comment.service"
import { articleService } from "../../services/article.service"

import {userServices} from "../../services/users.service"
import * as EmailValidator from 'email-validator';
import { loginServices } from "../../services/login.service"


export default{
data() {
    return {
        users:[],
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        loading:true,
        submitted: false
        };
},
created() {
   
    userServices.getAllUsers()
    .then(users => {
            this.users=users
            this.loading=false;
        })
        .catch(error =>this.error=error)
      
    
        
},
methods:{
    addItem(){
    userServices.NewUser(this.first_name,this.last_name,this.email,this.password)
            .then(()=>{
            userServices.getAllUsers()
    .then(users => {
            this.users=users
            this.loading=false;
        })
        .catch(error =>this.error=error)
    })
            .catch(error => this.error = error);
          
          
          
          this.first_name="",
          this.last_name="",
          this.email="",
          this.password=""  
            
        },
        Logout(){
            loginServices.logOut()
            .then(result =>{
                console.log("Logged Out")
                this.$router.push("/")
            })
            .catch(error => {
                this.error =error;
                this.loading=false;
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
                alert("Invalid email")
                return;
            }

            const password_pattern =/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
            if(!(password_pattern.test(password))){
                this.error="Password not strong enough."
                alert("Invalid Password")
                return;
            }
            alert("All info is good")
            this.addItem();
            this.loading=true;
        },Logoot(){
         
            this.Logout()
        }
    
    }
}
</script>
<style>
#Form{
    margin-top: 5%;
    margin-left: 35%;
    margin-right:35%;
}
#Button{
    margin-top: 5%;
}
#ArticleBox{
    padding:10%;
}
</style>
