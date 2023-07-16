// pages/focus/focus.js
const { addData } = require('../../utils/utilsFunctions');

Page({

  /**
   * 页面的初始数据
   */

  data: {
    time: 0, // 总时长
    hours: 0, // 小时
    minutes: 0, // 分钟
    seconds: 0, // 秒
    timer: null, // 计时器对象
    isTiming: false, // 是否正在计时
    duration: '' // 本次计时的时长
  },



  startTiming() {
    if (this.data.isTiming) {
      return; // 如果正在计时，不执行操作
    }
    this.setData({
      isTiming: true
    });

    this.data.timer = setInterval(() => {
      let hours = this.data.hours;
      let minutes = this.data.minutes;
      let seconds = this.data.seconds + 1;
                            //                            ！！！！！！！！！！！！！
      if (seconds >= 60) {   // ！！！！！！！！！！！！！！！！  ← 这里记得改回60  ！！！！！！！！！！！！！！！！！！
        seconds = 0;        //                            ！！！！！！！！！！！！！
        minutes += 1;
      }

      if (minutes >= 60) {
        minutes = 0;
        hours += 1;
      }

      this.setData({
        hours: hours,
        minutes: minutes,
        seconds: seconds
      });
    }, 1000);
  },

  stopTiming() {
    if (!this.data.isTiming) {
      return; // 如果没有正在计时，不执行操作
    }
    clearInterval(this.data.timer);
    const { hours, minutes, seconds } = this.data; // 获取当前数据中的小时、分钟和秒数

    function limitFloatNumber(value, decimals) {
      return Number(value).toFixed(decimals);
    }

    const time = limitFloatNumber( hours + minutes / 60 + seconds / 3600, 2);
    if (hours === 0 && minutes === 0 && seconds <= 5) {
      this.setData({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isTiming: false,
        time: 0,
        duration: '专注时间不足5秒，不进行录入！'
      });
    } else {
      this.setData({
        hours: 0,
        minutes: 0,
        seconds: 0,
        time: 0,
        isTiming: false,
        duration: `${hours}小时 ${minutes}分钟 ${seconds}秒`,
      });

      var currentDate = new Date();
      var weekdayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      var data = {
        Hours: time,
        Date: currentDate.toLocaleDateString(),
        Weekday: weekdayAbbreviations[currentDate.getDay()]
      };
      console.log(data);
      addData('focus', data); // 调用上传数据库的函数，并传递数据库名和数据

    }
    

  },

  redirectToHistory() {
    wx.navigateTo({
      url: '/pages/focusHistory/focusHistory',
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options)  {
    var app=getApp()
    this.setData({
      ChooseColor: app.globalData.theme.ChooseColor,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})