import React, { useEffect, useState } from 'react'
import './Setting.css';
import { Avatar, Dialog, IconButton, Badge } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { editProfile } from '../../features/userSlice';
import { db } from '../../firebase';

function Setting({email, name, imageUrl, statusMessage}) {

    const [profileName, setProfileName] = useState(name);
    const [profileImgUrl, setProfileImgUrl] = useState(imageUrl);
    const [profileStatusMessage, setProfileStatusMessage] = useState(statusMessage);
    const dispatch = useDispatch();

    const submit = () => {
        const myInfo = db.collection('users').doc(email).collection('info');
        
        myInfo.onSnapshot(snapshot => {
            snapshot.docs.map(doc => {
                db.collection('users').doc(email).collection('info').doc(doc.id).update({
                    profileName: profileName,
                    profileUrl: profileImgUrl,
                    stateMessage: profileStatusMessage
                })
            });
        })
        
        dispatch(editProfile({
            profileName: profileName,
            profileUrl: profileImgUrl,
            stateMessage: profileStatusMessage
        }))
    }

    return (
        <div className="setting">
            <div className="setting__header">
                <h3>환경설정</h3>
            </div>
            <div className="setting__content">
                <div className="setting__sidebar">
                    <h3>프로필</h3>
                </div>
                <div className="setting__main">
                    <div className="setting__main__info">
                        <Avatar src={imageUrl} className="avatar"/>
                        <p>계정 : {email}</p>
                    </div>
                    <div className="setting__main__edit">
                        <p>이름</p>
                        <input value={profileName} type="text" onChange={e => setProfileName(e.target.value)}/>
                        <p>상태메세지</p>
                        <input value={profileStatusMessage} type="text" onChange={e => setProfileStatusMessage(e.target.value)}/>
                        <p>프로필사진 링크</p>
                        <input value={profileImgUrl} type="text" onChange={e => setProfileImgUrl(e.target.value)}/>
                    </div>
                    <button onClick={submit}>적용</button>
                </div>
            </div>
            
        </div>
    )
}

export default Setting
