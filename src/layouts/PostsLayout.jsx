import React, { useEffect } from "react";
// Librares
import { useDispatch } from "react-redux";
import {Routes, Route} from "react-router-dom";
// Components
import BackgroundGradiend from "../components/BackgroundGradient";
import ScreenWidthWrapper from "../components/ScreenWidthWrapper";
// Pages
import PostPage from "../pages/Posts/PostPage";
import PostsListPage from "../pages/Posts/PostsListPage";
//Store
import { getPosts } from "../store/postsSlice";

const PostsLayout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadPostData = () => {
            dispatch(getPosts());
        };
        loadPostData();
    }, [dispatch]);

    // let { path } = useRouteMatch();
    return (
        <>
            <BackgroundGradiend />
            <ScreenWidthWrapper>
                <Routes>
                    {/*:postId доступен в PostPage*/}
                    {/*у вложеных маршрутов путь всегда относительный, "/" будет обрезаться*/}
                    <Route path={":postId"} element={<PostPage/>} />
                    <Route index  element={<PostsListPage/>} />
                </Routes>
            </ScreenWidthWrapper>
        </>
    );
};

export default PostsLayout;
