import React, {ChangeEvent, FormEvent, useState} from 'react';
import Layout from "../wrappers/Layout";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import "./login.scss"
import {loginWithCredentials} from "./userSlice";
import {useNavigate} from "react-router-dom";

type Props = {};

const LoginPage = ({}: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [username, setUsername] = useState(undefined)
    const [password, setPassword] = useState(undefined)

    const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!username || username === "" || !password || password === "") {
            alert("Please fill out login and password.")
            return
        }
        dispatch(loginWithCredentials({username, password})).then(res => {
            // This is obviously not good practice. In case of bad combination of login and password, backend should send specific error code.
            // It also may be beneficial to save specific error to REDUX during the dispatch and read the error value in the component.
            if (res.type === "user/loginWithCredentials/rejected") {
                alert("Wrong combination of login and password.")
                return
            }
            else {
                navigate("/admin")
            }
        })
    }

    return (
        <Layout>
            <div className={"loginOuterContainer"}>
                <div className={"loginInnerContainer"}>
                    <h2>Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor={"username"}>Email</label>
                        <input type={"text"} id={"username"} onChange={handleLoginChange}/>
                        <label htmlFor={"pwd"}>Password</label>
                        <input type={"password"} id={"pwd"} onChange={handlePasswordChange}/>
                        <button type={"submit"}>Log In</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default LoginPage;
