import React, {Component} from 'react';
import Modal from '../components/modal/modal';


class Info extends Component{

    state = {show: false};

    showModal = () => { 
        this.setState({show: true})
    };
    
    hideModal = () => { 
        this.setState({show: false})
    };

    render() {
        return (
            <>
            <h1>Employee Info</h1>
            <p>This will be the epmloyees basic info, pay rate, etc </p>
        
            <div>
            <h4>Employee Availability</h4>
            <p>Click here if you would like to update your availability</p>
            <button className="avaiButton" type="button" onClick={this.showModal}>Change Availability</button>

            <Modal             
            show={this.state.show} 
            handleClose={this.hideModal} >
                <h3>Please update your availability</h3>
            </Modal>

            </div>
        
            </>
        )
    }

}

export default Info;