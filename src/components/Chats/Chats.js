import React, { useEffect, useState } from 'react';
import './Chats.css';
import { AddCircle, ArrowDropDown, Search } from '@material-ui/icons';
import { Avatar, Dialog, IconButton } from '@material-ui/core';
import Talk from '../Talk/Talk.js'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';
import { selectFriends } from '../../features/friendsSlice';
import firebase from 'firebase';
import ChatRoom from '../ChatRoom/ChatRoom.js';
const tag = '[Chats]';

function Chats() {

    const user = useSelector(selectUser);
    const friends = useSelector(selectFriends);
    const [chattingRooms, setChattingRooms] = useState([]);
    const [findChatPartnerToggle, setFindChatPartnerToggle] = useState(false);
    const [findFriendToChat, setFindFriendToChat] = useState('');
    const [findFriendToggle, setFindFriendToggle] = useState(false);
    const [findFriendInfo, setFindFriendInfo] = useState({});
    const [filterCondition, setFilterCondition] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        
        db.collection('users').doc(user.email).collection('chatWith').onSnapshot(snapshot => {
            setChattingRooms([]);
            snapshot.docs.map(doc => {
               setChattingRooms(prevChattingRooms => [...prevChattingRooms, doc.data()])
            })
        })
    }, []);

    const handleSearchBtnToFindFriend = (e) => {
        e.preventDefault();
        
        console.log(friends);
        friends.info.map(friend => {
            if(friend.profileName === findFriendToChat){
                setFindFriendInfo({
                    email: friend.email,
                    profileName: friend.profileName,
                    profileUrl: friend.profileUrl,
                    stateMessage: friend.stateMessage
                })
                setFindFriendToggle(true);
            }
        })

        console.log(findFriendInfo);
    }

    const handleClickBtnToAddPartner = (e) => {
        e.preventDefault();

        db.collection('users').doc(user.email).collection('chatWith').where("chatWithProfileName","==",findFriendInfo.profileName).get()
        .then(snapshot => {
            if(snapshot.empty){
                db.collection('users').doc(user.email).collection('chatWith').add({
                    chatWithEmail: findFriendInfo.email,
                    chatWithProfileName: findFriendInfo.profileName,
                    chatWithProfileUrl: findFriendInfo.profileUrl,
                    chatWithStateMessage: findFriendInfo.stateMessage,
                    timestamp: null,
                    message: null
                })
            }

        })

        setFindChatPartnerToggle(false);
        setFindFriendToChat('');
        setFindFriendToggle(false);
        setFindFriendInfo({});
        setChattingRooms([]);

    }

    return (
        <div className="chats">
            <div className="chats__top">                
                <div className="chats__top__info">
                    <h3>채팅</h3>
                    <IconButton>
                        <ArrowDropDown className="arrowdropdown"/>
                    </IconButton>
                </div>
                <IconButton>
                    <AddCircle className="chats__top__add" onClick={e => setFindChatPartnerToggle(true)}/>
                </IconButton>
            </div>

            <div className="chats__search">
                <Search className="searchButton"/>
                <input type="text" placeholder="채팅방 검색" className="searchInput" value={filterCondition} onChange={e => setFilterCondition(e.target.value)}/>
            </div>

            <div className="chats__talk">
                {chattingRooms.map(chattingRoom => (
                    <ChatRoom
                        chatWithEmail= {chattingRoom.chatWithEmail}
                        chatWithProfileName= {chattingRoom.chatWithProfileName}
                        chatWithProfileUrl= {chattingRoom.chatWithProfileUrl}
                        chatWithStateMessage= {chattingRoom.chatWithStateMessage}
                        timestamp= {chattingRoom.timestamp}
                        message= {chattingRoom.message}
                        filterCondition= {filterCondition}
                    />
                ))}
            </div>

            <Dialog open={findChatPartnerToggle} onClose={e => setFindChatPartnerToggle(false) & setFindFriendToChat('') & setFindFriendToggle(false) & setFindFriendInfo({})} className="chats__dialog">
                <div className="chats__dialog__tab">
                    <h3>채팅할 대화상대를 검색해주세요.</h3>
                </div>
                <form className="chats__dialog__search">
                    <Search className="icon"/>
                    <input type="text" placeholder="프로필을 입력하세요" value={findFriendToChat} onChange={e => setFindFriendToChat(e.target.value)} autoFocus/>
                    <button type="submit" onClick={handleSearchBtnToFindFriend}></button>
                </form>
                {!findFriendToggle &&
                    <div className="chats__toggle__result">
                        <p className="weight">프로필로 채팅할 친구를 선택하세요.</p>
                    </div>
                }
                {findFriendToggle &&
                    <div className="chats__toggle__result__data">
                        <Avatar src={findFriendInfo?.profileUrl} className="avatar"/>
                        <p>{findFriendInfo.profileName || findFriendInfo.email}</p>
                        <button onClick={handleClickBtnToAddPartner}>대화 시작</button>
                    </div>
                }
            </Dialog>
        </div>
    )
}

export default Chats;
