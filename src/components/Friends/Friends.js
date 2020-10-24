import React, { useEffect, useState } from 'react';
import './Friends.css';
import { PersonAdd, Search } from '@material-ui/icons';
import { Avatar, Dialog, IconButton } from '@material-ui/core';
import Profile from '../Profile/Profile.js';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice.js';
import { db } from '../../firebase';

function Friends() {

    const user = useSelector(selectUser);
    const [friendAddToggle, setFriendAddToggle] = useState(false);
    const [friends, setFriends] = useState([]);
    const [findFriendEmailToAdd, setFindFriendEmailToAdd] = useState('');
    
    useEffect(() => {
        if(user){
            db.collection('users').doc(user.email).collection('friends').onSnapshot(snapshot => (
                snapshot.docs.map(doc => {
                    setFriends(
                        ...friends,
                        doc.data()
                    )
                })
            ))
        }
    }, []);

    const handleSearchBtnToFindFriend = (e) => {
        e.preventDefault();
        db.collection('users').doc(findFriendEmailToAdd).collection('info').onSnapshot(snapshot => (
            snapshot.docs.map(doc => {
                db.collection('users').doc(user.email).collection('friends').add({
                    email: doc.data().email,
                    profileName: doc.data().profileName,
                    profileUrl: doc.data().profileUrl,
                    stateMessage: doc.data().stateMessage
                });
            })
        ));
        
    }

    return (
        <div className="friends">
            <div className="friends__top">
                <div className="friends__top__info">
                    <h3>친구</h3>
                    <h3 className="friends__top__count">176</h3>
                </div>
                <IconButton>
                    <PersonAdd className="friends__top__add" onClick={e => setFriendAddToggle(true)}/> 
                </IconButton>
            </div>
            <div className="friends__search">
                <Search className="searchButton" />
                <input type="text" placeholder="이름으로 검색" className="searchInput"/>
            </div>
            <div className="friends__myprofile">
                <h3>내 프로필</h3>
                <Profile email={user.email} name={user.profileName} imageUrl={user.profileUrl} statusMessage={user.stateMessage}/>
            </div>
            <div className="friends__profile">
                <h3>친구</h3>
                {Array(friends).map(friend => (
                    <Profile 
                        email={friend.email} 
                        name={friend.profileName} 
                        imageUrl={friend.profileUrl} 
                        statusMessage={friend.stateMessage}
                    />
                ))}
                {console.log("friends : ", friends)}
            </div>
            <Dialog open={friendAddToggle} onClose={e => setFriendAddToggle(false)}  className="friends__toggle">
                <div className="friends__toggle__tab">
                    <h3>Email로 친구 추가</h3>
                </div>
                <form className="friends__toggle__search">
                    <Search className="icon"/>
                    <input type="text" placeholder="ID를 입력하세요" value={findFriendEmailToAdd} onChange={e => setFindFriendEmailToAdd(e.target.value)}/>
                    <button type="submit" onClick={handleSearchBtnToFindFriend}></button>
                </form>
                <div className="friends__toggle__result">
                    <p className="weight">Email ID로 친구를 추가 할 수 있습니다.</p>
                    <p className="normal">상대가 카카오 아이디를 등록하고,</p>
                    <p className="normal">검색허용한 경우 찾기가 가능합니다.</p>
                </div>
            </Dialog>
        </div>
    )
}

export default Friends;
