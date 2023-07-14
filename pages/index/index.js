// pages/main/main.js
var util = require('../../utils/util.js');
//引入wxcharts.js插件
var wxCharts = require("../../utils/wxcharts");
var windowW
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
    FocusTime: [],
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
        TodoList.sort((a, b) => new Date(a.StartTime) - new Date(b.StartTime));
        that.setData({
          TodoList: TodoList
        })
      },
      fail: function (err) {
        console.error('查询用户信息失败', err)
      }
    })
    ///获取一周专注时间数据
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth() + 1; // 月份从 0 开始，所以要加 1
    var day = currentDate.getDate();
    var today = year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day);

    // 获取当前日期是星期几（0 表示星期日，1 表示星期一，依此类推）
    var currentDayOfWeek = currentDate.getDay();
    // 计算需要减去的天数来获取当前周的周一
    var daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
    // 减去天数来获取当前周的周一日期
    var mondayDate = new Date(currentDate);
    mondayDate.setDate(currentDate.getDate() - daysToSubtract);

    var year = mondayDate.getFullYear();
    var month = mondayDate.getMonth() + 1; // 月份从 0 开始，所以要加 1
    var day = mondayDate.getDate();
    var monday = year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day);

    console.log(today, monday)

    const _ = wx.cloud.database().command;
    wx.cloud.database().collection('focus').where(
      _.and([{
          Date: _.gte(monday)
        },
        {
          Date: _.lte(today)
        }
      ])).get({
      success: function (res) {
        var FocusTime = res.data
        FocusTime.sort((a, b) => new Date(a.Date) - new Date(b.Date));
        that.setData({
          FocusTime: FocusTime
        })
        //计算总专注时间
        var TotalFocusTime = 0
        FocusTime.forEach((obj) => {
          TotalFocusTime += Number(obj.Hours)
        });
        that.setData({
          TotalFocusTime: TotalFocusTime
        });
        new wxCharts({
          canvasId: 'columnCanvas',
          type: 'column',
          animation: true,
          categories: FocusTime.map(item => item.Weekday),
          series: [{
            name: '专注时长',
            color: ChooseColor,
            data: FocusTime.map(item => item.Hours).map(Number),
            format: function (val, name) {
              return Number(val).toFixed(1) + 'h';
            }
          }],
          yAxis: {
            format: function (val) {
              return Number(val) + 'h';
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