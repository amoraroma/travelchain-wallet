import Vue from 'vue';
import VueRouter from 'vue-router';
import Welcome from './pages/Welcome.vue';
import Analyse from './pages/Analyse.vue';
import Data from './pages/Data.vue';
import News from './pages/News.vue';
import Purchase from './pages/Purchase.vue';
import Proposals from './pages/Proposals.vue';
import Error404 from './pages/Error404.vue';
import SignIn from './pages/SignIn.vue';
import SignUp from './pages/SignUp.vue';
import store from '../node_modules/store';
import { store as vuex } from './store';


Vue.use(VueRouter);

export const AppRouter = new VueRouter({
  mode: 'history',
  routes: [
    { 
      path: '/', 
      name: 'dashboard',
      component: Welcome,
      meta: {
        auth: true
      }
    },
    { path: '/sign-in',
      name: 'login',
      component: SignIn,
      meta: {
        hiddenForAuth: true
      }
    },
    { path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      meta: {
        hiddenForAuth: true
      }
    },
    { 
      path: '/data', 
      name: 'data',
      component: Data,
      meta: {
        auth: true
      }
    }, 
    { 
      path: '/purchase', 
      name: 'purchase',
      component: Purchase,
      meta: {
        auth: true
      }
    },
    { 
      path: '/news', 
      name: 'news',
      component: News,
      meta: {
        auth: true
      }
    }, 
    { 
      path: '/analyse', 
      name: 'analyse',
      component: Analyse,
      meta: {
        auth: true
      }
    },
    { 
      path: '/proposals',
      name: 'proposals',
      component: Proposals,
      meta: {
          auth: true
      }
    },
    {
      path: '*',
      name: 'error',
      component: Error404
    }
  ]
});

if (store.get('account')) {
  vuex.commit('login', store.get('account').name);
}

AppRouter.beforeEach((to, from, next) => {
  //@ts-ignore
  if (to.meta.auth && !vuex.state.auth.isLoggedIn) {
    next({name: 'login'});
    //@ts-ignore
  } else if (to.meta.hiddenForAuth && vuex.state.auth.isLoggedIn) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default AppRouter;