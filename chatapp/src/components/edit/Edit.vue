<template>
  <div class="edit-page">
    <nav-head :title="title" @leftClick="back">
      <template v-slot:left>
        <i class="iconfont icon-arrow-left" style="font-size: 24px"></i>
      </template>
    </nav-head>
    <div class="edit-content iconfont">
      <div class="edit-item edit-avatar">
        <cube-upload
        ref="upload"
        v-model="files"
        :action="action"
        @files-added='handleAdded'
        @file-error='handleError'
        @file-removed='deletePicture'
        @file-success='handleSuccess'
        >
        <cube-upload-btn :multiple="false">
          <span class="text">更换头像</span>
          <div class="avatar">
            <img :src="avatar" alt="">
          </div>
        </cube-upload-btn>
        </cube-upload>
      </div>
      <div class="edit-item edit-signature" @click="onEditSignature">
        <span class="text">个性签名</span>
        <span v-if="this.signature">{{signature}}</span>
        <span class="unset" v-else>还没有个性签名</span>
      </div>
      <div class="edit-item edit-name">
        <span class="text">昵称</span>
        <input class="name-input" v-model="nickname" type="text" @change="onEditName" maxlength="10">
      </div>
      <div class="edit-item edit-gender" @click="onEditGender">
        <span class="text">性别</span>
        <span>{{gender === '1' ? '男' : '女'}}</span>
      </div>
      <div class="edit-item eit-birthday" @click="onEditBirthday">
        <span class="text">生日</span>
        <span v-if="this.birthday">{{formatBirthday}}</span>
        <span class="unset" v-else>未设置</span>
      </div>
      <div class="edit-item edit-address" @click="onEditAddress">
        <span class="text">地址</span>
        <span v-if="this.address">{{address}}</span>
        <span class="unset" v-else>未设置</span>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavHead from '_c/base/NavHead'
import service from '_u/service'
import {
  getCookie
} from '_u/cookie'
import {
  provinceList,
  cityList,
  areaList
} from '../../../public/mock/area'

const asyncData = provinceList
const asyncSelectedIndex = [0, 0, 0]
asyncData[0].children = cityList[asyncData[0].value]
asyncData[0].children[0].children = areaList[asyncData[0].children[0].value]

