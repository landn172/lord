import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: [{
      path: '/',
      name: 'Index',
      component: () =>
        import('../views/Index.vue'),
    }],
  });
}

export default createRouter

