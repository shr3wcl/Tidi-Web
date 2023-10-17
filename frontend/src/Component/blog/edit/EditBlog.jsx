import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../../createInstance";
import {getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {editBlog, getDetailBlog} from "../../../Redux/APIRequest/apiBlogRequest";
import config from "../../editor/config";

let editor = {isReady: false};

const EditBlog = () => {
    const ref = useRef('');
    const [statusBlog, setStatusBlog] = useState(true);
    const [title, setTitle] = useState('');
    const {idBlog} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
    useEffect(() => {
        getDetailBlog(dispatch, axiosJWT, idBlog).then(raw => {
            console.log(raw);
            const data = raw.data.data.blog.content;
            setData(raw.data.data.blog);
            setTitle(raw.data.data.blog.title);
            ref.current = raw.data.data.blog.title;
            setStatusBlog(raw.data.data.blog.status);
            editor = config(false, 'view-detail-blog', data);
        });
    }, [accessToken, dispatch, idBlog, refreshToken, user]);
    const handleChangeInput = (e) => {
        setTitle(e.target.value);
        ref.current = e.target.value;
    }

    const handleStore = async (editor) => {
        await editor.save().then(async (outputData) => {
            const data = {title: title, content: outputData, status: statusBlog};
            await editBlog(dispatch, navigate, accessToken, axiosJWT, idBlog, data);
        }).catch((error) => {
            console.log('Saving failed: ', error);
        });
    }
    console.log(title);
    console.log(statusBlog);
    return (
        <div>
            {/*<HeaderBlog type={"blog-detail"} theme={"edit-blog"} data={data}/>*/}
            <div className={"flex sticky  top-0 bg-white z-10 justify-between items-center px-8 py-2 border-solid border-0 border-b-2 border-b-gray-200"}>

            <div className={"w-7/12 flex flex-row items-center"}>
                <input type="text" placeholder={"Title..."} value={ref.current}
                       onChange={(e) => handleChangeInput(e)} className={"py-2 px-2 outline-0 rounded-xl w-full"}/>
                <label className="inline-flex relative items-center cursor-pointer absolute ml-6">
                    <input type="checkbox" value={`${statusBlog}`} className="sr-only peer outline-0"
                           checked={!statusBlog} onChange={()=> setStatusBlog(!statusBlog)}/>
                    <div
                        className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
                    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-600">Private</span>
                </label>
                <button className={"ml-4 py-2 px-4 rounded border-0 cursor-pointer relative bg-green-500"}
                        onClick={() => handleStore(editor)}>Save
                </button>
            </div>
            <div className={""}>
                Night/Light mode
            </div>
        </div>
            <div id={"view-detail-blog"}/>
        </div>
    )
}

export default EditBlog;
