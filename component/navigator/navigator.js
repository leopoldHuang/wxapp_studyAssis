// component/navigator/navigator.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  /**
   * 组件的初始数据
   */
  data: {
    active: "index"
  },
  /**
   * 组件的方法列表
   */
  //颜色跟随系统
  attached() {
    this.PathChange()
    var app=getApp()
    this.setData({
      ChooseColor: app.globalData.theme.ChooseColor,
    })
  },
  methods: {
    //根据路径设置底部导航栏显示
    PathChange() {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1].route.split('/');
      this.setData({
        active: currentPage[currentPage.length - 1]
      })
    },
    //底部导航改变 跳转
    onChangePage(event) {
      wx.reLaunch({
        url: '../' + event.detail + '/' + event.detail //要跳转到的页面路径
      })
    }
  }
})