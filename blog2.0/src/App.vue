<template>
  <div id="app">
    <el-container>
      <blog-topic></blog-topic>
    </el-container>
    <el-footer>
      <span class="footer">Powered By <a href="https://github.com/Txiaozhe">Txiaozhe</a></span>
      <span class="footer"> © 2017 ♥ Tang Xiaoji </span>
    </el-footer>
    <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>
  </div>
</template>

<script>
import BlogContent from './blog-content'
import BlogTopic from './blog-topic'
import BlogAuthor from './blog-author'

export default {
  name: 'app',
  components: {
    BlogContent,
    BlogTopic,
    BlogAuthor
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  margin-left: 13%;
  color: #333;
}
.footer {
  height: 22px;
  font-size: 10pt;
  display: block;
  text-align: center;
  color: #606266;
}
.el-footer {
  padding-bottom: 90px;
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
