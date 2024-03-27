<template>
	<view>
		<view class="content">

			<form>
				<view class="cu-form-group">
					<view class="title">发 布 人</view>
					<input v-model="obj.user.userName"></input>
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
					<input v-model="obj.address.content"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">配送电话</view>
					<input v-model="obj.address.phone"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">快递重量</view>
					<input v-model="obj.weight"></input>
				</view>

				<view class="cu-form-group">
					<view class="title">跑腿价格</view>
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
export default {
	data() {
		return {
			obj: {
				user: {
					userName: "张三"
				},
				pty: {},
				address: {
					content: "宿舍楼一号",
					phone: "1821773009"
				},
				id: '',
				num: 123456,
				place: "东门",
				code: 1234556,
				remark: "有些重",
				fbsj: "2024-03-10",
				weight: "30kg",
				money: 100
			}
		}
	},
	created() {
		// 加载
		// this.loadObj()
	},
	onLoad(options) {
		this.obj.id = options.id
	},
	methods: {
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
			this.$modal.showToast("接取成功，请按照规定时间送达！")
		}
	}
}
</script>