import React from "react";
import {Link} from "react-router-dom";
import {FiSearch} from "react-icons/fi";
import {AiOutlineUser} from "react-icons/ai";
import {BsPencilSquare} from "react-icons/bs";
import {MdArticle, MdFavoriteBorder, MdStorage} from "react-icons/md";

function NavBlog() {
    return (
        <nav
            className="h-screen sticky top-0 bg-white flex flex-col z-50 w-60 max-lg:hidden">
            <div className={"w-full text-center border-solid border-0 border-b-2 border-gray-200 py-3 px-2 h-14"}>
                <h1 className={""}>Blog</h1>
            </div>
            <div className="relative my-4 mx-2">
                <input type="search" placeholder="Search..." className="py-2 pl-2 outline-0 rounded border border-gray-300 w-56"/>
                <button type="submit" className="absolute right-0 top-0.5 mr-1 flex justify-center border-0 bg-blue-400 p-2 rounded">
                    <FiSearch/>
                </button>

            </div>
            <div className={"flex flex-col ml-8"}>
                <Link to={"article"} className={"text-gray-500 my-3"}><MdArticle/> New Articles</Link>
                <Link to={"my-blog"} className={"text-gray-500 my-3"}><AiOutlineUser/> My Blog</Link>
                <Link to={"new"} className={"text-gray-500 my-3"}><BsPencilSquare/>  New</Link>
                <Link to={"storage"} className={"text-gray-500 my-3"}><MdFavoriteBorder/> Favourite</Link>
                {/*<Link to={"storage"} className={"text-gray-500 my-3"}><MdStorage/> Storage</Link>*/}
            </div>
        </nav>
    )
}

export default NavBlog;
