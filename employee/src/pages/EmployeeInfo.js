import React, {Component} from 'react';
import Modal from '../components/modal/modal';


class Info extends Component{
    constructor(props)
    {
        super(props)
        this.state = {
            show: true//false
        };
    }

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
            <h3>Employee Availability</h3>
            <p>A button will go here to open Availability function</p>
            <button type="button" onClick={this.showModal}>Availability</button>

            <Modal show={this.state.show} handleClose={this.hideModal}>
                <h3>Please update your availability</h3>
            </Modal>

            </div>
        
            </>
        )
    }

}

export default Info;