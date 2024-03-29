// pages/mine/mine.js
var app = getApp()
Page({
  onShareAppMessage() {},
  //根据输入修改主题颜色
  ChangeChooseColor(e) {
    app.globalData.theme.ChooseColor = e.detail
    wx.reLaunch({
      url: '../mine/mine' ,
    })
  },
  ShowApp(e) {
    this.setData({
      isShowApp: !this.data.isShowApp,
      VersionValue: "1.0.0",
      TeamValue: "_Null ...在说话 服了 雪糕不甜 荼靡 123 Kinano",
    })
  },
  ChangeTextAndColor(e) {
    this.setData({
      isShow: !this.data.isShow,
    })
  },
  //根据滑动设置rgb背景颜色
  ChangeColor1(e) {
    this.setData({
      rgbcolor1: e.detail.value
    })
    var newcolor = "rgb(" + this.data.rgbcolor1 + "," + this.data.rgbcolor2 + "," + this.data.rgbcolor3 + ")"
    this.setData({
      BackgroundColor: newcolor
    })
    app.globalData.theme.BackgroundColor = newcolor
  },
  ChangeColor2(e) {
    this.setData({
      rgbcolor2: e.detail.value
    })
    var newcolor = "rgb(" + this.data.rgbcolor1 + "," + this.data.rgbcolor2 + "," + this.data.rgbcolor3 + ")"
    this.setData({
      BackgroundColor: newcolor
    })
    app.globalData.theme.BackgroundColor = newcolor
  },
  ChangeColor3(e) {
    this.setData({
      rgbcolor3: e.detail.value
    })
    var newcolor = "rgb(" + this.data.rgbcolor1 + "," + this.data.rgbcolor2 + "," + this.data.rgbcolor3 + ")"
    this.setData({
      BackgroundColor: newcolor
    })
    app.globalData.theme.BackgroundColor = newcolor
  },
  ChangeText(e) {
    app.globalData.theme.fontSize = e.detail
    this.setData({
      fontSize: e.detail.value
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    VersionValue: '',
    TeamValue: '',
    isShowApp: false,
    isShow: false,
    fontSize: "",
    rgbcolor1: 255,
    rgbcolor2: 255,
    rgbcolor3: 255, //rgb（0，0，0）页面颜色
    BackgroundColor: "rgb(255,255,255)",
    ChooseColor:app.globalData.theme.ChooseColor,
    bgColor: 'white', //rgb(rgcolor1,rgcolor2,rgcolor3)",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var app=getApp()
    var ChooseColor=app.globalData.theme.ChooseColor
    var colors=['red','blue','yellow','green','pink','orange','purple','black','gray']
    var names=['红色','蓝色','黄色','绿色','粉色','橙色','紫色','黑色','其他']
    var index=colors.indexOf(ChooseColor)
    if(index==-1)index=8
    this.setData({
      ChooseColor: ChooseColor,
      index:index,
      colors:colors,
      names:names
    })
    console.log()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      })
    }
    var BackgroundColor = app.globalData.theme.BackgroundColor
    console.log(BackgroundColor)
    this.setData({
      rgbcolor1: parseInt(BackgroundColor.split(',')[0].split('(')[1]),
      rgbcolor2: parseInt(BackgroundColor.split(',')[1]),
      rgbcolor3: parseInt(BackgroundColor.split(',')[2].split(')')[0]),
      BackgroundColor:BackgroundColor,
      fontSize:app.globalData.theme.fontSize
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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

  },
  bindPickerChange: function (e) {
    var colors=['red','blue','yellow','green','pink','orange','purple','black','gray']
    app.globalData.theme.ChooseColor = colors[e.detail.value]
    wx.reLaunch({
      url: '../mine/mine' ,
    })
  },
})