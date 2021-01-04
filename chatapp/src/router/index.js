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
    component: () => import(/* webpackChunkName: "about" */ '_v/LoginPage/Login.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: 'message' */ '_v/MessagePage/Message.vue'),
    children: [
      {
        path: 'searchPerson',
        name: 'Search',
        component: () => import('_c/searchPerson/SearchPerson.vue')
      }
    ]
  },
  {
    path: '/group',
    name: 'Group',
    component: () => import(/* webpackChunkName: "group" */ '_v/FriendPage/Group.vue')
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import(/* webpackChunkName: "about" */ '_v/PostPage/Post.vue'),
    children: [
      {
        path: 'publish',
        name: 'publish',
        component: () => import('_c/publish/publish.vue')
      }
    ]
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "Chat" */ '_c/chat/Chat.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import('_c/person/person.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
