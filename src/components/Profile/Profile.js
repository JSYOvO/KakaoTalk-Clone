import React, { useEffect } from 'react';
import './Profile.css';
import { Avatar, Dialog, IconButton } from '@material-ui/core';
import { useState } from 'react';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CreateIcon from '@material-ui/icons/Create';
import Setting from '../Setting/Setting.js';
import DetailChatRoom from '../DetailChatRoom/DetailChatRoom.js';
import { db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

function Profile({email, name, imageUrl, stateMessage, me, filterText}) {

    const [modalToggle, setModalToggle] = useState(false);
    const [profileEditToggle, setProfileEditToggle] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [chattingRoomToggle, setChattingRoomToggle] = useState(false);
    const [chatRoomId, setChatRoomId] = useState("");
    const user = useSelector(selectUser);


    useEffect(() => {
        if(filterText && (email.indexOf(filterText) >= 0 || name.indexOf((filterText)) >= 0)){
            setShowProfile(true);
        }
        else{
            if(!filterText) setShowProfile(true);
            else setShowProfile(false);
        }

    },[filterText])

    useEffect(() => {
        db.collection('chatRoom').onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                if((doc.data().userList[0] === user.email && doc.data().userList[1] === email)
                 ||(doc.data().userList[1] === user.email && doc.data().userList[0] === email)){
                    setChatRoomId(doc.id);
                }
            })
        })
    }, [])

    const handleStartChatBtn = async(e) => {

        let chatRoomExist = false;
        
        var promise = new Promise((resolve, reject) => {
            db.collection('chatRoom').onSnapshot(snapshot => {   
                if(!snapshot.empty){
                    snapshot.docs.map((doc, idx) => {
                        if((doc.data().userList[0] === user.email && doc.data().userList[1] === email)
                         ||(doc.data().userList[1] === user.email && doc.data().userList[0] === email)){
                            chatRoomExist = true;
                        }
                        console.log(idx,snapshot.docs.length)
                        if(idx === snapshot.docs.length - 1){
                            resolve();
                        }
                    })
                } 
                else{
                    resolve();
                }
            })
        })

        promise.then(() => {
            if(!chatRoomExist){
                db.collection('chatRoom').add({
                    userList: [user.email, email],
                    userProfileName: [user.profileName, name],
                    userProfileUrl: [user.profileUrl, imageUrl],
                    userStateMessage: [user.stateMessage, stateMessage],
                    lastTimestamp: null,
                    lastMessage: ""
                })
            }
        })

        setChattingRoomToggle(true);
    }

    return (
        <>
            {showProfile && 
                <div className="profile">
                    <Avatar src={imageUrl} className="avatar" onClick={e => setModalToggle(true)}/>
                    <div className="profile__userdata">
                        <h3>{name || email}</h3>
                        <small>{stateMessage}</small>
                    </div>
                    <Dialog open={modalToggle} onClose={e => setModalToggle(false)} className="profile__modal">
                        <div className="profile__modal__upper">
                            <Avatar src={imageUrl} className="avatar"/>
                            <h3>{name || email}</h3>
                            <small>{stateMessage}</small>
                        </div>
                        <div className="profile__modal__lower">
                            {!me &&
                                <div className="chat">
                                    <IconButton>
                                        <ChatBubbleIcon className="icon" onClick={handleStartChatBtn}/>
                                    </IconButton>
                                    <h3>채팅하기</h3>
                                </div>
                            }
                            {me && 
                                <div className="profile">
                                    <IconButton>   
                                        <CreateIcon className="icon" onClick={e => setProfileEditToggle(true)}/>
                                    </IconButton>
                                    <h3>프로필 관리</h3>
                                </div>
                            }
                        </div>
                    </Dialog>
                    <Dialog open={profileEditToggle} onClose={e => setProfileEditToggle(false)} className="profile__modal2">
                        <Setting  email={email} name={name} imageUrl={imageUrl} stateMessage={stateMessage}/>
                    </Dialog>
                    
                    <Dialog open={chattingRoomToggle && chatRoomId} onClose={e => setChattingRoomToggle(false)} className="profile__chattingRoom">
                        <DetailChatRoom
                            id={chatRoomId}
                            email={email} 
                            name={name} 
                            imageUrl={imageUrl} 
                            stateMessage={stateMessage}
                            me={me}
                        />
                    </Dialog>
                </div>
            }
        </>
    )
}

export default Profile;