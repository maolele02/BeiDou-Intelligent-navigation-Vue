<!--
 * @Author: maolele02
 * @Date: 2023-02-07 17:26:59
 * @LastEditTime: 2023-03-02 22:53:12
 * @LastEditors: maolele02
 * @Description: 
 * @FilePath: \beidou\src\components\video\MonitorVideo.vue
-->
<template>
<div class="playVideo-layout">
    <!-- 播放器 -->
    <div id="app-container" class="video-box">
      <video
        ref="videoElement"
        :src="videoUrl"
        id="videoElement"
        controls
        muted
        style="width: 100%; height: 100%; object-fit: fill"
      ></video>
    </div>
</div>
</template>

<script>
import hlsjs from 'hls.js'
export default {
    name: 'MonitorVideo',
    data(){
        return{
          videoUrl: "http://47.115.219.12:8089/live/index.m3u8",
        }
    },
    methods:{
       play(){
        this.video = this.$refs.videoElement; //定义挂载点
        console.log(this.video);
        if (hlsjs.isSupported()) {
          this.hlsjs = new hlsjs();
          this.hlsjs.loadSource(this.videoUrl);//设置播放路径
          this.hlsjs.attachMedia(this.video);//解析到video标签上
          console.log(this.hlsjs);
          this.hlsjs.on(hlsjs.Events.MANIFEST_PARSED, () => {
            this.video.play();
            console.log("加载成功");
          });
          this.hlsjs.on(hlsjs.Events.ERROR, (event, data) => {
            //   console.log(event, data);
            // 监听出错事件
            console.log("加载失败");
          });
        } else {
          this.$message.error("不支持的格式");
          return;
        }
      },
      closeVideo() {  // 停止播放
        if (this.hlsjs) {
          this.$refs.videoElement.pause();
          this.video.pause();
          this.hlsjs.destroy();
          this.hlsjs = null;
          this.$emit("closeVideo");
        }
      }
    }
}
</script>

<style>

</style>