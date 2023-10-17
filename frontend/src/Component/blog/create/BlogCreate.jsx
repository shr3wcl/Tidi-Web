import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {addNewBlog} from "../../../Redux/APIRequest/apiBlogRequest";
import config from "../../editor/config";
import {createAxios} from "../../../createInstance";
import {addSuccess} from "../../../Redux/Slice/blogSlice";
import {toast, ToastContainer} from "react-toastify";

let editor = {isReady: false};

function BlogCreate() {
    useEffect(()=>{
        if(!editor.isReady){
            editor = config(false);
        }
    },[]);
    const [statusBlog, setStatusBlog] = useState(true);
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, addSuccess);
    const handleStore = (editor)=>{
        if(!title){
            return toast.error("Tiêu đề không được để trống",{
                autoClose: 1000,
            });
        }
        editor.save().then((outputData) => {
            const data = {title: title, content: outputData, status: statusBlog};
            addNewBlog(accessToken, data, dispatch, navigate, axiosJWT).catch(err => {
                toast.error(err.response.data);
            });
        }).catch((error) => {
            console.log('Saving failed: ', error);
        });
    }

    return (
        <div>
            <div className={"flex sticky top-0 bg-white z-10 justify-between items-center px-8 py-2 border-solid border-0 border-b-2 border-b-gray-200"}>
                <div className={""}>
                    <input type="text" placeholder={"Title..."} onChange={(e)=>setTitle(e.target.value)} className={"py-1.5 pl-4 w-64 outline-0 rounded-xl"}/>
                    <label className="inline-flex relative items-center cursor-pointer absolute top-2 ml-6">
                        <input type="checkbox" value={`${statusBlog}`} className="sr-only peer outline-0" onClick={()=>setStatusBlog(!statusBlog)}/>
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"/>
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-600">Private</span>
                    </label>
                    <button className={"ml-4 py-2 px-4 rounded border-0 cursor-pointer relative"} onClick={()=>handleStore(editor)}>Save</button>

                </div>
                <div className={""}>
                    Night/Light mode
                </div>
            </div>
            <div id="editorjs"/>
        </div>
    )
}

export default BlogCreate;
