// pages/notebook2/notebook2.js

var utils = require('../../utils/utilsFunctions');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content:'',
    date:'',
    life:'',
    _id:'',
    NotebookMessage:{
      title:'',
      content:'',
      date: ''
    },
  },

 ChangeTitle(event) {
    // event.detail 为当前输入的值
    this.setData({
      title: event.detail
    });
  },

  ChangeContent(event) {
    // event.detail 为当前输入的值
    this.setData({
      content: event.detail
    });
  },

  /**
   * 生命周期函数--从云数据库下载数据存放到NotebookMessage中,如云中不存在，则新建id和日期
   */
  onLoad(options) {
    this.data.life = options.add_modify;
    var title='',_id='',content='';
    if(this.data.life==="1"){
      title = options.title;
      _id = options.id;
      content = options.content;
    }
    this.setData({
      title:title,
      _id:_id,
      content:content
    })
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

  },

  //回到笔记主页面
  onClickLeft() {
    wx.switchTab({
      url: '../notebook/notebook' //要跳转到的页面路径
    })
  },

  //保存信息
  onClickRight(){
    this.data.NotebookMessage.title=this.data.title;
    this.data.NotebookMessage.content=this.data.content;
    this.data.NotebookMessage.date= new Date().toLocaleString() ;
    // 缺一个删除云记录信息，并上传操作
    if(this.data.life==="0"){ 
      utils.addData('note',this.data.NotebookMessage);
      this.data.life="1";
    }
    else utils.updateData('note',this.data._id,this.data.NotebookMessage)
  }
  
})