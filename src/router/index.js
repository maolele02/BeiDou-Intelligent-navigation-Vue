/*
 * @Author: maolele02
 * @Date: 2022-11-18 22:04:40
 * @LastEditTime: 2023-03-02 13:36:07
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\router\index.js
 */
import VueRouter from "vue-router";

import Index from '../pages/Index';
import Login from '../pages/Login';
import Register from '../pages/Register'
import MyOrder from '../pages/MyOrder';  // 引入组件
import PersonalCenter from '../pages/PersonalCenter';
import Reserving from '../pages/Reserving';
import OrderComplete from '../pages/OrderComplete';
import OrderManage from '../pages/OrderManage';
import UserManage from '../pages/UserManage';
import Monitor from '../pages/Monitor';

import Test from '../pages/Test';

// 创建路由
const router = new VueRouter({
    // mode: 'history',
    routes:[
        {  // 默认路由
            path: '/',
            redirect: 'index/delivery'
            // redirect: 'index/delivery'
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'index',
            path: '/index',
            component: Index,
            meta: {isAuth: true, title: '首页'},
            children:[
                {
                    name: 'delivery',
                    path: 'delivery',
                    component: MyOrder
                },
                {
                    name: 'space',
                    path: 'space',
                    component: PersonalCenter
                },
                {
                    name: 'reserving',
                    path: 'reserving',
                    component: Reserving
                },
                {
                    name: 'ordercomplete',
                    path: 'complete',
                    component: OrderComplete
                },
                {
                    name: 'ordermanage',
                    path: 'ordermanage',
                    component: OrderManage
                },
                {
                    name: 'usermanage',
                    path: 'usermanage',
                    component: UserManage
                },
                {
                    name: 'monitor',
                    path: 'monitor',
                    component: Monitor
                }
              ]
        },
        {
            name: 'test',
            path: '/test',
            component: Test
        }
    ]
});
// 全局前置路由
// router.beforeEach((to, from, next) => {
//     console.log(to, from)
//     if(to.name === 'delivery' || to.name === 'space' || to.name === 'reserving'){
//         if(localStorage.getItem('school' === 'huse')){
//             next()
//         }else{
//             alert('您暂未登录，请先登录')
//         }
//     }else{
//         next()
//     }
//   })
  
  export default router
