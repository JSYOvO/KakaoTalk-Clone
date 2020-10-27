import React, { useEffect, useState } from 'react';
import './Chats.css';
import { AddCircle, ArrowDropDown, Search } from '@material-ui/icons';
import { Avatar, Dialog, IconButton } from '@material-ui/core';
import Talk from '../Talk/Talk.js'
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { db } from '../../firebase';
import { selectFriends } from '../../features/friendsSlice';
const tag = '[Chats]';

function Chats() {

    const user = useSelector(selectUser);
    const friends = useSelector(selectFriends);
    const [chats, setChats] = useState([]);
    const [findChatPartnerToggle, setFindChatPartnerToggle] = useState(false);
    const [findFriendToChat, setFindFriendToChat] = useState('');
    const [findFriendToggle, setFindFriendToggle] = useState(false);
    const [findFriendInfo, setFindFriendInfo] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        db.collection('users').doc(user.email).collection('chats').onSnapshot(snapshot => {
            setChats(
                snapshot.docs.map(doc => ({
                    id : doc.id,
                    data: doc.data()
                }))
            )
        })
    }, []);

    const handleSearchBtnToFindFriend = (e) => {
        e.preventDefault();

        // db.collection('users').doc(findFriendToChat).collection('info').onSnapshot(snapshot => (
        //     snapshot.docs.map(doc => {
        //         setFindFriendInfo({
        //             email: doc.data().email,
        //             profileName: doc.data().profileName,
        //             profileUrl: doc.data().profileUrl,
        //             stateMessage: doc.data().stateMessage
        //         })
        //         setFindFriendToggle(true);
        //     })
        // ));
        
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
                <input type="text" placeholder="채팅방 이름, 참여자 검색" className="searchInput"/>
            </div>

            <div className="chats__talk">
                
            </div>

            <Dialog open={findChatPartnerToggle} onClose={e => setFindChatPartnerToggle(false)} className="chats__dialog">
                <div className="chats__dialog__tab">
                    <h3>채팅할 대화상대를 검색해주세요.</h3>
                </div>
                <form className="chats__dialog__search">
                    <Search className="icon"/>
                    <input type="text" placeholder="ID를 입력하세요" value={findFriendToChat} onChange={e => setFindFriendToChat(e.target.value)}/>
                    <button type="submit" onClick={handleSearchBtnToFindFriend}></button>
                </form>
                {!findFriendToggle &&
                    <div className="chats__toggle__result">
                        <p className="weight">Email ID로 채팅할 친구를 선택 할 수 있습니다.</p>
                    </div>
                }
                {findFriendToggle &&
                    <div className="chats__toggle__result__data">
                        <Avatar src={findFriendInfo?.profileUrl} className="avatar"/>
                        <p>{findFriendInfo.profileName || findFriendInfo.email}</p>
                        <button onClick={handleClickBtnToAddPartner}>친구 추가</button>
                    </div>
                }
            </Dialog>
        </div>
    )
}

export default Chats;
