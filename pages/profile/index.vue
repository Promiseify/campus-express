<template>
  <view>
    <view class="cu-list menu">

      <view class="cu-item arrow" @tap="toUpdateAvatar(userInfo.avatar)">
        <view class="content">头像</view>
        <view class="action">
          <img class="avator" style="border-radius: 50%; width: 50px; height: 50px;" src="@/static/logo.png" alt="">
        </view>
      </view>

      <view class="cu-item">
        <view class="content">登录名</view>
        <text>{{ userInfo.loginName }}</text>
      </view>

      <view class="cu-item">
        <view class="content">身份证</view>
        <text>{{ userInfo.idcardno }}</text>
      </view>

      <view class="cu-item arrow" @tap="toUpdateUserName(userInfo.userName)">
        <view class="content">姓名</view>
        <text>{{ userInfo.userName }}</text>
      </view>

      <view class="cu-item arrow" @tap="toUpdatePhone(userInfo.phonenumber)">
        <view class="content">手机号</view>
        <view>{{ userInfo.phonenumber }}</view>
      </view>

      <view class="cu-item arrow" @tap="toUpdateEmail(userInfo.email)">
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
        loginName: "小明",
        idcardno: '37001929912031291203',
        userName: "Promiseify",
        phonenumber: '18028130891',
        email: '18288329@qq.com'
      }

    }
  },
  created() {
    // this.initObject()
  },
  methods: {
    // 初始化个人信息
    initObject() {

    },

    // 修改姓名
    toUpdateUserName(userName) {
      uni.navigateTo({
        url: 'update/updateUserName?userName=' + userName
      })
    },

    // 进入修改手机页面
    toUpdatePhone(phonenumber) {
      uni.navigateTo({
        url: 'update/updatePhone?phonenumber=' + phonenumber
      })
    },
    // 进入修改邮箱页面
    toUpdateEmail(email) {
      uni.navigateTo({
        url: 'update/updateEmail?email=' + email
      })
    },
    // 进入修改头像
    toUpdateAvatar(avatar) {
      uni.navigateTo({
        url: 'update/updateAvatar?avatar=' + avatar
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
