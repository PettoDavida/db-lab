<template>
  <header>
    <div class="centeredRow header-list">
      <ul>
        <router-link v-if="loggedIn" to="/profile">
          <li class="material-icons" id="profile">account_circle</li>
        </router-link>

        <router-link v-if="!loggedIn" to="/login">
          <li class="material-icons" id="profile">account_circle</li>
        </router-link>

        <button v-if="loggedIn" class="addButton" @click="openCreatePostModal">
          <li id="profile" class="material-icons">add</li>
        </button>
      </ul>
    </div>
    <router-link class="centered" to="/">
      <h1>Anonymous Blogg</h1>
    </router-link>
    <div class="centeredRow endOfCont">
      <button class="logoutButton" v-if="loggedIn" @click="doLogout">logout</button>
    </div>
    <EditPostModal v-if="showCreatePostModal" @close="closeCreatePostModal" @confirm="doCreatePost" />
  </header>
</template>

<script>
import EditPostModal from "../widgets/EditPostModal"

export default {
  name: "AppHeader",
  components: { EditPostModal },

  data() {
    return {
      loggedIn: localStorage.getItem("loginToken") || false,
      showCreatePostModal: false,
    };
  },

  methods: {
    closeCreatePostModal() {
      this.showCreatePostModal = false;
    },

    openCreatePostModal() {
      this.showCreatePostModal = true;
    },

    doCreatePost(value) {
      this.showCreatePostModal = false;

      let token = localStorage.getItem("loginToken");
      if (!token) return;

      let body = {
        title: value.title,
        content: value.content,
      };

      let headers = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(body),
      };

      fetch(`http://localhost:3000/api/posts`, headers).then((res) => {
        if (res.status === 200) {
          this.$router.go();
        }
      });
    },

    doLogout() {
      localStorage.removeItem("loginToken");
      this.loggedIn = false
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.logoutButton {
  border: none;
  background-color: inherit;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  color: red;
  width: 20%;
  height: 33%;
}

.addButton{
  border: none;
  background-color: inherit;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
}

.logoutButton:hover {
  background: #eee;
}

header {
  height: 10vh;
  width: 100%;
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1;
}

.centered{
  display: flex;
  justify-content: center;
  align-items: center;
}

.centeredRow{
  display: flex;
  align-items: center;
}

.endOfCont{
  justify-content:  flex-end !important;
  margin-right: 2rem;
}

.header-list ul {
  display: flex;
  width: 30%;
  list-style: none;
  justify-content: space-evenly;
  padding: 1rem;
}

a {
  color: black;
}
</style>
