import React from 'react';
export default (props) => {
    
    const { avatarUrl } = props

    return <div id="left_sidebar" className="flexbox-wrapper vertical">
        <h2 className="text-alignedCenter">Emplyee Info</h2>
        <div className="flexbox-centered flexbox-wrapper">
            <img width="200" src={avatarUrl} />
        </div>
        <p>Name</p>
        <p>More info ... total hours, areas allowed to work, etc.</p>
    </div>
}