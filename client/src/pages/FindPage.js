import React, {useContext, useEffect, useState} from "react";
import {User} from "../components/User";
import axios from 'axios'
import {UserContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

export const FindPage = () => {
    const userContext = useContext(UserContext)
    const [user, setUser] = useState([])
    const [form, setForm] = useState({
        email: ''
    })
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const findHandler = async () => {
        axios.get('api/getuser', {
            params: form
        })
            .then(res => {
                setUser(res.data)
            })
            .catch(err => {
                console.log(err)
                window.alert(err.response.data.message)
            })
            .finally(() => setLoaded(true))
    }

    const navigate = useNavigate()
    const updateHandler = () => {
        userContext.id = user.id
        userContext.email = user.email
        userContext.firstName = user.firstName
        userContext.lastName = user.lastName
        navigate("/update")
    }

    const deleteHandler = async () => {
        console.log(user)
        axios.delete('api/delete', {
            params: {id: user.id}
        })
            .then(() => {
                window.alert(`Пользователь удален`)
                navigate("/users")
            })
            .catch(err => {
                console.log(err)
                // window.alert(err.response.data.message)
            })
            .finally(() => {
                setLoaded(false)
            })
    }

    return (
        <div className="col s6">
            <h2>Поиск пользователя</h2>
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
            <button className="btn blue darken-1" onClick={findHandler}>Найти</button>
            {user.length !== 0 && loaded && <User user={user}/>}
            {user.length !== 0 && loaded && <button className="btn blue-grey darken-1" onClick={updateHandler}>Изменить</button>}
            {user.length !== 0 && loaded && <button className="btn red darken-1" onClick={deleteHandler}>Удалить</button>}
        </div>
    )
}