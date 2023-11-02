import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context/AuthContext";

const Login = () => {
    const {setIsAuth} = useContext(AuthContext);

    const login =(event) => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Авторизація</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Введіть логін'/>
                <MyInput type='password' placeholder='Введіть пароль'/>
                <MyButton>Вхід</MyButton>
            </form>
            
        </div>
    );
};

export default Login;