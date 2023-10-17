import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../createInstance";
import { FcDocument } from "react-icons/fc";
import { getProjectSuccess } from "../../../Redux/Slice/projectSlice";
import { getAllOwnerProject } from "../../../Redux/APIRequest/apiProjectRequest";
import Loading from "../../loading/Loading"

function ListProject() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = useCallback(async () => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getProjectSuccess);
        getAllOwnerProject(accessToken, dispatch, axiosJWT).then(raw => setData(raw.data));
    }, [accessToken, dispatch, refreshToken, user])

    useEffect(() => {
        setIsLoading(false);
        loadData();
    }, [loadData, data]);

    function hanldeClick(e, pro) {
        e.preventDefault();
        console.log(pro.idProject);
        navigate(`project/${pro.idProject._id}`);
    }

    return (
        <>
            {isLoading ? <Loading /> : (data.map(function (proo) {
                return (
                    <div key={proo.name} className="pl-4 py-2 hover:bg-slate-400" onClick={(e) => hanldeClick(e, proo)}>
                        <div className="inline-block mx-2" key={proo.idProject}>
                            <FcDocument></FcDocument>
                        </div>
                        <p className="inline-block "> {proo.idProject.title}</p>
                    </div>
                )
            }))}
        </>

    )
}
export default ListProject;
