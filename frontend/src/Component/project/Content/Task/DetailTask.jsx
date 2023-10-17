import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSchedule } from "react-icons/ai"
import { createAxios } from "../../../../createInstance";
import { getProjectSuccess } from "../../../../Redux/Slice/projectSlice";
import { getDetailTask } from "../../../../Redux/APIRequest/apiTaskRequest";
import Loading from "../../../loading/Loading"
import moment from "moment"
function DetailTask({ idTask }) {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getProjectSuccess);
        getDetailTask(dispatch, axiosJWT, idTask).then(raw => {
            setData(raw.data);
            setIsLoading(false);
        });
    }, [accessToken, dispatch, idTask, refreshToken, user]);
    const CURRENT_DAY = new Date();
    return (
        <>
            {isLoading ? <Loading /> : (<div className="w-full p-4">
                <div className="flex flex-row justify-between mb-4">
                    <div className="text-2xl font-semibold">
                        {data.title}
                    </div>
                    {moment(CURRENT_DAY).isBefore(data.dayEnd) ?
                        (<div className="text-gray-400">
                            <AiOutlineSchedule></AiOutlineSchedule>
                            {moment(data.dayStart).format('DD/MM/YYYY')} -
                            {moment(data.dayEnd).format('DD/MM/YYYY')}
                        </div>) :
                        (<div>
                            <span className="text-gray-400 uppercase">Out of date</span>
                        </div>)}

                </div>
                <div>
                    {data.description}
                </div>

            </div>)}
        </>
    )
}
export default DetailTask;