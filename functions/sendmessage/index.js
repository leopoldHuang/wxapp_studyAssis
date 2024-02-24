// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ 
  env: 'cloud1-6gie9r5mb33f9164',
  traceUser: true
})
// const db = cloud.database()
// var request = require('request')
// 定时器
exports.main = async(event, context) => {

}