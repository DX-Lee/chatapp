import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ 'views/Login.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: 'message' */ 'views/Message.vue')
  },
  {
    path: '/group',
    name: 'Group',
    component: () => import(/* webpackChunkName: "group" */ 'views/Group.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import(/* webpackChunkName: "about" */ 'views/Mine.vue'),
    children: [
      {
        path: 'publish',
        name: 'publish',
        component: () => import('components/publish/publish.vue')
      }
    ]
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "Chat" */ 'components/Chat/Chat.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import('components/person/person.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
