<template>
  <div>
    <el-container class="author-container" direction="vertical">
      <el-avatar
        shape="square"
        src="#/leaf.png">
      </el-avatar>
      <span class="my-name">Tang xiaoji</span>
      <el-divider></el-divider>
      <i class="icon-github"></i>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'author',
    data() {
      return {
        url: ''
      }
    }
  }
</script>

<style>
.author-container {
  width: 100px;
}
.el-avatar>img {
  width: 100px;
  height: 100px;
}
.el-avatar {
  width: 100px;
  height: 100px;
  margin-right: 40px;
}
.my-name {
  width: 100px;
  text-align: center;
  margin-top: 20px;
}
</style>
