<template>
  <view class="wrapper">
    <form>
      <view class="cu-form-group margin-top">
        <view class="title">账户</view>
        <input placeholder="请输入用户名" v-model="username"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">密码</view>
        <input placeholder="请输入密码" v-model="password" type="password"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">身份</view>
        <picker @change="pickerRole" :range="roleList" range-key="name">
          <view class="picker">{{ roleName }}</view>
        </picker>
      </view>

      <view class="padding flex flex-direction" @tap="login()">
        <button class="cu-btn bg-red margin-tb-sm lg">登录</button>
      </view>


      <button class="cu-btn  margin-tb-sm" @tap="toregister()">没有账号注册一个</button>
    </form>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "admin123",
      },
    }
  },
  methods: {
    handleLogin() {
      uni.reLaunch({
        url: '/pages/home/index'
      });
    }
  }
}
</script>
<style>
page {
  height: 100%;
  width: 100%;
}
</style>
<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-color: #f1f1f1;
}

.content {
  height: 30vh;
}
</style>
