// index.js
// 获取应用实例
const app = getApp()
const time = require('../../utils/util')
const templateId = 'osj8Q4XJQgjYWbqHcqYMNFsnOw3ZBSBnTvlKR0OSiAA'

Page({
  data:{
    hasUserInfo:false,
    index : 0,
    logArray:['英语','政治','数学','专业课'],
    admin:'',                             // 操作员
    lTitle:'未提交日志提醒',               // 提醒标题
    date: time.formatTime(new Date()),    // 日期(格式化)
    remind:'',                            // 提醒人，默认admin              
    tip:'尚未提交日志',                    // 温馨提示内容
  },
  // 获取提醒标题
  changeTitle(e){
    this.setData({ index : e.detail.value })
  },
  // 获取日期选择
  bindDateChange(e){
    this.setData({ date : e.detail.value })
  },
  // 获取提醒人
  bindRemindPer(e){
    this.setData({ remind : e.detail.value })
  },
  // 获取提示内容
  bindTipCont(e){
    console.log(e)
    this.setData({ tip : e.detail.value })
  },
  // 获取用户信息
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          admin: res.userInfo.nickName,
          hasUserInfo: true
        })
      }
    })
  },
  // 获取消息订阅权限
  allowSubscribeMessage(){
    // hasSubscribeMessage 授权状态
    if (!app.globalData.hasSubscribeMessage) {
      wx.requestSubscribeMessage({
        tmplIds: [templateId], // 在此处填写模板id
        success(res) {
          console.log('获取权限：',res)
          app.globalData.hasSubscribeMessage = res.errMsg.split(':')[1]
        }
      })
    }
  },
  // 表单提交
  formSubmit(e){
    // e.detail.value 可以拿到用户提交表单的数据
    // console.log(e.detail.value)
    let formInfo = e.detail.value
    formInfo.title = this.data.logArray[formInfo.title]
    wx.login({
      timeout: 2000,
      // 成功后会返回code，将code提交给服务器
      success: res =>{
        // 获取到code
        console.log('获取到code:' + res.code)
        console.log(res)
        // 提交服务器
        server.post({code : res.code , formInfo}, ()=>{
          wx.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          })
          // 成功提交后，由服务器来发起订阅消息
          server.sendTempMsg(formInfo,res =>{
            console.log('订阅消息发送结果：', res.data)
          })
        })
      }
    })

    // 获取当前时间的小时和分钟
    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    // 设置定时任务触发的时间（10点25分）
    const targetHours = 10;
    const targetMinutes = 23;

    // 比较当前时间是否已过目标时间
    if (currentHours < targetHours || (currentHours === targetHours && currentMinutes < targetMinutes)) {
      // 计算定时任务触发的延迟时间（单位：毫秒）
      const delayTime = (targetHours - currentHours) * 60 * 60 * 1000 + (targetMinutes - currentMinutes) * 60 * 1000;

      // 延迟调用定时任务
      setTimeout(() => {
        // 提交表单并发送提醒
        this.sendReminder(formInfo);
      }, delayTime);
    } else {
      // 目标时间已过，无需延迟，直接触发定时任务
      this.sendReminder(formInfo);
    }
  },

  // 发送提醒
  sendReminder(formInfo) {
    server.post(formInfo, () => {
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      });
      // 成功提交后，由服务器来发起订阅消息
      server.sendTempMsg(formInfo, res => {
        console.log('订阅消息发送结果：', res.data);
      });
    });
  }
});

// server.js
const tempid = 'osj8Q4XJQgjYWbqHcqYMNFsnOw3ZBSBnTvlKR0OSiAA'; // 填写上你的订阅模板的id
// 模拟服务器端
var server = {
  appid: 'wx56f1d5b2d10273cb', // 填写上你的appid
  secret:'2294fba62ede91094b28002612fe28c6', // 填写上你的AppSecret
  user: {
    openid: ''  // 待接收
  },

  // Post 表单提交处理
  post(data, success) {
    return new Promise((resolve, reject) => {
      // 收到来自客户端提交的数据
      console.log('客户端提交内容：',data);
      // 获取Openid - 通过code,appid,secret
      this.getOpenid(data, (res) => {
        // 获取到code保存
        console.log('用户OpenId：',res.data.openid);
        this.user.openid = res.data.openid;
        success();
        resolve();
      }, reject);
    });
  },

  // 获取openid
  getOpenid(res, success, fail) {
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data:{  // 请求参数
        appid: this.appid,
        secret: this.secret,
        js_code: res.code,
        grant_type: 'authorization_code'
      },
      success,
      fail
    });
  },

  // 发送订阅消息
  sendTempMsg(formInfo, success) {
      var that = this.user;
      var temp = {
        touser: that.openid,
        template_id: tempid, // 订阅模板id
        data:{
          thing5: { value: "1" },
          time6: { value: "10:00" },
          date9: {value: "2020-01-01 10:00:00" },
          thing11: { value: '1' }
        },
        miniprogram_state: 'developer',
        lang: 'zh_CN'
      };
      this.getAccessToken((res) => {
        var token = res.data.access_token;
        console.log('服务器access_token：' + token);
        var url = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + token;
        wx.request({
          url,
          method: 'post',
          data: temp,
          success
        });
      });
    },

    // 获取access_token
    getAccessToken(success) {
      var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.secret}`;
      wx.request({
        url,
        success
      });
    }
  }

  module.exports = server;