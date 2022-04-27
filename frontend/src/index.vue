<script>
import Vue from 'vue'
import Router from 'vue-router'
import LogIn from './components/LogIn.vue'
import Register from './components/Register.vue'
import App from './App.vue'

createApp(App).use(Router).mount('#app')

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: () => import('../components/HomePage.vue')
    },
    {
      path: '/login',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
</script>