import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper grey" style={{padding: '0 2rem'}}>
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                    <li><NavLink to="/">Главная</NavLink></li>
                    <li><NavLink to="/create">Создать пользователя</NavLink></li>
                    <li><NavLink to="/users">Все пользователи</NavLink></li>
                    <li><NavLink to="/find">Найти пользователя</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}