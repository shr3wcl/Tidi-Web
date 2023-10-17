import { addFailed, addStart, addSuccess, getProjectFail, getProjectStart, getProjectSuccess } from "../Slice/projectSlice";

const addNewTask = async (accessToken, data, dispatch, idProject, axiosJWT) => {
    dispatch(addStart());
    try {
        await axiosJWT.post(`/v1/user/project/${idProject}/task/add`, data);
        dispatch(addSuccess("Success"));

    } catch (err) {
        dispatch(addFailed("Failed"));
    }
}

const getAllOwnerTask = async (accessToken, dispatch, axiosJWT, idProject) => {
    dispatch(getProjectStart());
    try {
        const data = await axiosJWT.get(`/v1/user/project/${idProject}/task/getall`);
        dispatch(getProjectSuccess());
        return data;
    } catch (err) {
        dispatch(getProjectFail("Lỗi"));
    }
}
const getDetailTask = async (dispatch, axiosJWT, idTask) => {
    dispatch(getProjectStart());
    try {
        const data = await axiosJWT.get(`/v1/user/project/task/detail/${idTask}`, '');
        dispatch(getProjectSuccess());
        return data;
    } catch (err) {
        dispatch(getProjectFail("Lỗi"));
    }
}

const editTask = async (dispatch, navigate, accessToken, axiosJWT, idTask, data) => {
    try {
        await axiosJWT.post(`/v1/user/project/task/edit/${idTask}`, data);
        // navigate("/home/project");
    } catch (err) {
        console.log(err);
    }
}

const deleteTask = async (dispatch, navigate, accessToken, axiosJWT, idTask) => {
    try {
        await axiosJWT.delete(`/v1/user/project/task/delete/${idTask}`);
        // navigate("/home/project");
    } catch (err) {
        console.log(err);
    }
}



export { addNewTask, getAllOwnerTask, getDetailTask, editTask, deleteTask };