<template>
  <el-tabs tab-position="left" @tab-click="selectTopic">
    <el-tab-pane
      v-for="(topic, index) in topicList"
      :key="index">
      <span slot="label">
        <i :class="topic.icon"></i>  {{topic.name}}
      </span>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import BlogList from './BlogList'
  export default {
    data() {
      return {
        topicList: []
      }
    },
    methods: {
      selectTopic (tab, event) {
        this.$router.push(tab.label)
          .catch(e => console.log(e))
      }
    },
    mounted () {
      fetch(`./blogs/index.json`).then(res => {
        return res.json()
      }).then(topics => {
        this.topicList = topics
      })
    },
    watch: {
      "$route": () => {
        console.log('======>>>>>> ')
      }
    }
  };
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
  width: 100px;
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
</style>
