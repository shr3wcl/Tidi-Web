import { addFailed, addStart, addSuccess, getProjectFail, getProjectStart, getProjectSuccess } from "../Slice/projectSlice";

const addNewTodo = async (accessToken, data, dispatch, idProject, axiosJWT) => {
    dispatch(addStart());
    try {
        await axiosJWT.post(`/v1/user/project/${idProject}/todo/add`, data);
        dispatch(addSuccess("Success"));

    } catch (err) {
        dispatch(addFailed("Failed"));
    }
}

const getAllOwnerTodo = async (accessToken, dispatch, axiosJWT, idProject) => {
    dispatch(getProjectStart());
    try {
        const data = await axiosJWT.get(`/v1/user/project/${idProject}/todo/getall`);
        dispatch(getProjectSuccess());
        return data;
    } catch (err) {
        dispatch(getProjectFail("Lỗi"));
    }
}

const editTodo = async (dispatch, navigate, accessToken, axiosJWT, idTodo, data) => {
    try {
        await axiosJWT.post(`/v1/user/project/Todo/edit/${idTodo}`, data);
        // navigate("/home/project");
    } catch (err) {
        console.log(err);
    }
}

const deleteTodo = async (dispatch, navigate, accessToken, axiosJWT, idTodo) => {
    try {
        await axiosJWT.delete(`/v1/user/project/Todo/delete/${idTodo}`);
        // navigate("/home/project");
    } catch (err) {
        console.log(err);
    }
}



export { addNewTodo, getAllOwnerTodo, editTodo, deleteTodo };