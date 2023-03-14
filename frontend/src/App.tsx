import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RecentArticlesPage from "./features/articles/RecentArticlesPage";
import ArticleDetailPage from "./features/articles/ArticleDetailPage";
import LoginPage from "./features/login/LoginPage";
import AdminArticleList from "./features/articles/AdminArticleList";
import AdminEditArticle from "./features/articles/AdminEditArticle";
import About from "./features/about/About";
import "./index.scss"
import {useAppSelector} from "./hooks/useAppSelector";
import {access_token, loginWithRefresh} from "./features/login/userSlice";
import {useEffect} from "react";
import {useAppDispatch} from "./hooks/useAppDispatch";

const App: React.FC = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loginWithRefresh())
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<RecentArticlesPage/>}/>
                <Route path={"/about"} element={<About/>}/>
                <Route path={"/post/:id"} element={<ArticleDetailPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/admin"} element={
                    <RequireAuth>
                        <AdminArticleList/>
                    </RequireAuth>
                }/>
                <Route path={"/admin/create"} element={
                    <RequireAuth>
                        <AdminEditArticle createNewMode={true}/>
                    </RequireAuth>
                }/>
                <Route path={"/admin/edit/:id"} element={
                    <RequireAuth>
                        <AdminEditArticle/>
                    </RequireAuth>
                }/>
            </Routes>
        </BrowserRouter>
    );
};

function RequireAuth({children}: { children: JSX.Element }) {
    const loggedIn = useAppSelector(access_token)

    if (!loggedIn) {
        return <LoginPage/>
    }

    return children
}

export default App;
