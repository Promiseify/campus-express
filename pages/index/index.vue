<template>
  <view>
    <view>
      <swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
        duration="500">
        <swiper-item v-for="(obj, index) in bannerList" :key="index">
          <view class="banner-title">{{ obj.mainTitle }}</view>
          <img class="banner-img" :id="obj.mainId" :src="obj.cover" mode="aspectFill" />
        </swiper-item>
      </swiper>
    </view>

    <!-- 跑腿 -->
    <view class="cu-list grid" :class="['col-3']">
      <view class="cu-item" @tap="toFoodTask()">
        <view class="cuIcon-same base_fontcolor bigsize "></view>
        <text>外卖</text>
      </view>
      <view class="cu-item" @tap="toParcelTask()">
        <view class="cuIcon-deliver base_fontcolor bigsize"></view>
        <text>快递</text>
      </view>
      <view class="cu-item" @tap="toOtherTask()">
        <view class="cuIcon-pick base_fontcolor bigsize"></view>
        <text>其他</text>
      </view>
    </view>

    <!-- 跑腿 -->
    <view class="cu-list menu-avatar">
      <view class="cu-item margin-top-min" @tap="detail(pt.id, pt.type)" @longpress="jd(pt.id, pt.type)"
        v-for="(pt, index) in taskList" :key="index">
        <img class="avator" src="@/static/logo.png" alt="">
        <view class="content">
          <view class="text-grey">{{ pt.name }}</view>
          <view class="text-gray text-sm">
            <view v-if="pt.type == 'kd'" class="bg-blue cu-tag">快递</view>
            <view v-if="pt.type == 'wm'" class="bg-blue cu-tag">外卖</view>
            <view v-if="pt.type == 'qt'" class="bg-blue cu-tag">其他</view>
            <text class="text-red  margin-right-xs margin-right"></text>
            {{ pt.fbsj }}
          </view>

        </view>
        <view class="action">
          <view v-if="pt.type == 'kd'" class="text-grey text-xs">{{ pt.distance }}KG</view>
          <view v-else class="text-grey text-xs">{{ pt.distance }}KM</view>
          <view class="cu-tag round bg-red lg">￥{{ pt.moneyPaotui }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [
        {
          mainTitle: "快递",
          mainId: "1",
          cover: "/static/images/banner/banner_01.png",
        },
        {
          mainTitle: "外卖",
          mainId: "2",
          cover: "/static/images/banner/banner_02.png",
        },
        {
          mainTitle: "其他",
          mainId: "3",
          cover: "/static/images/banner/banner_03.png",
        }
      ],
      taskList: [
        { name: "张三", type: "kd", fbsj: '2024-03-10', distance: 2, moneyPaotui: 10 },
        { name: "张三", type: "kd", fbsj: '2024-03-10', distance: 2, moneyPaotui: 10 },
        { name: "张三", type: "kd", fbsj: '2024-03-10', distance: 2, moneyPaotui: 10 },
      ],
      myList: [],
      timeout: 5000, // 30s
      timeoutObj: null,
      roleId: 117
    };
  },
  methods: {
    // 待接单任务
    loadPtTaskList() {
      this.http.post('').then((res) => {
        if (res.code != 0) return false
        var bList = [];
        if (res.rows) {
          for (var i = 0; i < res.rows.length; i++) {
            var obj = res.rows[i]
            var avatar = obj.avatar
            obj.avatar = this.tool.formatURL(avatar)
            obj.fbsj = this.tool.formatTime(obj.fbsj)
            bList.push(obj)
          }
        }
        this.taskList = bList
      })
    },
    // 我发布的未完成的任务
    loadMyTaskList() {
      this.http.post('').then((res) => {
        if (res.code != 0) return false
        var bList = [];
        if (res.rows) {
          for (var i = 0; i < res.rows.length; i++) {
            var obj = res.rows[i]
            var avatar = obj.avatar
            obj.avatar = this.tool.formatURL(avatar)
            obj.fbsj = this.tool.formatTime(obj.fbsj)
            bList.push(obj)
          }
        }
        this.myList = bList
      })
    },
    detail(id, type) {
      var url;
      if (type == 'wm') {
        url = '../taskfood/detailSimple/detailSimple?id=' + id
      } else if (type == 'kd') {
        url = '../parcel/detailSimple/detailSimple?id=' + id
      } else if (type == 'qt') {
        url = '../taskother/detailSimple/detailSimple?id=' + id
      }
      uni.navigateTo({
        url: url
      })
    },
    detailUser(id, type, status) {
      var url;
      if (type == 'wm') {
        if (status == 0) {
          url = '../taskfood/detailSimple/detailSimple?id=' + id
        } else {
          url = '../taskfood/detailComplex/detailComplex?id=' + id
        }
      } else if (type == 'kd') {
        if (status == 0) {
          url = '../parcel/detailSimple/detailSimple?id=' + id
        } else {
          url = '../parcel/detailComplex/detailComplex?id=' + id
        }
      } else if (type == 'qt') {
        if (status == 0) {
          url = '../taskother/detailSimple/detailSimple?id=' + id
        } else {
          url = '../taskother/detailComplex/detailComplex?id=' + id
        }
      }
      uni.navigateTo({
        url: url
      })
    },
    // 接单
    jd(id, type) {
      var url;
      if (type == 'wm') {
        url = `/openapi/food/pty/jd/${id}`
      } else if (type == 'kd') {
        url = `/openapi/parcel/pty/jd/${id}`
      } else if (type == 'qt') {
        url = `/openapi/other/pty/jd/${id}`
      }
      var that = this
      this.vusui.confirm('您确定要接单吗？', {
        icon: 1
      }, function () {
        that.vusui.load(3)
        that.http.post(url).then((res) => {
          that.vusui.close("loading")
          if (res.code != 0) {
            that.vusui.alert(res.msg)
            return false
          } else {
            that.vusui.alert('操作成功')
            that.loadPtTaskList();
          }
        })
      })
    },

    // 普通用户- 进入外卖添加页面
    toFoodUserAdd() {
      uni.navigateTo({
        url: '../taskfood/userAdd/userAdd'
      })
    },
    // 普通用户- 进入快递添加页面
    toParcelUserAdd() {
      uni.navigateTo({
        url: '../parcel/userAdd/userAdd'
      })
    },
    // 普通用户- 进入其他添加页面
    toOtherUserAdd() {
      uni.navigateTo({
        url: '../taskother/userAdd/userAdd'
      })
    },
    // 跑腿员- 进入外卖所有待接单列表界面
    toFoodTask() {
      uni.navigateTo({
        url: '../food/todoList/todoList'
      })
    },
    // 跑腿员- 进入快递所有待接单列表界面
    toParcelTask() {
      uni.navigateTo({
        url: '../parcel/todoList/todoList'
      })
    },
    // 跑腿员- 进入其他所有待接单列表界面
    toOtherTask() {
      uni.navigateTo({
        url: '../other/todoList/todoList'
      })
    }

  }
}
</script>

<style scoped lang="less">
.avator {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
}

.banner {
  height: 360rpx;
  overflow: hidden;
  position: relative;
  background-color: #ccc;
}

.banner-img {
  width: 100%;
}

.banner-title {
  max-height: 84rpx;
  overflow: hidden;
  position: absolute;
  left: 30rpx;
  bottom: 30rpx;
  width: 90%;
  font-size: 32rpx;
  font-weight: 400;
  line-height: 42rpx;
  color: white;
  z-index: 11;
}

.uni-media-list-logo {
  width: 180rpx;
  height: 140rpx;
}

.uni-media-list-body {
  height: auto;
  justify-content: space-around;
}

.uni-media-list-text-top {
  height: 74rpx;
  font-size: 28rpx;
  overflow: hidden;
}

.uni-media-list-text-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
