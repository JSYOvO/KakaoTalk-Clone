import React from 'react';
import './Login.css';
import {auth} from '../../firebase.js';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const tag = '[Login]';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then((auth) => {
            console.log(tag, auth);

            if(auth){
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
                    history.push('/');
                }
            })
            .catch(error => alert(error.message));
        }

    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://lh3.googleusercontent.com/proxy/LGFMDzXMegFRZqowakww0IpWOfbnV4etATesDy6lMpkK6agFEr_xq0UuETdzK3Z6Xe-mzQfbk9yqMDzL_Jp7EPnp1ik5WwhocqoO2q457PXe6XZxnO3hqkxUiYQFBIevVT2KTRJNpORHOz3zykhQEEHDkkBBw5EFVoygbLpT6JJUR-FJtvUAJHuM31mm-CDzgSIqtPxC_FkdwofoHi14vJEPqJlBbpZm_2UJAe5IMbk"/>
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