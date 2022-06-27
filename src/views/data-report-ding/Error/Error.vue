<template>
  <div style="text-align: center; color: #ccc; padding: 40px 20px; user-select: none">
    <error-page style="width: 50%; height: auto"></error-page>
    <p style="font-size: 13px">{{msg}}</p>
    <div style="display: flex;justify-content: center">
      <!-- <span style="width: 50%; line-height: 30px; padding: 10px 0" @click="$router.push('/data-report-ding')">回到首页</span> -->
    </div>
  </div>
</template>

<script>
import ErrorPage from '@/assets/svg/error-page.svg'

export default {
  name: "Error",
  components: {
    ErrorPage
  },
  computed: {
    msg() {
      return this.$route.query.reason || '抱歉，出错了！'
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
