import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../../createInstance";
import {getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {getStorageBlog} from "../../../Redux/APIRequest/apiBlogRequest";
import {Link, useLocation} from "react-router-dom";
import moment from "moment";
import HeaderBlog from "../header/Header.blog";
import Loading from "../../loading/Loading";

const Storage = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    useEffect(() => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
        getStorageBlog(dispatch, accessToken, axiosJWT).then(data => {
            setData(data.data);
            setIsLoading(false);
        });
    }, [accessToken, dispatch, refreshToken, user]);
    const url = useLocation();
    return (
        <div>
            <HeaderBlog type={"search"}/>
            <div className={"mt-4"}>
                <h1 className={"mb-6 mx-6"}>Favourite</h1>
                {isLoading ? <Loading/> : (
                    <>
                        {!data.length ? (
                            <p>Bạn chưa lưu một bài viết nào. <Link to={"/blog/article"} className={"text-blue-400"}>Tìm bài
                                viết</Link> vào lưu nó vào đây nào</p>
                        ) : (
                            <ul>
                                {data.map(blog => (
                                    <li key={blog._id}
                                        className={"mx-6 relative border-solid border-0 border-t-2 border-gray-400 hover:bg-gray-500 min-h-80px"}>
                                        <Link to={`${url.pathname}/../view/${blog.idBlog._id}`}
                                              className={"w-full py-2 mx-2 px-2"}>
                                            <div className={"mx-6"}>
                                                <div className={"flex justify-between w-fit"}>
                                                    <div>
                                                        <img src={blog?.idBlog.idUser.avatar} alt=""
                                                             className={"w-10 h-10 rounded-2xl bg-black"}/>
                                                    </div>
                                                    <div className={"ml-2"}>
                                    <span>
                                        <p className={"font-semibold"}>
                                            {blog?.idBlog.idUser.firstName + " " + blog?.idBlog.idUser.lastName + " "}
                                        </p>
                                        <p className={"font-thin text-gray-400"}>
                                            Updated at {moment(blog.idBlog.createdAt).format("HH:MM A • LL")}
                                        </p>
                                    </span>
                                                    </div>
                                                </div>

                                                <h2 className={"mb-2"}>
                                                    {blog.idBlog.title}
                                                </h2>
                                                <p>{blog.idBlog.content.blocks[1].data.text}</p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </>
                )}
            </div>
        </div>
    )
};

export default Storage;
