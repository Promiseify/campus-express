<template>
	<view class="list">
		<view class="tabs">
			<u-tabs :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>
		</view>
		<view class="data-list">
			<view class="data-item" v-for="(item, index) in dataList">
				<view class="avatar">
					<img class="avator" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;"
						src="@/static/logo.png" alt="">
				</view>
				<view class="content">
					<view class="type">类型：{{ getTypes(item.orderType) }}</view>
					<view class="address">发布人地址：{{ item.orderAddress }}</view>
					<view class="place">快递点：{{ item.orderPlace }}</view>
					<view class="remark">备注：{{ item.remark }}</view>
					<view class="footer">
						<view class="footer-item price">
							<u-tag :text="'￥' + item.orderPrice" shape="circle" mode="dark" type="success" />
						</view>
						<view class="footer-item status">
							<u-tag :text="getStatus(item.orderStatus)" shape="circle" mode="dark" type="primary" />
						</view>
						<view class="footer-item review">
							<u-tag :text="item.review" shape="circle" mode="dark" type="error" />
						</view>
					</view>
				</view>
				<view class="control">
					<template v-if="item.orderStatus == 1">
						<u-button type="warning" size="mini" shape="circle" @tap="receive(item)">接取订单</u-button>
					</template>
					<template v-if="item.orderStatus == 2">
						<u-button type="warning" size="mini" shape="circle" @tap="cancel(item)">取消订单</u-button>
					</template>
				</view>
				<template v-if="item.orderStatus == 2">
					<view class="control-footer">
						<button type="primary" size="mini" shape="circle" @click="delivery(item)">送达</button>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
import { getOrders, updateOrderById } from "@/api/module/order"
import { increaseWallet } from "@/api/module/wallet"

export default {
	data() {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"))
		return {
			list: [{
				name: '全部'
			}, {
				name: '已接单'
			}, {
				name: '已完成'
			}],
			current: 0, // tabs组件的current值，表示当前活动的tab选项
			dataList: [],
			userInfo
		}
	},
	created() {
	},
	onShow() {
		this.getAllOrders({
			orderStatus: 1
		})
	},
	methods: {
		change({ index }) {
			this.current = index;
			this.getAllOrders({
				orderManId: index == 0 ? undefined : this.userInfo.userId,
				orderStatus: index == 0 ? 1 : index + 1
			})
		},
		// 列表
		getAllOrders(data) {
			getOrders({ ...data, review: "审核通过" }).then(res => {
				this.dataList = res.data
			})
		},
		getStatus(status) {
			switch (status) {
				case 1:
					return "待接单"
				case 2:
					return "派送中"
				case 3:
					return "派送完成"
				default:
					break;
			}
		},
		getTypes(type) {
			switch (type) {
				case 1:
					return "外卖"
				case 2:
					return "快递"
				case 3:
					return "药品"
				default:
					break;
			}
		},
		// 接单
		receive(item) {
			this.$modal.confirm("您确定要接取订单吗？").then(() => {
				updateOrderById({
					orderId: item.orderId,
					orderManId: this.userInfo.userId,
					orderStatus: 2
				}).then(res => {
					if (res.code == 200) {
						this.$modal.showToast("接取成功，请按照规定时间送达！")
						setTimeout(() => {
							this.getAllOrders({
								orderManId: this.current == 0 ? undefined : this.userInfo.userId,
								orderStatus: this.current == 0 ? 1 : this.current + 1
							})
						}, 1000);
					}
				})
			})
		},
		cancel(id) {
			updateOrderById({
				orderId: item.orderId,
				orderManId: null,
				orderStatus: 1
			}).then(res => {
				if (res.code == 200) {
					this.$modal.showToast("取消成功！")
					setTimeout(() => {
						this.getAllOrders({
							orderManId: this.current == 0 ? undefined : this.userInfo.userId,
							orderStatus: this.current == 0 ? 1 : this.current + 1
						})
					}, 1000);
				}
			})
		},
		delivery(item) {
			updateOrderById({
				orderId: item.orderId,
				orderStatus: 3
			}).then(res => {
				if (res.code == 200) {
					this.$modal.showToast("送达成功")
					// 钱包金额增长
					increaseWallet({
						userId: this.userInfo.userId,
						amount: item.orderPrice
					})

					setTimeout(() => {
						this.getAllOrders({
							orderManId: this.current == 0 ? undefined : this.userInfo.userId,
							orderStatus: this.current == 0 ? 1 : this.current + 1
						})
					}, 1000);
				}
			})
		}
	}
}
</script>

<style lang="scss">
.tabs {
	background-color: #fff;
}

.list {
	height: 100%;
	width: 100vw;
	background-color: #dddddd;
}

.data-list .data-item {
	position: relative;
	display: flex;
	margin: 10px;
	padding: 10px;
	padding-bottom: 20px;
	border-radius: 15px;
	background-color: #fff;
}

.data-item .content {
	flex: 1;
}

.content>view {
	margin: 3px 0;
}

.content .footer {
	display: flex;
	flex-direction: row-reverse;
	margin-top: 8px;
}

.footer .footer-item {
	flex: 1;
	text-align: center;
	margin: 0 3px;
}

.data-item .control {
	position: absolute;
	right: 20px;
}

.data-item .control-footer {
	position: absolute;
	top: 40px;
	right: 18px;
}

.control-footer>button {
	border-radius: 25px;
}
</style>
