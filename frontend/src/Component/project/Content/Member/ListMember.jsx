import React, { useState, useEffect, useRef } from "react";
import {
    useParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { getProjectSuccess } from "../../../../Redux/Slice/projectSlice";
import { getAllMember } from "../../../../Redux/APIRequest/apiMemberRequest";
import Loading from "../../../loading/Loading"
import { AiOutlineUser } from "react-icons/ai"
import EditRole from "./Edit/EditRole";
import BtnAdd from "./Add/BtnAdd";

function ListMember() {
    let { id } = useParams();
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const user = useSelector(state => state.auth.login.currentUser);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getProjectSuccess);
        getAllMember(accessToken, dispatch, axiosJWT, id).then(raw => {
            setData(raw.data);
            setIsLoading(false);
        });
    }, [accessToken, dispatch, id, refreshToken, user]);
    console.log(data);

    const {
        ref,
        isComponentVisible,
        setIsComponentVisible
    } = useComponentVisible(false);
    function useComponentVisible(initialIsVisible) {
        const [isComponentVisible, setIsComponentVisible] = useState(
            initialIsVisible
        );
        const ref = useRef(null);
        const handleClickOutside = event => {

            if (ref.current && !ref.current.contains(event.target)) {
                setIsComponentVisible(false);
            }
        };

        useEffect(() => {
            document.addEventListener("click", handleClickOutside, true);
            return () => {
                document.removeEventListener("click", handleClickOutside, true);
            };
        });

        return { ref, isComponentVisible, setIsComponentVisible };
    }
    function handleVisibleEditRole() {
        setIsComponentVisible(pre => !pre)
    }
    return (
        <>
            {isLoading ? <Loading /> : (
                <div>
                    {data.map(function (member) {
                        return (
                            <>
                                <div key={member.id} className=" py-4   cursor-pointer box-shadow-custom" onClick={handleVisibleEditRole}>
                                    <div className="inline-block mx-2" >
                                        <AiOutlineUser></AiOutlineUser>
                                    </div>
                                    <p className="inline-block"  >{`${member.idUser.firstName} ${member.idUser.lastName}`}</p>
                                    <div className="pl-8 py-2 text-gray-400">
                                        {member.role === 0 ?
                                            <div className="">Manager</div> :
                                            <div>Staff</div>}
                                    </div>
                                </div>
                                {isComponentVisible && (
                                    <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black bg-opacity-30" key={member.idUser._id} >
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  bg-white w-1/3 h-auto" ref={ref}>
                                            <EditRole userEdit={member.idUser} roleEdit={member.role} handleVisibleEditRole={handleVisibleEditRole} />
                                        </div>
                                    </div>)
                                }
                            </>
                        )

                    })}
                    <div>
                        <BtnAdd></BtnAdd>
                    </div>
                </div>
            )}
        </>

    )
}
export default ListMember;