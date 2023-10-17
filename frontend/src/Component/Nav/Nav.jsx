import React from "react";
import {BsHouse} from "react-icons/bs";
import {AiOutlineTeam, AiOutlineFolderOpen, AiOutlineLogout} from "react-icons/ai"
import {FaRegUserCircle} from "react-icons/fa"
import {logoutUser} from "../../Redux/APIRequest/apiAuthRequest";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {createAxios} from "../../createInstance";
import {logoutSuccess} from "../../Redux/Slice/authSlice";
import {MdArticle} from "react-icons/md";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Nav() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, logoutSuccess);

    function handleLogOut() {
        toast.success("Đăng xuất thành công",{
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
        setTimeout(() => logoutUser(dispatch, navigate, accessToken, axiosJWT), 1000);
    }

    return (
        <nav
            className="h-screen bg-white flex items-center fixed flex-col border-solid border-0 border-r-2 border-r-gray-200 justify-between z-50
            top-0 w-12 max-sm:h-[50px] max-sm:flex-row max-sm:right-0 max-sm:left-0 max-sm:w-screen max-sm:border-b-2">
            <div className="max-sm:flex max-sm:flex-row">
                <div>
                    <img src={`${__dirname}icon.png`} alt="anh icon" className="w-12 h-12 object-cover cursor-pointer max-sm:w-[40px] max-sm:h-[40px]"/>
                </div>
                <Link to={"/project"}
                      className="text-2xl py-3 rounded hover:bg-gray-400 hover:text-black flex justify-center text-gray-400 max-sm:px-2 max-sm:py-2">
                    <BsHouse/>
                </Link>
                <Link to={"/"}
                      className="text-2xl py-3 rounded hover:bg-gray-400 hover:text-black flex justify-center text-gray-400 max-sm:px-2 max-sm:py-2">
                    <AiOutlineTeam/>
                </Link>
                <Link to={"/"}
                      className="text-2xl py-3 rounded hover:bg-gray-400 hover:text-black flex justify-center text-gray-400 max-sm:px-2 max-sm:py-2">
                    <AiOutlineFolderOpen/>
                </Link>
                <Link to={"/blog/article"} title={"Blog"}
                      className="text-2xl py-3 rounded hover:bg-gray-400 hover:text-black flex justify-center text-gray-400 max-sm:px-2 max-sm:py-2">
                    <MdArticle/>
                </Link>
            </div>

            <div className="w-12 max-sm:flex max-sm:flex-row max-sm:w-fit">
                <Link to={"/profile/me/blog"} title={"Profile"}
                      className="text-2xl py-3 rounded hover:bg-gray-400 hover:text-black flex justify-center text-gray-400 max-sm:px-3 max-sm:py-3">
                    <FaRegUserCircle/>
                </Link>
                <div
                    className="text-2xl py-3 mb-6 cursor-pointer rounded hover:bg-gray-400 text-red-600 flex justify-center max-sm:px-3 max-sm:mb-0"
                    onClick={handleLogOut}>
                    <AiOutlineLogout/>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
