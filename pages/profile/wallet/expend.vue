<template>
	<view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(item, index) in dataList" :key="index">
				<img class="avator" style="position: absolute; left: 10px; width: 50px; height: 50px;" src="@/static/logo.png" alt="">
				<view class="content">
					<view class="text-grey">{{ item.orderAddress }}</view>
					<view class="text-gray text-sm">
						{{ item.orderTime }}
					</view>
				</view>

				<view class="action price">
					<view class="cu-tag round bg-red lg">-￥{{ item.orderPrice }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getOrders } from "@/api/module/order"

export default {
	data() {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"))

		return {
			dataList: [],
			userInfo
		}
	},
	onShow() {
		this.getAllOrders({
			orderUserId: this.userInfo.userId
		})
	},
	methods: {
		getAllOrders(data) {
			getOrders(data).then(res => {
				this.dataList = res.data
			})
		}
	}
}
</script>

<style lang="scss">
.cu-item {
	margin: 8px;
	border-radius: 15px;
}
</style>
