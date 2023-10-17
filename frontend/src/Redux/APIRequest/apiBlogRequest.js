import {addFailed, addStart, addSuccess, getBlogFail, getBlogStart, getBlogSuccess} from "../Slice/blogSlice";
import {instance} from "../../createInstance";
import {isBlock} from "@udecode/plate";

export const addNewBlog = async (accessToken, data, dispatch, navigate, axiosJWT) => {
    dispatch(addStart());
    try {
        await axiosJWT.post("/v1/user/blogs/store", data);
        dispatch(addSuccess("Success"));
        navigate("/blog/my-blog");
    } catch (err) {
        dispatch(addFailed("Failed"));
    }
}

export const getAllOwnerBlog = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getBlogStart());
    try {
        const data = await axiosJWT.get("/v1/user/blogs/all");
        dispatch(getBlogSuccess());
        return data;
    } catch (err) {
        dispatch(getBlogFail("Lỗi"));
    }
}

export const getAllPublicBlog = async (dispatch, axiosJWT) => {
    dispatch(getBlogStart());
    try {
        const data = await instance.get("/v1/user/blogs/public/all");
        dispatch(getBlogSuccess());
        return data;
    } catch (err) {
        dispatch(getBlogFail("Lỗi"));
    }
}

export const getDetailBlog = async (dispatch, axiosJWT, idBlog) => {
    dispatch(getBlogStart());
    try {
        const data = await axiosJWT.get(`/v1/user/blogs/${idBlog}`);
        const checkStorage = await axiosJWT.get(`/v1/user/blogs/storage/check/${idBlog}`);
        return {data, checkStorage};
    } catch (err) {
        dispatch(getBlogFail("Lỗi"));
    }
}

export const editBlog = async (dispatch, navigate, accessToken, axiosJWT, idBlog, data) => {
    try {
        await axiosJWT.post(`/v1/user/blogs/edit/${idBlog}`, data);
        navigate("/blog/my-blog");
    } catch (err) {
        console.log(err);
    }
}

export const deleteBlog = async (dispatch, navigate, accessToken, axiosJWT, idBlog) => {
    try {
        await axiosJWT.delete(`/v1/user/blogs/delete/${idBlog}`);
        navigate("/blog/my-blog");
    } catch (err) {
        console.log(err);
    }
}

export const getStorageBlog = async (dispatch, accessToken, axiosJWT) => {
    try {
        return await axiosJWT.get("/v1/user/blogs/storage/all");
    } catch (err) {
        console.log(err);
    }
}

export const addStorage = async (dispatch, accessToken, idBlog, axiosJWT) => {
    const data = {idBlog: idBlog}
    return await axiosJWT.post("/v1/user/blogs/storage/add", data);
}

export const deleteStorage = async (dispatch, accessToken, idBlog, axiosJWT) => {
    return await axiosJWT.delete("/v1/user/blogs/storage/delete/"+idBlog);
}

export const getComment = async (idBlog) => {
    return await instance.get(`/v1/user/blogs/comment/${idBlog}`);
}

export const addComment = async (idBlog, axiosJWT, data) => {
    return await axiosJWT.post(`/v1/user/comment/add/${idBlog}`, data);
}

export const deleteComment = async (idComment, axiosJWT) => {
    return await axiosJWT.delete(`/v1/user/comment/${idComment}`);
}
