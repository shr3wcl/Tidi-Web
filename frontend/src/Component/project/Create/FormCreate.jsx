import React, { useState } from "react";
import { getProjectSuccess } from "../../../Redux/Slice/projectSlice";
import { addNewProject } from "../../../Redux/APIRequest/apiProjectRequest";
import { createAxios } from "../../../createInstance";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function FormCreate({ handleClick }) {
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getProjectSuccess);
    function handleAdd() {
        handleClick();
        const data = { title: title, des: des };
        addNewProject(accessToken, data, dispatch, navigate, axiosJWT)
    }
    return (
        <>
            <div className="p-4 w-full h-full z-50">
                <h1 className="text-center text-xl font-semibold">New Project</h1>
                <form className="flex flex-col justify-around w-full h-full ">
                    <div className=" my-2 flex flex-col">

                        <label>Title</label>
                        <input type="text" className="p-4  border-b-slate-300 border-none border-b focus: outline-none " value={title} onChange={e => setTitle(e.target.value)} placeholder="Title..."></input>
                    </div>
                    <div className=" my-2 flex flex-col">
                        <label>Description</label>
                        <textarea type="text" className="p-4  border-b-slate-300 border-none border-b focus: outline-none " value={des} onChange={e => setDes(e.target.value)} placeholder="Description..."></textarea>
                    </div>
                    <div className="my-2 flex justify-end">
                        <p onClick={handleAdd} className="mx-2 p-4 w-20 cursor-pointer text-center  rounded-lg bg-blue-300 border border-blue-300">Add</p>
                        <p onClick={handleClick} className="mx-2 p-4 w-20 cursor-pointer text-center rounded-lg border border-blue-300">Close</p>
                    </div>
                </form>
            </div>


        </>
    )
}
export default FormCreate