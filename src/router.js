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
      component: () => import('./views/About.vue'),
      meta: { title: 'About' }
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('./views/Join.vue'),
      meta: { title: 'Registration' }
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('./views/Members.vue'),
      meta: { title: 'Members' }
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
      component: () => import('./views/Events.vue'),
      meta: { title: 'Events' }
    },
    {
      path: '/events/:id',
      name: 'singleEvent',
      component: () => import('./views/SingleEvent.vue'),
      meta: { title: 'Events' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/Projects.vue'),
      meta: { title: 'Projects' }
    },
    {
      path: '/projects/:id',
      name: 'singleProject',
      component: () => import('./views/SingleProject.vue'),
      meta: { title: 'Projects' }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('./views/Gallery.vue'),
      meta: { title: 'Gallery' }
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: () => import('./views/Feedback.vue'),
      meta: { title: 'Feedback' }
    },

    
   {
      path: '**',
      name: 'notfound',
      component: () => import('./views/Notfound.vue'),
      meta: { title: '404 - Page not found' }
    } 
    

  ]
})
