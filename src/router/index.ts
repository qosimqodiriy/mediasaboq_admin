import { createRouter, createWebHistory } from 'vue-router'
import '@/env.d.ts'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/authors',
      name: 'authors',
      component: () => import('@/views/authors/index.vue'),
    },
    {
      path: '/401',
      name: 'unauthentication',
      component: () => import('@/views/errorViews/unAuthentication.vue'),
    },
    {
      path: '/404',
      name: 'page_not_found',
      component: () => import('@/views/errorViews/pageNotFound.vue'),
    },
    {
      path: '/500',
      name: 'server_error',
      component: () => import('@/views/errorViews/serverError.vue'),
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('@/views/tags/index.vue'),
    },
    {
      path: '/',
      name: 'categories',
      component: () => import('@/views/categories/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/views/books/index.vue'),
    },
    {
      path: '/socials',
      name: 'socials',
      component: () => import('@/views/socials/index.vue'),
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('@/views/books/DetailBook.vue'),
    },
    {
      path: '/medias',
      name: 'medias',
      component: () => import('@/views/media/index.vue'),
    },
    {
      path: '/media',
      name: 'media',
      component: () => import('@/views/media/DetailMedia.vue'),
    },
    {
      path: '/educations',
      name: 'educations',
      component: () => import('@/views/education/index.vue'),
    },
    {
      path: '/education',
      name: 'education',
      component: () => import('@/views/education/DetailEducation.vue'),
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/projects/index.vue'),
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('@/views/projects/DetailProject.vue'),
    },
    {
      path: '/pages',
      name: 'pages',
      component: () => import('@/views/pages/index.vue'),
    },
    {
      path: '/emails',
      name: 'emails',
      component: () => import('@/views/emails/index.vue'),
    },
    {
      path: '/aboutUs',
      name: 'aboutUs',
      component: () => import('@/views/pages/AboutUs.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/admin/index.vue'),
    }
  ]
})

export default router
