<template>
  <div id="app">


    <router-view />
    <!-- <p>Counter: {{ counter }}</p>
    <button v-on:click="increment">Add One</button>

    <p v-if="counter>=5">Big number</p>
    <p v-else>Little number</p>

    <input type="text" v-model="testinput" />
    <button v-on:click="testfunc">Check</button>

    <h1>Output: {{output}}</h1> -->
    <!-- <br />
    <Login/>
    <br /> -->
    <!-- <ToDOList/>
    <br />
    <Comment comment_text="My G" author="The G" date_published="19/12/2002"/>
    <Comment comment_text="My Y" author="The Y" date_published="12/12/2002"/>
    <Comment comment_text="My X" author="The X" date_published="11/12/2002"/>
    <br />
    <CommentList/> -->

  </div>
</template>

<script>
import Login from "./pages/Login.vue"

export default{
  data(){
    return{
      welcome_message:"Hello World!?",
      counter:0,
      testinput: "",
      output: false
    }
  },
  methods:{
    increment(){
      this.counter ++;
    },
    testfunc(){
      
      const pattern = /^.{3}$/
      this.output = pattern.test(this.testinput)
      alert(pattern.test(this.testinput) + " " + this.testinput)
    }
   
  },
  components:{
  
      Login,
  
    }

}

</script>

<style scoped>

</style>