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
					<u-button type="warning" size="mini" shape="circle" @tap="cancel(item.orderId)">取消订单</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getOrders, deleteOrderById } from "@/api/module/order"

export default {

	data() {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"))
		return {
			list: [{
				name: '全部'
			}, {
				name: '待接单'
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
			orderUserId: this.userInfo.userId
		})
	},
	methods: {
		change({ index }) {
			this.current = index;
			this.getAllOrders({
				orderUserId: this.userInfo.userId,
				orderStatus: index == 0 ? undefined : index
			})
		},
		// 列表
		getAllOrders(data) {
			getOrders(data).then(res => {
				console.log(res);
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
		// detail(id, status) {
		// 	if (status == 0 || status == 4) {
		// 		uni.navigateTo({
		// 			url: '../detailSimple/detailSimple?id=' + id
		// 		})
		// 	} else {
		// 		uni.navigateTo({
		// 			url: '../detailComplex/detailComplex?id=' + id
		// 		})
		// 	}
		// },
		// 取消
		cancel(id) {
			this.$modal.confirm("您是否要取消该订单？").then(res => {
				deleteOrderById(id).then(res => {
					if (res.code == 200) {
						this.$modal.msgSuccess(res.msg)

						setTimeout(() => {
							this.getAllOrders({
								orderUserId: this.userInfo.userId,
								orderStatus: this.current == 0 ? undefined : this.current
							})
						}, 1000);
					}
				})
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
</style>
