import React from 'react';
import './Profile.css';
import { Avatar } from '@material-ui/core';


function Profile({name, imageUrl, statusMessage}) {
    return (
        <div className="profile">
            <Avatar className="avatar"/>
            <div className="profile__userdata">
                <h3>{name}</h3>
                <small>{statusMessage}</small>
            </div>
        </div>
    )
}

export default Profile;