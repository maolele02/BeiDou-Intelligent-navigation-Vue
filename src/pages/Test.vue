<!--
 * @Author: maolele02
 * @Date: 2023-02-28 19:45:28
 * @LastEditTime: 2023-03-01 16:10:01
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\pages\Test.vue
-->
<template>
  <div class="wrap">
    <button @click="socketEmit">发送</button>
  </div>
</template>

<script>
import {io} from "socket.io-client"
export default {
    name: 'Test',
    data(){
        return{
            namespace: '/moni',
            socket: null,
        }
    },
    methods:{
        socketEmit(){
            this.socket.emit('event1', 10, 'hi', {a: 'a'})
        }
    },
    mounted(){
        this.socket = io('http://localhost:5001')
        
        this.socket.on('connect', ()=>{
            console.log('conneted!')
        })

        this.socket.on('event2', message => {
            console.log("event2: " + message.data)
        })
    }
}
</script>

<style>

</style>