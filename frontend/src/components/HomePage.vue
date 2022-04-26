<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <header>

    
    <ul>
      <li class="material-icons" id="profile">
      
      account_circle
      
      </li>
      <li>Log in</li>
      <li>Register</li>
    </ul>
    
    
    <h1>DB-LAB</h1>
    
  </header>

  <main>
    <div id="posts">

    <div id="post">
    
      <h3>Lorem ipsum dolor sit amet consectetur.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio incidunt dolores temporibus facilis ullam sed. Tenetur tempore cumque nostrum beatae obcaecati ab itaque aspernatur aut corporis? Sint assumenda eum earum.</p>
      <p id="after-line">
      <span id="date">26 April 2022</span>
      </p>
    </div>
    <div id="post">
    
      <h3>Lorem ipsum dolor sit amet consectetur.</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio incidunt dolores temporibus facilis ullam sed. Tenetur tempore cumque nostrum beatae obcaecati ab itaque aspernatur aut corporis? Sint assumenda eum earum.</p>
      <p id="after-line">
      <span id="date">26 April 2022</span>
      </p>
    </div>
    </div>

  </main>

   
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

body{
  margin: 0;
  padding: 0;
}

header{
  height:10vh;
  width: 100%;
  border: 2px solid red;
  display: flex;
  flex-direction: row;
  align-items: center;
}

header h1{
  text-align: center;
  border: 1px solid black;
}

#profile{
  border: 1px solid black;
  padding: 0;
  margin: 0;
  transform: translateY(15%);
}

main{
  width: 100vw;
  border:2px solid black;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
  border: 1px solid black;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

#posts{
  height: fit-content;
  width:80%;
  border: 1px solid red;
  margin-left:10%;
}

#post{
  border: 1px solid black;
  width:80%;
  margin-left:10%;
  text-align: left;
  line-height: 1.25rem;
  margin-bottom: 3rem;
}

#post h3{
  text-align: center;
}

#after-line{
  width: 30%;
  border-top: 1px solid black;
  margin-left: 35%;
  padding: 0.3rem;
}

</style>


