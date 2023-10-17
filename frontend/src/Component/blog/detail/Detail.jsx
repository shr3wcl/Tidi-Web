import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../../createInstance";
import {checkStorage, getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {getDetailBlog} from "../../../Redux/APIRequest/apiBlogRequest";
import {useParams} from "react-router-dom";
import config from "../../editor/config";
import HeaderBlog from "../header/Header.blog";
import Share from "../header/Share";

function Detail() {
    const editor = useRef(null);
    const {idBlog} = useParams();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const [check, setCheck] = useState(false);
    useEffect(() => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
        getDetailBlog(dispatch, axiosJWT, idBlog).then(raw => {
            const data = raw.data.data.blog.content;
            setData(raw.data.data.blog);
            setCheck(raw.checkStorage.data);
            dispatch(checkStorage(raw.checkStorage.data));
            editor.current = config(true, 'view-detail-blog', data);
        });
    }, [accessToken, dispatch, idBlog, refreshToken, user]);

    return (
        <div>
            <HeaderBlog type={"blog-detail"} data={data} />
            <div id={"view-detail-blog"}/>
            <div className={"flex justify-center items-center"}>
                <div className={"max-w-[650px] w-full flex justify-between"}>
                    <div><span className={"uppercase font-bold"}>Previous Post</span></div>
                    <div><span className={"uppercase font-bold"}>Next Post</span></div>
                </div>
            </div>
        </div>
    )
}

export default Detail;
