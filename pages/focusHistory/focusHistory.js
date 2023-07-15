// pages/focusHistory/focusHistory.js

var util = require('../../utils/util');

//引入wxcharts.js插件
var wxCharts = require("../../utils/wxcharts");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: util.formatTime(new Date()),
    weekday: '',
    //总专注时长数据
    FocusTime: {
      "Mon": 2,
      "Tus": 5,
      "Wed": 3.5,
      "Thu": 5,
      "Fri": 9,
      "Sat": 5,
      "Sun": 7,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //从后端获取数据
    this.getdata()
    // 屏幕宽度
    this.setData({
      imageWidth: wx.getSystemInfoSync().windowWidth
    });
    //计算屏幕宽度比例
    windowW = this.data.imageWidth / 375;
    //获取时间
    setInterval(() => {
      var date = util.formatTime(new Date());
      this.setData({
        date: date,
      })
    }, 1000)
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