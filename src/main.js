import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Jobs from './views/Jobs.vue'
import Profiling from './views/Profiling.vue'
import Relation from './views/Relation.vue'
import Chatbot from './views/Chatbot.vue'

import './index.css'

const routes = [
  { path: '/', name: 'Jobs', component: Jobs },
  { path: '/profiling', name: 'Profiling', component: Profiling },
  { path: '/relation', name: 'Relation', component: Relation },
  { path: '/chatbot', name: 'Chatbot', component: Chatbot }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

createApp(App).use(router).mount('#app')
