import Vue from 'vue'
import Router from 'vue-router'
import {getCookie,setCookie,delCookie} from '@/axios/util'
import quotations from '@/pages/quotations/quotations'
import management from '@/pages/management/management'
import statistics from '@/pages/statistics/statistics'
import statisticslist from '@/pages/statistics/statisticslist'
import statisticscontract from '@/pages/statistics/statisticscontract'
import selfcenter from '@/pages/selfcenter/selfcenter'
import acountmanagement from '@/pages/selfcenter/acountmanagement'
import strategy from '@/pages/strategy/strategy'
import treaty from '@/pages/treaty/treaty'
import basemesage from '@/pages/selfcenter/basemesage'
import editbasemsg from '@/pages/selfcenter/edit/editbasemsg'
import editpassword from '@/pages/selfcenter/edit/editpassword'
import index from '@/index'
import login from '@/pages/login/login'
import resign from '@/pages/resign/resign'
import password from '@/pages/password/password'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path:'/',
      name:'loginAfter',
      component:index,
      redirect:{name:'quotations'},
      children:[
        {
          path: '/index',
          name: 'quotations',
          component: quotations
        },
        {
          path: '/strategy',
          name: 'strategy',
          component: strategy
        },
        {
          path: '/treaty',
          name: 'treaty',
          component: treaty
        },
        {
          path:'/management/:type',
          name:'management',
          component:management
        },
        {
          path:'/statistics',
          name:'statistics',
          component:statistics,
          redirect:{name:'statisticscontract'},
          children:[
            {
              path:'/',
              name:'statisticscontract',
              component:statisticscontract
            },
            {
              path:'/statistics/income',
              name:'statisticsincome',
              component:statisticslist
            },
          ]
        },
        {
          path:'/account',
          name:'selfcenter',
          component:selfcenter,
          redirect:{name:'account'},
          children:[
            {
              path:'/',
              name:'account',
              component:acountmanagement,
            },
            {
              path:'/account/basemsg',
              name:'basemsg',
              component:basemesage,
              redirect:{name:'editbasemsg'},
              children:[
                {
                  path:'/',
                  name:'editbasemsg',
                  component:editbasemsg
                },
                {
                  path:'/account/basemsg/password',
                  name:'editpassword',
                  component:editpassword
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: login
    },
    {
      path:'/resign',
      name: 'resign',
      component: resign
    },
    {
      path:'/password',
      name: 'password',
      component: password
    },
    
  ]
});
const rootLinks = ['login','resign','password']; 
router.beforeEach((to, from, next) => {
  // console.log('navigation-guards');
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // console.log(from)
  let umsg = getCookie("umsg",true);
  if(rootLinks.indexOf(to.name)===-1){
    if(umsg==null){
      sessionStorage.removeItem("vuex");
      router.push({ name: 'login' });
    }else{
      
    }
  }
  next();
});
export default router;
