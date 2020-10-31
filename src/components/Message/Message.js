import { Avatar } from '@material-ui/core';
import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import './Message.css';

//ES6 
const Message = forwardRef(({
    id, 
    contents: {email, message, profileName, profileUrl, stateMessage, timestamp}
}, ref) => {

    const user = useSelector(selectUser);
    const time = new Date(timestamp?.toDate());
    const timeToShowFormat = `${time.getHours() < 10 ? `0${time.getHours().toString()}`:time.getHours().toString()}:${time.getMinutes() < 10 ? `0${time.getMinutes().toString()}` : time.getMinutes().toLocaleString()}`;
    return (
        <>
            {user.email !== email &&
                <div ref={ref} className="message">
                    {user.email !== email && <Avatar className="message__photo" src={profileUrl}/>}
                    <p>{message}</p>
                    <small>{timeToShowFormat}</small>
                </div>
            }
            {user.email === email &&
                <div ref={ref} className="message message__sender">
                    {user.email !== email && <Avatar className="message__photo" src={profileUrl}/>}
                    <small>{timeToShowFormat}</small>
                    <p>{message}</p>
                </div>
            }
        </>
        
    )
})

export default Message;
