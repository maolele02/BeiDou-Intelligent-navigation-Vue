/*
 * @Author: maolele02
 * @Date: 2022-11-21 21:14:38
 * @LastEditTime: 2022-11-21 22:05:31
 * @LastEditors: maolele02
 * @Description: Vuex的配置
 * @FilePath: \beidou\src\store\index.js
 */

import Vue from 'vue'
// 引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)  // 必须在创建Sotre实例之前应用vuex插件


// 准备actions，用于响应组件中的动作
const actions = {
    // token(context, value){
    //     context.commit('TOKEN', value)
    // },
    // uid(context, value){
    //     context.commit('UID', value)
    // }
}
// 准备mutations，用于操作数据
const mutations = {
    TOKEN(state, value){
        state.token = value
    },
    UID(state, value){
        state.uid = value
    }
}
// 准备state，用于存储数据
const state = {
    uid: null,
    token: ''
}


// 创建store
export default new Vuex.Store({
    // actions: actions,
    // mutations: mutations,
    // state: state
    // 简写为：
    actions,
    mutations,
    state
})
