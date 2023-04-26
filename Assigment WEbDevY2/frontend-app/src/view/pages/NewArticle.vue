<template>
    <nav class=" navbar-expand-lg navbar-light" style="background-color: #e3f2fd;" id="navBar">
            <div class="navbar" id="navBar">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
      <router-link class="nav-link" to ="/:dashboard"> HomePage</router-link>
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
<em v-if="loading">Loading article info...</em>




    <h2 class="text-center"> New Article </h2>
    
            <form  id="Form" @submit.prevent="addItem">
                <div class="form-group">
                <label for="title">Title: </label>
            <input type="text"  class="form-control" id="title" name="article" v-model="title"/>
                </div>
                <div class="form-group">
                <label for="Article_text">Article_text:  </label>
            <textarea type="text" name="article" class="form-control" id="Article_text" rows="3" v-model="article_text"/>
                </div>
                <div class="form-group">
            <label for="Author">Author: </label>
            <input type="text" class="form-control" id="Author" name="article" v-model="author"/>
                </div>

                <button id="Button" class="btn btn-outline-success  ">Post Article </button>
            </form>
            
            


<div v-if="error">
    {{ error }}
</div>

</template>

<script>

import {commentsService} from "../../services/comment.service"
import { articleService } from "../../services/article.service"



export default{
data() {
    return {
        article: {},
        articles: [],
        author:"",
        title:"",
        article_text: "",
        error: "",
        id:"",
        Added:"Article Added"
    };
},
methods:{
    addItem(){
    articleService.NewArticle(this.title,this.article_text,this.author)
            .then(console.log("all gud"))
            .catch(error => this.error = error);
          
          
          this.article.loading = true;
          this.title="",
          this.article_text="",
          this.author=""  
          alert("Succesfully added a article")
        },
 
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

</style>