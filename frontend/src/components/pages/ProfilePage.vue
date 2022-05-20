<template>
  <div>
    <AppHeader />

    <main>
      <div class="profilePage-div">
        <div class="posts">
          <section id="post-example" v-for="post in userPosts" :key="post._id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
            <div class="flex">
              <button class="iconButton" @click="openEditPostModal">
                <span class="material-icons" v-bind:data-post-id="post._id"
                  >edit</span
                >
              </button>
              <div style="width: 15px"></div>
              <button class="iconButton" @click="openDeletePostModal">
                <span class="material-icons" v-bind:data-post-id="post._id"
                  >delete</span
                >
              </button>
            </div>
          </section>
        </div>

        <div class="settings">
          <p>Username: {{ this.userInfo.username }}</p>
          <button class="fancyButton" @click="openChangePasswordModal">
            Ändra lösenord
          </button>
          <button class="fancyButton" @click="openDeleteProfileModal">
            Ta bort konto
          </button>
        </div>
      </div>

      <ChangePasswordModal
        v-if="showChangePasswordModal"
        @close="closeChangePasswordModal"
        @submit="doChangePassword"
      />
      <ConfirmModal
        v-if="showDeleteProfileModal"
        modalTitle="Delete Profile"
        @confirm="doDeleteProfile"
        @close="closeDeleteProfileModal"
      />
      <EditPostModal
        v-if="showEditPostModal"
        v-bind:oldTitle="editPost.title"
        v-bind:oldContent="editPost.content"
        @close="closeEditPostModal"
        @confirm="doEditPost"
      />
      <ConfirmModal
        v-if="showDeletePostModal"
        modalTitle="Delete Post"
        @close="closeDeletePostModal"
        @confirm="doDeletePost"
      />

      <SnackbarToast v-if="showConfirmChangePassword"/>
    </main>
  </div>
</template>

<script>
import AppHeader from "../widgets/AppHeader";
import ChangePasswordModal from "../widgets/ChangePasswordModal";
import ConfirmModal from "../widgets/ConfirmModal";
import EditPostModal from "../widgets/EditPostModal";
import SnackbarToast from "../widgets/SnackbarToast";

export default {
  name: "ProfilePage",
  components: { AppHeader, ChangePasswordModal, ConfirmModal, EditPostModal, SnackbarToast },

  data() {
    return {
      userInfo: {},
      userPosts: [],

      showChangePasswordModal: false,
      showDeleteProfileModal: false,
      showEditPostModal: false,
      showDeletePostModal: false,
      showConfirmChangePassword: false,

      editPost: {},
      deletePost: {},
    };
  },

  methods: {
    closeChangePasswordModal() {
      this.showChangePasswordModal = false;
    },

    openChangePasswordModal() {
      this.showChangePasswordModal = true;
    },

    closeDeleteProfileModal() {
      this.showDeleteProfileModal = false;
    },

    openDeleteProfileModal() {
      this.showDeleteProfileModal = true;
    },

    closeEditPostModal() {
      this.showEditPostModal = false;
    },

    openEditPostModal(event) {
      this.showEditPostModal = true;

      let postId = event.target.dataset.postId;
      for (let index = 0; index < this.userPosts.length; index++) {
        const element = this.userPosts[index];
        if (element._id === postId) {
          this.editPost = element;
        }
      }
    },

    closeDeletePostModal() {
      this.showDeletePostModal = false;
    },

    openDeletePostModal(event) {
      this.showDeletePostModal = true;

      let postId = event.target.dataset.postId;
      for (let index = 0; index < this.userPosts.length; index++) {
        const element = this.userPosts[index];
        if (element._id === postId) {
          this.deletePost = element;
        }
      }
    },

    doEditPost(value) {
      this.showEditPostModal = false;

      let token = localStorage.getItem("loginToken");
      if (!token) return;

      let body = {
        title: value.title,
        content: value.content,
      };

      let headers = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(body),
      };

      let postId = this.editPost._id;

      fetch(`http://localhost:3000/api/posts/${postId}`, headers).then(
        (res) => {
          if (res.status === 200) {
            this.$router.go();
          }
        }
      );
    },

    doChangePassword(value) {
      this.showChangePasswordModal = false;

      let token = localStorage.getItem("loginToken");
      if (!token) return;

      let body = {
        oldPassword: value.oldPassword,
        newPassword: value.newPassword,
      };

      let headers = {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(body),
      };

      fetch(`http://localhost:3000/api/users/password`, headers).then((res) => {
        if (res.status === 200) {
          this.showConfirmChangePassword = true;
          setTimeout(() => {
            this.showConfirmChangePassword = false;
          }, 1500);
        }
      });
    },

    doDeleteProfile() {
      this.showDeleteProfileModal = false;

      let token = localStorage.getItem("loginToken");
      if (!token) return;

      let headers = {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(`http://localhost:3000/api/users`, headers).then((res) => {
        if (res.status === 200) {
          localStorage.removeItem("loginToken");
          this.$router.go();
        }
      });
    },

    doDeletePost() {
      let token = localStorage.getItem("loginToken");
      if (!token) return;

      let headers = {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      let postId = this.deletePost._id;
      fetch(`http://localhost:3000/api/posts/${postId}`, headers).then(
        (res) => {
          if (res.status === 200) {
            this.$router.go();
          }
        }
      );
    },
  },

  mounted() {
    let token = localStorage.getItem("loginToken");
    if (!token) {
      this.$router.push("/");
      return;
    }

    let headers = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    };

    let tokenData = atob(token.split(".")[1]);
    tokenData = JSON.parse(tokenData);
    let userId = tokenData.id;

    fetch(`http://localhost:3000/api/users/${userId}`, headers)
      .then((res) => res.json())
      .then((data) => {
        this.userInfo = data;
      });

    fetch(`http://localhost:3000/api/posts/user/${userId}`, headers)
      .then((res) => res.json())
      .then((data) => {
        this.userPosts = data;
      });
  },
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: center;
}

.profilePage-div {
  width: 70%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.posts {
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  margin-top: 2rem;
}

.settings {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.fancyButton {
  padding: 16px 42px;
  box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
  line-height: 1.25;
  background: #fc6e51;
  text-decoration: none;
  color: white;
  font-size: 16px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  transition: background-color 0.6s ease;
  overflow: hidden;
  border: none;
  cursor: pointer;
}

.fancyButton:hover {
  background: hsl(0, 65%, 64%);
}

.iconButton {
  text-decoration: none;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
}

#post-example {
  width: 80%;
  height: fit-content;
  box-shadow: 0px 0px 12px -2px rgba(0, 0, 0, 0.5);
  line-height: 1.25rem;
  margin-bottom: 3rem;
}
</style>
