<template>
  <view>
    <view class="cu-list menu">

      <view class="cu-item arrow" @tap="toUpdateAvatar(userInfo.avatar)">
        <view class="content">头像</view>
        <view class="action">
          <img class="avator" style="border-radius: 50%; width: 50px; height: 50px;" src="@/static/logo.png" alt="">
        </view>
      </view>

      <!-- <view class="cu-item">
        <view class="content">登录名</view>
        <text>{{ userInfo.loginName }}</text>
      </view> -->

      <!-- <view class="cu-item">
        <view class="content">身份证</view>
        <text>{{ userInfo.idcardno }}</text>
      </view> -->

      <view class="cu-item arrow" @tap="toUpdateUserName()">
        <view class="content">用户名</view>
        <text>{{ userInfo.userName }}</text>
      </view>

      <view class="cu-item arrow" @tap="toUpdatePhone()">
        <view class="content">手机号</view>
        <view>{{ userInfo.phonenumber }}</view>
      </view>

      <view class="cu-item arrow" @tap="toUpdateEmail()">
        <view class="content">邮箱</view>
        <view>{{ userInfo.email }}</view>
      </view>

    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        loginName: '',
        userName: '',
        phonenumber:'',
        email: ''
      }

    }
  },
  onShow() {
    const userInfo = JSON.parse(uni.getStorageSync("userInfo"))
    this.userInfo.loginName = userInfo.username
    this.userInfo.userName = userInfo.username
    this.userInfo.phonenumber = userInfo.phone
    this.userInfo.email = userInfo.phone + "@qq.com"
  },
  methods: {
    // 初始化个人信息
    initObject() {

    },

    // 修改姓名
    toUpdateUserName() {
      uni.navigateTo({
        url: 'update/updateUserName'
      })
    },

    // 进入修改手机页面
    toUpdatePhone() {
      uni.navigateTo({
        url: 'update/updatePhone'
      })
    },
    // 进入修改邮箱页面
    toUpdateEmail() {
      uni.navigateTo({
        url: 'update/updateEmail'
      })
    },
    // 进入修改头像
    toUpdateAvatar() {
      uni.navigateTo({
        url: 'update/updateAvatar'
      })
    }
  }
}
</script>

<style scoped>
template {
  font-size: xx-large;
}
</style>
