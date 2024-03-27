<template>
	<view>
		<form>
			<view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName != null" @input="textareaInput" placeholder="此刻的心情..."></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{ imgList.length }}/9
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item, index) in imgList" :key="index" @tap="viewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="delImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="chooseImage" v-if="imgList.length < 9">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			imgList: [],
			modalName: null,
			textareaValue: '',
			paths: []
		}
	},
	onNavigationBarButtonTap() {
		this.add()
	},
	methods: {
		// 点击发表
		add() {
			if (this.imgList.length > 9) {
				this.vusui.alert('图片不能超过9张')
				return false
			}
			if (this.textareaValue == '' && this.imgList.length == 0) {
				this.vusui.alert('请输入心情或至少传一张图片')
				return false
			}
			// 如果没有图片直接保存
			if (this.imgList.length == 0) {
				this.save()
			} else {
				// 如果有图片，先上传图片	
				this.uploadFile()
			}
		},

		// 提交保存
		save() {
			console.log("保存成功");
		},

		// 上传图片
		uploadFile() {
			var that = this
			this.vusui.load(3)
			// 循环上传图片
			for (var i = 0; i < this.imgList.length; i++) {
				const tempFilePath = this.imgList[i];
				// 图片上传
				// uni.uploadFile({
				// 	url: 'ceshi'
				// 	filePath: tempFilePath,
				// 	name: 'file',
				// 	success: (r) => {
				// 		var res = JSON.parse(r.data)
				// 		var path = res.data.path
				// 		that.paths.push(path)
				// 		if(this.paths.length == this.imgList.length){
				// 			this.save()
				// 		}
				// 	}
				// });
			}

		},

		chooseImage() {
			uni.chooseImage({
				count: 9,
				sizeType: ['original', 'compressed'],
				success: (res) => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths)
					} else {
						this.imgList = res.tempFilePaths
					}
				}
			});
		},
		viewImage(e) {
			uni.previewImage({
				urls: this.imgList,
				current: e.currentTarget.dataset.url
			});
		},
		delImg(e) {
			var that = this
			this.vusui.confirm('您确定要删除这张照片吗？', {
				icon: 2
			}, function () {
				that.imgList.splice(e.currentTarget.dataset.index, 1)
			})
		},
		textareaInput(e) {
			this.textareaValue = e.detail.value
		}
	}
}
</script>

<style></style>
