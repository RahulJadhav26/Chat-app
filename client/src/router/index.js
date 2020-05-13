import Vue from 'vue'
import VueRouter from 'vue-router'
import Join from '../views/Join.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Join',
    component: Join
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/redirect-me', redirect: { path: '/' }
  },
  {
    path: '*', redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  console.log('global beforeEach')
  next()
})

export default router
