<template>
  <view :style="{ 'height': windowHeight }" style="width: 100%">
    <div class="bgImgCover">
      <img src="@/static/images/common/cover.jpg" alt="">
    </div>
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
      windowHeight: "200px",
      msg: '',
      username: '',
      password: '',
      roleName: '用户',
      roleId: '116',
      roleList: [
        { id: 116, name: '用户' },
        { id: 117, name: '跑腿员' }
      ],
      bgurl: ''
    }
  },
  methods: {
    toregister() {
      uni.navigateTo({
        url: 'register/index'
      })
    },
    // 选择状态
    pickerRole(e) {
      var index = e.detail.value
      this.roleId = this.roleList[index].id
      this.roleName = this.roleList[index].name
    },
    login: function () {
      var that = this
      if (this.username.length == 0 || this.password.length == 0) {
        this.vusui.alert('请输入用户名和密码')
        return false;
      }
      this.http.post('/openapi/system/loginNocode', {
        username: this.username,
        password: this.password,
        roleId: this.roleId
      }).then((res) => {

        if (res.code != 0) {
          this.vusui.alert(res.msg)
          return false;
        }
        //登陆成功后获取用户信息，放入storage
        uni.setStorageSync('token', res.data.userId)
        uni.setStorageSync('userId', res.data.userId)
        uni.setStorageSync('roleId', that.roleId)
        uni.setStorageSync('deptId', res.data.dept.deptId)
        uni.setStorageSync('deptName', res.data.dept.deptName)
        uni.setStorageSync('userName', res.data.userName)
        uni.setStorageSync('phonenumber', res.data.phonenumber)
        uni.setStorageSync('avatar', res.data.avatar)
        uni.switchTab({
          url: "../index/index"
        })
      })
    }
  }
}
</script>

<style scoped>
.bgImgCover {
  height: 400upx;
  overflow: hidden;

  img {
    width: 100%;
  }
}
</style>