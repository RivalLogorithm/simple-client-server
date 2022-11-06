import React from 'react'

export const User = ({user}) => {
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
            <tr>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
            </tr>
            </tbody>
        </table>
    )
}