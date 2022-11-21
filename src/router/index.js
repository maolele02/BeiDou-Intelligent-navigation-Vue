import VueRouter from "vue-router";

import Index from '../pages/Index';
import Login from '../pages/Login';
import Register from '../pages/Register'
import MyOrder from '../pages/MyOrder';  // 引入组件
import PersonalCenter from '../pages/PersonalCenter';
import Reserving from '../pages/Reserving';

// 创建并暴露路由
export default new VueRouter({
    routes:[
        {  // 默认路由
            path: '/',
            redirect: 'login'
            // redirect: 'index/delivery'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/index',
            component: Index,
            children:[
                {
                  path: 'delivery',
                  component: MyOrder
                },
                {
                    path: 'space',
                    component: PersonalCenter
                },
                {
                    path: 'reserving',
                    component: Reserving
                }
              ]
        }
    ]
});
