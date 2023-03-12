import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {access_token, avatar, logout} from "../../login/userSlice";
import "../header.scss"
import {useAppDispatch} from "../../../hooks/useAppDispatch";

type Props = {};

const LoginButton = ({}: Props) => {
    const avatarImage = useAppSelector(avatar)
    const loggedIn = useAppSelector(access_token)
    const dispatch = useAppDispatch()
    const [logoutMenuOpen, setLogoutMenuOpen] = useState(false)

    const handleAvatarClick = () => {
        logoutMenuOpen ? setLogoutMenuOpen(false) : setLogoutMenuOpen(true)
    }

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <>
            {loggedIn
                ? (
                    <>
                        <button onClick={handleAvatarClick}>
                            <img src={"/assets/images/login_expand.png"} alt={""}/>
                            <img src={avatarImage ? avatarImage : "/assets/images/avatar.png"} alt={"avatar"}
                                 className={"avatar"}/>
                            {logoutMenuOpen &&
                              <div className={"logout"} onClick={handleLogout}>
                                Logout
                              </div>
                            }
                        </button>
                    </>
                )
                : <NavLink to={"/login"} className={"loginNavlink"}>Log in<img src={"/assets/images/login_arrow.png"}
                                                                               alt={""}/></NavLink>
            }
        </>
    );
};

export default LoginButton;
