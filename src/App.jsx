import React from "react";
import {Navigate, Route, Routes, useRoutes, useLocation} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthLayout from "./layouts/AuthLayout";
import PostsLayout from "./layouts/PostsLayout";
import MainPage from "./pages/MainPage";
import NavBar from "./components/NavBar/NavBar";
import withRedux from "./hoc/withRedux";
import withRouter from "./hoc/withRouter";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SigupPage";
import ProtectedRoute from "./components/ProtectedRoute";
import {isLoggedInSelector} from "./store/authSlice";
import routes from "./routes";
import {useSelector} from "react-redux";

function App() {

    /* Добавлен хук useRoutes - можно хранить маршруты в одном месте как массив объектов,
       передавать любые параметры */
    // const isLoggedIn = useSelector(isLoggedInSelector());
    // const location = useLocation();
    // const elements = useRoutes(routes(isLoggedIn, location));

    return (
        <div className='min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-150 flex flex-col'>
            <NavBar />
            <Routes>

                {/*index = замена '/'*/}
                <Route index element={<MainPage/>} />

                {/*Вложенные маршруты с Outlet*/}
                {/*с дочерними роутами не обязательно указывать "*" */}
                {/* у вехнего Route аттрибут element не обязателен,
                 используятся чтобы добавить обёртку для стилей*/}
                <Route path='/auth' element={<AuthLayout/>}>
                    {/*у дочерних элементов путь всегда относительный, "/" будет обрезаться*/}
                    <Route path={"login"} element={<LoginPage/>} />
                    <Route path={"signup"} element={<SignUpPage/>} />

                    {/*Редирект если пользователь перейдёт по пути "/auth"*/}
                    {/*В случае ниже index = "/auth"*/}
                    {/*В Navigate всегда указывается абсолютный путь*/}
                    <Route index element={<Navigate to="/auth/login" />}/>

                    {/*если перейдёт по "/auth/about"(пример)*/}
                    <Route path="*" element={<Navigate to="/auth/login" />}/>
                </Route>

                {/*Вложенные маршруты без Outlet*/}
                <Route path='/posts/*'
                       element={<ProtectedRoute redirectTo="/auth/login" element={<PostsLayout/>} /> }/>

                {/*используется вместо Redirect*/}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            <ToastContainer />
        </div>
    );
}
const AppWithStoreAndRoutes = withRedux(withRouter(App));
export default AppWithStoreAndRoutes;
