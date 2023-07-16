// pages/focusHistory/focusHistory.js

var util = require('../../utils/util');
const utils = require('../../utils/utilsFunctions');
var app=getApp()

//引入wxcharts.js插件
var wxCharts = require("../../utils/wxcharts");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusData: [], // 用于存储提取的数据
    recentWeek: 0,
    TotalHours: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var app=getApp()
    this.setData({
      ChooseColor: app.globalData.theme.ChooseColor,
    })
    this.fetchData(); // 在页面加载时调用提取数据的函数 
    wx.getSystemInfo({
      success: (res) => {
        const deviceWidth = res.windowWidth-25; // 获取设备宽度
        this.setData({
          componentWidth: deviceWidth + 'px', // 设置组件的宽度属性
          innercomponentWidth: (deviceWidth) + 'px'
        });
      }
    });

  },

  fetchData: function() {
    // 调用getData函数获取数据
    utils.getData("focus").then(res => {
        console.log("所有数据")
        console.log(res)

        function limitFloatNumber(value, decimals) {
          return Number(value).toFixed(decimals);
        }

        var newRes = [];
        for (var i = 0; i < res.length; i++) {
          var currentDate = res[i].Date;
          var currentHours = parseFloat(res[i].Hours);  // 将字符串转换为浮点数
          var existingObjIndex = newRes.findIndex(function(obj) {return obj.Date === currentDate;});

            if (existingObjIndex !== -1) {
              newRes[existingObjIndex].Hours += currentHours;
            } else {
              var newObj = {  
                Date: currentDate,
                Weekday: res[i].Weekday,
                Hours: currentHours
              };
              newRes.push(newObj);
            }
        }
        console.log("newRes");
        console.log(newRes);

        // 对获取的数据进行排序，按日期降序排列
        const sortedData = newRes.sort((a, b) => b.Date.localeCompare(a.Date));
        console.log("sortedData");
        console.log(sortedData);

        // 将排序后的数据存储到页面数据的focusData属性中
        this.setData({
          focusData: sortedData
        });


        // 统计7天
        var today = new Date();  // 获取今天的日期
        var recentSevenDaysTotalHours = 0;  // 创建变量用于存储统计结果
        for (var i = 0; i < res.length; i++) {   // 遍历 res 数组
          // 获取当前对象的日期和小时
          var currentDate = new Date(res[i].Date);
          var currentHours = parseFloat(res[i].Hours);
          // 计算日期差值
          var timeDiff = today.getTime() - currentDate.getTime();
          var dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); // 将毫秒转换为天数
          // 判断日期差值是否在7天内
          if (dayDiff <= 7 && dayDiff >= 0) {
            recentSevenDaysTotalHours += currentHours;
          }
        }

        // 统计所有
        const Total = sortedData.reduce((total, item) => {
          return total + parseFloat(item.Hours);
        }, 0);

        this.setData({
          recentWeek: limitFloatNumber(recentSevenDaysTotalHours, 2),
          TotalHours: limitFloatNumber(Total, 2)
        });


      })
      .catch(err => {
        console.error('获取数据失败', err);
      });
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