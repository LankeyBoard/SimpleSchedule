
const backgroundColorStyleLookup = {
  pending: 'dimgrey',
  accepted: 'aquamarine',
  rejected: 'crimson'
}

const ColorStyleLookup = {
  pending: 'white',
  accepted: 'black',
  rejected: 'white'
}

export default class EventService
{

  static getEventStyle(eventRef) {
        let style = {}
        if(eventRef && eventRef.isTimeOff) {
          return {
            style: {
                backgroundColor: backgroundColorStyleLookup[eventRef.status],
                color: ColorStyleLookup[eventRef.status],
                fontWeight: 100
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