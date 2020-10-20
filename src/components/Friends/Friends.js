import React from 'react';
import './Friends.css';
import { PersonAdd, Search } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import Profile from '../Profile/Profile.js';

function Friends() {
    return (
        <div className="friends">
            <div className="friends__top">
                <div className="friends__top__info">
                    <h3>친구</h3>
                    <h3 className="friends__top__count">176</h3>
                </div>
                <IconButton>
                    <PersonAdd className="friends__top__add"/>                
                </IconButton>
            </div>
            <div className="friends__search">
                <Search className="searchButton" />
                <input type="text" placeholder="이름으로 검색" className="searchInput"/>
            </div>
            <div className="friends__myprofile">
                <h3>내 프로필</h3>
                <Profile name="유재섭" imageUrl="" statusMessage="JSYOvO"/>
            </div>
            <div className="friends__profile">
                <h3>친구</h3>
                <Profile name="호랑이1" imageUrl="" statusMessage="어흥1"/>
                <Profile name="호랑이2" imageUrl="" statusMessage="어흥2"/>
                <Profile name="호랑이3" imageUrl="" statusMessage="어흥3"/>
                <Profile name="호랑이4" imageUrl="" statusMessage="어흥4"/>
                <Profile name="호랑이5" imageUrl="" statusMessage="어흥5"/>
                <Profile name="호랑이6" imageUrl="" statusMessage="어흥6"/>
                <Profile name="호랑이7" imageUrl="" statusMessage="어흥7"/>
                <Profile name="호랑이8" imageUrl="" statusMessage="어흥8"/>
                <Profile name="호랑이9" imageUrl="" statusMessage="어흥9"/>
                <Profile name="호랑이10" imageUrl="" statusMessage="어흥10"/>
            </div>
        </div>
    )
}

export default Friends;
