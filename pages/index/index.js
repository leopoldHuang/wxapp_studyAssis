// pages/main/main.js
var util = require('../../utils/util.js');
//引入wxcharts.js插件
var wxCharts = require("../../utils/wxcharts");
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;
var app = getApp();
var ChooseColor = app.globalData.theme.ChooseColor
Page({
  data: {
    ChooseColor: app.globalData.theme.ChooseColor,
    UnChooseColor: app.globalData.theme.UnChooseColor,
    ChooseFontColor: app.globalData.theme.ChooseFontColor,
    UnchooseFontColor: app.globalData.theme.UnchooseFontColor,
    BorderColor: app.globalData.theme.BorderColor,
    date: util.formatTime(new Date()),
    weekday: '',
    active: "home",
    show: false,
    //总专注时长数据
    FocusTime: {
      "Mon": 2,
      "Tus": 5,
      "Wed": 3.5,
      "Thu": 5,
      "Fri": 9,
      "Sat": 12,
      "Sun": 7,
    },
    //日程数据
    TodoList: []
  },

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
  getdata() {
    console.log("获取数据接口")
    //获取日程数据
    var that = this;
    wx.cloud.database().collection('schedule').where({ //查找函数
      _openid: getApp().globalData.userOpenid
    }).get({
      success: function (res) {
        var TodoList = res.data
        TodoList.forEach((value, i) => {
          value.id = i
          value.EndHM = value.EndTime.slice(-5, );
          value.StartHM = value.StartTime.slice(-5, );
          value.Date = value.StartTime.slice(5, 10)
        })
        TodoList.sort((a, b) =>new Date(a.StartTime) - new Date(b.StartTime));
        that.setData({
          TodoList: res.data
        })
      },
      fail: function (err) {
        console.error('查询用户信息失败', err)
      }
    })
  },
  //日程显示改变
  onChangeTodo(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onOpen(event) {

    Toast(`展开: ${event.detail}`);


  },
  onClose(event) {
    Toast(`关闭: ${event.detail}`);
  },
  //底部导航改变 跳转
  onChangePage(event) {
    this.setData({
      active: event.detail,
    })
    wx.switchTab({
      url: '../' + event.detail + '/' + event.detail //要跳转到的页面路径
    })
  },
  //侧边栏打开或关闭
  onClose() {
    this.setData({
      show: !this.data.show
    });
  },

  //
  onShow: function () {
    //计算日期时间
    var today = new Date().getDay();
    var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    this.setData({
      weekday: week[today]
    })

    //计算总专注时间
    var TotalFocusTime = 0;
    var times = Object.values(this.data.FocusTime);
    times.forEach(num => {
      TotalFocusTime += num
    })
    this.setData({
      TotalFocusTime: TotalFocusTime
    });
    //计算日程时间
    var TodoList = this.data.TodoList
    TodoList.forEach((value, i) => {
      var duration = parseInt(value.Duration);
      var hour = parseInt(value.StartTime.slice(0, -2))
      var minute = parseInt(value.StartTime.slice(-2, ))
      hour = (hour + duration / 60) % 24
      minute = (minute + duration) % 60
      var EndTime = hour + ":" + (minute + '').padStart(2, "0")
      value.EndTime = EndTime;
    })
    this.setData({
      TodoList: TodoList
    });
    // 柱状图
    new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: Object.keys(this.data.FocusTime),
      series: [{
        name: '专注时长',
        color: ChooseColor,
        data: Object.values(this.data.FocusTime),
        format: function (val, name) {
          return val.toFixed(1) + 'h';
        }
      }],
      yAxis: {
        format: function (val) {
          return val + 'h';
        },
        min: 0,
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 20
        }
      },
      legend: false,
      width: 360,
      height: 180,
    });
  },

  onReady: function () {},
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