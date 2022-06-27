import VueRouter from 'vue-router';
import Vue from 'vue';
import * as dd from 'dingtalk-jsapi/entry/union'
import setTitle$ from 'dingtalk-jsapi/api/biz/navigation/setTitle';
import {getLoginUser} from '@/routes/helpers'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: '/data-report-ding',
      path: '/data-report-ding',
      component: {
        render() {
          return <router-view/>
        }
      },
      children: [
        {
          name: 'distributionReport',
          path: 'distributionReport',
          component: () => import('@/views/data-report-ding/distributionReport'),
          meta: {
            title: '经销报表'
          }
        },
        {
          name: 'newPdReport',
          path: 'newPdReport',
          component: () => import('@/views/data-report-ding/newPdReport'),
          meta: {
            title: '纯新面市周报'
          }
        },
        {
          name: 'newProductsReport',
          path: 'newProductsReport',
          component: () => import('@/views/data-report-ding/newProductsReport'),
          meta: {
            title: '纯新面市周报'
          }
        },
        {
          name: 'performancePkReport',
          path: 'performancePkReport',
          component: () => import('@/views/data-report-ding/performancePkReport'),
          meta: {
            title: '双11区域PK'
          }
        },
        {
          name: 'oldPdReport',
          path: 'oldPdReport',
          component: () => import('@/views/data-report-ding/oldPdReport'),
          meta: {
            title: '旧品升级周报'
          }
        },
        {
          name: 'oldProductsReport',
          path: 'oldProductsReport',
          component: () => import('@/views/data-report-ding/oldProductsReport'),
          meta: {
            title: '旧品升级面市周报'
          }
        },
        {
          name: 'deliveryReport',
          path: 'deliveryReport',
          component: () => import('@/views/data-report-ding/deliveryReport'),
          meta: {
            title: '全中发货日报'
          }
        },

        // {
        //   name: 'deliveryReport_test',
        //   path: 'deliveryReport_test',
        //   component: () => import('@/views/data-report-ding/deliveryReport_test'),
        //   meta: {
        //     title: '全中发货日报_test'
        //   }
        // },

        {
          name: 'deliveryReport2',
          path: 'deliveryReport2',
          component: () => import('@/views/data-report-ding/deliveryReport2'),
          meta: {
            title: '全中发货日报'
          }
        },
        {
          name: 'moneyTable',
          path: 'moneyTable',
          component: () => import('@/views/data-report-ding/moneyTable'),
          meta: {
            title: 'B项目报表'
          }
        },
        {
          name: 'BStorePush',
          path: 'BStorePush',
          component: () => import('@/views/data-report-ding/BStorePush'),
          meta: {
            title: 'B店推送报表(日报)'
          }
        },
        {
          name: 'BStorePushWeek',
          path: 'BStorePushWeek',
          component: () => import('@/views/data-report-ding/BStorePushWeek'),
          meta: {
            title: 'B店推送报表(周报)'
          }
        },
        {
          name: 'NewRetailReport',
          path: 'NewRetailReport',
          component: () => import('@/views/data-report-ding/NewRetailReport'),
          meta: {
            title: '新零售运营日报'
          }
        },
        {
          name: 'OnlineKStoreODaily',
          path: 'OnlineKStoreODaily',
          component: () => import('@/views/data-report-ding/OnlineKStoreODaily/OnlineKStoreODaily'),
          meta: {
            title: '线上重点店铺运营日报'
          }
        },

        {
          name: 'WarseLogDigestion',  
          path: 'WarseLogDigestion',
          component: () => import('@/views/data-report-ding/WarLogDige/WarseLogDigestion'),
          meta: {
            title: '仓储物流消化日报'
          }
        },

        {
          name: 'TechnicalOperation',  
          path: 'TechnicalOperation',
          component: () => import('@/views/data-report-ding/TechnicalOperation/TechnicalOperation'),
          meta: {
            title: '信数中心技术运营周报'
          }
        }



      ]
    },
    { 
      name:'error',
      path: '/error',
      component: () => import('@/views/data-report-ding/Error/Error')
    },


  ]
})


router.beforeEach((to, from,next) => {
  if(dd.env.platform === 'notInDingTalk') {
    document.title = to.meta?.title || '数讯传送'
  } else {
    setTitle$({
      title: to.meta?.title || '数讯传送'
    }).then(() => {
      console.log('设置title成功')
    })
  }
  if ((to.path !== '/error')) {
    getLoginUser().then(() => {
      next();    
    }).catch((err) => {
      let reason = err.msg
      // next({
      //   name: 'error',
      //   query: {
      //     reason: reason || '抱歉，系统错误，请稍后再试！'
      //   }
      // });
      console.log(reason)
      next();
    });    
    
  }else{
    next();
  }
})

export default router
