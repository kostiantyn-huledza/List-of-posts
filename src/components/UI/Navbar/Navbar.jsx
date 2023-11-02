import React, {useContext} from 'react';
import {NavLink} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/AuthContext";

const Navbar = () => {
    const {setIsAuth} = useContext(AuthContext);

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>Вийти</MyButton>
            <div className='navbar_links'>
                <NavLink style={({isActive}) => ({color: isActive ? 'darkslategrey' : ''})} to='/posts'> Пости</NavLink>
                <NavLink style={({isActive}) => ({color: isActive ? 'darkslategrey' : ''})} to='/about'> Про сайт</NavLink>
            </div>
        </div>
    );
};

export default Navbar;