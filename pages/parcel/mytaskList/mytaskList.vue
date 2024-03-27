<template>
	<view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" :class="modalName == 'move-box-' + index ? 'move-cur' : ''" @tap="detail(pt.id)"
				v-for="(pt, index) in taskList" :key="index" @touchstart="ListTouchStart" @touchmove="ListTouchMove"
				@touchend="ListTouchEnd" :data-target="'move-box-' + index">
				<view class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + pt.user.avatar + ')' }]"></view>
				<view class="content">
					<view class="text-grey">{{ pt.user.userName }}</view>
					<view class="text-gray text-sm">
						<view v-if="pt.status == 1" class="bg-blue cu-tag">已接单</view>
						<view v-if="pt.status == 2" class="bg-blue cu-tag">配送中</view>
						<view v-if="pt.status == 3" class="bg-blue cu-tag">已完成</view>
						<view v-if="pt.status == 4" class="bg-blue cu-tag">已取消</view>
						<text class="text-red  margin-right-xs margin-right"></text>
						{{ pt.fbsj }}
					</view>
				</view>

				<view class="action">
					<view class="text-grey text-xs">{{ pt.distance }}KM</view>
					<view class="cu-tag round bg-red lg">￥{{ pt.moneyPaotui }}</view>
				</view>

				<view class="move">
					<view v-if="pt.status == 1" class="bg-orange" @tap.stop="updatePs(pt.id)">配送</view>
					<view v-if="pt.status == 2" class="bg-orange" @tap.stop="updateWc(pt.id)">完成</view>
					<view v-if="pt.status == 3" class="bg-orange" @tap.stop="detail(pt.id)">详情</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			taskList: [],
			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null
		}
	},
	methods: {
		// 列表
		listMytask() {
			// 接口获得数据
			this.taskList = bList
		},
		detail(id) {
			uni.navigateTo({
				url: '../detailComplex/detailComplex?id=' + id
			})
		},
		// 将状态更新为配送
		updatePs(id) {
			var that = this
			this.vusui.confirm('您确定如此操作吗吗？', {
				icon: 1
			}, function () {
				that.vusui.load(3)
				that.http.post(`/openapi/parcel/pty/ps/${id}`).then((res) => {
					that.vusui.close("loading")
					if (res.code != 0) {
						that.vusui.alert(res.msg)
						return false
					} else {
						that.vusui.alert('操作成功')
						that.listMytask();
					}
				})
			})
		},
		// 将状态更新为c完成
		updateWc(id) {
			var that = this
			this.vusui.confirm('您确定如此操作吗吗？', {
				icon: 1
			}, function () {
				that.vusui.load(3)

				// 调用接口
				that.vusui.alert('操作成功')
			})
		},
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX
		},
		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
		},
		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target
			} else {
				this.modalName = null
			}
			this.listTouchDirection = null
		}
	}
}
</script>
