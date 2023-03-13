import React from 'react';
import Layout from "../wrappers/Layout";
import {useAppDispatch} from "../../hooks/useAppDispatch";

type Props = {};

const LoginPage = ({}: Props) => {
    const dispatch = useAppDispatch()

    return (
        <Layout>
            <div>
                LoginPage
            </div>
        </Layout>
    );
};

export default LoginPage;
