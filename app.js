// app.js
function schedule_data(startTime,endTime,name,type) {
  this.startTime = startTime;
  this.endTime = endTime;
  this.name = name;
  this.type = type;
}
function focus_data(date,focusHour) {
  this.date = date;
  this.focusHour = focusHour;
}
function note_data(noteTime,name,content) {
  this.noteTime = noteTime;
  this.name = name;
  this.content = content;
}


App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.cloud.init({//云开发初始化
      env: 'cloud1-6gie9r5mb33f9164',
      traceUser: true
    })

    // 登录 
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }
    })
    
    wx.cloud.callFunction({//获取openid
      name:'getOpenId',
    }).then(res=>{
      this.userOpenid=res.result.openid
      // console.log(this.userOpenid)
    })

    const db = wx.cloud.database()
    const schedule = db.collection('schedule')
    const focus = db.collection('focus')
    const note = db.collection('note')
    const setting = db.collection('setting')
    const collcetionArr = [schedule,focus,note,setting]

    var dataArr = []

    for(let i=0;i<4;i++){  
      collcetionArr[i].where({
        _openid: this.userOpenid
      }).get({
        success: function(res){
          // console.log("初始读取用户数据成功",res.data[1])
          dataArr[i]=res.data
          // console.log('g'+i,dataArr[i])
        },
        fail: function(err) {
          console.error('初始读取用户数据失败',err)
        }
      })
    }
    this.Data=dataArr
    console.log(this.Data)

    // console.log(userOpenid)

    // noteData.where({//查找函数
    //   content: "abc"
    // }).get({
    //   success: function(res) {
    //   // 输出查询结果
    //   console.log("aaaa")
    //   console.log(res.data[0].ddd[0])
    //   },
    //   fail: function(err) {
    //     console.error('查询用户信息失败', err)
    //   }
    // })

    // noteData.add({//添加函数
    //   data: {
    //     date: new Date(),
    //     name: setName,
    //     content: setContent
    //   },
    //   success: function(res) {
    //     console.log('数据插入成功', res)
    //   },
    //   fail: function(err) {
    //     console.error('数据插入失败', err)
    //   }
    // })
    
    // noteData.doc(noteId).update({//修改函数
    //   data: {
    //     date: new Date(),
    //     name: newName,
    //     content: newContent
    //   },
    //   success: function(res) {
    //     console.log('数据更新成功', res);
    //   },
    //   fail: function(err) {
    //     console.error('数据更新失败', err);
    //   }
    // });


  },
  globalData: {
    userOpenid: null,
    Data: null
  }
})
