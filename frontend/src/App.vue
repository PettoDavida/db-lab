<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HomePage/> -->
  <LogIn/>
</template>

<script>
// import HomePage from './components/HomePage.vue'
import LogIn from './components/LogIn.vue'

export default {
  name: 'App',
  components: {
    // HomePage,
    LogIn
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
