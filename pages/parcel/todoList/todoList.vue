<template>
	<view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" @tap="detail(pt.id)" @longpress="jd(pt.id)" v-for="(pt, index) in taskList" :key="index">
				<img class="avator" style="position: absolute; left: 10px; width: 50px; height: 50px;" src="@/static/logo.png" alt="">
				<view class="content">
					<view class="text-grey">{{ pt.username }}</view>
					<view class="text-gray text-sm">
						{{ pt.fbsj }}
					</view>
				</view>

				<view class="action">
					<view class="text-grey text-xs">{{ pt.distance }}KM</view>
					<view class="cu-tag round bg-red lg">￥{{ pt.money }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			taskList: [
				{
					username: "张三",
					fbsj: '123231',
					distance: "12",
					money: 100
				},
				{
					username: "李四",
					fbsj: '123231',
					distance: "12",
					money: 100
				},
				{
					username: "小明",
					fbsj: '123231',
					distance: "12",
					money: 100
				},
				{
					username: "小黎",
					fbsj: '123231',
					distance: "12",
					money: 100
				},
			]
		}
	},
	created() {
	},
	onShow() {

	},
	methods: {
		// 接单
		jd(id) {
			var that = this
			this.vusui.confirm('您确定要接单吗？', {
				icon: 1
			}, function () {
				that.vusui.load(3)
				that.http.post(`/openapi/parcel/pty/jd/${id}`).then((res) => {
					that.vusui.close("loading")
					if (res.code != 0) {
						that.vusui.alert(res.msg)
						return false
					} else {
						that.vusui.alert('操作成功')
						that.listTodo();
					}
				})
			})
		},

		detail(id) {
			uni.navigateTo({
				url: '../detailSimple/detailSimple?id=' + id
			})
		}
	}
}
</script>
