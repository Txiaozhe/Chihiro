<template>
  <el-container direction="horizontal">
    <blog-topic></blog-topic>
    <router-view></router-view>
  </el-container>
</template>

<script>
import BlogTopic from './BlogTopic'
export default {
  components: {
    BlogTopic
  },
  methods: {
    goBack () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style>
  .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
