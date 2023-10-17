import React, {useEffect, useState} from "react";
import {getFollow, unfollow} from "../../../Redux/APIRequest/apiUserRequest";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {createAxios} from "../../../createInstance";
import {getBlogSuccess} from "../../../Redux/Slice/blogSlice";
import {toast} from "react-toastify";

const FollowList = (props) => {
    const [followList, setFollowList] = useState([]);
    const profileUser = props?.user;
    const currentUser = useSelector(state => state.auth.login.currentUser);
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const dispatch = useDispatch();
    const axiosJWT = createAxios(currentUser, accessToken, refreshToken, dispatch, getBlogSuccess);

    useEffect(() => {
        getFollow(profileUser._id).then(r => setFollowList(r.data));
    }, [profileUser._id, profileUser])

    const handleUnfollow = (idUser) => {
        unfollow(idUser, axiosJWT)
            .then(_=> toast.success("Unfollow successful"))
            .catch(_=> toast.error("Error"));
    }

    return(
        <div>
            <div className={"w-full flex justify-end my-3"}>
                <p className={"mt-4 font-bold"}>Have <span className={"text-blue-400"}>{followList.length}</span> follow</p>
            </div>
            <ul className={"flex flex-row flex-wrap"}>
                {followList.map(each => (
                    <li key={each.idFollow?._id} className={"flex flex-row mt-3 w-1/3 border-solid py-2 px-2 mx-1"}>
                        <div className={"flex flex-row justify-between w-full"}>
                            <Link className={"flex flex-row items-center"}>
                                <img src={each.idFollow?.avatar} alt="" className={"w-10 h-10 rounded-full border-solid"}/>
                                <span className={"ml-2 font-semibold"}>{each.idFollow?.firstName + ' '+ each.idFollow?.lastName}</span>
                            </Link>
                            <div>
                                <button onClick={()=>handleUnfollow(each.idFollow?._id)} className={"hover:animate-bounce cursor-pointer outline-0 border-0 bg-white text-red-400 font-bold"}>Unfollow</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FollowList;
