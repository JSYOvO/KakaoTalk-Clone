import React from 'react';
import './Login.css';
import { auth, db } from '../../firebase.js';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { selectUser, login, logout } from '../../features/userSlice.js'
import { useDispatch, useSelector } from 'react-redux';

const tag = '[Login]';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(selectUser)
    const dispatch = useDispatch();
    
    const handleLogin = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(tag, auth);

            if(auth){
                db.collection('users').doc(email).collection('info').where("email","==",email).get()
                .then(snapshot => {
                    if(snapshot.empty){
                        console.log("snapshot is empty");
                        db.collection('users').doc(email).collection('info').add({
                            email: email,
                            profileName: "",
                            profileUrl: "",
                            stateMessage: ""
                        });
                    }

                    dispatch(login({
                        email: email,
                        profileName: "",
                        profileUrl: "",
                        stateMessage: ""
                    }))
                })
                
                history.push('/');
            }
        })
        .catch(error => alert(error.message));
    }

    const handleJoin = (e) => {
        e.preventDefault();

        if(email && password){
            auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                console.log(tag, auth);

                if(auth){
                    // history.push('/Join');
                    setEmail('');
                    setPassword('');
                }
            })
            .catch(error => alert(error.message));
        }

    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://lh3.googleusercontent.com/proxy/bDFo3natSAxAqy0vVQf4kXY4_x1fzse8VUQMTlEMkMFtAQD5mOXLbP2ZOtjEmbaBql-4SFBwedrwUNaEaLJfhV_y2Sk6HP86CYiimeXrdZitr7_gYQ_PaBtXgwnqLWX3fE2OIMH4emOlBQe4NP3F90UXE2aVbiplzjVKBBmG7nmDWLRv-BrY9pHKva1bSMI9YwguJcHoOu9bXzAelckJGAMEkSt2rUHZa9C-HpCHG40"/>
            </div>
            <div className="login__input">
                <input type="text" placeholder=" 이메일" value={email} onChange={e => setEmail(e.target.value)}/>
                <input type="password" placeholder=" 비밀번호" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
            <div className="login__button">
                <button onClick={handleLogin}>로그인</button>
                <button onClick={handleJoin}>회원가입</button>
            </div>
        </div>
    )
}

export default Login;