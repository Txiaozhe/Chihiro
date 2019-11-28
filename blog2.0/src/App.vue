<template>
  <div id="app">
    <el-container>
      <blog-topic></blog-topic>
    </el-container>
    <el-footer>Footer</el-footer>
  </div>
</template>

<script>
import BlogContent from './blog-content'
import BlogTopic from './blog-topic'
export default {
  name: 'app',
  components: {
    BlogContent,
    BlogTopic
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
.el-header, .el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 200px;
}
body > .el-container {
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
