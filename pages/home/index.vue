<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<img class="avator" src="@/static/logo.png" alt="">
						<view class="phone-number">{{ username }}</view>
						<view class="item margin-top">
							<view class="text">余额：{{ currency }} {{ balance }}</view>
						</view>
						<view class="control">
							<button size="mini" type="warn" @click="handleRecharge">充值</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="cu-list menu" margin-top>
			<view class="cu-item arrow">
				<view class="content" @tap="toUserInfo()">
					<text class="cuIcon-profile text-blue bigsize"></text>
					<text class="text-grey">个人信息</text>
				</view>
			</view>

			<view class="cu-item arrow" @tap="toMyOrderUser()" v-if="roleId == 1">
				<view class="content">
					<text class="cuIcon-text text-blue bigsize"></text>
					<text class="text-grey">我的订单</text>
				</view>
			</view>

			<view class="cu-item arrow" @tap="toMyOrderPty()" v-if="roleId == 2">
				<view class="content">
					<text class="cuIcon-text text-blue bigsize"></text>
					<text class="text-grey">我的订单</text>
				</view>
			</view>


			<view class="cu-item arrow" @tap="toLsUser()" v-if="roleId == 1">
				<view class="content">
					<text class="cuIcon-wenzi text-blue bigsize"></text>
					<text class="text-grey">流水记录</text>
				</view>
			</view>

			<view class="cu-item arrow" @tap="toLsPty()" v-if="roleId == 2">
				<view class="content">
					<text class="cuIcon-wenzi text-blue bigsize"></text>
					<text class="text-grey">流水记录</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" @tap="toMoment()">
				<view class="content">
					<text class="cuIcon-emoji text-blue bigsize"></text>
					<text class="text-grey">我的发表</text>
				</view>
			</view> -->
			<!-- <view class="cu-item arrow" @tap="toMyAddress()" v-if="roleId == 1">
				<view class="content">
					<text class="cuIcon-location text-blue bigsize"></text>
					<text class="text-grey">我的地址</text>
				</view>
			</view> -->

			<view class="cu-item" v-if="roleId == 2" @click="handleRole">
				<view class="content">
					<text class="cuIcon-people text-blue bigsize"></text>
					<text class="text-grey">骑手认证</text>
				</view>
				<text class="action">{{ review }}</text>
			</view>

			<view class="cu-item arrow" @tap="toMessage()">
				<view class="content">
					<text class="cuIcon-emoji text-blue bigsize"></text>
					<text class="text-grey">我的反馈</text>
				</view>
			</view>

			<view class="cu-item arrow" @tap="toUpdatePassword()">
				<view class="content">
					<text class="cuIcon-lock text-blue bigsize"></text>
					<text class="text-grey">修改密码</text>
				</view>
			</view>
		</view>

		<view class="padding flex flex-direction" @tap="logout()">
			<button class="cu-btn bg-red margin-tb-sm lg">退出</button>
		</view>
		<u-modal title="请输入充值金额" :closeOnClickOverlay="true" :show="showAmount" :showCancelButton="true"
			@cancel="showAmount = false" @close="showAmount = false" @confirm="recharge">
			<view class="slot-content">
				<uni-easyinput type="number" v-model="amount" placeholder="请输入充值金额" />
			</view>
		</u-modal>
		<u-modal title="请输入支付密码" :closeOnClickOverlay="true" :show="showPassword" :showCancelButton="true"
			@cancel="cancelPay" @close="cancelPay" @confirm="payConfirm">
			<view class="slot-content">
				<uni-easyinput type="password" v-model="password" placeholder="请输入支付密码" />
			</view>
		</u-modal>
	</view>
</template>
<script>
import { getWalletByUserId } from "@/api/module/home"
import { getCourierById, updateCourierById } from "@/api/module/courier"
import { increaseWallet } from "@/api/module/wallet"

