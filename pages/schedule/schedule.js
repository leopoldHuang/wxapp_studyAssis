// pages/main/main.js
var util = require('../../utils/util.js');
var utils = require('../../utils/utilsFunctions');
//引入wxcharts.js插件
var wxCharts = require("../../utils/wxcharts");
//定义记录初始屏幕宽度比例，便于初始化
var dateTimePicker = require('../schedule/dateTimer.js');
const db = wx.cloud.database({});
var app = getApp()
Page({
  data: {
    end_time: '',
    start_time: '',
    dateTimeArray: '', //时间数组
    startYear: 2000, //最小年份
    endYear: 2050, // 最大年份
    start_time_p: '', //显示的开始时间
    end_time_p: '', //显示的结束时间
    showIndex: null, //打开弹窗的对应下标
    date: util.formatTime(new Date()),
    weekday: '',
    active: "home",
    show: false,
    TodoList: [],
    check: false,
  },
  check(e) {
    this.setData({
      check: !this.data.check
    });
  },

  // 打开弹窗
  showaddlistset(e) {
    var index = e.currentTarget.dataset.index;
    var content = e.currentTarget.dataset.content;
    var remind = e.currentTarget.dataset.remind;
    var name = e.currentTarget.dataset.name;
    var starttime = e.currentTarget.dataset.starttime;
    var endtime = e.currentTarget.dataset.endtime;
    var id = e.currentTarget.dataset.id;
    var remindable = e.currentTarget.dataset.remindable;
    this.setData({
      showIndex: index,
      showContent: content,
      showRemind: remind,
      showName: name,
      showStarttime: starttime,
      showEndtime: endtime,
      showId: id,
      check: !remindable
    })
  },
  showaddlist(e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      showIndex: index
    })
  },
  //关闭弹窗
  closePopup() {
    this.setData({
      showIndex: null,
      keyWord1: '',
      keyWord2: '',
      keyWord3: '',
      start_time_p: '',
      end_time_p: '',
      check: false,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    var that = this;
    // 动态获取屏幕高度
    wx.getSystemInfo({
      success: (result) => {
        that.setData({
          height: result.windowHeight
        });
      },
    })
  },
  //获取输入数据(添加)
  inputname: function (e) {
    let name = e.detail.value
    this.setData({
      keyWord1: name
    })
  },
  inputcontent: function (e) {
    let content = e.detail.value
    this.setData({
      keyWord2: content
    })
  },
  inputremind: function (e) {
    let remind = e.detail.value
    this.setData({
      keyWord3: remind
    })
  },
  allowSubscribeMessage() {
    // hasSubscribeMessage 授权状态
    if (!app.globalData.hasSubscribeMessage) {
      wx.requestSubscribeMessage({
        tmplIds: ["osj8Q4XJQgjYWbqHcqYMNFsnOw3ZBSBnTvlKR0OSiAA"], // 在此处填写模板id
        success(res) {
          console.log('获取权限：', res)
          app.globalData.hasSubscribeMessage = res.errMsg.split(':')[1]
        }
      })
    }
  },
  add: function () {
    var that=this
    var data = {
      content: this.data.keyWord2,
      endTime: this.data.end_time_p.substring(0, this.data.end_time_p.lastIndexOf(":")),
      startTime: this.data.start_time_p.substring(0, this.data.start_time_p.lastIndexOf(":")),
      remind: this.data.keyWord3,
      name: this.data.keyWord1,
      remindable: !this.data.check,
    };
    utils.addData("schedule", data);
    this.setData({
      showIndex: null,
      keyWord1: '',
      keyWord2: '',
      keyWord3: '',
      start_time_p: '',
      end_time_p: '',
      showRemind: '',
      showContent: '',
      showName: '',
      showEndtime: '',
      showStarttime: '',
      check: '',
    })
    if(!data.remindable)this.allowSubscribeMessage()
    that.onLoad()
  },
  //删除
  delete: function (event) {
    var that = this;
    // console.log(event.currentTarget.dataset.index);
    utils.updateData("schedule", event.currentTarget.dataset.index, null);
    that.onLoad()
  },
  //获取输入数据(修改)
  inputnameset: function (e) {
    let name = e.detail.value
    this.setData({
      showName: name
    })
  },
  inputcontentset: function (e) {
    let content = e.detail.value
    this.setData({
      showContent: content
    })
  },
  inputremindset: function (e) {
    let remind = e.detail.value
    this.setData({
      showRemind: remind
    })
  },
  //修改
  modify: function (event) {
    // console.log(this.data.showName);
    // console.log(this.data.showContent);
    // console.log(this.data.showRemind);
    var that = this;
    if (this.data.end_time_p) {
      this.setData({
        showEndtime: this.data.end_time_p.substring(0, this.data.end_time_p.lastIndexOf(":")),
      })
    }

    if (this.data.start_time_p) {
      this.setData({
        showStarttime: this.data.start_time_p.substring(0, this.data.start_time_p.lastIndexOf(":")),
      })
    }

    var data = {
      content: this.data.showContent,
      endTime: this.data.showEndtime,
      startTime: this.data.showStarttime,
      remind: this.data.showRemind,
      name: this.data.showName,
      remindable: !this.data.check,
    }
    console.log(data);
    utils.updateData("schedule", this.data.showId, data);
    this.setData({
      showIndex: null,
      showRemind: '',
      showContent: '',
      showName: '',
      showEndtime: '',
      showStarttime: '',
      start_time_p: '',
      end_time_p: '',
      check: '',
    })
    that.onLoad()
  },

  onLoad: function (options) {
    var app=getApp()
    this.setData({
      ChooseColor: app.globalData.theme.ChooseColor,
      UnChooseColor: app.globalData.theme.UnChooseColor,
      ChooseFontColor: app.globalData.theme.ChooseFontColor,
      UnchooseFontColor: app.globalData.theme.UnchooseFontColor,
      BorderColor: app.globalData.theme.BorderColor,
    })

    //罗列
    var xxx = null;
    var that = this;
    utils.getData("schedule", null).then(res => {
      // 在 then 方法的回调函数中更新页面数据
      console.log(res)
      this.setData({
        TodoList: res
      });
    }).catch(err => {
      console.error('获取数据失败', err);
    })
    //获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    this.setData({
      start_time: obj.dateTime,
      end_time: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
    });
  },
  /**
   * 选择时间
   * @param {*} e 
   */
  changeDateTime(e) {
    let dateTimeArray = this.data.dateTimeArray,
      {
        type,
        param
      } = e.currentTarget.dataset;
    this.setData({
      [type]: e.detail.value,
      [param]: dateTimeArray[0][e.detail.value[0]] + '-' + dateTimeArray[1][e.detail.value[1]] + '-' + dateTimeArray[2][e.detail.value[2]] + ' ' + dateTimeArray[3][e.detail.value[3]] + ':' + dateTimeArray[4][e.detail.value[4]] + ':' + dateTimeArray[5][e.detail.value[5]]
    });
  },
  changeDateTimeColumn(e) {
    var dateArr = this.data.dateTimeArray,
      {
        type
      } = e.currentTarget.dataset,
      arr = this.data[type];
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray: dateArr,
      [type]: arr
    });
  },
})