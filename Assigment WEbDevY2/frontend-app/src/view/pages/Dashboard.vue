<template>
   
    <div>
        

        <nav class=" navbar-expand-lg navbar-light" style="background-color: #e3f2fd;" id="navBar">
            <div class="navbar" id="navBar">
    <ul class="navbar-nav mr-auto">
        
    <li class="nav-item">
      <router-link class="nav-link" to ="/NewArticle">Add Article</router-link>
    </li>
    <li class="nav-item">
        <router-link class="nav-link" to ="/UsersPage">User</router-link>

    </li>
</ul>
    <form class=" form-inline my-2 my-lg-0" @submit.prevent="handleSubmit">
            <button  id="Button" class="btn btn-outline-success my-2 my-sm-0 float-right " >LogOut</button>
        </form>
    
            </div>
    </nav>
    

    <h1 class="text-center">Welcome to Quotes</h1>
    <em v-if="loading">Loading articles...</em>

    <div class=" text-center  " id="list">
    <ul class=" list-group  "  v-if="articles.length">      
        
        <li class="list-group-item "  v-for="article in articles" :key="article.article_id">
            <router-link class="list-group-item list-group-item-action  " :to="'/articleLIN/' + article.article_id">
            {{article.title + ' by ' + article.author}}
            </router-link>


            <form @submit.prevent="GetSingleInfo(article.article_id)">
            <button  class="btn btn-primary">EDIT</button>
        </form>

            <form @submit.prevent="DeleteArticle(article.article_id)">
            <button class="btn btn-danger">DELETE</button>
        </form>

        </li>
    </ul>
    </div>



    <h2 class="text-center"> Edit Article </h2>
    
    <form  id="Form" @submit.prevent="PatchArticle()">
        <div class="form-group">
        <label for="title">Title: </label>
    <input type="text"  class="form-control" id="title" name="Title" v-model="NewTitle"/>
        </div>
        
        <div class="form-group">
    <label for="Author">Author: </label>
    <input type="text" class="form-control" id="Author" name="author" v-model="NewAuthor"/>
        </div>
        <div class="form-group">
        <label for="Article_text">Article_text:  </label>
    <textarea type="text" name="article" class="form-control" id="Article_text" rows="3" v-model="NewArticle_text"/>
        </div>
        

        <button id="Button" class="btn btn-outline-success  ">UPDATE </button>
    </form>


    <div v-if="error">
        {{ error }}
    </div>
    
</div>
</template>

<script>
import { articleService } from "../../services/article.service"
import Login from "./Login.vue"
import { loginServices } from "../../services/login.service"

export default{
    data(){
        return{
            articles:[],
            article:{},
            error:"",
            NewAuthor:"",
            NewTitle:"",
            NewArticle_text:"",
            editArticleId:"",
            author:"",
            title:"",
            article_text: "",
            loading:true
        }
    },
    mounted(){
        articleService.getAll()
        .then(articles => {
            this.articles=articles
            this.loading=false;
        }).catch(error =>this.error=error)
        this.loading=true;
    },
    methods:{
        DeleteArticle(article_id){
            articleService.DeleteArticle(article_id)
             .then(()=>{
                alert("Article Deleted")
           
           
                articleService.getAll()
                    .then((articles) => {
                        this.articles=articles
                        this.loading=false;
                        
                })
                .catch(error => this.error = error)
            })
                    .catch(error => this.error = error);
                  


        },PatchArticle(){
            articleService.PatchArticle(this.editArticleId,this.NewTitle,this.NewAuthor,this.NewArticle_text)
            .then(()=>{
                alert("Article changed")
            articleService.getAll()
            
                    .then((articles) => {
                        this.articles=articles
                        this.loading=false;

                        articleService.getOne(article_id)
        .then((article) => {
        this.article = article;
    })
        .catch(error => this.error = error);
                        
                })
                .catch(error => this.error = error)
            
        })
        .catch(error => this.error = error)


        },
        GetSingleInfo(article_id){
            articleService.getOne(article_id)
        .then((article) => {
            this.editArticleId=article.article_id;
        this.NewTitle=article.title;
        this.NewAuthor=article.author;
        this.NewArticle_text=article.article_text;
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
        },
        handleSubmit(e){
            this.submitted=true
            this.Logout()
        },
       
        
    }
}
</script>
<style>

</style>