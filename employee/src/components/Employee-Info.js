import React from 'react';
import '../css/employeInfo.css'

export default (props) => {
    
    const { avatarUrl } = props

    return <div id="left_sidebar" className="flexbox-wrapper vertical">
        <h2 className="text-alignedCenter">Employee Info</h2>
        <div className="flexbox-centered flexbox-wrapper">
            <img width="200" src={avatarUrl} />
        </div>

        <div>
             <p>Name</p>
             <p>More info ... total hours, areas allowed to work, etc.</p>
        </div>
</div>

}