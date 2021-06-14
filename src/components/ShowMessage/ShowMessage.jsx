import React from 'react';
import './ShowMessage.css';

function ShowMessage(props) {
    if (props.msg) {
        return <div className="alert alert-danger" role="alert">{ props.msg }</div>
    } else {
        return ''
    }
}

export default ShowMessage