<template>
  <div class='swiper'>
    <swiper 
      :indicator-dots='true'
      indicator-color='#3b8cff'
      :autoplay='true'
      :interval='5000'
      :duration='1000'
      :circular='true'
    >
      <div :key='indeximg' v-for='(top, indeximg) in imgUrls'>
        <swiper-item>
          <img 
            @click='bookDetail(img)'
            class='slide-image'
            mode='aspectFit' 
            v-for='img in top'
            :key='img.id'
            :src='img.image' 
            alt=''
          />
        </swiper-item>
      </div>
    </swiper>
  </div>  
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  },
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang='scss'>
.swiper{
    margin-top: 5px;
    .slide-image{
         width: 33%;
         height: 250rpx;
    }
}
</style>
