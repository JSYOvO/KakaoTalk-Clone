import React, { useEffect, useState } from 'react';
import './Friends.css';
import { PersonAdd, Search } from '@material-ui/icons';
import { Avatar, Dialog, IconButton } from '@material-ui/core';
import Profile from '../Profile/Profile.js';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice.js';
import { db } from '../../firebase';
const tag = '[Friends]';

function Friends() {

    const user = useSelector(selectUser);
    const [friendAddToggle, setFriendAddToggle] = useState(false);
    const [friends, setFriends] = useState([]);
    const [findFriendEmailToAdd, setFindFriendEmailToAdd] = useState('');
    const [findFriendToggle, setFindFriendToggle] = useState(false);
    const [findFriendInfo, setFindFriendInfo] = useState({});
    const [friendCount, setFriendCount] = useState(0);
    const [filterCondition, setFilterCondition] = useState("");

    useEffect(() => {
        if(user){
            
            db.collection('users').doc(user.email).collection('friends').onSnapshot(snapshot => (  
                snapshot.docs.map(doc => {

                    db.collection('users').doc(doc.data().email).collection('info').onSnapshot(snapshot2 => (
                        snapshot2.docs.map(doc2 => {
                            setFriends(prevFriends => [...prevFriends, doc2.data()])
                        })
                    ))

                    // setFriends(prevFriends => [...prevFriends, doc.data()])
                    setFriendCount(friendCount => friendCount + 1);
                })
            ))
        }
    }, []);

    const handleSearchBtnToFindFriend = (e) => {
        e.preventDefault();
        db.collection('users').doc(findFriendEmailToAdd).collection('info').onSnapshot(snapshot => (
            snapshot.docs.map(doc => {
                setFindFriendInfo({
                    email: doc.data().email,
                    profileName: doc.data().profileName,
                    profileUrl: doc.data().profileUrl,
                    stateMessage: doc.data().stateMessage
                })
                setFindFriendToggle(true);
            })
        ));
    }

    const handleClickBtnToAddFriend = (e) => {
        e.preventDefault();

        db.collection('users').doc(user.email).collection('friends').where("email","==",findFriendInfo.email).get()
        .then(snapshot => {
            if(snapshot.empty){
                setFriends([]);
                db.collection('users').doc(user.email).collection('friends').add({
                    email: findFriendInfo.email,
                    profileName: findFriendInfo.profileName,
                    profileUrl: findFriendInfo.profileUrl,
                    stateMessage: findFriendInfo.stateMessage
                });
            }
            else{
                alert('이미 추가된 친구입니다.');
            }
        })

        setFriendAddToggle(false);
        setFindFriendEmailToAdd('');
    }

    return (
        <div className="friends">
            <div className="friends__top">
                <div className="friends__top__info">
                    <h3>친구</h3>
                    <h3 className="friends__top__count">{friendCount}</h3>
                </div>
                <IconButton>
                    <PersonAdd className="friends__top__add" onClick={e => setFriendAddToggle(true)}/> 
                </IconButton>
            </div>
            <div className="friends__search">
                <Search className="searchButton" />
                <input type="text" placeholder="이름으로 검색" className="searchInput" value={filterCondition} onChange={e => setFilterCondition(e.target.value)}/>
            </div>
            <div className="friends__myprofile">
                <h3>내 프로필</h3>
                <Profile email={user.email} name={user.profileName} imageUrl={user.profileUrl} statusMessage={user.stateMessage} me={true}/>
            </div>
            <div className="friends__profile">
                <h3>친구</h3>
                {friends?.map(friend => (
                    <Profile 
                        email={friend.email} 
                        name={friend.profileName} 
                        imageUrl={friend.profileUrl} 
                        statusMessage={friend.stateMessage}
                        me={false}
                        filterText={filterCondition}
                    />
                ))}
            </div>
            <Dialog open={friendAddToggle} onClose={e => setFriendAddToggle(false) & setFindFriendToggle(false) & setFindFriendEmailToAdd('') & setFindFriendInfo('')}  className="friends__toggle">
                <div className="friends__toggle__tab">
                    <h3>Email로 친구 추가</h3>
                </div>
                <form className="friends__toggle__search">
                    <Search className="icon"/>
                    <input type="text" placeholder="ID를 입력하세요" value={findFriendEmailToAdd} onChange={e => setFindFriendEmailToAdd(e.target.value)}/>
                    <button type="submit" onClick={handleSearchBtnToFindFriend}></button>
                </form>
                {!findFriendToggle &&
                    <div className="friends__toggle__result">
                        <p className="weight">Email ID로 친구를 추가 할 수 있습니다.</p>
                        <p className="normal">상대가 카카오 아이디를 등록하고,</p>
                        <p className="normal">검색허용한 경우 찾기가 가능합니다.</p>
                    </div>
                }
                {findFriendToggle &&
                    <div className="friends__toggle__result__data">
                        <Avatar src={findFriendInfo?.profileUrl} className="avatar"/>
                        <p>{findFriendInfo.profileName || findFriendInfo.email}</p>
                        <button onClick={handleClickBtnToAddFriend}>친구 추가</button>
                    </div>
                }
            </Dialog>
        </div>
    )
}

export default Friends;
