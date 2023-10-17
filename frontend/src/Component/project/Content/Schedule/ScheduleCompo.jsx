
import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { getProjectSuccess } from "../../../../Redux/Slice/projectSlice";
import { getAllOwnerTask } from "../../../../Redux/APIRequest/apiTaskRequest";
import Loading from "../../../loading/Loading"
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
function ScheduleCompo() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getProjectSuccess);
        getAllOwnerTask(accessToken, dispatch, axiosJWT, id).then(raw => {
            setData(raw.data);
            setIsLoading(false);
        });
    }, [accessToken, dispatch, id, refreshToken, user]);

    const days = data.map(function (date) {
        return {
            id: data._id,
            Subject: date.title,
            StartTime: date.dayStart,
            EndTime: date.dayEnd,
            IsAllDay: false
        }
    })
    return (
        <>
            {isLoading ? <Loading /> : (<ScheduleComponent height='full' eventSettings={{ dataSource: days }}  >
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>)
            }
        </>
    );
}
export default ScheduleCompo;
