<template>
  <div class='container'>
    <CommentList 
      type='user' 
      :comments='comments'
      v-if='userinfo.openId'
    ></CommentList>
    <div v-if='userinfo.openId'>
      <div class='page-title'>我的图书</div>
      <Card v-for='book in books' :key='book.id' :book='book'></Card>
      <div v-if='!books.length'>还没添加图书,赶快去添加几本吧!</div>
    </div>
  </div>
</template>

<script>
import {get} from '@/utils'
import CommentList from '@/components/CommentList'
import Card from '@/components/Card'

export default {
  name: 'Comments',
  components: {
    CommentList,
    Card
  },
  data () {
    return {
      comments: [],
      userinfo: {},
      books: []
    }
  },
  methods: {
    init () {
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {
        openid: this.userinfo.openId
      })
      this.comments = comments.list
    },
    async getBooks () {
      const books = await get('/weapp/booklist', {
        openid: this.userinfo.openId
      })
      this.books = books.list
    }
  },
  onPullDownRefresh () {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow () {
    if (!this.userinfo.openId) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  }
}
</script>
