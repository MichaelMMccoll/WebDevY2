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
    <li class="nav-item">
        <router-link class="nav-link" to ="/UsersPage">User</router-link>

    </li>
</ul>

    <form class=" form-inline my-2 my-lg-0" @submit.prevent="Logout">
            <button  id="Button" class="btn btn-outline-success my-2 my-sm-0 float-right " >LogOut</button>
        </form>
    
            </div>
    </nav>
<em v-if="loading">Loading article info...</em>


<div class="mt-4 mb-4" :key="article.article_id">


<h1 id="some">{{article.title}}</h1>

<h3 id="some">{{'Written by: '+ article.author}}</h3> 

<p id="some">{{'Published: '+ article.date_published}}</p>

<div id="some" class="One">
    <p>{{article.article_text}}</p>
</div>
</div>


        <div id="some">
            <h2>Comments ({{num_comments}})</h2>
            
            <form  @submit.prevent="addItem">
                <div>
                <textarea type="text" name="comment" rows="3" class="w-25" v-model="comment_text"/>
            </div>    
            <button  class="btn btn-outline-success" >Add comment</button>
            </form>
            <div class="text-danger" v-if="error">
        {{ error }}
             </div>

            <ul v-if="comments.length"></ul>
            <li v-for="comment in comments" :key="comment.comment_id">
                {{comment.comment_text}}
                <br/>
                {{ 'Published on: '+comment.date_published }}
                <form @submit.prevent="DeleteItem(comment.comment_id)">
                <button class="btn btn-outline-danger">DELETE</button>
            </form>
            
            </li>
                 
        </div>



</template>

<script>

import {commentsService} from "../../services/comment.service"
import { articleService } from "../../services/article.service"

import { loginServices } from "../../services/login.service"


export default{
data() {
    return {
        article: {},
        comments: [],
        num_comments: null,
        comment_text: "",
        error: ""
    };
},
created() {
    this.article.loading = true;
    this.comments.loading = true;
    articleService.getOne(this.$route.params.id)
        .then((article) => {
        this.article = article;
        commentsService.getAll(this.$route.params.id)
            .then((comments) => {
            this.comments = comments;
            this.num_comments = comments.length;
        })
            .catch(error => this.error = error);
        
    })
        .catch(error => this.error = error);
},
methods:{
    addItem(){
    commentsService.Newcomments(this.$route.params.id,this.comment_text)
            .then((comments) => {
                alert("Comment added")
                    this.error=""  
        })
        .catch(error => this.error = "Please type something in");
          
          
                    this.article.loading = true;
            this.comments.loading = true;
            articleService.getOne(this.$route.params.id)
                .then((article) => {
                this.article = article;
                commentsService.getAll(this.$route.params.id)
                    .then((comments) => {
                    this.comments = comments;
                    this.num_comments = comments.length;
                })
                    .catch(error => this.error = error);
                
            })
                .catch(error => this.error = error);

                this.comment_text=""
        },
        DeleteItem(comment_id){
            commentsService.DeleteComment(comment_id)
            .then(console.log("deleted"))
            
            .catch(error => this.error = error)
            alert("Comment deleted")
        
            this.article.loading = true;
            this.comments.loading = true;
            articleService.getOne(this.$route.params.id)
                .then((article) => {
                this.article = article;
                commentsService.getAll(this.$route.params.id)
                    .then((comments) => {
                    this.comments = comments;
                    this.num_comments = comments.length;
                })
                    .catch(error => this.error = error);
                
            })
                .catch(error => this.error = error);
               

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
        } 

    }
}
</script>
<style>


#some{
    margin-left: 5%;
}
.One{
    margin-right: 10%;
}
</style>