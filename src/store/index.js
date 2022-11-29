/*
 * @Author: maolele02
 * @Date: 2022-11-21 21:14:38
 * @LastEditTime: 2022-11-28 22:49:31
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
        console.log('token store ')
        state.token = value
    },
    ACTOR(state, value){
        state.actor = value;
    },
    UID(state, value){
        state.uid = value
    },
    USERNAME(state, value){
        state.username = value
    },
    NAME(state, value){
        state.name = value
    },
    TEL(state, value){
        state.tel = value
    },
    MAIL(state, value){
        state.mail = value
    },
    BEGIN_LNGLAT(state, value){
        state.begin_lnglat = value
    },
    END_LNGLAT(state, value){
        state.end_lnglat = value
    },
    ADDR_PR(state, value){
        state.addr_pr = value
    },
    ADDR_CITY(state, value){
        state.addr_city = value
    },
    ADDR_TOWN(state, value){
        state.addr_town = value
    },
    ADDR_DISTRICT(state, value){
        state.addr_district = value
    },
    ADDR_STREET(state, value){
        state.addr_street = value
    },

    BEGIN_ADDR_STR(state, value){
        state.begin_addr_str = value
    },
    END_ADDR_STR(state, value){
        state.end_addr_str = value
    }
}
// 准备state，用于存储数据
const state = {
    token: null,
    uid: null,
    actor: null,
    username: null,
    name: null,
    begin_lnglat: '',
    end_lnglat: '',
    tel: null,
    mail: null,
    addr_pr: null,
    addr_city: null,
    addr_town: null,
    addr_district: null,
    addr_street: null,

    begin_addr_str: '',
    end_addr_str: ''

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
