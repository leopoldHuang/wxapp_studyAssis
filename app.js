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
    wx.cloud.init({//云开发初始化
      env: 'cloud1-6gie9r5mb33f9164',
      traceUser: true
    })

    // 登录 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
  },
  globalData: {
    theme: {
      //图表，按钮等选中颜色 
      ChooseColor: 'blue',
      //未选中颜色
      UnChooseColor: 'grey',
      //文字选中颜色 
      ChooseFontColor: "white",
      //文字未选中颜色 
      UnchooseFontColor: "grey",
      //边框颜色 
      BorderColor: "red",
      //背景颜色
      BackgroundColor:"rgb(255,255,255)",
      //文字大小
      fontSize:""
    },
    userOpenid: null,
    Data: null,
    userInfo: null, 
  },
})
