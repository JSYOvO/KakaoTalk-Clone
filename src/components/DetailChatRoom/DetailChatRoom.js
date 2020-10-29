import { Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import React, { useEffect, useState } from 'react';
import './DetailChatRoom.css';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import Message from '../Message/Message.js'

function DetailChatRoom({id, email, name, imageUrl, statusMessage, me}) {
    
    const [chatMessage, setChatMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);
    
    useEffect(() => {
        db.collection('chatRoom').doc(id).collection('messaging').orderBy('timestamp','asc')
        .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id : doc.id,
                    data : doc.data()
                })))
            }
        )
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        db.collection('chatRoom').doc(id).collection('messaging').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: chatMessage,
            email: user.email,
            profileName: user.profileName,
            profileUrl: user.profileUrl,
            stateMessage: user.stateMessage
        });

        setChatMessage("");
    }
    return (
        <div className="detailChattingroom">
            <div className="detailChattingroom__header">
                <Avatar src={imageUrl} className="avatar" />
                <div className="userInfo">
                    <h3>{name}</h3>
                    <div className="userCnt">
                        <FaceIcon className="icon"/>
                        <small>2</small>
                    </div>
                </div>
            </div>
            <div className="detailChattingroom__main">
                {messages.map(({id, data}) => (
                    <Message key={id} contents={data} />
                ))}
            </div>
            <div className="detailChattingroom__bottom">
                <div className="func">
                    <MoodIcon/>
                </div>
                <form className="messagebox">
                    <input type="text" value={chatMessage} onChange={e => setChatMessage(e.target.value)}/>
                    <button type="submit" onClick={handleSubmit}>전송</button>
                </form>
            </div>
        </div>
    )
}

export default DetailChatRoom;
