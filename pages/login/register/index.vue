<template>
	<view style="width: 100%">
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input placeholder="请输入用户名" v-model="user.username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入密码" v-model="user.password" type="password"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">手机号</view>
				<input placeholder="请输入手机号" v-model="user.phone"></input>
			</view>

			<view class="cu-form-group ">
				<view class="title">学生证</view>
				<input placeholder="请输入学生证" v-model="user.studentNumber"></input>
			</view>

			<view class="cu-form-group ">
				<view class="title">邮箱</view>
				<input placeholder="请输入邮箱" v-model="user.email"></input>
			</view>

			<view class="cu-form-group">
				<view class="title">身份</view>
				<picker @change="handlePickerRole" :range="roleList" range-key="name">
					<view class="picker">{{ user.role }}</view>
				</picker>
			</view>
			<view class="padding flex flex-direction" @tap="handleRegister()">
				<button class="cu-btn bg-red margin-tb-sm lg">注册</button>
			</view>

			<button class="cu-btn  margin-tb-sm" @tap="tologin()">已有账号直接登录</button>

		</form>

	</view>
</template>

<script>
import { register } from "@/api/module/auth"
export default {
	data() {
		return {
			user: {
				username: '',
				password: '',
				roleId: 1,
				role: '用户',
				phone: undefined,
				email: undefined,
				studentNumber: undefined
			},
			roleList: [
				{ id: 1, name: '用户' },
				{ id: 2, name: '代取员' }
			]
		}
	},
	methods: {
		// 选择角色
		handlePickerRole(e) {
			var index = e.detail.value
			this.user.roleId = this.roleList[index].id
			this.user.role = this.roleList[index].name
		},

		tologin() {
			uni.navigateTo({
				url: "../index"
			})
		},

		handleRegister: function () {
			if (!this.user.username) {
				return this.$modal.showToast('请输入用户名')
			}

			if (!this.user.password) {
				return this.$modal.showToast('请输入密码')
			}

			if (!this.user.phone) {
				return this.$modal.showToast('请输入电话')
			}

			if (!this.user.email) {
				return this.$modal.showToast('请输入邮箱')
			}

			if (!this.user.studentNumber) {
				return this.$modal.showToast('请输入学生证')
			}

			register(this.user).then(res => {
				if (res.code == 200) {
					this.$modal.msgSuccess(res.msg)
					setTimeout(() => {
						this.$tab.navigateTo("../index")
					}, 1000);
				} else {
					this.$modal.showToast(res.msg)
				}
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