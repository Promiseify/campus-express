<template>
	<view :style="{ 'height': windowHeight }" style="width: 100%">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input placeholder="请输入用户名" v-model="user.loginName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入密码" v-model="user.password" type="password"></input>
			</view>

			<view class="cu-form-group ">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" v-model="user.userName"></input>
			</view>

			<view class="cu-form-group ">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" v-model="user.phonenumber"></input>
			</view>

			<view class="cu-form-group ">
				<view class="title">身份证</view>
				<input placeholder="请输入身份证" v-model="user.idcardno"></input>
			</view>

			<view class="cu-form-group ">
				<view class="title">邮箱</view>
				<input placeholder="请输入邮箱" v-model="user.email"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">身份</view>
				<picker @change="pickerRole" :range="user.roleList" range-key="name">
					<view class="picker">{{ user.roleName }}</view>
				</picker>
			</view>

			<view class="padding flex flex-direction" @tap="register()">
				<button class="cu-btn bg-red margin-tb-sm lg">注册</button>
			</view>

			<button class="cu-btn  margin-tb-sm" @tap="tologin()">已有账号直接登录</button>

		</form>

	</view>
</template>

<script>
export default {
	data() {
		return {
			windowHeight: "200px",
			msg: '',
			bgurl: '',
			user: {
				roleName: '用户',
				roleId: 116,
				roleList: [
					{ id: 116, name: '用户' },
					{ id: 117, name: '跑腿员' }
				],
			}
		}
	},
	onLoad() {
	},
	methods: {
		pickerRole(e) {
			var index = e.detail.value
			this.user.roleId = this.user.roleList[index].id
			this.user.roleName = this.user.roleList[index].name
		},
		tologin() {
			uni.navigateTo({
				url: "../index"
			})
		},

		register: function () {
			if (this.user.loginName.length == 0 || this.user.password.length == 0) {
				this.vusui.alert('请输入用户名和密码')
				return false;
			}
			this.http.post('/openapi/system/register', {
				loginName: this.user.loginName,
				userName: this.user.userName,
				password: this.user.password,
				email: this.user.email,
				roleId: this.user.roleId,
				idcardno: this.user.idcardno,
				phonenumber: this.user.phonenumber,
			}).then((res) => {
				if (res.code != 0) {
					this.vusui.alert(res.msg)
					return false;
				}
				uni.navigateTo({
					url: "../index"
				})
			})
		}
	}
}
</script>

<style scoped>
.bgImgCover {
	width: 100%;
	height: 414upx;
	background-size: 100% 100% !important;
}
</style>