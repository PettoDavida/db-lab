<template>
  <div id="myModal" class="modal" @click="checkedClose" ref="modalOutside">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="close">&times;</span>
        <p>Edit Post</p>
      </div>
      <div class="modal-body">
        <form>
          <p>Title</p>
          <input type="text" ref="title" v-bind:value="oldTitle" />
          <br>
          <p>Content</p>
          <textarea rows="10" ref="content" v-bind:value="oldContent"/>
        </form>
      </div>
      <div class="modal-footer">
        <button @click="confirm">Confirm</button>
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditPostModal",
  props: { 
    oldTitle: { 
      type: String, 
      default: "" 
    }, 

    oldContent: { 
      type: String, 
      default: "" 
    } 
  },

  methods: {
    checkedClose(event) {
      if (event.target == this.$refs.modalOutside) {
        this.$emit("close");
      }
    },

    close() {
      this.$emit("close");
    },

    confirm() {
      this.$emit("confirm", {
        title: this.$refs.title.value,
        content: this.$refs.content.value,
      });
    },
  },
};
</script>

<style scoped>
@import "./CommonModal.css";

.close {
  color: white;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}

.modal-body {
  padding: 2px 16px;
}

.modal-footer {
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
}
</style>
