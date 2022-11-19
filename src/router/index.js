import VueRouter from "vue-router";

import MyOrder from '../pages/MyOrder';  // 引入组件
import PersonalCenter from '../pages/PersonalCenter';
import Reserving from '../pages/Reserving'

// 创建并暴露路由
export default new VueRouter({
    routes:[
        {  // 默认路由
            path: '/',
            redirect: 'delivery'
        },
        {
            path: '/delivery',
            component: MyOrder
        },
        {
            path: '/space',
            component: PersonalCenter
        },
        {
            path: '/reserving',
            component: Reserving,
        }
    ]
});
