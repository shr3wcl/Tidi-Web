import React, { useState } from "react";
import { getProjectSuccess } from "../../../../../Redux/Slice/projectSlice";
import { addNewTask } from "../../../../../Redux/APIRequest/apiTaskRequest";
import { createAxios } from "../../../../../createInstance";
import { useDispatch, useSelector } from "react-redux";

function FormCreate({ id, state, handleClick }) {
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [dayStart, setDayStart] = useState({ dayStart: new Date() });
    const [dayEnd, setDayEnd] = useState({ dayEnd: new Date() });

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getProjectSuccess);
    function handleAdd() {
        handleClick();
        console.log(dayStart);
        const data = { idProject: id, title: title, description: des, dayStart: dayStart, dayEnd: dayEnd, state: state };
        addNewTask(accessToken, data, dispatch, id, axiosJWT)
    }
    return (
        <>
            <div className="p-4 w-full h-auto">
                <h1 className="text-center text-xl font-semibold">Add some new thing</h1>
                <form className="flex flex-col justify-center w-auto h-auto ">
                    <div className=" my-2 flex flex-col">
                        <label>Title</label>
                        <input type="text" className="p-4  border-b-slate-300 border-b focus: outline-none " value={title} onChange={e => setTitle(e.target.value)} placeholder="Title..."></input>
                    </div>
                    <div className=" my-2 flex flex-col">
                        <label>Description</label>
                        <textarea type="text" className="p-4  border-b-slate-300 border-b focus: outline-none " value={des} onChange={e => setDes(e.target.value)} placeholder="Description..."></textarea>
                    </div>
                    <div className=" my-2 flex flex-col">
                        <label>Day start</label>
                        <input type="date" className="p-4  border-b-slate-300 border-b focus: outline-none " value={dayStart} onChange={e => setDayStart(e.target.value)} placeholder="Date..."></input>
                    </div>
                    <div className=" my-2 flex flex-col">
                        <label>Day End</label>
                        <input type="date" className="p-4  border-b-slate-300 border-b focus: outline-none " value={dayEnd} onChange={e => setDayEnd(e.target.value)} placeholder="Date..."></input>
                    </div>
                    <div className=" flex justify-end">
                        <p onClick={handleAdd} className="mx-2 p-4 w-20 cursor-pointer text-center  rounded-lg bg-blue-300 border border-blue-300">Add</p>
                        <p onClick={handleClick} className="mx-2 p-4 w-20 cursor-pointer text-center rounded-lg border border-blue-300">Close</p>
                    </div>
                </form>
            </div>
        </>
    )
}
export default FormCreate