import Vue from 'vue'
import Router from 'vue-router'
import quotations from '@/pages/quotations/quotations'
import management from '@/pages/management/management'
import statistics from '@/pages/statistics/statistics'
import selfcenter from '@/pages/selfcenter/selfcenter'
import acountmanagement from '@/pages/selfcenter/acountmanagement'
import basemesage from '@/pages/selfcenter/basemesage'
import editbasemsg from '@/pages/selfcenter/edit/editbasemsg'
import editpassword from '@/pages/selfcenter/edit/editpassword'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: '',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect:{name:'quotations'}
    },
    {
      path: '/index',
      name: 'quotations',
      component: quotations
    },
    {
      path:'/management',
      name:'management',
      component:management
    },
    {
      path:'/statistics',
      name:'statistics',
      component:statistics
    },
    {
      path:'/account',
      name:'selfcenter',
      component:selfcenter,
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
})
