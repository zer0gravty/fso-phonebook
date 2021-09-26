import React from 'react';
import './Notification.css';

const Notification = ({ message, type }) => {
    if (message === null) {
        return null
    }

    return (
        <p className={`msg msg-${type}`}>
            {message}
        </p>
    )
}

export default Notification
