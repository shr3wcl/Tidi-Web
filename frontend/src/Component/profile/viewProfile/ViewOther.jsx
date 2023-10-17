import React, {useEffect, useState} from "react";
import HeaderBlog from "../../blog/header/Header.blog";
import {Routes, Route, useParams} from "react-router-dom";
import {FaMinus, FaPlus} from "react-icons/fa";
import {Link} from "react-router-dom";
import ViewMyBlog from "../../blog/ViewMyBlog";
import {addFollow, checkFollow, getInfo, unfollow} from "../../../Redux/APIRequest/apiUserRequest";
import BlogProfile from "../blog/BlogProfile";
import ShowInfo from "../showInfo/ShowInfo";
import FollowList from "../follow/FollowList";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../../createInstance";
import {getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {toast} from "react-toastify";

const ViewOther = () => {
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const {idUser} = useParams();
    const [user, setUser] = useState([]);
    const [project, setProject] = useState([]);
    const [blog, setBlog] = useState([]);
    const [follow, setFollow] = useState(false);
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const dispatch = useDispatch();
    const axiosJWT = createAxios(currentUser, accessToken, refreshToken, dispatch, getBlogSuccess);
    useEffect(() => {
        getInfo(idUser).then(data => {
            setUser(data.data.user);
            setBlog(data.data.blog);
        });
        checkFollow(idUser, axiosJWT).then(rs => {
            if (rs.data) {
                setFollow(true);
            } else {
                setFollow(false);
            }
        })
    }, [follow]);

    const handleFollow = () => {
        addFollow(idUser, axiosJWT).then(r => {
            setFollow(true);
            toast.success("Followed", {autoClose: 1000, position: 'bottom-right'});
        });
    }

    const handleUnfollow = () => {
        unfollow(idUser, axiosJWT).then(r => {
            setFollow(false);
            toast.success("Unfollowed", {autoClose: 1000, position: 'bottom-right'});
        });
    }
    return (
        <div>
            <HeaderBlog/>
            <div className={"flex flex-col item-center justify-center mt-4 mx-6"}>
                <div className={"flex justify-center mb-8"}>
                    <div className={"flex justify-center w-full"}>
                        <div className={"relative pb-24 w-full"}>
                            <img className={"w-[100%] min-h-[200px] max-h-[240px] rounded-t"}
                                 src="https://khoinguonsangtao.vn/wp-content/uploads/2021/09/anh-bia-facebook-cute-nhat-780x289.jpg"
                                 alt=""/>
                            <div className={"absolute h-fit bottom-[6%] flex flex-row w-full max-sm:bottom-10"}>
                                <img
                                    className={"w-[165px] h-[165px] rounded-full border-4 border-white border-solid ml-12 mr-4 max-sm:w-[120px] max-sm:h-[120px]\n" +
                                        "                                max-sm:ml-4"}
                                    src={user.avatar} alt=""/>
                                <div
                                    className={"flex flex-row h-full item-center justify-between w-full mt-28 max-sm:mt-16"}>
                                    <div className={""}>
                                        <h3 className={"mb-2"}>{user.firstName + " " + user.lastName}</h3>
                                        <span className={"text-gray-400"}>{user.email}</span>
                                    </div>
                                    <div className={"mr-4"}>
                                        <span onClick={follow ? handleUnfollow : handleFollow}
                                              className={"border-solid py-1 px-2 flex justify-center border-blue-400 text-blue-400 item-center rounded cursor-pointer"}>
                                            {follow ? <FaMinus className={"hover:animate-bounce"}/> :
                                                <FaPlus className={"group-hover:animate-spin"}/>}
                                            <span
                                                className={"ml-2 max-sm:hidden"}>{follow ? 'Unfollow' : 'Follow'}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <hr/>
                <div className={"flex flex-row my-2"}>
                    <Link to={`/profile/${user._id}/blog`} className={"mx-4"}>
                        Blog
                    </Link>
                    <Link to={``} className={"mx-4"}>Project</Link>
                    <Link to={""} className={"mx-4"}>Follower</Link>
                    <Link to={""} className={"mx-4"}>Follow</Link>
                    <Link to={""} className={"mx-4"}>Bio</Link>
                </div>
                <hr/>
                <Routes>
                    <Route path={"/*"}>
                        <Route path={"blog"} element={<BlogProfile blog={blog} user={user}/>}/>
                        <Route path={""} element={<ShowInfo user={user}/>}/>
                        <Route path={"follow"} element={<FollowList user={user}/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default ViewOther;
