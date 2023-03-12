import React, {useEffect} from 'react';
import Layout from "../wrappers/Layout";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {loginWithCredentials} from "./userSlice";

type Props = {};

const LoginPage = ({}: Props) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loginWithCredentials({username: "test@test.cz", password: "test123"}))
    }, [])
    return (
        <Layout>
            <div>
                LoginPage
            </div>
        </Layout>
    );
};

export default LoginPage;
