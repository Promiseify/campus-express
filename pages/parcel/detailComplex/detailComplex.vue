<template>
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem"
			style-type="text"></uni-segmented-control>

		<view class="content">
			<view v-show="current === 0">

				<form>
					<view class="cu-form-group">
						<view class="title">发 布 人</view>
						<input v-model="userInfo.username"></input>
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

					<view class="cu-form-group">
						<view class="title">代 取 员</view>
						<input v-model="obj.pty.userName"></input>
					</view>

					<view class="cu-form-group">
						<view class="title">完成时间</view>
						<input v-model="obj.wcsj"></input>
					</view>

					<view class="cu-form-group">
						<view class="title">状态</view>
						<view v-if="obj.status == 1">待接单</view>
						<view v-if="obj.status == 2">派送中</view>
						<view v-if="obj.status == 3">派送完成</view>
					</view>

				</form>
			</view>

			<view v-show="current === 1">
				<view class="cu-list menu" :class="['sm-border']">
					<view class="cu-item" v-for="(msg, index) in messageList" :key="index">
						<view class="content">
							<view>{{ msg.content }}</view>
							<view class="text-gray">{{ msg.time }}</view>
						</view>
						<view class="action">
							<view v-if="msg.utype == 'pty'">跑腿——{{ msg.user.userName }}</view>
							<view v-if="msg.utype == 'user'">用户——{{ msg.user.userName }}</view>
						</view>
					</view>
				</view>

				<form>
					<view class="cu-form-group"></view>
					<view class="cu-form-group">
						<view class="title">评论内容</view>
						<input placeholder="请输入内容" v-model="message.content"></input>
					</view>
					<view class="grid col-1 padding-sm bg-white margin-top" @tap="add">
						<view class="margin-tb-sm text-center">
							<button class="cu-btn bg-blue lg">保存</button>
						</view>
					</view>
				</form>
			</view>

		</view>


	</view>
</template>

<script>
import { getOrders } from "@/api/module/order"

export default {
	data() {
		const userInfo = uni.getStorageSync("userInfo")
		return {
			userInfo: JSON.parse(userInfo),
			obj: {
				user: {},
				pty: {},
				id: '',
				num: '',
				place: '',
				code: '',
				remark: '',
				address: '',
				phone: ''
			},
			message: {
				utype: ''
			},
			items: ['订单详情', '评价列表'],
			current: 0,
			messageList: []
		}
	},
	onLoad(options) {
		this.obj.id = options.id
		this.message.orderId = options.id

		this.getOrdersFn(options.id)
		this.obj.num = options.id
		this.obj.code = options.id
	},
	methods: {
		getOrdersFn(orderId) {
			getOrders({ orderId: orderId }).then(res => {
				if (res.code == 200) {
					const data = res.data[0]
					console.log(data);
					this.obj.place = data.orderPlace
					this.obj.remark = data.orderRemark
					this.obj.fbsj = data.orderTime
					this.obj.address = data.orderAddress
					this.obj.phone = this.userInfo.phone
					this.obj.money = data.orderPrice
					this.obj.status = data.orderStatus
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
		loadMessage() {
			this.http.get('').then((res) => {
				if (res.code != 0) {
					this.vusui.alert(res.msg)
					return false
				}
				this.messageList = res.rows
			})
		},
		// 新增留言
		add() {
			var that = this
			this.vusui.load(3)
			this.http.post('', this.message).then((res) => {
				this.vusui.close("loading");
				if (res.code != 0) {
					this.vusui.alert(res.msg)
					return false
				} else {
					this.vusui.alert('新增成功', {
						yes: function () {
							that.loadMessage()
							that.message.content = ''
						}
					})
				}
			})
		},
		// 切换
		onClickItem(e) {
			if (this.current !== e.currentIndex) {
				this.current = e.currentIndex;
			}
		}
	}
}
</script>