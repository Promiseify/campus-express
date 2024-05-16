<template>
  <view class="wrapper">
    <view class="content">
      <view class="text">
        <u--textarea v-model="content" placeholder="请输入留言内容"></u--textarea>
      </view>
      <button class="button" size="default" type="primary" @click="handleIssue">留言反馈</button>
    </view>
  </view>
</template>

<script>
import { createFeedback } from "@/api/module/feedback"
export default {
  data() {
    const userInfo = JSON.parse(uni.getStorageSync("userInfo"))
    return {
      content: '',
      userInfo
    }
  },
  methods: {
    formatDateTime(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second = date.getSeconds();
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    handleIssue() {
      if (!this.content) {
        return this.$modal.showToast("请输入要反馈的内容")
      }

      this.$modal.loading("发表中...")
      this.$modal.hideLoading()

      createFeedback({
        userId: this.userInfo.userId,
        feedbackContent: this.content,
        feedbackStatus: "待处理",
        feedbackType: 1,
        feedbackTime: this.formatDateTime(new Date())
      }).then(res => {
        if (res.code == 200) {
          this.$modal.showToast("发表成功！")

          setTimeout(() => {
            this.$tab.switchTab("/pages/index/index")
          }, 1000);
        }
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.content {
  margin: 10px 20px;
}

.content .text {
  margin-bottom: 20px;
  overflow: hidden;
}
</style>
