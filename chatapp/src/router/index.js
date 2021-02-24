import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/message'
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '_c/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '_c/register/Register.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: 'message' */ '_v/MessagePage/Message.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('_c/searchPerson/SearchPerson.vue')
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
        component: () => import('_c/publish/Publish.vue')
      }
    ]
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "Chat" */ '_c/chat/Chat.vue')
  },
  {
    path: '/personInfo',
    name: 'PersonInfo',
    component: () => import('_c/personInfo/PersonInfo.vue')
  },
  {
    path: '/edit',
    name: 'Edit',
    component: () => import('_c/edit/Edit.vue'),
    children: [
      {
        path: 'editSignature',
        name: 'signature',
        component: () => import('_c/edit/EditSignature.vue')
      }
    ]
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})
export default router
