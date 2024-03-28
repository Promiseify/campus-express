<template>
	<view>
		<view class="content">
			<form>
				<view class="cu-form-group">
					<view class="title">送货地址</view>
					<input v-model="order.orderAddress"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">取货地点</view>
					<input v-model="order.orderPlace"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">收货时间</view>
					<input v-model="order.orderTime"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">价格</view>
					<input v-model="order.orderPrice"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">备注说明</view>
					<input v-model="order.orderRemark"></input>
				</view>
				<view class="grid col-1 padding-sm bg-white margin-top" @tap="handleIssue">
					<view class="margin-tb-sm text-center">
						<button class="cu-btn bg-blue lg">发布</button>
					</view>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
import { issueOrder } from "@/api/module/order";

export default {
	data() {
		const userInfo = uni.getStorageSync("userInfo")
		return {
			userInfo: userInfo,
			order: {
				orderAddress: undefined,
				orderPlace: undefined,
				orderTime: undefined,
				orderPrice: undefined,
				orderRemark: undefined,
				// 订单类型
				orderType: undefined,
				// 订单状态
				orderStatus: undefined,
				orderUserId: JSON.parse(userInfo)?.userId
			}
		}
	},
	methods: {
		reset() {
			this.order = {
				orderAddress: undefined,
				orderPlace: undefined,
				orderTime: undefined,
				orderPrice: undefined,
				orderRemark: undefined,
				// 订单类型
				orderType: undefined,
				// 订单状态
				orderStatus: undefined,
				orderUserId: this.userInfo?.userId
			}
		},
		handleIssue() {
			this.order.orderType = 2;
			this.order.orderStatus = 1;
			issueOrder(this.order).then(res => {
				if (res.code == 200) {
					this.$modal.msgSuccess(res.msg)
					setTimeout(() => {
						this.reset()
						this.$tab.switchTab("/pages/index/index")
					}, 1000);
				}
			})
		}
	}
}
</script>