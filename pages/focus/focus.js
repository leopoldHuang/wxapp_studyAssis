var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    //颜色
    ChooseColor: app.globalData.theme.ChooseColor,
    UnChooseColor: app.globalData.theme.UnChooseColor,
    ChooseFontColor: app.globalData.theme.ChooseFontColor,
    UnchooseFontColor: app.globalData.theme.UnchooseFontColor,
    BorderColor: app.globalData.theme.BorderColor,

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

      if (seconds >= 60) {
        seconds = 0;
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
    if (hours === 0 && minutes === 0 && seconds <= 5) {
      this.setData({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isTiming: false,
        duration: '专注时间不足5秒，不进行录入！'
      });
    } else {
      this.setData({
        hours: 0,
        minutes: 0,
        seconds: 0,
        isTiming: false,
        duration: `${hours}小时 ${minutes}分钟 ${seconds}秒`
      });
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
  onLoad(options) {

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