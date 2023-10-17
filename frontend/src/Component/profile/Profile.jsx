import React from "react";
import {Routes, Route} from "react-router-dom"
import NavProfile from "./nav/Nav.profile";
import ViewProfile from "./viewProfile/ViewProfile";
import ViewOther from "./viewProfile/ViewOther";
import DetailProfile from "./detailAndEdit/DetailProfile";
import Password from "./detailAndEdit/Password";
import Avatar from "./avatar/Avatar";
import ShowInfo from "./showInfo/ShowInfo";

const Profile = () => {
    return (
        <div className={"ml-12 flex max-sm:ml-0"}>
            <div className={"sticky top-0"}>
                <NavProfile />
            </div>
            <div className={"w-full border-solid border-0 border-l-2 border-l-gray-200"}>
            <Routes>
                    <Route path={"/*"}>
                        <Route path={"detail"} element={<DetailProfile/>}/>
                        <Route path={"password"} element={<Password/>}/>
                        <Route path={"follow"} element={""}/>
                        <Route path={"me/*"} element={<ViewProfile/>}/>
                        <Route path={":idUser/*"} element={<ViewOther/>}/>
                        <Route path={"avatar"} element={<Avatar/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    )
};

export default Profile;
