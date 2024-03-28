<template>
  <view>
    <div class="banner">
      <img src="@/static/images/common/cover.jpg" alt="封面图片">
    </div>
    <uni-form ref="form" :modalValue="queryParams">
      <view class="cu-form-group margin-top">
        <view class="title">账户</view>
        <input placeholder="请输入用户名" v-model="queryParams.username"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">密码</view>
        <input placeholder="请输入密码" v-model="queryParams.password" type="password"></input>
      </view>
      <view class="cu-form-group">
        <view class="title">身份</view>
        <picker @change="handlePickerRole" :range="roleList" range-key="name">
          <view class="picker">{{ queryParams.role }}</view>
        </picker>
      </view>

      <view class="padding flex flex-direction" @tap="handleLogin()">
        <button class="cu-btn bg-blue margin-tb-sm lg">登录</button>
      </view>
      <button class="cu-btn margin-tb-sm" @tap="handleRegister()">没有账号注册一个</button>
    </uni-form>

  </view>
</template>

<script>
import { login } from "@/api/module/auth"

export default {
  data() {
    return {
      queryParams: {
        username: '',
        password: '',
        roleId: 1,
        role: '用户',
      },
      roleList: [
        { id: 1, name: '用户' },
        { id: 2, name: '代取员' }
      ]
    }
  },
  methods: {
    handleRegister() {
      this.$tab.navigateTo("register/index")
    },
    // 选择状态
    handlePickerRole(e) {
      var index = e.detail.value
      this.queryParams.roleId = this.roleList[index].id
      this.queryParams.role = this.roleList[index].name
    },
    handleLogin() {
      if (this.queryParams.username.length == 0 || this.queryParams.password.length == 0) {
        return this.$modal.showToast('请输入用户名和密码')
      }

      login(this.queryParams).then(res => {
        if (res.code == 200) {
          //登陆成功后获取用户信息，放入storage
          uni.setStorage({
            key: 'userInfo',
            data: JSON.stringify(res.data),
            success: () => {
              this.$tab.switchTab("/pages/index/index")
            }
          })
        } else {
          this.$modal.showToast(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.banner {
  height: 400upx;
  overflow: hidden;
}

img {
  width: 100%;
}
</style>