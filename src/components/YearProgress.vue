<template>
  <div class='progressBar'>
      <progress :percent='percent' activeColor='#3b8cff'></progress>
      <p>{{ year }}已过去了{{ days }}天,{{ percent }}%</p>
  </div>  
</template>

<script>
export default {
  name: 'YearProgress',
  methods: {
    isLeapYear () {
      const year = new Date().getFullYear()
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 400 === 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      let offset = new Date().getTime() - start.getTime()
      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days * 100 / this.getDayOfYear()).toFixed(2)
    }
  }
}
</script>

<style lang='scss'>
.progressBar{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 40px;
    width: 100%;
    progress{
        margin-bottom: 10px;
        text-align: center;
        font-size: 12px;
    }
}
</style>
