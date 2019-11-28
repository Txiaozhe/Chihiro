<template>
  <div class="block">
    <blog-content v-if="isShowContent" v-bind:content-info="contentInfo"></blog-content>
    <el-timeline v-else>
      <el-timeline-item
        placement="top"
        v-for="(blog, index) in selectedTopic.blogs"
        :timestamp="blog.created"
        :key="index">
        <el-card>
          <el-button
            @click="entryBlog(selectedTopic.name, blog.key)" type="text">{{blog.title}}</el-button>
          <div>
            <i class="el-icon-price-tag"></i>
            <span>{{blog.tags.split(',').join(', ')}}</span>
            <i class="el-icon-view"></i>
            <span>{{blog.star}}</span>
          </div>
          <p>{{blog.abstract}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
import BlogContent from './blog-content'

export default {
  name: 'blog-list',
  props: ['selectedTopic', 'isShowContent'],
  components: {
    BlogContent
  },
  data() {
    return {
      reverse: true
    }
  },
  methods: {
    entryBlog (topic_name, blog_key) {
      this.isShowContent = true
      this.contentInfo = { topic_name, blog_key }
      // this.$notify({
      //   title: 'It works!',
      //   type: 'success',
      //   message: `选择了${blog_key}`,
      //   duration: 5000
      // })
    }
  }
}
</script>

<style>
.el-timeline {
  border-right-color: #ffffff;
}
.el-timeline-item {
  border-right-color: #ffffff;
  color: #333;
  text-align:left;
  width: 70%;
}
.el-card {
  height: 140px;
}
/* 标题 */
.el-button--text {
  font-size: 14pt;
  color: #606266;
  background-color: #ffffff;
  text-align: left;
}
.el-button--text:hover {
  font-size: 14pt;
  color: #606266;
  background-color: #ffffff;
  text-align: left;
}
/* 标题左边图标 */
.el-icon-edit:before {
  font-size: 20px;
}
.el-timeline-item__timestamp {
  color: #909399;
  line-height: 1;
  font-size: 15px;
}
/* 摘要 */
.el-card {
  background-color: #FFF;
  color: #909399;
  transition: .3s;
}
/* tag左边的图标 */
.el-icon-price-tag:before {
  font-size: 16px;
}
/* tag 右边的图标 */
.el-icon-view:before {
  margin-left: 20px;
  text-align: end;
  font-size: 16px;
}
</style>>
