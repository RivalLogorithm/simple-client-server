import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {UserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

export const UpdateUserPage = () => {
    const cachedUser = useContext(UserContext)
    const [form, setForm] = useState({
        firstName: cachedUser.firstName, lastName: cachedUser.lastName,
        email: cachedUser.email
    })
    console.log(form)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const navigate = useNavigate()
    const updateHandler = async () => {
        console.log(form)
        axios.put('api/update', form, {
            params: {
                id: cachedUser.id
            }
        })
            .then(() => {
                window.alert("Данные пользователя обновлены")
                navigate('/users')
            })
            .catch(err => {
                console.log(err)
                window.alert(err.response.data.message)
            })
            .finally(() => {
                cachedUser.id = null
                cachedUser.firstName = null
                cachedUser.lastName = null
                cachedUser.email = null
            })
    }

    return (
        <div className="col s6">
            <h2>Изменение пользователя</h2>
            <div className="row">
                <div className="input-field">
                    <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={form.firstName}
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
                        value={form.lastName}
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
                        value={form.email}
                        onChange={changeHandler}
                    />
                    <label htmlFor="email">E-mail</label>
                </div>
            </div>
            <button
                className="btn blue darken-1"
                onClick={updateHandler}
            >
                Изменить пользователя
            </button>
        </div>
    )
}