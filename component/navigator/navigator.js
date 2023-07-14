// component/navigator/navigator.js
var app=getApp();
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
    this.SetColor()
  },
  methods: {
    //颜色
    SetColor(){
      this.setData({
        ChooseColor: app.globalData.theme.ChooseColor,
        UnChooseColor: app.globalData.theme.UnChooseColor,
        ChooseFontColor: app.globalData.theme.ChooseFontColor,
        UnchooseFontColor: app.globalData.theme.UnchooseFontColor,
        BorderColor: app.globalData.theme.BorderColor,
      })
    },
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
      wx.switchTab({
        url: '../' + event.detail + '/' + event.detail //要跳转到的页面路径
      })
    }
  }
})