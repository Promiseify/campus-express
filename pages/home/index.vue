<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<img class="avator" src="@/static/logo.png" alt="">
						<view class="phone-number">{{ userName }}</view>
						<view class="item margin-top">
							<view class="text">余额：￥{{ balance }}</view>
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
			<view class="cu-item arrow" @tap="toMoment()">
				<view class="content">
					<text class="cuIcon-emoji text-blue bigsize"></text>
					<text class="text-grey">我的动态</text>
				</view>
			</view>

			<view class="cu-item arrow" @tap="toMyAddress()" v-if="roleId == 1">
				<view class="content">
					<text class="cuIcon-location text-blue bigsize"></text>
					<text class="text-grey">我的地址</text>
				</view>
			</view>

			<view class="cu-item" v-if="roleId == 2">
				<view class="content">
					<text class="cuIcon-people text-blue bigsize"></text>
					<text class="text-grey">骑手认证</text>
				</view>
				<text class="action" v-if="rz == 0">未认证</text>
				<text class="action" v-if="rz == 1">已通过</text>
				<text class="action" v-if="rz == 2">未通过</text>
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


	</view>
</template>
<script>
export default {
	data() {
		return {
			balance: 8900,
			avatar: '',
			rz: 1,
			userName: 'Promiseify',
			roleId: 2
		}
	},
	methods: {
		// 用户流水
		toLsUser() {
			console.log('消费流水');
		},
		// 跑腿员流水
		toLsPty() {
			console.log('收入流水');
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

		},
		toMyOrderPty() {
			uni.navigateTo({
				url: '../parcel/mystartList/mystartList'
			})
		},
		logout() {
			var that = this
			this.vusui.confirm('您确定要退出登陆吗？', {
				icon: 2
			}, function () {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.removeStorageSync('roleId')
				uni.removeStorageSync('avatar')
				uni.removeStorageSync('userName')
				uni.removeStorageSync('phonenumber')
				uni.reLaunch({
					url: '../login/login'
				})
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
