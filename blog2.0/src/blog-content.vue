<template>
  <div class="blog-content">
    <h1>{{contentInfo.blog.title}}</h1>
    <span><i class="el-icon-price-tag"></i> {{contentInfo.blog.tags.split(',').join(', ')}}</span>
    <span><i class="el-icon-view"></i> {{contentInfo.blog.read}}</span>
    <vue-markdown width="500px" :source="source"></vue-markdown>
    <p><i class="el-icon-time"></i> {{contentInfo.blog.created}}</p>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'blog-content',
  props: ['contentInfo'],
  data () {
    return {
      source: ''
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
  font-size: 1.2em;
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
</style>
