<template>
  <div id="myModal" class="modal" @click="checkedClose" ref="modalOutside">
    <div class="modal-content">
      <div class="modal-header">
        <span class="close" @click="close">&times;</span>
        <p>Change Password</p>
      </div>
      <div class="modal-body">
        <form>
          <p>Old password</p>
          <input type="password" ref="oldPassword">

          <p>New password</p>
          <input type="password" ref="newPassword">

          <p>Confirm password</p>
          <input type="password" ref="confirmPassword">
        </form>
      </div>
      <div class="modal-footer">
        <button @click="submit">Submit</button>
        <button @click="close">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChangePasswordModal",

  methods: {
    checkedClose(event) {
      if(event.target == this.$refs.modalOutside) {
        this.$emit("close");
      }
    },

    close() {
      this.$emit("close");
    },

    submit() {
      this.$emit("submit", {
        oldPassword: this.$refs.oldPassword.value,
        newPassword: this.$refs.newPassword.value,
        confirmPassword: this.$refs.confirmPassword.value
      });
    }
  }
}
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