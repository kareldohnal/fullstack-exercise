import * as React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RecentArticlesPage from "./features/articles/RecentArticlesPage";
import ArticleDetailPage from "./features/articles/ArticleDetailPage";
import LoginPage from "./features/login/LoginPage";
import AdminArticleList from "./features/articles/AdminArticleList";
import AdminEditArticle from "./features/articles/AdminEditArticle";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<RecentArticlesPage/>}/>
                <Route path={"/post/:id"} element={<ArticleDetailPage/>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/admin"} element={
                    <RequireAuth>
                        <AdminArticleList/>
                    </RequireAuth>
                }/>
                <Route path={"/admin/create"} element={
                    <RequireAuth>
                        <AdminEditArticle createNewMode={true} />
                    </RequireAuth>
                }/>
                <Route path={"/admin/edit/:id"} element={
                    <RequireAuth>
                        <AdminEditArticle />
                    </RequireAuth>
                }/>
            </Routes>
        </BrowserRouter>
    );
};

function RequireAuth({children}: { children: JSX.Element }) {
    return children
}

export default App;
