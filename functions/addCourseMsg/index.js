const cloud = require('wx-server-sdk');
wx.cloud.init({ 
  env: 'cloud1-6gie9r5mb33f9164',
  traceUser: true
})
const db = cloud.database();

exports.main = async (event, context) => {
  // 向 course-message 集合库中写入相关数据
  try {
    const { OPENID } = cloud.getWXContext();
    const result = await db.collection('course-message').add({
      data: {
        touser: OPENID, // 订阅者的openid
        page: 'index', // 订阅消息卡片点击后会打开小程序的哪个页面，注意这里的界面是线下小程序有的，否则跳不过去
        data: event.data, // 订阅消息的数据（课程信息）
        templateId: event.templateId, // 订阅消息模板ID
        isSend: false, // 消息发送状态设置为 false
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
};
