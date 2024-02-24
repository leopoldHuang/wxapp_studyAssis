const OpenID=null

function getOpenID(){//获取openid
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name:'getOpenId',
      success: function(res) {
        // this.OpenID=res
        console.log("获取OpenID成功",res)
        resolve(res)
      },
      fail: function(err) {
        console.log("获取OpenID失败",err)
        reject(err)
      }
    })
  });
}

function getData(databaseName) {//获取数据
  return new Promise((resolve, reject) => {
    wx.cloud.database().collection(databaseName).where({
      _openid: this.OpenID
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

function updateData(databaseName,id,data) {//修改和删除函数，data为null即为删除此数据，不为null即为修改此数据
  if(data!=null){
    return new Promise((resolve, reject) => {
      wx.cloud.database().collection(databaseName).doc(id).update({//修改函数
        data: data,
        success: function(res) {
          resolve(res);
        },
        fail: function(err) {
          reject(err); // 失败时将错误传递给 reject 函数
        }
      });
    });
  }
  else{
    return new Promise((resolve, reject) => {
      wx.cloud.database().collection(databaseName).doc(id).remove({//删除函数
        success: function(res) {
          console.log(res)
          resolve(res);
        },
        fail: function(err) {
          reject(err); // 失败时将错误传递给 reject 函数
        }
      });
    });
  }
}



module.exports = {
  getOpenID: getOpenID,
  getData: getData,
  addData: addData,
  updateData: updateData
}