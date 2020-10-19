import React from 'react';
import './Sidebar.css';
import { PermIdentity, ChatBubbleOutline, MoreHoriz, Notifications, Brightness7 } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
const tag = '[Sidebar]';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_compUpper">
                <Link to="/friends">
                    <IconButton>
                        <PermIdentity className="sidebar__icon"/>
                    </IconButton>
                </Link>
                <Link to="/chats">
                    <IconButton>
                        <ChatBubbleOutline className="sidebar__icon"/>
                    </IconButton>                    
                </Link>
                <Link to="/options">
                    <IconButton>
                        <MoreHoriz className="sidebar__icon"/>
                    </IconButton>
                </Link>
            </div>

            <div className="sidebar__compLower">
                <IconButton>
                    <Notifications className="sidebar__icon"/>
                </IconButton>
                <IconButton>
                    <Brightness7 className="sidebar__icon"/>
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar;
