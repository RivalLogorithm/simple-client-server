import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const CreateUserPage = () => {
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: ''
    })

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const navigate = useNavigate()
    const createHandler = async () => {
        axios.post('api/create', form)
            .then(() => {
                window.alert("Пользователь создан")
                navigate('/users')
            })
            .catch(err => {
                console.log(err)
                window.alert(err.response.data.message)
            })
    }

    return (
        <div className="col s6">
            <h2>Создание пользователя</h2>
            <div className="row">
                <div className="input-field">
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        onChange={changeHandler}
                    />
                    <label htmlFor="firstName">Имя</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field">
                    <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        onChange={changeHandler}
                    />
                    <label htmlFor="lastName">Фамилия</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field">
                    <input
                        id="email"
                        type="text"
                        name="email"
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">E-mail</label>
                </div>
            </div>
            <button
                className="btn blue darken-1"
                onClick={createHandler}
            >
                Создать пользователя
            </button>
        </div>
    )
}