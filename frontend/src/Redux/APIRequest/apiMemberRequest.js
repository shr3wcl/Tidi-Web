import { addFailed, addStart, addSuccess, getProjectFail, getProjectStart, getProjectSuccess } from "../Slice/projectSlice";

const addNewMember = async (accessToken, data, dispatch, idProject, axiosJWT) => {
    dispatch(addStart());
    try {
        await axiosJWT.post(`/v1/user/manager/add/${idProject}`, data);
        dispatch(addSuccess("Success"));

    } catch (err) {
        dispatch(addFailed("Failed"));
    }
}

const getAllMember = async (accessToken, dispatch, axiosJWT, idProject) => {
    dispatch(getProjectStart());
    try {
        const data = await axiosJWT.get(`/v1/user/manager/member/${idProject}`);
        dispatch(getProjectSuccess());
        return data;
    } catch (err) {
        dispatch(getProjectFail("Lỗi"));
    }
}

const editRoleMember = async (dispatch, accessToken, axiosJWT, idProject, data) => {
    try {
        await axiosJWT.post(`/v1/user/manager/edit/${idProject}`, data);
        // navigate("/home/project");
    } catch (err) {
        console.log(err);
    }
}

const deleteMember = async (dispatch, navigate, accessToken, axiosJWT, idProject) => {
    try {
        await axiosJWT.delete(`/v1/user/manager/delete/${idProject}`);
        // navigate("/home/project");
    } catch (err) {
        console.log(err);
    }
}



export { addNewMember, getAllMember, editRoleMember, deleteMember };