<template>
 
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;" id="navBar">
            <div class="navbar" id="navBar">
    <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
      <router-link class="nav-link" to="/">Home</router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link" to="/login">  Login</router-link>
    </li>
      </ul>
            </div>
    </nav>



    <h1 class="text-center ">Welcome to my Quotes</h1>
    <em v-if="loading">Loading articles...</em>

    <div class=" text-center  " id="list">
    <ul class=" list-group  "  v-if="articles.length">

        <li  class="list-group-item " v-for="article in articles" :key="article.article_id">
            <router-link class="list-group-item list-group-item-action  " :to="'/article/' + article.article_id">
            {{article.title + ' by ' + article.author}}
            </router-link>
        </li>
    </ul>

    <div v-if="error">
        {{ error }}
    </div>
</div>


</template>

<script>
import { articleService } from "../../services/article.service"
import Login from "./Login.vue"


export default{
    data(){
        return{
            articles:[],
            error:"",
            loading:true
        }
    },
    mounted(){
        articleService.getAll()
        .then(articles => {
            this.articles=articles
            this.loading=false
        }).catch(error =>this.error=error)
    }
}
</script>
<style>


#list{
    margin-left: 25%;
    margin-right: 25%;
}

</style>