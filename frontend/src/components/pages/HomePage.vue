<template>
  <div class="homepage">
    <AppHeader />

    <main>
      <div id="posts">
        <div id="post" v-for="post in allPosts" :key="post._id">
          <h3>{{ post.title }}</h3>
          <p>{{ post.content }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import AppHeader from "../widgets/AppHeader";

export default {
  name: "HomePage",
  components: { AppHeader },

  data() {
    return {
      allPosts: [],
    };
  },

  mounted() {
    let headers = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/posts/", headers)
      .then((res) => res.json())
      .then(data => { 
        this.allPosts = data;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.homepage {
  overflow: hidden;
}

#profile {
  padding: 0;
  margin: 0;
  transform: translateY(15%);
}

main {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}

h3 {
  padding-top: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

p {
  padding: 2.25rem;
}

#posts {
  height: fit-content;
  width: 80%;
  margin-left: 10%;
}

#post {
  box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
  width: 50%;
  margin-left: 25%;
  text-align: left;
  line-height: 1.25rem;
  margin-bottom: 3rem;
}

#post h3 {
  text-align: center;
}

#after-line {
  width: 30%;
  border-top: 1px solid black;
  margin-left: 35%;
  padding: 0.3rem;
}
</style>

<style>
</style>