<template>
  <div class='container'>
    <div class='userinfo' @click='login'>
      <img :src='userinfo.avatarUrl' alt=''>
      <p>{{ userinfo.nickName }}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
  </div>
</template>

<script>
import { showSuccess, post, showModal } from '@/utils'
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import YearProgress from '@/components/YearProgress'

export default {
  name: 'Me',
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  methods: {
    async addbook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      // console.log(res)
      showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: res => {
          if (res.result) {
            this.addbook(res.result)
          }
        }
      })
    },
    login () {
      let user = wx.getStorageSync('userinfo')
      let self = this
      if (!user) {
        // 设置登录地址
        qcloud.setLoginUrl(config.loginUrl)
        qcloud.login({
          success: function (userinfo) {
            qcloud.request({
              url: config.userUrl,
              login: true,
              success (userRes) {
                showSuccess('登录成功!')
                wx.setStorageSync('userinfo', userRes.data.data)
                self.userinfo = userRes.data.data
              }
            })
          },
          fail: function (err) {
            console.log('登录失败', err)
          }
        })
      }
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    // console.log(this.userinfo)
  }
}
</script>

<style lang='scss'>
.container{
  padding: 0 30rpx;
  .userinfo{
    margin-top: 100rpx;
    text-align: center;
    img{
      width: 150rpx;
      height: 150rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
  }
}
</style>
