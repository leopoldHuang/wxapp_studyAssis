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
    TodoList: [{
      "id": 0,
      "StartDate": "2023/07/15",
      "Attribute": "每天",
      "StartTime": "8:00",
      "Subject": "数学",
      "Content": "学习内容",
      "Duration": "240",
      "EndTime": "12:00"
    },
    {
      "id": 1,
      "StartDate": "2023/07/15",
      "Attribute": "每天",
      "StartTime": "14:00",
      "Subject": "政治",
      "Content": "学习内容",
      "Duration": "60",
      "EndTime": "15:00"
    },
    {
      "id": 2,
      "StartDate": "2023/07/15",
      "Attribute": "每天",
      "StartTime": "15:00",
      "Subject": "专业课",
      "Content": "学习内容",
      "Duration": "180",
      "EndTime": "18:00"
    },
    {
      "id": 3,
      "StartDate": "2023/07/15",
      "Attribute": "每天",
      "StartTime": "20:00",
      "Subject": "英语",
      "Content": "学习内容",
      "Duration": "180",
      "EndTime": "23:00"
    },
  ]
  },
  
  //底部导航改变 跳转
  onChangePage(event) {
    this.setData({
      active: event.detail,
    })
    wx.switchTab({      
      url: '../'+event.detail+'/'+ event.detail //要跳转到的页面路径
  }) 
  },
  //侧边栏打开或关闭
  onClose() {
    this.setData({
      show: !this.data.show
    });
  },
onshow:function(){
}
  //
})