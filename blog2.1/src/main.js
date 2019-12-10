import App from './App.vue'
import Me from './Me.vue'
import BlogList from './BlogList'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: App,
      children: [
        {
          path: '/:topic',
          component: BlogList
        }
      ]
    }
  ]
})

new Vue({
  router
}).$mount('#app')
