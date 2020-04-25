import React, { useContext, useState, useEffect } from "react"
import closeIcon from './../images/close.png'
import { AppContext } from './../App'

const modalLookups = {
    eventDetails: {
        title: 'Event Details',
        style: {
            height: '300px',
            width: '600px'
        },
        showCancel: true
    }
}

export default (props) => {

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])

    const { modalState } = useContext(AppContext)
    const { 
        type, // tied to style...
        properties,
        style,
        showCancel,
        isOpen
    } = modalState


    const defaultOptions = modalLookups[type]

    let appliedTitle = ''
    if(defaultOptions && defaultOptions.title) appliedTitle = defaultOptions.title
    if(properties && typeof properties.title === 'string') appliedTitle = properties.title

    let appliedShowCancel = false
    if(defaultOptions && typeof defaultOptions.showCancel === 'boolean') appliedShowCancel = defaultOptions.showCancel
    if(showCancel && typeof showCancel === 'boolean') appliedShowCancel = showCancel

    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    const { toggleModal } = props

    const slowClose = () => {
        setIsLoaded(false)
        setTimeout(() => {
            toggleModal()
        }, 500)

    }


    const renderCancel = isShowing => {
        if(isShowing) return <div></div>
        return null
    }
    

    const modalClassName = isOpen ? "open" : "closed"
    const animating = isLoaded ? ' animating' : ''

    return <div id="modal-background" className={"flexbox-centered flexbox-wrapper pointerCursor "+modalClassName} onClick={slowClose}>
    <div id="modal-container" style={style} className={animating+" animated flexbox-wrapper vertical"} onClick={stopPropagation}>
      <div className="flexbox-wrapper pad-20 bottom-border">
          <span className="flexbox-item">{appliedTitle}</span>
        <img alt="closing button" className="pointerCursor" onClick={slowClose} src={closeIcon} height="20"/>
      </div>
      <div className="flexbox-item pad-20 bottom-border">
          ------Modal Body------
        </div>
      <div className="pad-20">
          {renderCancel(appliedShowCancel)}
      </div>
    </div>
  </div>
}