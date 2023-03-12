import React from 'react';
import {access_token} from "../../login/userSlice";
import LoginButton from "./LoginButton";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../hooks/useAppSelector";

type Props = {};

const AdminMenu = ({}: Props) => {
    const loggedIn = useAppSelector(access_token)


    return (
        <div className={"adminMenu"}>
            {loggedIn &&
              <>
                <NavLink to={"/admin"} className={"adminNavlink"}>My Articles</NavLink>
                <NavLink to={"/admin/create"} className={"adminNavlink"}>Create Article</NavLink>
              </>
            }
            <LoginButton/>
        </div>
    );
};

export default AdminMenu;
