import {useEffect, useState} from "react";
import React from "react";
import {UsersList} from "../components/UsersList";
import axios from "axios";

export const UsersPage = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get("/api/get")
            .then(res => setUsers(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h2>Все пользователи</h2>
            {<UsersList users={users}/>}
        </div>
    )
}