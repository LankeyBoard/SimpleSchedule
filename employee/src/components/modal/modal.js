import React, {useState} from 'react';
import './modal.css';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Modal = (props) => {

    const [startDate, setStartDate] = useState(new Date());

    return (
        <div>
            <div className="modal-wrapper" 
                style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',        
                }}>
                <div className="modal-header">
                    Availability Form
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                        <form>
                            <div className="whenSt">When is this availability starting?</div>
                            <DatePicker className="datePicker" 
                                todayButton="Today"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                            />
                            <div className="whatShift">What shift would you rather work:</div>
                            <label id="morning_lbl">Morning
                                <input type="radio" id="morning"></input>
                            </label>
                            <label id="everning_lbl">Evening
                                <input type="radio" id="evening"></input>
                            </label>
                            <div className="prefOff">What are your prefered days off:</div>
                            <label>Sunday
                                <input type="checkbox"></input>
                            </label>
                            <label>Monday
                                <input type="checkbox"></input>
                            </label>
                            <label>Tuesday
                                <input type="checkbox"></input>
                            </label>
                            <label>Wednesday
                                <input type="checkbox"></input>
                            </label>
                            <label>Thursday
                                <input type="checkbox"></input>
                            </label>
                            <label>Friday
                                <input type="checkbox"></input>
                            </label>
                            <label>Saturday
                                <input type="checkbox"></input>
                            </label>
                            <div className="prefWork">What are your prefered days to work:</div>
                            <label>Sunday
                                <input type="checkbox"></input>
                            </label>
                            <label>Monday
                                <input type="checkbox"></input>
                            </label>
                            <label>Tuesday
                                <input type="checkbox"></input>
                            </label>
                            <label>Wednesday
                                <input type="checkbox"></input>
                            </label>
                            <label>Thursday
                                <input type="checkbox"></input>
                            </label>
                            <label>Friday
                                <input type="checkbox"></input>
                            </label>
                            <label>Saturday
                                <input type="checkbox"></input>
                            </label>
                        </form>
                    </p>
                    <button className="btn-cancel" onClick={props.handleClose}>Cancel</button>      
                    <button className="btn-continue" onClick={props.handleClose}>Save</button>  
                </div>

            </div>
        </div>
    )
}

/*
    The modal should have: 
    Days you prefer to work - have off 
    |   M   | T    |   W   | TH   |  F   |  S   |  SU  |

    What times of the day would you rather work?
    Evening - Morning 

    Beginning date of availability 

*/
export default Modal;