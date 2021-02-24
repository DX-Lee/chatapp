import moment from 'moment'
// 格式化聊天列表的时间
moment.locale('zh-cn')
export function formatChatListTime (target) {
  return moment(target).calendar(null, {
    sameDay: 'HH:mm',
    lastDay: '[昨天]',
    lastWeek: 'dddd',
    nextDay: '[明天] HH:mm',
    nextWeek: 'dddd',
    sameElse: function (now) {
      if (this.isSame(now, 'year')) {
        return 'MM-DD'
      } else {
        return 'yyyy-MM-DD'
      }
    }
  })
}
// 格式化基本时间
export function formatTime (target) {
  return moment(target).calendar(null, {
    sameDay: '[今天] HH:mm',
    lastDay: '[昨天] HH:mm',
    lastWeek: 'MM-DD HH:mm',
    nextDay: '[明天] HH:mm',
    nextWeek: 'MM-DD HH:mm',
    sameElse: function (now) {
      if (this.isSame(now, 'year')) {
        return 'MM-DD HH:mm'
      } else {
        return 'yyyy-MM-DD HH:mm'
      }
    }
  })
}
