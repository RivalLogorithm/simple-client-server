import React from 'react'

export const UsersList = ({users}) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Фамилия</th>
                <th>Имя</th>
                <th>E-mail</th>
            </tr>
            </thead>

            <tbody>
            {users.map((user) => {
                return (
                    <tr>
                        <td>{user.lastName}</td>
                        <td>{user.firstName}</td>
                        <td>{user.email}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}