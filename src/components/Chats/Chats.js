import React from 'react';
import './Chats.css';
import { AddCircle, ArrowDropDown, Search } from '@material-ui/icons';

const tag = '[Chats]';

function Chats() {
    return (
        <div className="chats">
            <div className="chats__top">
                <h3>친구</h3>
                <h3>176</h3>
                
                <AddCircle/>
                
            </div>
            <div className="chats__search">
                <Search />
                <input type="text" placeholder="채팅방 이름, 참여자 검색"/>
            </div>
        </div>
    )
}

export default Chats;
