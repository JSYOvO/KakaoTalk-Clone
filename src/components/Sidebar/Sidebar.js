import React from 'react';
import './Sidebar.css';
import { Person, ChatBubble, MoreHoriz, Notifications, Brightness7 } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/userSlice';
const tag = '[Sidebar]';

function Sidebar() {
    const dispatch = useDispatch();
    const handleClickTools = () => {
        dispatch(logout());
    }

    return (
        <div className="sidebar">
            <div className="sidebar_compUpper">
                <Link to="/friends">
                    <IconButton>
                        <Person className="sidebar__icon"/>
                    </IconButton>
                </Link>
                <Link to="/chats">
                    <IconButton>
                        <ChatBubble className="sidebar__icon"/>
                    </IconButton>                    
                </Link>
                {/* <Link to="/options"> */}
                    <IconButton>
                        <MoreHoriz className="sidebar__icon"/>
                    </IconButton>
                {/* </Link> */}
            </div>

            <div className="sidebar__compLower">
                <IconButton>
                    <Notifications className="sidebar__icon"/>
                </IconButton>
                <IconButton>
                    <Brightness7 className="sidebar__icon" onClick={handleClickTools}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar;
