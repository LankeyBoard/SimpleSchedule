export default class EventService
{
    static getEventStyle(eventRef) {
        
        // default event, no style
        let style = {}
        
        // time off events are red
        if(eventRef && eventRef.isTimeOff) {
            return { style: {
                backgroundColor: 'crimson',
                color: 'white',
            }
          }
        }

        // unassigned events are light blue
        if(eventRef && eventRef.userObjectId === '') {
            return {
              style: {
                background: 'lightskyblue',
                color: 'black'
              }
            }
        }

        // 'palegoldenrod' - yellow
        if(eventRef && eventRef.userObjectId !== '' && eventRef.status === 'pending') {
            return {
                style: {
                  background: 'palegoldenrod',
                  color: 'black'
                }
              }
        }

        return {style}
    }
}