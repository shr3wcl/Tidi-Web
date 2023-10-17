import React, { useState } from "react";
import { getProjectSuccess } from "../../../../../Redux/Slice/projectSlice";
import { createAxios } from "../../../../../createInstance";
import { useDispatch, useSelector } from "react-redux";
import { addNewMember } from "../../../../../Redux/APIRequest/apiMemberRequest";

function FormAdd({ id, handleSetVisible }) {
    const [idUser, setidUser] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getProjectSuccess);
    function handleAdd() {
        handleSetVisible();
        const data = {
            idUser: idUser,
            idProject: id,
            role: 1,
        }
        addNewMember(accessToken, data, dispatch, id, axiosJWT)
    }
    return (
        <>
            <div className="p-4 w-full h-auto z-50">
                <h1 className="text-center text-xl font-semibold">Add some new thing</h1>
                <form className="flex flex-col justify-center w-auto h-auto ">
                    <div className=" my-2 flex flex-col">
                        <label>User ID</label>
                        <input type="text" className="p-4  border-b-slate-300 border-b focus: outline-none " value={idUser} onChange={e => setidUser(e.target.value)} placeholder="Title..."></input>
                    </div>
                    <div className=" flex justify-end">
                        <p onClick={handleAdd} className="mx-2 p-4 w-20 cursor-pointer text-center  rounded-lg bg-blue-300 border border-blue-300">Add</p>
                        <p onClick={handleSetVisible} className="mx-2 p-4 w-20 cursor-pointer text-center rounded-lg border border-blue-300">Close</p>
                    </div>
                </form>
            </div>
        </>
    )
}
export default FormAdd