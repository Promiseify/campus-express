<template>
	<view>
		<view class="cu-card dynamic no-card" v-for="(obj, index) in momentList" :key="index">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<img class="avator" style="position: absolute; left: 10px; width: 50px; height: 50px;"
							src="@/static/logo.png" alt="">
						<view class="content flex-sub">
							<view>{{ obj.username }}</view>
							<view class="text-gray text-sm flex justify-between">{{ obj.time }}</view>
						</view>
					</view>
				</view>
				<view class="text-content">{{ obj.content }}</view>
				<view class="grid flex-sub padding-lr grid-square"
					:class="obj.imageSize >= 3 ? 'col-3' : obj.imageSize == 2 ? 'col-2' : 'col-1'">
					<view class="bg-img" :style="{ backgroundImage: 'url(' + (il.path) + ')' }" v-for="(il, index) in obj.imageList"
						:key="index">
					</view>
				</view>
			</view>
			<view class="margin-top"></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			momentList: [
				{
					username: "李四",
					time: "5分钟前",
					content: "快递速度超快~"
				},
				{
					username: "小明",
					time: "30分钟前",
					content: "运送途中质量损坏😡😡😡"
				},
				{
					username: "小黎",
					time: "32分钟前",
					content: "非常棒，小哥态度好。"
				}
			]
		}
	},
	onNavigationBarButtonTap() {
		uni.navigateTo({
			url: 'momentAdd/momentAdd'
		})
	},
	methods: {
		getList() {
			var data = {}
			this.http.post('', data).then((res) => {
				if (res.code != 0) return false
				var list = res.rows
				// 将头像avatar 和 图片path的地址url都加上前缀
				for (var i = 0; i < list.length; i++) {
					var obj = list[i];
					list[i].user.avatar = this.tool.formatURL(obj.user.avatar)
					var imageList = obj.imageList
					if (imageList) {
						for (var j = 0; j < imageList.length; j++) {
							var oj2 = imageList[j]
							imageList[j].path = this.tool.formatURL(oj2.path)
						}
						list[i].imageList = obj.imageList
						list[i].imageSize = imageList.length
					} else {
						list[i].imageSize = 0
					}

				}
				this.momentList = list
			})
		}
	}
}
</script>
