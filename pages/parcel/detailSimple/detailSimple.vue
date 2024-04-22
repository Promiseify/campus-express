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
export default {
	data() {
		const userInfo = uni.getStorageSync("userInfo")
		return {
			userInfo: JSON.parse(userInfo),
			obj: {
				username: '',
				address: '',
				phone: '',
				// pty: {},
				// address: {
				// 	content: "宿舍楼一号",
				// 	phone: "1821773009"
				// },
				// id: '',
				// num: 123456,
				// place: "东门",
				// code: 1234556,
				// remark: "有些重",
				// fbsj: "2024-03-10",
				// weight: "30kg",
				// money: 100
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
			updateOrderById({
				orderId: this.obj.id,
				orderManId: this.userInfo.userId,
				orderStatus: 2
			}).then(res => {
				if (res.code == 200) {
					this.$modal.showToast("接取成功，请按照规定时间送达！")
					increaseWallet({
						userId: this.userInfo.userId,
						amount: this.obj.money
					}).then(res => {
						if (res.code == 200) {
							setTimeout(() => {
								this.$tab.switchTab("/pages/index/index")
							}, 1000);
						}
					})
				}
			})
		}
	}
}
</script>