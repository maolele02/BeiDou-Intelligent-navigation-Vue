<!--
 * @Author: maolele02
 * @Date: 2022-11-18 22:09:19
 * @LastEditTime: 2022-11-30 21:59:20
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\pages\MyOrder.vue
-->
<template>
<div>
  <span>{{now_state}}</span>
  <hr id="top_hr"/>

  <div class="row">
      <div class="col-md-10 col-md-offset-1 shadow">
          <div class="mainBox">
              <div v-if="orders == null">
                  <span>您当前没有生成订单，点击<router-link active-class="active" to="/index/reserving">此处</router-link>进行配送预约</span>
              </div>
              <template v-if="orders != null">
                <table class="table table-hover" v-cloak>
                    <tr class="active">
                    <th>订单号</th>
                    <th>订单生成时间</th>
                    <th>起始地</th>
                    <th>目的地</th>
                    <th>寄件人</th>
                    <th>收件人</th>
                    <th>物品类型</th>
                    <th>配送状态</th>
                    </tr>
                    
                    <tr class="active v-cloak" v-for="order in orders" :key="order.order_id">
                        <td>{{order.order_id}}</td>
                        <th>{{order.order_time}}</th>
                        <td>{{order.s_addr_pr}}{{order.s_addr_city}}{{order.s_addr_district}}{{order.s_addr_street}}</td>
                        <td>{{order.r_addr_pr}}{{order.r_addr_city}}{{order.r_addr_district}}{{order.r_addr_street}}</td>
                        <td>{{order.s_name}}</td>
                        <td>{{order.r_name}}</td>
                        <td>{{order.item_type}}</td>
                        <td>{{order.state}}</td>
                    </tr>
                </table>
              </template>
          </div>
      </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'MyOrder',
    data(){
      return {
        now_state: '我的配送',
        orders: null,
      }
    },
    created(){
      // this.$axios.get("/hahceshi")
      let uid = localStorage.getItem('uid')
      this.$axios({
      method: 'get',
      url: 'http://106.53.119.46/orders/'+uid,
      //responseType: 'stream'
      }).then(res=> {
          let res_data = res.data.data;
          console.log(res_data);
          // console.log(this); // 使用箭头函数，这里的this指向Vue实例
          if(res_data != null)
            for(let i=0; i<res_data.length; i++){
              // 对GMT时间格式做转换
               let timeGMT = res_data[i].order_time;
               let datetime = new Date(timeGMT);
               let localTime = datetime.toLocaleString();
               res_data[i].order_time = localTime;

              // 对state做转换
                let state = res_data[i].state;
                if(state == 0){
                  res_data[i].state = '等待审核';
                }
                else if(state == 1){
                  res_data[i].state = '等待配送';
                }
                else if(state == 2){
                  res_data[i].state = '正在配送';
                }
                else if(state == 3){
                  res_data[i].state = '已到目的地';
                }
                else if(state == 4){
                  res_data[i].state = '已送回仓库';
                }
                else{
                  res_data[i].state = '异常';
                }
            }
          this.orders = res_data;
          });
  },
  methods:{
  }
}
</script>

<style scoped>


</style>