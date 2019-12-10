<template>
  <div class="blog-content">
    <h1>{{contentInfo.blog.title}}</h1>
    <span class="blog-created-time"><i class="el-icon-time"></i> {{contentInfo.blog.created}}</span>
    <span class="blog-tags"><i class="el-icon-price-tag"></i> {{contentInfo.blog.tags}}</span>
    <span class="blog-read"><i class="el-icon-view"></i> {{contentInfo.blog.read}}</span>
    <vue-markdown width="500px" :source="source"></vue-markdown>
      <el-input
        type="textarea"
        clearable
        placeholder="请输入内容"
        v-model="comment">
      </el-input>
      <el-container direction="horizontal">
        <el-rate
          v-model="rateValue"
          :colors="rateColors">
        </el-rate>
        <el-input
          class="comment-author"
          clearable
          placeholder="名字"
          v-model="commentAuthor">
        </el-input>
        <el-button type="primary">Submit</el-button>
      </el-container>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'blog-content',
  props: ['contentInfo'],
  data () {
    return {
      source: '',
      comment: '',
      rateValue: null,
      rateColors: ['#99A9BF', '#F7BA2A', '#FF9900']
    }
  },
  components: {
    VueMarkdown
  },
  mounted () {
    fetch(`./blogs/${this.contentInfo.topic_name}/${this.contentInfo.blog.key}.md`).then(res => {
      return res.text()
    }).then(md => {
      this.source = md
    }).catch(err => {
      this.$notify({
        title: 'It works!',
        type: 'failed',
        message: '没有找到相关内容',
        duration: 5000
      })
    })
  }
}
</script>

<style>
.blog-content {
  font-family: Helvetica, sans-serif;
  text-align: center;
  width: 690px;
}
h1 {
  font-size: 1.25em;
  font-weight: bold;
}
h2 {
  display: block;
  font-size: 1.1em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  text-align: left;
}
h3 {
  display: block;
  font-size: 0.9em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  text-align: left;
}
h4 {
  display: block;
  font-size: 0.9em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  text-align: left;
}
h5 {
  display: block;
  font-size: 0.9em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  text-align: left;
}
/* span {
  margin-left: 10px;
  margin-right: 10px;
} */
p {
  display: block;
  text-align: left;
  color: #606266;
}
li {
  display: list-item;
  text-align: left;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 20px;
}
ol {
  display: block;
  list-style-type: decimal;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 20px;
}
img {
  width: 650px;
}
blockquote {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 20px;
}
pre {
  display: block;
  font-family: monospace;
  white-space: pre;
  text-align: left;
  margin-left: 10px;
}
span {
  font-size: 11pt;
}
.blog-created-time {
  margin-right: 20px;
  color: #606266;
  font-size: 11pt;
}
.blog-tags {
  color: #606266;
  font-size: 11pt;
}
.blog-read {
  margin-right: 20px;
  color: #606266;
  font-size: 11pt;
}
.el-textarea__inner {
  width: 100%;
  height: 80px;
  margin-top: 20px;
  color: #606266;
}
.el-textarea__inner:focus {
  width: 100%;
  height: 80px;
  color: #606266;
  margin-top: 20px;
  border-color: #606266;
}
/* 名字输入框 */
.el-input--suffix .el-input__inner {
  width: 120px;
  font-size: 14px;
}
.el-input--suffix .el-input__inner:focus {
  width: 120px;
  font-size: 14px;
  border-color: #606266;
}
/* 提交按钮 */
.el-button--primary {
  color: #FFF;
  background-color: #909399;
  border-color: #909399;
  height: 40px;
  margin-left: 18px;
}
.el-button--primary:hover {
  color: #FFF;
  background-color: #606266;
  border-color: #606266;
  height: 40px;
  margin-left: 20px;
}
.el-button--primary:focus {
  color: #FFF;
  background-color: #606266;
  border-color: #606266;
  height: 40px;
  margin-left: 20px;
}
.el-rate {
  width: 1000px;
  height: 40px;
  margin-top: 10px;
  margin-left: 200px;
}
</style>
