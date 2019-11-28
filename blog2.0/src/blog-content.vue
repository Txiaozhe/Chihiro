<template>
  <div id="blog-content">
    <vue-markdown width="500px" :source="source"></vue-markdown>
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
    fetch(`./blogs/${this.contentInfo.topic_name}/${this.contentInfo.blog_key}.md`).then(res => {
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
#content {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
