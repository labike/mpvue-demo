<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <CommentList :comments='comments'></CommentList>
    <div class='comment' v-if='showAdd'>
      <textarea 
        v-model='comment'
        class='textarea' 
        :maxlength='100' 
        placeholder='请输入评论'
      ></textarea>
      <div class='location'>
        地理位置:
        <switch color='' :checked='location' @change='getLocationGeo'></switch>
        <span class='text-primary'>{{ location }}</span> 
      </div>
      <div class="phone">
        手机型号:
        <switch color='' :checked='phone' @change='getPhone'></switch>
        <span class='text-primary'>{{phone}}</span> 
      </div>
      <button class='btn' @click='addComment'>提交</button>
    </div>
    <div v-else class='text-footer'>未登录或者已经评论过了</div>
    <button open-type='share' class='btn'>转发给好友</button>
  </div>
</template>

<script>
import {get, post, showModal} from '@/utils'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'

export default {
  name: 'Detail',
  components: {
    BookInfo,
    CommentList
  },
  data () {
    return {
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      userinfo: {},
      comments: []
    }
  },
  computed: {
    showAdd () {
      if (!this.userinfo.openId) {
        return
      }
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
      // console.log(info)
    },
    getLocationGeo (e) {
      const ak = 'pDRcDt8Sfx1D5A0pzh0YrWwfw74sGsAM'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude}, ${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                // console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '位置地点'
                }
              }
            })
            // console.log(geo)
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneType = wx.getSystemInfoSync()
        // console.log(phoneType)
        this.phone = phoneType.model
      } else {
        this.phone = ''
      }
    },
    async addComment () {
      if (!this.comment) {
        return
      }
      const data = {
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        openid: this.userinfo.openId
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getComments()
      } catch (e) {
        showModal('失败', e.msg)
      }
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = comments.list || []
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    this.getComments()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss'>
.comment{
  .textarea{
    width: 730rpx;
    height: 200rpx;
    background: #eee;
    padding: 10rpx;
  }
  .lcocation{
    margin-top: 10px;
  }
  .phone{
    margin-top: 10px;
  }
}
</style>
