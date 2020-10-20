import React from 'react';
import './Chats.css';
import { AddCircle, ArrowDropDown, Search } from '@material-ui/icons';
import { Avatar, IconButton } from '@material-ui/core';
import Talk from '../Talk/Talk.js'
const tag = '[Chats]';

function Chats() {
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
                    <AddCircle className="chats__top__add"/>
                </IconButton>
            </div>

            <div className="chats__search">
                <Search className="searchButton"/>
                <input type="text" placeholder="채팅방 이름, 참여자 검색" className="searchInput"/>
            </div>

            <div className="chats__talk">
                <Talk name="호랑이1" imageUrl="" lastMessage="어흥1" lastUpdataTime="20201001000001"/>
                <Talk name="호랑이2" imageUrl="" lastMessage="어흥2" lastUpdataTime="20201001000002"/>
                <Talk name="호랑이3" imageUrl="" lastMessage="어흥3" lastUpdataTime="20201001000003"/>
                <Talk name="호랑이4" imageUrl="" lastMessage="어흥4" lastUpdataTime="20201001000004"/>
                <Talk name="호랑이5" imageUrl="" lastMessage="어흥5" lastUpdataTime="20201001000005"/>
                <Talk name="호랑이6" imageUrl="" lastMessage="어흥6" lastUpdataTime="20201001000006"/>
                <Talk name="호랑이7" imageUrl="" lastMessage="어흥7" lastUpdataTime="20201001000007"/>
                <Talk name="호랑이8" imageUrl="" lastMessage="어흥8" lastUpdataTime="20201001000008"/>
                <Talk name="호랑이9" imageUrl="" lastMessage="어흥9" lastUpdataTime="20201001000009"/>
                <Talk name="호랑이10" imageUrl="" lastMessage="어흥10" lastUpdataTime="20201001000010"/>
            </div>
        </div>
    )
}

export default Chats;
