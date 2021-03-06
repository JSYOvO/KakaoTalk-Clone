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

            if(auth){
                db.collection('users').doc(email).collection('info').where("email","==",email).get()
                .then(snapshot => {
                    if(snapshot.empty){
                        db.collection('users').doc(email).collection('info').add({
                            email: email,
                            profileName: "",
                            profileUrl: "",
                            stateMessage: ""
                        });
                        dispatch(login({
                            email: email,
                            profileName: "",
                            profileUrl: "",
                            stateMessage: ""
                        }))
                    }
                    else {
                        let dispatchLoginCnt = 0;

                        db.collection('users').doc(email).collection('info').onSnapshot(snapshot => (
                            snapshot.docs.map(doc => {

                                if(dispatchLoginCnt === 0){
                                    dispatch(login({
                                        email: doc.data().email,
                                        profileName: doc.data().profileName,
                                        profileUrl: doc.data().profileUrl,
                                        stateMessage: doc.data().stateMessage
                                    }));
                                    dispatchLoginCnt++;
                                }
                            })
                        ));
                    }                    
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

                if(auth){
                    // history.push('/Join');
                    setEmail('');
                    setPassword('');
                    alert("Thank you for joining KakaoTalk. Please log in.");
                }
            })
            .catch(error => alert(error.message));
        }

    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://www.flaticon.com/svg/static/icons/svg/2111/2111496.svg"/>
            </div>
            <form action="submit">
                <div className="login__input">
                    <input type="text" placeholder=" 이메일" value={email} onChange={e => setEmail(e.target.value)}/>
                    <input type="password" placeholder=" 비밀번호" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="login__button">
                    <button onClick={handleLogin} type="submit">로그인</button>
                    <button onClick={handleJoin}>회원가입</button>
                </div>
            </form>
        </div>
    )
}

export default Login;