import React from 'react';
import Header from "../header/Header";
import "./layout.scss"

type Props = {
    children: JSX.Element | JSX.Element[]
};

const Layout = ({children}: Props) => {
    return (
        <>
            <Header/>
            <div className={"layoutContainer"}>
                {children}
            </div>
        </>
    );
};

export default Layout;
