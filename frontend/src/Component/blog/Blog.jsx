import React from "react";
import NavBlog from "./nav/Nav.blog";
import {Routes, Route} from "react-router-dom";
import BlogCreate from "./create/BlogCreate";
import ViewMyBlog from "./ViewMyBlog";
import ViewPublic from "./ViewPublic";
import Detail from "./detail/Detail";
import EditBlog from "./edit/EditBlog";
import Storage from "./storage/Storage";

function Blog() {
    return (
        <div className={"ml-12 flex max-sm:ml-0"}>
            <div className={"sticky top-0"}>
                <NavBlog/>
            </div>
            <div className={"w-full border-solid border-0 border-l-2 border-l-gray-200"}>
                {/*<HeaderBlog type={"search"}/>*/}
                <Routes>
                    <Route path={"/*"}>
                        <Route path={"article"} element={<ViewPublic/>}/>
                        <Route path={"new"} element={<BlogCreate/>}/>
                        <Route path={"my-blog"} element={<ViewMyBlog/>}/>
                        <Route path={"view/:idBlog"} element={<Detail/>}/>
                        <Route path={"edit/:idBlog"} element={<EditBlog/>}/>
                        <Route path={"storage"} element={<Storage/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default Blog;
