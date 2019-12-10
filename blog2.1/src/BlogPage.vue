<template>
  <div class="block">
    <router-view></router-view>
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

</style>
