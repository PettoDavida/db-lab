<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
   <!-- <HomePage/> 
   <LogIn/>
  <Register/> -->

  <div id="app">
    <router-view/>
  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

*{
  margin: 0;
  padding: 0;
}
</style>
