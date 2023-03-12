import React from 'react';
import Logo from "./components/Logo";
import MainMenu from "./components/MainMenu";
import AdminMenu from "./components/AdminMenu";
import "./header.scss"

type Props = {};

const Header = ({}: Props) => {
    return (
        <div className={"headerContainer"}>
            <div className={"headerLeft"}>
                <Logo/>
                <MainMenu/>
            </div>
            <AdminMenu/>
        </div>
    );
};

export default Header;
