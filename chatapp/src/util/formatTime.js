import moment from 'moment'
export default function formatTime (target) {
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
