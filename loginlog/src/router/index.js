import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Loginlog from '@/components/Loginlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Loginlog',
      name: 'Loginlog',
      component: Loginlog
    }
  ]
})
