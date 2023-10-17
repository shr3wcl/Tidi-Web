import { addFailed, addStart, addSuccess, getProjectFail, getProjectStart, getProjectSuccess } from "../Slice/projectSlice";
import { instance } from "../../createInstance";

const addNewProject = async (accessToken, data, dispatch, navigate, axiosJWT) => {
    dispatch(addStart());
    try {
        await axiosJWT.post("/v1/user/project/add", data);
        dispatch(addSuccess("Success"));
        navigate("/project");
    } catch (err) {
        dispatch(addFailed("Failed"));
    }
}

const getAllOwnerProject = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getProjectStart());
    try {
        const data = await axiosJWT.get("/v1/user/project/all");
        dispatch(getProjectSuccess());
        return data;
    } catch (err) {
        dispatch(getProjectFail("Lỗi"));
    }
}

const getAllPublicProject = async (dispatch, axiosJWT) => {
    dispatch(getProjectStart());
    try {
        const data = await instance.get("/v1/user/project/public/all");
        dispatch(getProjectSuccess());
        return data;
    } catch (err) {
        dispatch(getProjectFail("Lỗi"));
    }
}

const getDetailProject = async (dispatch, axiosJWT, idProject) => {
    dispatch(getProjectStart());
    try {
        const data = await axiosJWT.get(`/v1/user/project/detail/${idProject}`, '');
        dispatch(getProjectSuccess());
        return data;
    } catch (err) {
        dispatch(getProjectFail("Lỗi"));
    }
}

export const editProject = async (dispatch, navigate, accessToken, axiosJWT, idProject, data) => {
    try {
        await axiosJWT.post(`/v1/user/project/edit/${idProject}`, data);
    } catch (err) {
        console.log(err);
    }
}

const deleteProject = async (dispatch, navigate, accessToken, axiosJWT, idProject) => {
    try {
        await axiosJWT.delete(`/v1/user/project/delete/${idProject}`);
        navigate("/project");
    } catch (err) {
        console.log(err);
    }
}



export { addNewProject, getAllOwnerProject, getAllPublicProject, getDetailProject, deleteProject };
