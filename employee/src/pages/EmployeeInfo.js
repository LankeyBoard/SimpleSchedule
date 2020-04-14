import React from 'react';
import ReactDom from 'react-dom';

const TimeOff = () => (
    <>
    <form>
        <h1>Time Off Request Form</h1>
        <br></br>
        <div style={{backgroundColor: "lightblue"}}>
            <p>Name: </p>
            <input
                type="text"
            />
            <br></br>
            <br></br>
            <p>Employee ID: </p>
            <input
                type="text"
            />
            <br></br>
            <br></br>
            <p>Leaving Date: </p>
            <input
                type="text"
            />
            <br></br>
            <br></br>
            <p>Returning Date: </p>
            <input
                type="text"
            />
            <br></br>
            <br></br>
        </div> 
        <button>Submit</button>   
    </form>
    </>
)
export default TimeOff;
