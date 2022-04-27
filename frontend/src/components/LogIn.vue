<script>
/* import { defineComponent } from '@vue/composition-api'*/
import * as Yup from 'yup';
import '../CSS/header.css'
import '../CSS/form.css'

// import useValidate from '@vuelidate/core'
// import {required, email, helpers} from '@vuelidate/validators'
// import {reactive} from 'vue'

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Användarnamn är obligatoriskt"),
  password: Yup.string().required("Lösenord är obligatoriskt"),
});

export default {
  name: "LogIn",

  data() {
    return {
      values: {
        userName: "",
        password: "",
      },
      errors: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
     loginUser() {
      validationSchema
        .validate(this.values, { abortEarly: false })
        .then(() => {
          this.errors = {};

          // login the user
        })
        .catch(err => {
          err.inner.forEach(error => {
            this.errors[error.path] = error.message;
          });
        });
         },
        validate(field){
          validationSchema
          .validateAt(field, this.values)
          .then(()=> {
            this.errors[field] = "";
          })
          .catch(err => {
            this.errors[err.path] = err.message;
          })
  }
  },
};
        




</script>

<template>

<div class="LoginPage">
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <header>

    <div class="header-list">
    <ul>
      <li class="material-icons" id="profile">
      
      account_circle
      
      </li>
      <li>Register</li>
    </ul>
    </div>
    
    
    <h1>DB-LAB</h1>
    
  </header>

<main>
<div id="form">


<h1>Login form</h1>

  <div :class="[ 'form-group', !!errors.userName && 'has-error' ]">
  <label class="form-label" for="userName">User Name</label>
  <input
    id="userName"
    name="userName"
    type="text"
    v-model="values.userName"
    class="form-input"
    @blur="validate('userName')"
    @keypress="validate('userName')"
    @submit="validate('userName')"
    @validate="validate('userName')"
  />
  <p class="form-input-error" v-if="!!errors.userName">
    {{ errors.userName }}
  </p>
</div>



 <div :class="[ 'form-group', !!errors.password && 'has-error' ]">
  <label class="form-label" for="password">Password</label>
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


<button @click="submitForm">Submit</button>

</div>
</main>
</div>
</template>