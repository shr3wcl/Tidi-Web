import React, {useEffect, useState} from "react";
import {getAllPublicBlog} from "../../Redux/APIRequest/apiBlogRequest";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../createInstance";
import {getBlogSuccess} from "../../Redux/Slice/blogSlice";
import {Link, useLocation} from "react-router-dom";
import moment from "moment";
import HeaderBlog from "./header/Header.blog";
import Loading from "../loading/Loading";

function ViewPublic() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    useEffect(()=>{
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
        getAllPublicBlog(dispatch, axiosJWT).then(data=> {
            setData(data.data.blogs);
            setIsLoading(false);
        });
    }, [accessToken, dispatch, refreshToken, user]);
    const url = useLocation();
    return (
        <div className={""}>
            <HeaderBlog type={"search"}/>

            <div className={"mt-4"}>
                <h1 className={"mb-6 mx-6"}>Newest</h1>
                <ul>
                    {isLoading ? <Loading/> : (
                        <>
                            {data.map(blog => (
                                <li key={blog._id} className={"mx-6 border-solid border-0 border-t-2 border-gray-400 hover:bg-gray-500 min-h-80px"}>
                                    <Link to={`${url.pathname}/../view/${blog._id}`} className={"w-full py-2 mx-2 px-2"}>
                                        <div className={"mx-6"}>
                                            <div className={"flex justify-between w-fit"}>
                                                <div>
                                                    <img src={blog?.idUser.avatar} alt="" className={"w-10 h-10 rounded-2xl bg-black"}/>
                                                </div>
                                                <div className={"ml-2"}>
                                    <span>
                                        <p className={"font-semibold"}>
                                            {blog?.idUser.firstName + " " + blog?.idUser?.lastName + " "}
                                        </p>
                                        <p className={"font-thin text-gray-400"}>
                                            Updated at {moment(blog.createdAt).format("HH:MM A • LL")}
                                        </p>
                                    </span>
                                                </div>
                                            </div>

                                            <h2 className={"mb-2"}>
                                                {blog.title}
                                            </h2>
                                            <p>{blog.content.blocks[1].data.text}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default ViewPublic;
