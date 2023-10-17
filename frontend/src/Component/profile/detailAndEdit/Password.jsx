import React, {useState} from "react";
import HeaderBlog from "../../blog/header/Header.blog";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../../createInstance";
import {getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {toast} from 'react-toastify';
import {changePassword} from "../../../Redux/APIRequest/apiUserRequest";
import 'react-toastify/dist/ReactToastify.css';
import {logoutSuccess} from "../../../Redux/Slice/authSlice";

const Password = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
    const handleChangePassword = () => {
        if (newPassword === confirmPassword) {
            const data = {
                oldPassword: password,
                password: newPassword
            }
            changePassword(data, dispatch, axiosJWT).then((res) => {
                toast.success("Thay đổi mật khẩu thành công, vui lòng đăng nhập lại",{
                    position: "top-right",
                });
                setTimeout(() => dispatch(logoutSuccess()),1000);
            }).catch((err) => {
                toast.error("🦄 "+err.response.data, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                });
            });
        } else {
            toast.warn("Password is not match",{
                position: "top-right"
            });
        }
    }
    return (
        <div>
            <HeaderBlog/>
            <div className={"my-4 mx-4"}>
                <h1 className={"float-left"}>Change password</h1>
                <div className={"flex flex-col justify-center items-center w-full"}>
                    <div
                        className={"flex flex-col mt-6 pt-12 w-full border-solid border-0 border-t-gray-400 border-t-2 py-4 px-6"}>
                        <div className="mb-4">
                            <label htmlFor="old-password"
                                   className="block mb-2 text-sm font-medium"><h3>Old password</h3></label>
                            <input type="password" id="old-password"
                                   className="border text-sm rounded-lg block w-full p-2.5"
                                   placeholder="Old password" onChange={e => setPassword(e.target.value)}/>
                            <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                                <span className="font-medium"></span>
                            </p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="new-password"
                                   className="block mb-2 text-sm font-medium"><h3>New password</h3></label>
                            <input type="password" id="new-password"
                                   className="border text-sm rounded-lg block w-full p-2.5"
                                   placeholder="New password" onChange={e => setNewPassword(e.target.value)}/>
                            <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                                <span className="font-medium"></span>
                            </p>
                        </div>
                        <div className="mb-8">
                            <label htmlFor="r-new-password"
                                   className="block mb-2 text-sm font-medium"><h3>Confirm password</h3></label>
                            <input type="password" id="r-new-password"
                                   className="border text-sm rounded-lg block w-full p-2.5"
                                   placeholder="Retype password" onChange={e => setConfirmPassword(e.target.value)}/>
                            <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                                <span className="font-medium"></span>
                            </p>
                        </div>
                        <div>
                        <span
                            className={"float-right py-2 px-3 bg-green-500 border rounded cursor-pointer"}
                            onClick={handleChangePassword}>Change</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Password;
