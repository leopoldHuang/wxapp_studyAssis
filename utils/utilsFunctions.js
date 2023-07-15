const app=getApp()


function getData(databaseName) {//获取数据 
  return new Promise((resolve, reject) => { 
    wx.cloud.database().collection(databaseName).where({ 
      _openid: app.globalData.OpenID
    }).get().then(res => { 
      // console.log('yes', res.data); 
      resolve(res.data); 
    }).catch(err => { 
      console.error('查询用户信息失败', err); 
      reject(err); // 将错误传递给 reject 
    }); 
  }); 
} 
 
function addData(databaseName,data) { 
  return new Promise((resolve, reject) => { 
    wx.cloud.database().collection(databaseName).add({ 
      data: data, 
      success: function (res) { 
        resolve(res); // 成功时将结果传递给 resolve 函数 
      }, 
      fail: function (err) { 
        reject(err); // 失败时将错误传递给 reject 函数 
      } 
    }); 
  }); 
} 
 
 
module.exports = { 
  getData: getData, 
  addData: addData 
};