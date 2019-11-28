<template>
  <div class="block">
    <el-tabs :tab-position="tabPosition" @tab-click="selectTopic">
      <el-tab-pane
        v-for="(topic, index) in topics"
        :key="index"
        :label="topic.name">
        <span slot="label">{{topic.name}} <i :class="topic.icon"></i></span>
        <blog-list v-bind:selected-topic="selectedTopic" v-bind:is-show-content="isShowContent"></blog-list>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import BlogList from './blog-list'

export default {
  name: 'blog-topic',
  components: {
    BlogList
  },
  data() {
    return {
      tabPosition: 'left',
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
  margin-top: 150px;
}
.el-tabs {
  border-right-color: #ff0000;
  background-color: #ffffff;
  width: 1000px;
  margin-left: 200px;
}
.el-tab-pane {
  border-right-color: #ff0000;
  width: 1000px;
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
.el-tabs__item.is-active.is-left {
  font-size: 14pt;
  color: #606266;
  background-color: #ffffff;
}
.el-tabs__active-bar {
  background-color: #909399;
}
.el-tabs--left .el-tabs__active-bar.is-left {
  background-color: #606266;
}

</style>>
