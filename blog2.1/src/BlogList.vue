<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item timestamp="2018/4/12" placement="top">
        <el-card>
          <h4>更新 Github 模板 {{$route.params.topic}}</h4>
          <p>王小虎 提交于 2018/4/12 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>更新 Github 模板</h4>
          <p>王小虎 提交于 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log('======>>> ', this.$route.params.topic)
  }
}
</script>

<style>
.el-timeline {
  width: 300px;
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
</style>