const genderSelector = [
  {
    gender: '男',
    value: '1'
  },
  {
    gender: '女',
    value: '0'
  }
]
export default {
  data () {
    return {
      title: '编辑资料',
      avatar: '',
      nickname: '',
      gender: '',
      birthday: '',
      address: '',
      signature: '',
      isEdited: false,
      action: {
        target: service.baseURL + 'post/uploadImgAliyun',
        headers: {
          'wec-access-token': getCookie('token')
        },
        fileName: 'image',
        withCredentials: true
      },
      files: []
    }
  },
  components: {
    NavHead
  },
  created () {
    this.initData()
  },
  watch: {
    $route: 'refresh'
  },
  computed: {
    formatBirthday () {
      const date = new Date(this.birthday)
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
  },
  methods: {
    initData () {
      const userInfo = this.$store.state.user
      const {
        avatar,
        nickname,
        gender,
        birthday,
        address,
        desc
      } = userInfo
      this.avatar = avatar
      this.nickname = nickname
      this.gender = gender
      this.signature = desc || ''
      this.birthday = birthday || ''
      this.address = address || ''
      this.areaPick = this.$createCascadePicker({
        title: '选择地址',
        async: true,
        data: asyncData,
        selectedIndex: asyncSelectedIndex.slice(),
        onSelect: this.handleAreaSelect,
        onChange: this.asyncChangeHandle
      })
    },
    refresh () {
      if (this.$route.params.update) {
        this.initData()
      }
    },
    back () {
      if (this.isEdited) {
        this.updateInformation()
      }
      this.$router.push({
        path: '/message'
      })
    },
    handleAdded () {
      const file = this.files[0]
      file && this.$refs.upload.removeFile(file)
      console.log(this.files)
    },
    handleSuccess (data) {
      this.avatar = data.response.result.url
      this.isEdited = true
    },
    handleError () {
    },
    deletePicture (obj) {
      // console.log(obj)
    },
    onEditSignature () {
      this.$router.push({
        path: '/edit/editSignature'
      })
    },
    onEditName () {
      this.isEdited = true
    },
    onEditGender () {
      if (!this.genderPicker) {
        const selectedIndex = genderSelector.findIndex((item) => item.value === this.gender)
        this.genderPicker = this.$createPicker({
          title: '性别',
          data: [genderSelector],
          selectedIndex: [selectedIndex],
          alias: {
            text: 'gender'
          },
          onSelect: async (selectValue) => {
            this.gender = selectValue[0]
            this.isEdited = true
          }
        })
      }
      this.genderPicker.show()
    },
    onEditBirthday () {
      if (!this.birthdayPicker) {
        this.birthdayPicker = this.$createDatePicker({
          title: '设置生日',
          min: new Date(1900, 1, 1),
          max: new Date(),
          value: this.birthday ? new Date(this.birthday) : new Date(),
          format: {
            year: 'YYYY年',
            month: 'MM月',
            date: 'D日'
          },
          onSelect: (date) => {
            // console.log(date.getTime())
            this.birthday = date.getTime()
            this.isEdited = true
          }
        })
      }
      this.birthdayPicker.show()
    },
    onEditAddress () {
      this.areaPick.show()
    },
    // 处理地址选择
    handleAreaSelect (val, index, text) {
      this.address = text.join('-')
      this.isEdited = true
    },
    // 处理异步
    asyncChangeHandle (i, newIndex) {
      if (newIndex !== asyncSelectedIndex[i]) {
        // 前两列选择变化时
        asyncSelectedIndex[i] = newIndex
        if (i < 2) {
          setTimeout(() => {
            // 第一列变化
            if (i === 0) {
              const current = asyncData[newIndex]
              current.children = current.children || cityList[current.value]
              current.children[0].children = current.children[0].children || areaList[current.children[0].value]
              asyncSelectedIndex[1] = 0
              asyncSelectedIndex[2] = 0
            }
            // 第二列变化
            if (i === 1) {
              const current = asyncData[asyncSelectedIndex[0]].children[newIndex]
              current.children = current.children || areaList[current.value]
              asyncSelectedIndex[2] = 0
            }
            this.areaPick.setData(asyncData, asyncSelectedIndex)
          }, 200)
        }
      }
    },
    // 更新数据
    async updateInformation () {
      const toast = this.$createToast({
        time: 0,
        txt: '正在更新'
      })
      toast.show()
      const data = {
        nickname: this.nickname,
        avatar: this.avatar,
        gender: this.gender,
        desc: this.signature,
        birthday: this.birthday,
        address: this.address
      }
      const result = await this.$store.dispatch('updateUserInfo', { data })
      toast.hide()
      if (result.code === 200) {
        this.$createToast({
          time: 200,
          txt: '更新成功'
        }).show()
      } else {
        this.$createToast({
          time: 200,
          txt: '更新失败'
        }).show()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .edit-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f7f7f7;
    z-index: 100;
    .edit-content {
      margin-top: 50px;
      background: #ffffff;
      .edit-item {
        height: 40px;
        padding: 4px 10px;
        position: relative;
        &::after {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          content: '\e65b';
        }
        .text {
          display: inline-block;
          width: 80px;
          height: 100%;
          margin-right: 10px;
          line-height: 40px;
        }
        .unset {
          color: #ccc;
        }
      }
      .edit-avatar {
        ::v-deep .cube-upload {
          height: 100%;
          .cube-upload-btn {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 20px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .edit-signature {
        padding-right: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .edit-name {
        .name-input {
          height: 100%;
          &:focus {
            outline: none;
          }
        }
      }
    }
  }
</style>
