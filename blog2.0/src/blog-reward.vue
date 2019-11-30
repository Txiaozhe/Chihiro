<template>
  <el-popover
    placement="left"
    trigger="hover">
    <el-button class="reward-button" slot="reference">打赏</el-button>
    <el-image
      style="width: 270px; height: 366.5px"
      src="../wechatpay.jpeg"
      fit="fill">
    </el-image>
    <el-image
      style="width: 270px; height: 405px"
      src="../alipay.jpeg"
      fit="fill">
    </el-image>
  </el-popover>
</template>

<script>
export default {
  name: 'blog-reward',
  data() {
    return {}
  }
}
</script>

<style>
.reward-button {
  color: #ffffff;
  border-color: rgb(243, 168, 20);
  background-color: rgb(243, 168, 20);
}
.reward-button:hover {
  color: #ffffff;
  border-color: rgb(243, 168, 20);
  background-color: rgb(243, 168, 20);
}
.reward-button:focus {
  color: #ffffff;
  border-color: rgb(243, 168, 20);
  background-color: rgb(243, 168, 20);
}
</style>
