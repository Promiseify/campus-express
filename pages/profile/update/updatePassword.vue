<template>
	<view>
		<uni-forms ref="form" :value="user">
			<view class="cu-form-group">
				<view class="title">旧密码</view>
				<input placeholder="请输入旧密码" v-model="user.oldPassword"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">新密码</view>
				<input placeholder="请输入新密码" v-model="user.newPassword"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">确认密码</view>
				<input placeholder="请确认密码" v-model="user.confirmPassword"></input>
			</view>
			<view class="grid col-1 padding-sm bg-white margin-top" @tap="update">
				<view class="margin-tb-sm text-center">
					<button class="cu-btn bg-blue lg">保存</button>
				</view>
			</view>
		</uni-forms>


	</view>
</template>

<script>
import { getUserById, updateUserById } from "@/api/module/profile"

export default {
	data() {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"))

		return {
			user: {
				userId: userInfo.userId,
				oldPassword: undefined,
				newPassword: undefined,
				confirmPassword: undefined,
				userInfo
			},
			rules: {
				oldPassword: {
					rules: [{
						required: true,
						errorMessage: '旧密码不能为空'
					}]
				},
				newPassword: {
					rules: [{
						required: true,
						errorMessage: '新密码不能为空',
					},
					{
						minLength: 6,
						maxLength: 20,
						errorMessage: '长度在 6 到 20 个字符'
					}
					]
				},
				confirmPassword: {
					rules: [{
						required: true,
						errorMessage: '确认密码不能为空'
					}, {
						validateFunction: (rule, value, data) => data.newPassword === value,
						errorMessage: '两次输入的密码不一致'
					}
					]
				}
			}
		}
	},

	methods: {
		// 修改
		update() {
			if (!this.user.oldPassword) {
				return this.$modal.showToast("旧密码不能为空！")
			}
			if (!this.user.newPassword) {
				return this.$modal.showToast("新密码不能为空！")
			}
			if (!this.user.confirmPassword) {
				return this.$modal.showToast("请确认新密码！")
			}
			// 校验输入的旧密码是否相同
			getUserById(this.user.userId).then(res => {
				if (this.user.oldPassword !== res.data.password) {
					this.$modal.showToast("旧密码错误！")
					throw new Error();
				}
			}).catch(error => {
				console.log(error);
				// 在这里处理错误
			});
			if (this.user.newPassword !== this.user.confirmPassword) {
				return this.$modal.showToast("两次密码输入的不一致！")
			}
			this.$modal.loading("修改中...")
			this.$modal.hideLoading()
			updateUserById({
				userId: this.user.userId,
				password: this.user.newPassword
			}).then(res => {
				this.$modal.msgSuccess(res.msg)
			})
		}
	}
}
</script>