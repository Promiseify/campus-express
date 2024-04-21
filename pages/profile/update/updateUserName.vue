<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" v-model="username"></input>
			</view>
			<view class="grid col-1 padding-sm bg-white margin-top" @tap="update">
				<view class="margin-tb-sm text-center">
					<button class="cu-btn bg-blue lg">保存</button>
				</view>
			</view>
		</form>


	</view>
</template>

<script>
import { updateUserById } from "@/api/module/profile"

export default {
	data() {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"))

		return {
			username: userInfo.username,
			userId: userInfo.userId,
			userInfo
		}
	},
	methods: {
		// 修改
		update() {

			this.$modal.loading("修改中...")
			this.$modal.hideLoading()
			updateUserById({
				userId: this.userId,
				username: this.username
			}).then(res => {
				this.$modal.msgSuccess(res.msg)
				uni.setStorageSync("userInfo", JSON.stringify({
					...this.userInfo,
					username: this.username
				}));
			})
		}
	}
}
</script>