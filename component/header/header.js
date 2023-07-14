// component/header/header.js
Component({
  properties: {
    Title: String
  },
  //侧边栏打开或关闭
  methods: {
    SideClose() {
      this.setData({
        show: !this.data.show
      });
    },
  }
})