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
            <div className={"layoutOuterContainer"}>
                <div className={"layoutInnerContainer"}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
