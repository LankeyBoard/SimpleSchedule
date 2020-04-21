const moment = require("moment")
const events = [
    {
      start:  moment().toDate(),
      end:    moment().add(1, "days").toDate(),
      title:  "Felipe is testing Some title"
    },
    {
      start:  moment().subtract(2, "hours").toDate(),
      end:    moment().toDate(),
      title:  "Meeting about the project"
    },
    {
      start:  moment().toDate(),
      end:    moment().toDate(),
      title:  "Take care of the baby.",
      allDay: true,
    }
]

module.exports = {
    events
}