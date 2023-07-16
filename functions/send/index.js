// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
}) // 使用当前云环境

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database() // 获取数据库的引用
  const scheduleCollection = db.collection('schedule') // 获取schedule集合的引用

  // 查询当前时间之后的日程数据
  const currentDate = new Date();
  const res = await scheduleCollection.where({
    // startTime: db.command.gte(currentDate.toISOString()) // 大于等于当前时间的开始时间
  }).get()


  const schedules = res.data
  console.log(schedules)

  // 遍历查询结果，进行提醒操作
  for (let i = 0; i < schedules.length; i++) {
    const schedule = schedules[i]
    var currentdate = (new Date()).getTime()
    var reminddate = (new Date(schedule.startTime)).getTime() - parseInt(schedule.remind) * 60*1000
    if (currentdate < reminddate) continue
    if (!schedule.remindable) {
      cloud.database().collection('schedule').doc(schedule._id).update({
        //修改函数
        data:{
          'remindable': true,
        },
        success: function (res) {
          console.log(1)
          resolve(res);
        },
        fail: function (err) {
          reject(err); // 失败时将错误传递给 reject 函数
        }
      });
      // 实现提醒逻辑，例如发送订阅消息
      const result = await cloud.openapi.subscribeMessage.send({
        touser: schedule._openid,
        page: 'pages/index/index',
        data: {
          thing5: {
            value: schedule.name
          },
          time6: {
            value: schedule.startTime
          },
          date9: {
            value: schedule.endTime
          },
          thing11: {
            value: schedule.content
          }
        },
        templateId: 'osj8Q4XJQgjYWbqHcqYMNFsnOw3ZBSBnTvlKR0OSiAA'
      })
      console.log(result)
    }else{
      console.log(2)
    }
  }

  // return '定时提醒执行成功'
}