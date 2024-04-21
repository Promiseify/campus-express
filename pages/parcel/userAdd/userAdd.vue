<template>
	<view>
		<view class="content">
			<uni-forms class="form" ref="form" :modelValue="order" :rules="rules" label-width="80px">
				<uni-forms-item label="送货地址" name="orderAddress" required>
					<uni-easyinput type="text" v-model="order.orderAddress" placeholder="请输入送货地址" />
				</uni-forms-item>
				<uni-forms-item label="取货地点" name="orderPlace" required>
					<uni-easyinput type="text" v-model="order.orderPlace" placeholder="请输入取货地点" />
				</uni-forms-item>
				<uni-forms-item label="收货时间" name="orderTime" required>
					<uni-datetime-picker type="datetime" v-model="order.orderTime" />
				</uni-forms-item>
				<uni-forms-item label="酬金" name="orderPrice" required>
					<uni-easyinput type="text" v-model="order.orderPrice" placeholder="请输入酬金" />
				</uni-forms-item>
				<uni-forms-item label="备注说明" name="orderRemark">
					<uni-easyinput type="text" v-model="order.orderRemark" placeholder="请输入备注" />
				</uni-forms-item>
				<uni-forms-item label="快递截图" name="images" required>
					<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="file" :maxCount="1"
						:previewFullImage="true"></u-upload>
				</uni-forms-item>
			</uni-forms>

			<view class="control">
				<button type="primary" @click="handleIssue">发 布</button>
			</view>

			<u-modal :show="show" @confirm="payConfirm" title="请输入支付密码">
				<view class="slot-content">
					<uni-easyinput type="password" v-model="password" placeholder="请输入支付密码" />
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
import { issueOrder } from "@/api/module/order";
import { decreaseWallet } from "@/api/module/wallet";


export default {
	data() {
		const userInfo = uni.getStorageSync("userInfo")
		return {
			userInfo: userInfo,
			password: undefined,
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
				orderUserId: JSON.parse(userInfo)?.userId,
				images: undefined,
				imageUrl: undefined,
				review: undefined
			},
			show: false,
			rules: {
				orderAddress: {
					rules: [{
						required: true,
						errorMessage: '送货地址不能为空'
					}]
				},
				orderPlace: {
					rules: [{
						required: true,
						errorMessage: '取货地点不能为空'
					}]
				},
				orderTime: {
					rules: [{
						required: true,
						errorMessage: '收货时间不能为空'
					}]
				},
				orderPrice: {
					rules: [{
						required: true,
						errorMessage: '酬金不能为空'
					}]
				},
				images: {
					rules: [{
						required: true,
						errorMessage: '快递截图不能为空'
					}]
				}
			},
			fileList: []
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
				orderUserId: this.userInfo?.userId,
				images: undefined,
				imageUrl: undefined,
				review: undefined
			}
		},
		handleIssue() {
			this.$refs.form.validate().then(() => {
				this.show = true
			})
		},
		payConfirm() {
			this.show = false
			// 钱包减掉对应额度
			decreaseWallet({
				userId: JSON.parse(this.userInfo)?.userId,
				amount: this.order.orderPrice
			}).then(res => {
				if (res.code == 200) {
					this.$modal.showToast("支付成功")
					// 订单发布
					this.order.orderType = 2;
					this.order.orderStatus = 1;
					this.order.review = "未审核"
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
			})


		},
		async afterRead(event) {
			const file = event.file
			const result = await this.uploadFilePromise(file.url)
			const parseResult = JSON.parse(result)
			this.fileList.push({ url: parseResult.data.fileUrl })

			this.order.images = new Date().getTime() + parseResult.data.imageName
			this.order.imageUrl = parseResult.data.fileUrl
		},
		deletePic(event) {
			this.fileList.splice(event.index, 1)
		},
		uploadFilePromise(url) {
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: 'http://localhost:10081/user/upload', // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					success: (res) => {
						resolve(res.data)
					}
				});
			})
		}
	}
}
</script>

<style lang="scss">
.content {
	margin: 10px;
	padding: 5px 10px;
	background-color: #fff;
}
</style>