export default {
	data() {
		return {
			walletId: undefined,
			balance: '',
			currency: undefined,

			avatar: '',
			courierId: undefined,
			review: undefined,
			userId: '',
			username: '',
			roleId: '',
			amount: undefined,
			showAmount: false,
			showPassword: false,
			password: undefined
		}
	},
	onShow() {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"))
		this.userId = userInfo.userId
		this.username = userInfo.username
		this.roleId = userInfo.roleId

		getWalletByUserId(this.userId).then(res => {
			if (res.code == 200) {
				this.balance = res.data.balance
				this.walletId = res.data.walletId
				this.currency = res.data.currency
			}
		})

		if (this.roleId == 2) {
			getCourierById({
				userId: this.userId
			}).then(res => {
				const info = res.data[0]
				this.courierId = info.courierId
				this.review = info.review
			})
		}
	},
	methods: {
		// 用户流水
		toLsUser() {
			console.log('消费流水');
			this.$tab.navigateTo("../profile/wallet/expend")
		},
		// 跑腿员流水
		toLsPty() {
			console.log('收入流水');
			this.$tab.navigateTo("../profile/wallet/income")
		},
		// 余额
		loadBalance() {
			// 接口查询余额
		},
		// 我的地址
		toMyAddress() {
			uni.navigateTo({
				url: '../address/address'

			})
		},
		// 我的订单-用户
		toMyOrderUser() {
			uni.navigateTo({
				url: '../parcel/mystartList/mystartList'
			})
		},
		toMyOrderPty() {
			uni.navigateTo({
				url: '../parcel/mytaskList/mytaskList'
			})
		},
		logout() {
			this.$modal.confirm('您确定要退出登陆吗？').then(() => {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.removeStorageSync('roleId')
				uni.removeStorageSync('avatar')
				uni.removeStorageSync('username')
				uni.removeStorageSync('phonenumber')
				this.$tab.reLaunch('../login/index')
			}).catch(err => {

			})
		},
		handleRecharge() {
			this.amount = null
			this.password = null
			this.showAmount = true
		},
		recharge() {
			if (!this.amount) {
				return this.$modal.showToast("请输入充值金额！")
			}
			this.showAmount = false
			this.showPassword = true
		},
		cancelPay() {
			this.showPassword = false
			this.$modal.showToast("充值失败！")
		},
		payConfirm() {
			if (!this.password) {
				return this.$modal.showToast("请输入密码！")
			}
			this.showPassword = false
			// 钱包减掉对应额度
			increaseWallet({
				userId: this.userId,
				amount: this.amount
			}).then(res => {
				if (res.code == 200) {
					this.$modal.showToast("充值成功")

					getWalletByUserId(this.userId).then(res => {
						if (res.code == 200) {
							this.balance = res.data.balance
							this.walletId = res.data.walletId
							this.currency = res.data.currency
						}
					})
				}
			})
		},
		handleRole() {
			// 先重新获取一下
			getCourierById({
				userId: this.userId
			}).then(res => {
				const info = res.data[0]
				this.courierId = info.courierId
				this.review = info.review

				if (this.review == "审核通过") {
					return this.$modal.showToast("您已经通过审核认证！")
				} else if (this.review == "未审核") {
					return this.$modal.confirm("是否确认提交个人身份信息，进行认证审核？").then(res => {
						updateCourierById({
							courierId: this.courierId,
							review: "审核中"
						}).then(res => {
							if (res.code == 200) {
								this.review = "审核中"
								return this.$modal.showToast("审核提交成功！")
							}
						})
					})
				} else if (this.review == "审核中") {
					return this.$modal.showToast("您的提交正在审核")
				} else if (this.review == "审核未通过") {
					return this.$modal.showToast("您的审核未通过!")
				}
			})
		},
		// 进入我的资料界面
		toUserInfo() {
			uni.navigateTo({
				url: '../profile/index'
			})
		},
		// 进入修改页面界面
		toUpdatePassword() {
			uni.navigateTo({
				url: '../profile/update/updatePassword'
			})
		},
		// 进入朋友圈
		toMoment() {
			uni.navigateTo({
				url: 'moment/moment'
			})
		},
		// 进入反馈页面
		toMessage() {
			uni.navigateTo({
				url: 'message/message'
			})
		}
	}
}
</script>

<style lang="scss">
.bigsize {
	font-size: larger;
}

page {
	background-color: #f1f1f1;
	font-size: 30upx;
}

.header {
	background: #fff;
	height: 400upx;
	padding-bottom: 110upx;

	.bg {
		width: 100%;
		height: 200upx;
		padding-top: 100upx;
		background-color: #4191ea;
	}
}

.box {

	width: 650upx;
	height: 290upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2);

	.box-hd {
		position: relative;

		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;

		.avator {
			width: 200upx;
			height: 200upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			background-size: cover;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.phone-number {
			width: 100%;
			text-align: center;
		}

		.control {
			position: absolute;
			bottom: -10px;
			right: 30px;
		}
	}

	.box-bd {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;

		.item {
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;

			&:last-child {
				border: none;
			}

			.icon {
				width: 60upx;
				height: 60upx;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.text {
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}

.list-content {
	background: #fff;
}

.list {
	width: 100%;
	border-bottom: 15upx solid #f1f1f1;
	background: #fff;

	&:last-child {
		border: none;
	}

	.li {
		width: 92%;
		height: 100upx;
		padding: 0 4%;
		border-bottom: 1px solid rgb(243, 243, 243);
		display: flex;
		align-items: center;

		&.noborder {
			border-bottom: 0
		}

		.icon {
			flex-shrink: 0;
			width: 50upx;
			height: 50upx;

			image {
				width: 50upx;
				height: 50upx;
			}
		}

		.text {
			padding-left: 20upx;
			width: 100%;
			color: #666;
		}

		.to {
			flex-shrink: 0;
			width: 40upx;
			height: 40upx;
		}
	}
}
</style>
