// pages/myCourse/myCours.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SUBSCRIBE_ID : 'osj8Q4XJQgjYWbqHcqYMNFsnOw3ZBSBnTvlKR0OSiAA' // 下发的模板ID
  },
  courseSubscribe: function (e) {
    // 获取课程相关信息
    var coueseInfo = e.currentTarget.dataset.info;
    var that=this
    wx.requestSubscribeMessage({
      tmplIds: [that.data.SUBSCRIBE_ID],
      success(res) {
        if (res[that.data.SUBSCRIBE_ID] === 'accept') {
          // 调用云函数subscribe
          wx.cloud
            .callFunction({
              name: 'addCourseMsg',
              data: {
                data: coueseInfo,
                templateId: that.data.SUBSCRIBE_ID,
              },
            })
            .then(() => {
              wx.showToast({
                title: '订阅成功，我们将在xxx时间提醒您开课',
                icon: 'success'
              });
            })
            .catch(() => {
              // dothing...
            });
        }
      },
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