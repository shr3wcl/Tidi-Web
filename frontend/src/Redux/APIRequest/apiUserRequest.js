import {instance} from "../../createInstance";

export const getInfo = async (idUser) => {
    try{
        return instance.get(`/v1/user/info/${idUser}`);
    }catch(err){
        console.log(err);
    }
}

export const changePassword = async (data, dispatch, axiosJWT) => {
    return await axiosJWT.post("/v1/user/change/password", data);
}

export const changeAvatar = async (data, dispatch, axiosJWT) => {
    return await axiosJWT.post("/v1/user/change/avatar", data);
}

export const changeInfo = async (data, axiosJWT, idUser) => {
    return await axiosJWT.post(`/v1/user/edit/${idUser}`, data);
}

export const getFollow = async (idUser) => {
    return await instance.get(`/v1/user/follow/all/${idUser}`);
}

export const addFollow = async (idUser, axiosJWT) => {
    return await axiosJWT.post(`/v1/user/follow/add/${idUser}`, {idFollow: idUser});
}

export const unfollow = async (idUser, axiosJWT) => {
    return await axiosJWT.post(`/v1/user/follow/delete`, {idFollow: idUser});
}

export const checkFollow = async (idUser, axiosJWT) => {
    return await axiosJWT.post(`/v1/user/follow/check`, {idFollow: idUser});
}
