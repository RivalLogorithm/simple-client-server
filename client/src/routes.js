import React from "react";
import {Route, Routes, Navigate} from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {UsersPage} from "./pages/UsersPage";
import {FindPage} from "./pages/FindPage";
import {CreateUserPage} from "./pages/CreateUserPage";
import {UpdateUserPage} from "./pages/UpdateUserPage";

export const useRoutes = () => {
    return (
        <Routes>
            <Route path="/" exact element={<HomePage/>}/>
            <Route path="/create" exact element={<CreateUserPage/>}/>
            <Route path="/update" exact element={<UpdateUserPage/>}/>
            <Route path="/users" exact element={<UsersPage/>}/>
            <Route path="/find" exact element={<FindPage/>}/>
            <Route path="*" exact element={<Navigate to="/"/>}/>
        </Routes>
    )
}