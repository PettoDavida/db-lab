import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHashHistory } from "vue-router"

import HomePage from './components/pages/HomePage.vue'
import LoginPage from './components/pages/LoginPage.vue'
import RegisterPage from './components/pages/RegisterPage.vue'
import ProfilePage from './components/pages/ProfilePage.vue'
import createPost from './components/pages/createPost.vue'

const router = createRouter({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterPage
    },
    {
        path: "/profile",
        name: 'Profile',
        component: ProfilePage
    },
    {
      path: "/createpost",
      name: 'createPost',
      component: createPost
    }
  ],

  history: createWebHashHistory(),
})

let app = createApp(App);
app.use(router);
app.mount('#app')
