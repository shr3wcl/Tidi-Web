import React from "react";
import {Link} from "react-router-dom";
import {MdArticle, MdStorage} from "react-icons/md";
import {CgPassword, CgProfile} from "react-icons/cg";
import {IoPeopleOutline} from "react-icons/io5";

function NavProfile() {
    return (
        <nav
            className="sticky top-0 bg-white flex flex-col h-screen z-50 w-60 max-lg:hidden">
            <div className={"w-full text-center border-solid border-0 border-b-2 border-gray-200 py-3 px-2 h-14"}>
                <h1 className={""}>Profile</h1>
            </div>
            <div className={"flex flex-col ml-8 mt-4"}>
                <Link to={"me"} className={"text-gray-500 my-3"}><CgProfile/> Profile</Link>
                <Link to={"detail"} className={"text-gray-500 my-3"}><MdArticle/> My details</Link>
                <Link to={"password"} className={"text-gray-500 my-3"}><CgPassword/>  Password</Link>
                <Link to={"follow"} className={"text-gray-500 my-3"}><IoPeopleOutline/> Follow</Link>
            </div>
        </nav>
    )
}

export default NavProfile;
