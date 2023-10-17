import React, {useState} from "react";
import {createAxios, instance} from "../../../createInstance";
import {useDispatch, useSelector} from "react-redux";
import {getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {changeAvatar, changeInfo} from "../../../Redux/APIRequest/apiUserRequest";
import {loginSuccess} from "../../../Redux/Slice/authSlice";
import HeaderBlog from "../../blog/header/Header.blog";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const DetailProfile = () => {

    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email ?? '');
    const [gender, setGender] = useState(user.gender ?? '');
    const [birthday, setBirthday] = useState(user.birthday ?? '');
    const [location, setLocation] = useState(user.location ?? '');
    const [bio, setBio] = useState(user.bio);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            email,
            gender,
            birthday,
            location,
            bio
        }
        // console.log(user._id);
        changeInfo(data, axiosJWT, user._id).then(async rs => {
            dispatch(loginSuccess({user: rs.data, token: {accessToken, refreshToken}}));
            await toast.success("Thay đổi thông tin thành công", {autoClose: 1000});
            navigate("/profile/me");
        })
            .catch(err => toast.error("Thay đổi thông tin không thành công", {position: "top-right", autoClose: 1500}));
    }

    const handleRemoveAvatar = () => {
        const defaultAvatar = "data:image/jpeg;base64,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"
        changeAvatar({avatar: defaultAvatar}, dispatch, axiosJWT).then(rs => {
            dispatch(loginSuccess({user: rs.data, token: {accessToken, refreshToken}}));
            toast.success("Gỡ avatar thành công", {autoClose: 1000});
            navigate("../me");
        }).catch(err=>toast.error("Không thể gỡ avatar", {autoClose: 1000}));
    }
    return(
        <div>
            <HeaderBlog/>
            <div className={"my-4 mx-2"}>
                <h1 className={"mb-2"}>Profile</h1>
                <hr/>
            </div>
            <div className={"w-full flex mx-8 items-center"}>
                <form className="w-full max-w-lg my-4">
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3 items-center">
                            <p className="block uppercase tracking-wide text-lg font-bold mb-2">
                                Avatar
                            </p>
                            <div className={"flex flex-row"}>
                                <img src={user.avatar} alt="" className="w-32 h-32 rounded-full ml-0 mr-4 border-solid border-gray-200"/>
                                <div className={"flex flex-col justify-center"}>
                                    <Link to={"../avatar"} className="block text-blue-400 tracking-wide text-xs font-bold mb-4"
                                          htmlFor="grid-avatar">
                                        Change image
                                    </Link>
                                    <p onClick={handleRemoveAvatar} className="block text-red-400 tracking-wide text-xs font-bold mb-2 cursor-pointer">Remove current avatar</p>
                                </div>
                            </div>
                            <p className={"text-gray-400 text-sm mt-4"}>Recommendation: 256x256px image is recommended for best quality.</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-first-name">
                                First Name
                            </label>
                            <input
                                className="appearance-none block w-full font-semibold text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:border-gray-500"
                                id="grid-first-name" name="firstName" type="text" placeholder="Jane" value={firstName} onChange={e=>setFirstName(e.target.value)}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-last-name">
                                Last Name
                            </label>
                            <input
                                className="appearance-none block w-full font-semibold border border-gray-200 rounded py-2 px-4 leading-tight focus:border-gray-500"
                                id="grid-last-name" name="lastName" type="text" placeholder="Doe" value={lastName} onChange={e=>setLastName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-email">
                                Email
                            </label>
                            <input
                                className="appearance-none block w-full font-semibold border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:border-gray-500"
                                id="grid-email" name="email" type="email" placeholder="" value={email} onChange={e=>setEmail(e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-gender">
                                Gender
                            </label>
                            <select name="gender" value={gender} onChange={e=>setGender(e.target.value)} id="grid-gender" className="appearance-none block w-full font-semibold border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:border-gray-500">
                                <option value="">---Select---</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Another">Another</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-birthday">
                                Birthday
                            </label>
                            <input
                                className="appearance-none block w-full font-semibold border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:border-gray-500"
                                id="grid-birthday" name="birthday" value={birthday} onChange={e=>setBirthday(e.target.value)} type="date" placeholder=""/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-location">
                                Location
                            </label>
                            <input
                                className="appearance-none block w-full font-semibold border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:border-gray-500"
                                id="grid-location" name="location" value={location} onChange={e=>setLocation(e.target.value)} type="text" placeholder=""/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-1">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                   htmlFor="grid-bio">
                                Bio
                            </label>
                            <textarea value={bio} onChange={event => setBio(event.target.value)} name="bio" id="grid-bio" cols="30" rows="10" className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-2 px-4 mb-3 leading-tight focus:border-gray-500"/>
                        </div>
                    </div>
                    <div className="float-right my-3">
                        <span className={"bg-blue-500 py-2 px-4 rounded text-white cursor-pointer"} onClick={e=>handleSubmit(e)}>Save</span>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default DetailProfile;
