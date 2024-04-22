<template>
	<view>
		<view class="content">

			<form>
				<view class="cu-form-group">
					<view class="title">发 布 人</view>
					<input v-model="obj.username"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">订 单 号</view>
					<input v-model="obj.num"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">取货地点</view>
					<input v-model="obj.place"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">快递单号</view>
					<input v-model="obj.code"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">备注说明</view>
					<input v-model="obj.remark"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">发布时间</view>
					<input v-model="obj.fbsj"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">配送地址</view>
					<input v-model="obj.address"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">配送电话</view>
					<input v-model="obj.phone"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">价格</view>
					<input v-model="obj.money"></input>
				</view>
				<view class="padding flex flex-direction">
					<button @click="handleReceive" class="cu-btn bg-blue margin-tb-sm lg">接 取</button>
				</view>
			</form>

		</view>


	</view>
</template>

<script>
import { getOrders, updateOrderById } from "@/api/module/order"
import { increaseWallet } from "@/api/module/wallet"
import { getCourierById } from "@/api/module/courier"

export default {
	data() {
		const userInfo = uni.getStorageSync("userInfo")
		return {
			userInfo: JSON.parse(userInfo),
			obj: {
				username: '',
				address: '',
				phone: '',
			}
		}
	},
	created() {
		// 加载
		// this.loadObj()
	},
	onLoad(options) {
		this.obj.id = options.id
		this.getOrdersFn(options.id)
		this.obj.num = options.id
		this.obj.code = options.id
	},
	onShow() {
		// 获取快递员身份
		getCourierById({ userId: this.userInfo.userId }).then(res => {
			const info = res.data[0]
			this.courierId = info.courierId
			this.review = info.review
		})
	},
	methods: {
		getOrdersFn(orderId) {
			getOrders({ orderId: orderId }).then(res => {
				if (res.code == 200) {
					const data = res.data[0]
					this.obj.username = data.orderUserId
					this.obj.place = data.orderPlace
					this.obj.remark = data.orderRemark
					this.obj.fbsj = data.orderTime
					this.obj.address = data.orderAddress
					this.obj.money = data.orderPrice
					this.obj.status = data.orderStatus
					this.obj.userManId = data.orderManId
				}
			})
		},
		loadObj() {
			this.http.get('').then((res) => {
				if (res.code != 0) {
					this.vusui.alert(res.msg)
					return false
				}
				this.obj = res.data
			})
		},
		handleReceive() {
			if (this.review !== "审核通过") {
				return this.$modal.showToast("请先进行骑手认证审核！")
			}

			updateOrderById({
				orderId: this.obj.id,
				orderManId: this.userInfo.userId,
				orderStatus: 2
			}).then(res => {
				if (res.code == 200) {
					this.$modal.showToast("接取成功，请按照规定时间送达！")
					setTimeout(() => {
						this.$tab.switchTab("/pages/index/index")
					}, 1000);
				}
			})
		}
	}
}
</script>