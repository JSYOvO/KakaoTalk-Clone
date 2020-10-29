import React, { useEffect } from 'react';
import './Profile.css';
import { Avatar, Dialog, IconButton } from '@material-ui/core';
import { useState } from 'react';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CreateIcon from '@material-ui/icons/Create';
import Setting from '../Setting/Setting.js';
import DetailChatRoom from '../DetailChatRoom/DetailChatRoom.js';

function Profile({email, name, imageUrl, statusMessage, me, filterText}) {

    const [modalToggle, setModalToggle] = useState(false);
    const [profileEditToggle, setProfileEditToggle] = useState(false);
    const [showProfile, setShowProfile] = useState(true);
    const [chattingRoomToggle, setChattingRoomToggle] = useState(false);
    useEffect(() => {
        if(filterText && (email.indexOf(filterText) >= 0 || name.indexOf((filterText)) >= 0)){
            setShowProfile(true);
        }
        else{
            if(!filterText) setShowProfile(true);
            else setShowProfile(false);
        }
        
    },[filterText])

    return (
        <>
            {showProfile && 
                <div className="profile">
                    <Avatar src={imageUrl} className="avatar" onClick={e => setModalToggle(true)}/>
                    <div className="profile__userdata">
                        <h3>{name || email}</h3>
                        <small>{statusMessage}</small>
                    </div>
                    <Dialog open={modalToggle} onClose={e => setModalToggle(false)} className="profile__modal">
                        <div className="profile__modal__upper">
                            <Avatar src={imageUrl} className="avatar"/>
                            <h3>{name || email}</h3>
                            <small>{statusMessage}</small>
                        </div>
                        <div className="profile__modal__lower">
                            <div className="chat">
                                <IconButton>
                                    <ChatBubbleIcon className="icon" onClick={e => setChattingRoomToggle(true)}/>
                                </IconButton>
                                <h3>채팅하기</h3>
                            </div>
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
                        <Setting  email={email} name={name} imageUrl={imageUrl} statusMessage={statusMessage}/>
                    </Dialog>
                    
                    <Dialog open={chattingRoomToggle} onClose={e => setChattingRoomToggle(false)} className="profile__chattingRoom">
                        {/* <DetailChatRoom
                            email={email} 
                            name={name} 
                            imageUrl={imageUrl} 
                            statusMessage={statusMessage}
                            me={me}
                        /> */}
                    </Dialog>
                </div>
            }
        </>
    )
}

export default Profile;