const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/home', component: () => import('pages/HomePage.vue') },
      { path: '/novaNota', component: () => import('pages/InserirNota.vue') },
      { path: '/visualisarNotas', component: () => import('pages/VisualizarNotas.vue') },

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
