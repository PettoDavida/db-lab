<template>
  <div>
    <AppHeader />
    <main>
      <div id="form">
        <h1>Registrera dig</h1>

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

        <div :class="['form-group', !!errors.confirmPassword && 'has-error']">
          <label class="form-label" for="password">Återupprepa lösenord</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            v-model="values.confirmPassword"
            class="form-input"
            @blur="validate('confirmPassword')"
            @keypress="validate('confirmPassword')"
          />
          <p class="form-input-error" v-if="errors.confirmPassword">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <button @click="registerUser()">Submit</button>

        <div class="register-div">
        <p class="register-p">Om du redan har ett konto kan du</p>
         <router-link to='login'>
             <li id="profile"> logga in här</li> 
        </router-link>
        </div>

      </div>
    </main>
  </div>
</template>

<script>
/* import { defineComponent } from '@vue/composition-api'*/
import * as Yup from "yup";

// import useValidate from '@vuelidate/core'
// import {required, email, helpers} from '@vuelidate/validators'
// import {reactive} from 'vue'

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Användarnamn är obligatoriskt"),
  password: Yup.string().required("Lösenord är obligatoriskt"),
  confirmPassword: Yup.string()
    .required("Återupprepa lösenord")
    .oneOf([Yup.ref('password'), null], 'Your passwords do not match.')
    /*
    .test("password-match", "Lösenorden måste vara identiska", (value) => {
      return parent.password.value === value;
    })
    */
});

import AppHeader from "../widgets/AppHeader";

export default {
  name: "RegisterPage",

  components: { AppHeader },

  data() {
    return {
      values: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    registerUser() {
      validationSchema
        .validate(this.values, { abortEarly: false })
        .then(() => {
          this.errors = {};

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

          fetch("http://localhost:3000/api/users/", headers)
            .then((res) => {
              if(res.status == 403) {
                return Promise.reject("Username already taken");
              } else if(res.status == 500) {
                return Promise.reject("Internal server error");
              } else if(res.status == 400){
                return Promise.reject("Username and Password required")
              }

              return res.json();
            })
            .then(() => {
                // TODO: Redirect to homepage
                this.$router.push({ path: "/" });
            })
            .catch((e) => {
              this.loginRequestError = e;
              setTimeout(() => {
                this.loginRequestError = "";
              }, 3000)
            });
        })
        .catch((err) => {
          console.log(err);
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
    async login() {
      const { username, password } = this;
      const res = await fetch({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
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

  li{
    list-style: none;
  }

  .register-p{
    margin-right: 0.5rem;
  }

  .register-div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
</style>
