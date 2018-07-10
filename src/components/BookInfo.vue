<template>
  <div class='bookinfo'>
    <div class='thumb'>
      <img 
        class='back'
        :src='info.image' 
        mode='aspectFill' 
      />
      <img 
        class='img' 
        :src='info.image' 
        mode='aspectFit' 
      />  
      <div class='info'>
          <div class='title'>{{ info.title }}</div>
          <div class='author'>{{ info.author }}</div>
      </div>  
    </div>
    <div class='detail'>
      <img 
        class='avatar' 
        :src='userinfo.image' 
        mode='aspectFit'
      />
      {{ userinfo.nickName  }}
      <div class="right text-primary">
        {{ info.rate }}分  
        <Rate :value='info.rate'></Rate> 
      </div>  
    </div>
    <div class="detail">
      {{ info.publisher }}
      <div class='right'>
        {{ info.price }}    
      </div>        
    </div>  
    <div class="tags">
      <div class="badge" :key='tag' v-for='tag in info.tags'>{{ tag }}</div>
    </div>  
    <div class="summary">
      <p :key='index' v-for='(sum, index) in info.summary'>{{ sum }}</p>
    </div>
  </div>  
</template>

<script>
import Rate from '@/components/Rate'

export default {
  name: 'BookInfo',
  components: {
    Rate
  },
  props: ['info'],
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }

  }
}
</script>

<style lang='scss'>
.bookinfo{
  font-size: 14px;
  .badge{
    display: inline-block;
    margin: 5px;
    border-radius: 10px;
    border: 1px solid #3b8cff;
    color: #3b8cff;
    padding: 5px;
  }
  .summary{
    margin-top: 10px;
    p{
      padding: 0 15px;
      text-indent: 2em;
      font-size: 14px;
    }
  }  
  .right{
      float: right;
  }
  .detail{
      padding: 5px 10px; 
      .avatar{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          vertical-align: middle;
      }
  }
  .thumb{
      width: 750rpx;
      height: 500rpx;
      overflow: hidden;
      position: relative;
      .back{
        filter: blur(15px);
        width: 100%;
      }
      .img{
        position: absolute;
        width: 100%;
        height: 300rpx;
        left: 0;
        top: 30rpx;
      }
      .info{
        position: absolute;
        color: #fff;
        width: 100%;
        left: 0;
        top: 330rpx;
        text-align: center;
        .title{
          font-size: 20px;
        }
        .author{
          font-size: 14px;
        }
      }
    }
}
</style>
