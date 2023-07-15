// app.js
var app = getApp();
App({
  onLaunch: async function () {
    var that = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //云开发初始化
    wx.cloud.init({ 
      env: 'cloud1-6gie9r5mb33f9164',
      traceUser: true
    })
    //获取openid
    var that=this
    wx.cloud.callFunction({
      name: 'getOpenId',
    }).then(res => {
      this.globalData.userOpenid = res.result.openid
      if (this.globalData.userOpenid) {
        that.employIdCallback(0);
      }
    })
  },
  globalData: {
    theme: {
      //图表，按钮等选中颜色 
      ChooseColor: 'red',
      //未选中颜色
      UnChooseColor: 'grey',
      //文字选中颜色 
      ChooseFontColor: "white",
      //文字未选中颜色 
      UnchooseFontColor: "grey",
      //边框颜色 
      BorderColor: "red"
    },
    userOpenid: null,
    Data: null
  },
})