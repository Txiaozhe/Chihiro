<template>
  <div class="div-blog-list">
    <blog-content v-if="isShowContent" v-bind:content-info="contentInfo"></blog-content>
    <el-timeline v-else>
      <el-timeline-item
        placement="top"
        v-for="(blog, index) in selectedTopic.blogs"
        :timestamp="blog.created"
        :key="index">
        <el-card>
          <el-button
            @click="entryBlog(selectedTopic.name, blog)" type="text">{{blog.title}}</el-button>
          <div>
            <i class="el-icon-price-tag"></i>
            <span>{{blog.tags}}</span>
            <i class="el-icon-view"></i>
            <span>{{blog.star}}</span>
          </div>
          <p>{{blog.abstract}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-footer>
      <span class="footer">Powered By <a href="https://github.com/Txiaozhe">Txiaozhe</a></span>
      <span class="footer"> © 2017 ♥ Tang Xiaoji </span>
      <blog-reward></blog-reward>
    </el-footer>
  </div>
</template>

<script>
import BlogContent from './blog-content'
import BlogAuthor from './blog-author'
import BlogReward from './blog-reward'

export default {
  name: 'blog-list',
  props: ['selectedTopic', 'isShowContent'],
  components: {
    BlogContent,
    BlogAuthor,
    BlogReward
  },
  data() {
    return {
      reverse: true
    }
  },
  methods: {
    entryBlog (topic_name, blog) {
      this.isShowContent = true
      this.contentInfo = { topic_name, blog }
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
}
.el-card__body {
  height: 140;
  padding: 20px;
  width: 600px;
}
/* 标题 */
.el-button--text {
  font-size: 13pt;
  font-weight: bold;
  color: #606266;
  background-color: #ffffff;
  text-align: left;
}
.el-button--text:hover {
  font-size: 13pt;
  font-weight: bold;
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
  font-size: 9pt;
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
.footer {
  height: 22px;
  font-size: 10pt;
  display: block;
  text-align: center;
  color: #909399;
}
.el-footer {
  margin-top: 50px;
  margin-bottom: 90px;
}
</style>>
