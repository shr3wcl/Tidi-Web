import React from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from "./Component/login/Login"
import Register from "./Component/register/Register";
import Home from "./Component/home/Home";
import './App.css';
import Profile from "./Component/profile/Profile";
import Nav from "./Component/Nav/Nav";
import BlogCreate from "./Component/blog/create/BlogCreate";
import {useSelector} from "react-redux";
import Blog from "./Component/blog/Blog";
import ViewMyBlog from "./Component/blog/ViewMyBlog";
import ViewPublic from "./Component/blog/ViewPublic";
import EditBlog from "./Component/blog/edit/EditBlog";
import ViewProfile from "./Component/profile/viewProfile/ViewProfile";
import ViewOther from "./Component/profile/viewProfile/ViewOther";
import Project from "./Component/project/Project";
import {ToastContainer} from "react-toastify";


function App() {
    const isLogin = useSelector(state => state.auth.login.success);
    const ProtectedRoute = ({ user, children }) => {
        if (!user) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };
    return (
        <Router>
            <ToastContainer/>
            <div id='main-component' className='w-screen h-screen grid overflow-x-hidden'>

                {isLogin && <Nav/>}
                <div className={"max-sm:mt-[50px]"}>
                    <Routes>
                        <Route index element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={
                            <ProtectedRoute user={isLogin}><Profile/></ProtectedRoute>
                        }/>
                        <Route path="blog/*" element={
                            <ProtectedRoute user={isLogin}><Blog/></ProtectedRoute>
                        }>
                            <Route path="article" element={<ViewPublic/>}/>
                            <Route path="new" element={<BlogCreate/>}/>
                            <Route path="my-blog" element={<ViewMyBlog/>}/>
                            <Route path="edit" element={<EditBlog/>}/>
                        </Route>
                        <Route path={"profile/*"} element={
                            <ProtectedRoute user={isLogin}>
                                <Profile/>
                            </ProtectedRoute>
                        }>
                            {/*<Route path={"detail"} element={""}/>*/}
                            {/*<Route path={"me/*"} element={<ViewProfile/>}>*/}
                            {/*    /!*<Route path={"blog"} element={<ViewProfile/>}/>*!/*/}
                            {/*</Route>*/}
                            {/*<Route path={":idUser"} element={<ViewOther/>}/>*/}
                        </Route>
                        <Route path={"project/*"} element={
                            <ProtectedRoute user={isLogin}>
                                <Project/>
                            </ProtectedRoute>
                        }>
                        </Route>

                    </Routes>
                </div>
            </div>
        </Router>
    );

}

export default App;
