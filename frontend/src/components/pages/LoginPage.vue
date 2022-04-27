<template>
  <div class="LoginPage">
    <AppHeader />

    <main>
      <div id="form">
        <h1>Logga in</h1>

        <div :class="['form-group', !!errors.username && 'has-error']">
          <label class="form-label" for="username">Användarnamn</label>
          <input
            id="username"
            name="username"
            type="text"
            v-model="values.username"
            class="form-input"
            @blur="validate('username')"
            @keypress="validate('username')"
            @submit="validate('username')"
            @validate="validate('username')"
          />
          <p class="form-input-error" v-if="!!errors.username">
            {{ errors.username }}
          </p>
        </div>

        <div :class="['form-group', !!errors.password && 'has-error']">
          <label class="form-label" for="password">Lösenord</label>
          <input
            id="password"
            name="password"
            type="password"
            v-model="values.password"
            class="form-input"
            @blur="validate('password')"
            @keypress="validate('password')"
          />
          <p class="form-input-error" v-if="!!errors.password">
            {{ errors.password }}
          </p>
        </div>

        <button @click="loginUser">Logga in</button>
        <p class="invalidLogin" v-if="loginRequestError.length > 0">{{ this.loginRequestError }}</p>
      </div>
    </main>
  </div>
</template>

<script>
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Användarnamn är obligatoriskt"),
  password: Yup.string().required("Lösenord är obligatoriskt"),
});

import AppHeader from "../widgets/AppHeader";

export default {
  name: "LoginPage",

  components: { AppHeader },

  data() {
    return {
      values: {
        username: "",
        password: "",
      },
      errors: {
        username: "",
        password: "",
      },

      loginRequestError: false,
    };
  },
  methods: {
    loginUser() {
      validationSchema
        .validate(this.values, { abortEarly: false })
        .then(() => {
          this.errors = {};

          // TODO: Post request
          let obj = {
            username: this.values.username,
            password: this.values.password,
          };

          let headers = {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          };

          fetch("http://localhost:3000/api/users/login", headers)
            .then((res) => {
              if(res.status == 403) {
                return Promise.reject("Wrong username or password");
              } else if(res.status == 500) {
                return Promise.reject("Internal server error");
              }

              return res.json();
            })
            .then((data) => {
                localStorage.setItem("loginToken", data.token);
                // TODO: Redirect to homepage
            })
            .catch((e) => {
              this.loginRequestError = e;
              setTimeout(() => {
                this.loginRequestError = "";
              }, 3000)
            });
        })
        .catch((err) => {
          err.inner.forEach((error) => {
            this.errors[error.path] = error.message;
          });
        });
    },
    validate(field) {
      validationSchema
        .validateAt(field, this.values)
        .then(() => {
          this.errors[field] = "";
        })
        .catch((err) => {
          this.errors[err.path] = err.message;
        });
    },
  },
};
</script>

<style scoped>
  input, label{
    display: block;
  }

  #form{
    min-width: 30%;
    min-height: 100%;
    max-width: 30%;
    margin-top:10%;
    display:flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    line-height: 3rem;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);

  }
  main{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70vh;
  }

  button{
    padding: 16px 42px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    line-height: 1.25;
    background: #FC6E51;
    text-decoration: none;
    color: white;
    font-size: 16px;
    letter-spacing: .08em;
    text-transform: uppercase;
    position: relative;
    transition: background-color .6s ease;
    overflow: hidden;
    cursor: pointer;
    border: none;
  }

  button:hover{
    background: hsl(0, 65%, 64%)
  }
  
  input{
    outline: 0;
    border: none;
    border-bottom: 1px solid black;
    padding: 1rem 2rem;
  }

  .form-input-error, .invalidLogin{
    color: red;
  }
</style>
