import { Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/Face';
import MoodIcon from '@material-ui/icons/Mood';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import React, { createRef, useEffect, useState } from 'react';
import './DetailChatRoom.css';
import { db } from '../../firebase';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import Message from '../Message/Message.js'

function DetailChatRoom({id, email, name, imageUrl, statusMessage, me, setLastStatus}) {
    
    const [chatMessage, setChatMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);
    const [myRef, setMyRef] = useState(() => createRef());
    
    useEffect(() => {
        setMessages([]);
        db.collection('chatRoom').doc(id).collection('messaging').orderBy('timestamp','asc')
        .onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => ({
                    id : doc.id,
                    data : doc.data()
                })))
                if(myRef.current) {
                    myRef.current.scrollTop = myRef.current?.scrollHeight || 0 - myRef.current?.clientHeight || 0;
                }
            }
        )
    }, [])

    useEffect(() => {
        const time = messages[messages.length - 1]?.data.timestamp?.toDate();
        if(time){
            const timeMonth   = time?.getMonth() < 10 ? `0${time?.getMonth().toString()}` : time?.getMonth().toString();
            const timeDate    = time?.getDate() < 10 ? `0${time?.getDate().toString()}` : time?.getDate().toString();
            const timeHours   = time?.getHours() < 10 ? `0${time?.getHours().toString()}` : time?.getHours().toString();
            const timeMinutes = time?.getMinutes() < 10 ? `0${time?.getMinutes().toString()}` : time?.getMinutes().toString();
            const timeSeconds = time?.getSeconds() < 10 ? `0${time?.getSeconds().toString()}` : time?.getSeconds().toString();
            const lastTime = timeMonth + '.' + timeDate + ' ' + timeHours + ':' + timeMinutes + ':' + timeSeconds;

            if(setLastStatus){
                setLastStatus({
                    lastMessage: messages[messages.length - 1]?.data.message,
                    lastTimestamp: lastTime
                })
            }
        }
        
    }, [messages])

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

        // db.collection('chatRoom').doc(id).update({
        //     lastMessage: chatMessage,
        //     lastTimestamp: firebase.firestore.FieldValue.serverTimestamp()
        // })

        // const time = new Date();

        // setLastStatus({
        //     lastMessage: chatMessage,
        //     lastTimestamp: `${time.getMonth() < 10 ? `0${time.getMonth().toString()}` : time.getMonth().toString()}.${time.getDate() < 10 ? `0${time.getDate().toString()}` : time.getDate().toString()} ${time.getHours() < 10 ? `0${time.getHours().toString()}`:time.getHours().toString()}:${time.getMinutes() < 10 ? `0${time.getMinutes().toString()}` : time.getMinutes().toLocaleString()}`
        // })

        setChatMessage("");
        console.log("handleSubmit()")
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
            <div className="detailChattingroom__main" ref={myRef}>
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
