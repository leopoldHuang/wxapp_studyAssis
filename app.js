// app.js
var app = getApp();

const utils = require('./utils/utilsFunctions')

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

    // 登录 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })

    // 登录 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })

    // utils.getData('mine').then(res => {
    //   if(res.length!=0){
    //     this.globalData.theme.ChooseColor=res[0].ChooseColor
    //     this.globalData.theme.BackgroundColor=res[0].BackgroundColor
    //     this.globalData.theme.fontSize=res[0].fontSize
    //     this.globalData.theme._id=res[0]._id
    //   }
    //   else{
    //     var defaultData={
    //       ChooseColor:this.globalData.theme.ChooseColor,
    //       BackgroundColor:this.globalData.theme.BackgroundColor,
    //       fontSize:this.globalData.theme.fontSize
    //     }
    //     utils.addData('mine',defaultData).then(res => {
    //       console.log(res)
    //       this.globalData._id=res._id
    //     }).catch(err => {
    //       console.error('获取数据失败', err);
    //     });
    //   }
    // }).catch(err => {
    //   console.error('获取数据失败', err);
    // });

  },
  globalData: {
    theme: {
      //图表，按钮等选中颜色 
      ChooseColor: 'red',//与数据库关联
      //未选中颜色
      UnChooseColor: 'grey',
      //文字选中颜色 
      ChooseFontColor: "white",
      //文字未选中颜色 
      UnchooseFontColor: "grey",  
      //边框颜色 
      BorderColor: "red",
      //背景颜色
      BackgroundColor:"rgb(255,255,255)",//与数据库关联
      //文字大小
      fontSize:"",//与数据库关联
      //数据库里对应的_id
      _id:""
    },
    userOpenid: null,
    Data: null,
    userInfo: null, 
  },

})