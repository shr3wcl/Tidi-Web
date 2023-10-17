import React, {useState} from "react";
import HeaderBlog from "../../blog/header/Header.blog";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../../createInstance";
import {getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {changeAvatar} from "../../../Redux/APIRequest/apiUserRequest";
import {loginSuccess} from "../../../Redux/Slice/authSlice";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Avatar = () => {
    const user = useSelector(state => state.auth.login.currentUser);
    const [currentAvatar, setCurrentAvatar] = useState(user.avatar);
    const [avatar, setAvatar] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
    const handleSubmit = async () => {
        const data = await convertToBase64(avatar);
        changeAvatar({avatar: data}, dispatch, axiosJWT).then(rs => {
            dispatch(loginSuccess({user: rs.data, token: {accessToken, refreshToken}}));
            toast.success("Thay đổi avatar thành công", {autoClose: 1000});
            navigate("../me");
        }).catch(err=>toast.error("Không thể thay đổi avatar", {autoClose: 1000}));
    }

    const convertToBase64 = (avatar) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(avatar);
            fileReader.onload = () => {
                resolve(fileReader.result);
            }
            fileReader.onerror = (error) => {
                reject(error);
            }
        })
    }
    const handleSetImage = async (e) => {
        const data = await convertToBase64(e.target.files[0]);
        setCurrentAvatar(data);
        setAvatar(e.target.files[0]);
    }
    return (
        <div>
            <HeaderBlog/>
            <div className={"mx-4"}>
                <div className={"my-4"}>
                    <h1 className={"mb-2"}>Avatar</h1>
                    <hr/>
                </div>
                <div className={"max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center"}>
                    <label htmlFor="avatar">
                        <img src={currentAvatar} alt="avatar" className={"w-96 h-96 rounded-2xl border-solid mb-4"}/>
                    </label>
                    <form action={"#"} encType={"multipart/form-data"}>
                        <input type="file" id={"avatar"} name={"avatar"} onChange={e => handleSetImage(e)}/>
                        <span onClick={handleSubmit} className={"bg-blue-500 py-2 px-4 rounded text-white cursor-pointer"}>Submit</span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Avatar;
