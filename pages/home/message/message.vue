<template>
  <view class="list">
    <view class="data-list">
      <view class="data-item" v-for="(item, index) in dataList">
        <view class="avatar">
          <img class="avator" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;"
            src="@/static/logo.png" alt="">
        </view>
        <view class="content">
          <view class="address">反馈时间：{{ parseTime(item.handingTime) }}</view>
          <view class="place">反馈内容：{{ item.feedbackContent }}</view>
          <view class="footer">
            <!-- <view class="footer-item price">
              <u-tag :text="'￥' + item.orderPrice" shape="circle" mode="dark" type="success" />
            </view> -->
            <view class="footer-item review">
              <u-tag :text="item.feedbackStatus" shape="circle" mode="dark" :type="item.feedbackStatus == '待处理' ? 'error' : 'success'" />
            </view>
          </view>
        </view>
        <view class="control" v-if="item.feedbackStatus == '待处理'">
          <u-button type="warning" size="mini" shape="circle" @tap="cancel(item.feedbackId)">取消反馈</u-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getFeedbackById, deleteFeedback } from "@/api/module/feedback"

export default {
  data() {
    const userInfo = JSON.parse(uni.getStorageSync("userInfo"))
    return {
      dataList: [],
      userInfo
    }
  },
  onShow() {
    this.getList()
  },
  methods: {
    getList() {
      getFeedbackById(this.userInfo.userId).then(res => {
        this.dataList = res.data
      })
    },
    // 处理时间
    parseTime(time) {
      if (!time) {
        return ''
      }
      return time.substring(0, 10)
    },
    cancel(id) {
      this.$modal.confirm("你确定要取消反馈吗？").then(() => {
        deleteFeedback(id).then(res => {
          if (res.code == 200) {
            this.$modal.showToast("取消成功！")
            setTimeout(() => {
              this.getList()
            }, 1000);
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.list {
  height: 100vh;
  width: 100vw;
  background-color: #dddddd;
}

.data-list .data-item {
  position: relative;
  display: flex;
  margin: 10px;
  padding: 10px;
  border-radius: 15px;
  background-color: #fff;
}

.data-item .content {
  flex: 1;
}

.content>view {
  margin: 3px 0;
}

.content .footer {
  display: flex;
  flex-direction: row;
  margin-top: 8px;
}

.footer .footer-item {

  text-align: center;
  margin: 0 3px;
}

.data-item .control {
  position: absolute;
  right: 20px;
}
</style>
