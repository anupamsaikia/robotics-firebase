import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('./views/Join.vue')
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('./views/Members.vue')
    },
    {
      path: '/members/:id',
      name: 'singleMember',
      component: () => import('./views/SingleMember'),
      meta: { title: 'Members' }
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('./views/Events.vue')
    },
    {
      path: '/events/:id',
      name: 'singleEvent',
      component: () => import('./views/SingleEvent.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue')
    },
    {
      path: '/projects/:id',
      name: 'singleProject',
      component: () => import('./views/SingleProject.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('./views/Gallery.vue')
    },
    
    {
      path: '/xyz',
      name: 'xyz',
      component: () => import('./views/AdminPhotoUploader.vue')
    } 
    

  ]
})
