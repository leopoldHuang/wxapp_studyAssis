// pages/notebook/notebook.js

var util = require('../../utils/util.js');
//引入wxcharts.js插件
var wxCharts = require("../../utils/wxcharts");

var utils = require('../../utils/utilsFunctions');
//定义记录初始屏幕宽度比例，便于初始化
var windowW = 0;

var databaseName = "note";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    bool:true,
    ShowNotebooks:[],
    TotalNotebooks:[
      {
        content:"内容",
        title:"标题1",
        date:"Thu Jul 13 2023 08:34:14 GMT+0800 (中国标准时间)"
      },{
        content:"内容",
        title:"标题2",
        date:"Thu Jul 13 2023 08:34:56 GMT+0800 (中国标准时间)"
      },{
        content:"内容",
        title:"标题3",
        date:"Thu Jul 14 2023 08:34:14 GMT+0800 (中国标准时间)"
      },{
        content:"内容",
        title:"标题4",
        date:"Thu Jul 14 2023 08:45:14 GMT+0800 (中国标准时间)"
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    //主题颜色
    var app=getApp()
    this.setData({
      ChooseColor: app.globalData.theme.ChooseColor,
    })
    utils.getData('note').then(res => {
      // 在 then 方法的回调函数中更新页面数据
      this.setData({
        TotalNotebooks:res,
        ShowNotebooks:res
      });
    }).catch(err => {
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
  // onShow:function() {
  //   TotalNotebooks=this.TotalNotebooks
  //   this.setData({
  //     TotalNotebooks: TotalNotebooks
  //   })
  // },

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

  },

  onChangePage(event) {
    this.setData({
      active: event.detail,
    })
    wx.switchTab({      
      url: '../'+event.detail+'/'+ event.detail //要跳转到的页面路径
  }) 
  },

  ToNotebook2() {
    wx.reLaunch({
      url: '../notebook2/notebook2?add_modify=0' //要跳转到的页面路径
    })
  },

  ToNotebook1(event) {
    var n = '&id='+event.currentTarget.dataset.saveid+'&title='+event.currentTarget.dataset.savetitle+'&content='+event.currentTarget.dataset.savecontent;
    wx.reLaunch({
      url: '../notebook2/notebook2?add_modify=1'+n //要跳转到的页面路径
    })
  },

  SearchKey(event){
    this.setData({
      keyword: event.detail
    })
  },

  Filters(){
    var array=[];
    for(var i=0;i<this.data.TotalNotebooks.length;i++){
      if(this.data.TotalNotebooks[i].title.indexOf(this.data.keyword)>=0) array.push(this.data.TotalNotebooks[i]);
    }
    this.setData({
      ShowNotebooks:array
    })
  },
  delete(event){
    wx.showModal({
      title: '温馨提示',
      content: '是否要删除这条日记？',
      success(res){
        if(res.cancel){
          //点击取消,默认隐藏弹框
        }else{
          utils.updateData('note',event.currentTarget.dataset.saveid,null)
          wx.reLaunch({
            url: '../notebook/notebook' //要跳转到的页面路径
          })
        }
      }
    })
  }
})

