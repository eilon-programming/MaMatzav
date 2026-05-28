import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/chat'
  },
  {
    path: '/',
    component: () => import('../views/client/ClientLayout.vue'),
    children: [
      {
        path: 'chat',
        name: 'WebChat',
        component: () => import('../views/client/WebChat.vue')
      },
      {
        path: 'settings',
        name: 'Settings',
        component: () => import('../views/client/SettingsPage.vue')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/client/ProfilePage.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
