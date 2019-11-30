<template>
  <div class="block">
    <el-container direction="horizontal">
      <blog-list v-bind:selected-topic="selectedTopic" v-bind:is-show-content="isShowContent"></blog-list>
      
      <el-container direction="vertical">
        <blog-author></blog-author>
        <el-tabs :tab-position="tabPosition" @tab-click="selectTopic">
          <el-tab-pane
            v-for="(topic, index) in topics"
            :key="index"
            :label="topic.name">
            <span slot="label"><i :class="topic.icon"></i>  {{topic.name}}</span>
          </el-tab-pane>
        </el-tabs>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BlogList from './blog-list'
import BlogAuthor from './blog-author'

export default {
  name: 'blog-topic',
  components: {
    BlogList,
    BlogAuthor
  },
  data() {
    return {
      tabPosition: 'right',
      topics: [],
      selectedTopic: {
        name: 'home'
      },
      isShowContent: false
    }
  },
  methods: {
    selectTopic(tab, event) {
      this.isShowContent = false
      fetch(`./blogs/${tab.label}/index.json`).then(res => {
        return res.json()
      }).then(blogs => {
        this.selectedTopic = {
          name: tab.label,
          blogs
        }
      })
    }
  },
  beforeMount () {
    fetch('./blogs/index.json').then(res => {
      return res.json()
    }).then(topics => {
      console.log('fetch topics ====>> ', topics)
      this.topics = topics
      return fetch(`./blogs/${this.selectedTopic.name}/index.json`)
    }).then(res => {
      return res.json()
    }).then(blogs => {
      this.selectedTopic = {
        name: this.selectedTopic.name,
        blogs
      }
    })
  }
}
</script>

<style>
.el-container {
  background-color: #ffffff;
  margin-top: 30px;
  margin-left: 30px;
}
.el-tabs {
  background-color: #ffffff;
  height: 200px;
  margin-top: 10px;
  margin-left: 10px;
}
.el-tab-pane {
  background-color: #ffffff;
}
.el-tabs__item {
  font-size: 14pt;
  color: #909399;
  background-color: #ffffff;
}
.el-tabs__item:hover {
  font-size: 14pt;
  color: #909399;
  background-color: #ffffff;
}
.el-tabs__item.is-active.is-right {
  font-size: 14pt;
  color: #606266;
  background-color: #ffffff;
}
.el-tabs__active-bar {
  background-color: #ffffff;
}
.el-tabs__active-bar.is-right {
  background-color: #ffffff;
}
.el-tabs--right .el-tabs__active-bar.is-right {
  background-color: #ffffff;
}

</style>>
