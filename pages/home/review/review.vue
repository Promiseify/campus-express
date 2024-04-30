<template>
  <view>
    <view class="content">
      <uni-forms class="form" ref="form" :modelValue="form" :rules="rules" label-width="100px">
        <uni-forms-item label="学生证" name="studentNumber" required>
          <uni-easyinput type="text" v-model="form.studentNumber" placeholder="请输入学生证号" />
        </uni-forms-item>
        <uni-forms-item label="身份证" name="identityCard" required>
          <uni-easyinput type="text" v-model="form.identityCard" placeholder="请输入身份证号" />
        </uni-forms-item>
        <uni-forms-item label="住址" name="address" required>
          <uni-easyinput type="text" v-model="form.address" placeholder="请输入住址" />
        </uni-forms-item>
        <uni-forms-item label="学生证照片" name="studentNumberImages" required>
          <u-upload :fileList="studentFileList" @afterRead="studentAfterRead" @delete="studentDeletePic" name="file"
            :maxCount="1" :previewFullImage="true"></u-upload>
        </uni-forms-item>
        <uni-forms-item label="身份证照片" name="identityCardImages" required>
          <u-upload :fileList="identityFileList" @afterRead="identityAfterRead" @delete="identityDeletePic" name="file"
            :maxCount="1" :previewFullImage="true"></u-upload>
        </uni-forms-item>
      </uni-forms>

      <view class="control">
        <button type="primary" @click="handleReview">审 核</button>
      </view>
    </view>
  </view>
</template>

<script>
import { updateUser } from "@/api/module/user"
import { getCourierById, updateCourierById } from "@/api/module/courier"
export default {
  data() {
    return {
      password: undefined,
      userId: undefined,
      roleId: undefined,
      courierId: undefined,
      form: {
        studentNumber: undefined,
        identityCard: undefined,
        address: undefined,
        studentCardImage: undefined,
        studentCardImageUrl: undefined,
        identityCardImage: undefined,
        identityCardImageUrl: undefined,

        userId: this.userId
      },
      rules: {
        studentNumber: {
          rules: [{
            required: true,
            errorMessage: '学生证号不能为空'
          }]
        },
        identityCard: {
          rules: [{
            required: true,
            errorMessage: '身份证号不能为空'
          }]
        },
        address: {
          rules: [{
            required: true,
            errorMessage: '住址不能为空'
          }]
        },
      },
      studentFileList: [],
      identityFileList: [],
    }
  },
  onShow() {
    const userInfo = JSON.parse(uni.getStorageSync("userInfo"))
    this.userId = userInfo.userId
    this.form.userId = userInfo.userId
    this.roleId = userInfo.roleId

    if (this.roleId == 2) {
      getCourierById({
        userId: this.userId
      }).then(res => {
        const info = res.data[0]
        this.courierId = info.courierId
      })
    }
  },
  methods: {
    reset() {
      this.form = {
        studentNumber: undefined,
        identityCard: undefined,
        address: undefined,
        studentCardImage: undefined,
        studentCardImageUrl: undefined,
        identityCardImage: undefined,
        identityCardImageUrl: undefined,
        userId: JSON.parse(userInfo)?.userId
      }
    },
    handleReview() {
      this.$refs.form.validate().then(() => {
        updateUser(this.form).then(res => {
          if (res.code == 200) {
            updateCourierById({
              courierId: this.courierId,
              review: "审核中"
            }).then(res => {
              if (res.code == 200) {
                setTimeout(() => {
                  this.$tab.navigateBack()
                }, 1000);
                return this.$modal.showToast("审核提交成功！")
              }
            })
          }
        })
      })
    },
    async studentAfterRead(event) {
      const file = event.file
      const result = await this.uploadFilePromise(file.url)
      const parseResult = JSON.parse(result)
      this.studentFileList.push({ url: parseResult.data.fileUrl })

      this.form.studentCardImage = new Date().getTime() + parseResult.data.imageName
      this.form.studentCardImageUrl = parseResult.data.fileUrl
    },
    studentDeletePic(event) {
      this.studentFileList.splice(event.index, 1)
    },

    async identityAfterRead(event) {
      const file = event.file
      const result = await this.uploadFilePromise(file.url)
      const parseResult = JSON.parse(result)
      this.identityFileList.push({ url: parseResult.data.fileUrl })

      this.form.identityCardImage = new Date().getTime() + parseResult.data.imageName
      this.form.identityCardImageUrl = parseResult.data.fileUrl
    },
    identityDeletePic(event) {
      this.identityFileList.splice(event.index, 1)
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: 'http://localhost:10081/courier/upload', // 仅为示例，非真实的接口地址
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