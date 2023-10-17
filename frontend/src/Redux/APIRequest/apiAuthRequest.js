import {instance} from "../../createInstance";
import {
    loginFail,
    loginStart,
    loginSuccess,
    logoutFail,
    logoutStart,
    logoutSuccess,
    registerFail,
    registerStart,
    registerSuccess
} from "../Slice/authSlice";

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try{
        await instance.post("v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    }catch(err){
        dispatch(registerFail());
    }
}

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    return await instance.post("v1/auth/login", user);
}

export const logoutUser = async (dispatch, navigate, accessToken, axiosJWT)=>{
    dispatch(logoutStart());
    try {
        await axiosJWT.post("v1/auth/logout", '', {headers: {token: `Bearer ${accessToken}`}});
        dispatch(logoutSuccess());
        navigate("/login");
    }catch (err){
        console.log(err);
        dispatch(logoutFail());
    }
}

