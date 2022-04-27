<template>
  <header>
    <div class="header-list">
      <ul>
        <router-link v-if="loggedIn" to="/profile">
          <li class="material-icons" id="profile">account_circle</li>
        </router-link>

        <router-link v-if="!loggedIn" to="/login">
          <li class="material-icons" id="profile">account_circle</li>
        </router-link>

        <router-link to='/register'>
            <li id="profile">Register</li>
        </router-link>
        <router-link to='/createpost'>
            <li id="profile" class="material-icons">add</li>
        </router-link>

      </ul>
    </div>
    <router-link to='/'>
      <h1>Zoo affären</h1>
    </router-link>
  </header>
</template>

<script>
export default {
  name: "AppHeader",

  data() {
    return {
      loggedIn: localStorage.getItem("loginToken") || false,
    }
  }
};
</script>

<style scoped>
header {
  height: 10vh;
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
}

header h1 {
  justify-content: center;
}

header ul {
  list-style: none;
  justify-content: space-evenly;
  width: 100%;
  display: flex;
  padding: 1rem;
}

.header-list {
  width: 10%;
  display: flex;
  left: 0;
  position: absolute;
}

a{
  color: black;
}
</style>