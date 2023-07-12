// pages/main/main.js
var util = require('../../utils/util.js');
//引入wxcharts.js插件
var wxCharts = require("../../utils/wxcharts");
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;
Page({
  data: {
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
    TodoList: [{
        "id": 0,
        "StartDate": "2023/07/15",
        "StartTime": "8:00",
        "Subject": "数学",
        "Content": "学习内容",
        "Duration": "240"
      },
      {
        "id": 1,
        "StartDate": "2023/07/15",
        "StartTime": "14:00",
        "Subject": "政治",
        "Content": "学习内容",
        "Duration": "60"
      },
      {
        "id": 2,
        "StartDate": "2023/07/15",
        "StartTime": "15:00",
        "Subject": "专业课",
        "Content": "学习内容",
        "Duration": "180"
      },
      {
        "id": 3,
        "StartDate": "2023/07/15",
        "StartTime": "20:00",
        "Subject": "英语",
        "Content": "学习内容",
        "Duration": "180"
      },
      {
        "id": 4,
        "StartDate": "2023/07/16",
        "StartTime": "8:00",
        "Subject": "数学",
        "Content": "学习内容",
        "Duration": "240"
      },
      {
        "id": 5,
        "StartDate": "2023/07/16",
        "StartTime": "14:00",
        "Subject": "政治",
        "Content": "学习内容",
        "Duration": "60"
      },
      {
        "id": 6,
        "StartDate": "2023/07/16",
        "StartTime": "15:00",
        "Subject": "专业课",
        "Content": "学习内容",
        "Duration": "180"
      },
      {
        "id": 7,
        "StartDate": "2023/07/16",
        "StartTime": "20:00",
        "Subject": "英语",
        "Content": "学习内容",
        "Duration": "180"
      }
    ]
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
    console.log(event.detail);
  },
  //侧边栏打开或关闭
  onClose() {
    this.setData({
      show: !this.data.show
    });
  },
  //开始专注
  OnStartFocus() {
    console.log('开始专注')
  },

  onLoad: function () {
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
        color: 'red',
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
      legend:false,
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