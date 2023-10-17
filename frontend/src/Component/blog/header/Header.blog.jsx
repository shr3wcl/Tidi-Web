import React, {useEffect, useState, useRef} from "react";
import moment from "moment";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createAxios} from "../../../createInstance";
import {
    addCommentSuccess,
    checkStorage,
    deleteBlogSuccess, deleteCommentSuccess,
    getBlogSuccess,
    getCommentSuccess,
    storageBlogSuccess, unStorageBlogStart, unStorageBlogSuccess
} from "../../../Redux/Slice/blogSlice";
import {
    addComment,
    addStorage,
    deleteBlog,
    deleteComment,
    deleteStorage,
    getComment
} from "../../../Redux/APIRequest/apiBlogRequest";
import {toast} from "react-toastify";
import {
    AiFillHeart,
    AiFillInstagram,
    AiFillRedditCircle,
    AiFillTwitterCircle,
    AiOutlineHeart,
    AiOutlineShareAlt
} from "react-icons/ai";
import {BiCommentDetail} from "react-icons/bi";
import Share from "./Share";
import {BsFacebook, BsFillImageFill, BsMessenger, BsThreeDots} from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import {IoLocationSharp} from "react-icons/io5";
import {RiAttachmentLine} from "react-icons/ri";
import Loading from "../../loading/Loading";
import {loginSuccess} from "../../../Redux/Slice/authSlice";


function HeaderBlog(props) {
    const [key, setKey] = useState('');
    const [shareToggle, setShareToggle] = useState(false);
    const [commentToggle, setCommentToggle] = useState(false);
    const [iconToggle, setIconToggle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [allComment, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const checkSave = useSelector(state => state.blog.init.check);
    const author = props?.data?.idUser;
    const blog = props?.data;
    const user = useSelector(state => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.login.token);
    const refreshToken = token?.refreshToken;
    const accessToken = token?.accessToken;
    const handleDelete = async () => {
        // eslint-disable-next-line no-restricted-globals
        const temp = confirm("Are you sure?");
        if (temp) {
            const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, deleteBlogSuccess);
            await deleteBlog(dispatch, navigate, accessToken, axiosJWT, blog._id);
        }
    }
    useEffect(() => {
        if(blog?._id){
            getComment(blog?._id).then(r => {
                setComments(r.data);
                setIsLoading(false);
            });
        }
    }, [blog, allComment]);

    const handleStorage = () => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, storageBlogSuccess);
        addStorage(dispatch, accessToken, blog._id, axiosJWT).then(rs => {
            toast.success("Saved", {autoClose: 1000, position: "bottom-right"});
            dispatch(checkStorage(rs.data.storage));
        }).catch(err => toast.error(err.data.message, {position: "bottom-right", autoClose: 1500}));

    };

    const handleUnarchived = () => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, unStorageBlogSuccess);
        deleteStorage(dispatch, accessToken, checkSave.idBlog, axiosJWT).then(rs => {
            toast.success("Đã gỡ bài viết khỏi mục lưu trữ", {position: "bottom-right", autoClose: 1500});
            dispatch(checkStorage(false));
        }).catch(err => toast.error(err.data.message, {position: "bottom-right", autoClose: 1500}));
    }

    const handleSendComment = (e) => {
        e.preventDefault();
        if (comment) {
            const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
            addComment(blog._id, axiosJWT, {idUser: user._id, content: comment}).then(r => {
                toast.success("Post comment successfully", {autoClose: 1000, position: 'bottom-right'});
            });
        }
    }

    const handleDeleteComment = (idComment) => {
        const axiosJWT = createAxios(user, accessToken, refreshToken, dispatch, getBlogSuccess);
        deleteComment(idComment, axiosJWT).then(r => toast.success("Comment removed", {
            autoClose: 1000,
            position: 'bottom-right'
        }));
    }

    const temp = (e) => {
        e.stopPropagation();
    }

    return (
        <div
            className={"flex h-14 sticky top-0 bg-white justify-between items-center px-8 border-solid border-0 border-b-2 border-b-gray-200 z-10"}>
            <div className={"my-0.5"}>
                {props.type === "search" ?
                    (
                        <input type="text" placeholder={"Search..."} onChange={(e) => setKey(e.target.value)}
                               className={"py-1.5 pl-4 w-64 outline-0 rounded-xl"}/>
                    ) :
                    props.type === "blog-detail" ?
                        (
                            <div className={"flex flex-row items-center"}>
                                <Link to={`/profile/${author?._id}`} className={"flex"}>
                                    <img src={author?.avatar} alt="" className={"w-11 h-11 rounded-full border-solid"}/>
                                    <div className={"ml-4 mt-1 flex flex-col justify-between"}>
                                        <p className={"font-semibold"}>
                                            {author?.firstName} {author?.lastName}
                                            <span className={"ml-2 font-thin text-xs bg-gray-300 px-1"}>Author</span>
                                        </p>
                                        <p className={"text-xs text-gray-400"}>{moment(blog.createdAt).format("LL")}</p>
                                    </div>
                                </Link>
                                {user?._id === author?._id ? (
                                    props.theme === "edit-blog" ? (
                                        <div>
                                            <Link to={`../edit/${blog._id}`}
                                                  className={"ml-6 bg-green-500 py-1.5 px-3 rounded"}>Save</Link>
                                        </div>
                                    ) : (
                                        <div>
                                            <Link to={`../edit/${blog._id}`}
                                                  className={"ml-6 bg-blue-500 py-1.5 px-3 rounded"}>EDIT</Link>
                                            <Link to={""} className={"ml-3 bg-red-500 py-1.5 px-3 rounded"}
                                                  onClick={handleDelete}>DELETE</Link>
                                        </div>
                                    )
                                ) : ("")}
                            </div>
                        ) : (<></>)}
            </div>
            <div className={"flex flex-row h-full items-center justify-between"}>
                {props.type === "blog-detail" ? (
                    <div className={"text-lg mr-6 h-full flex justify-center items-center"}>
                        <p className={"py-2 px-3 cursor-pointer"} title={"Share"}
                           onClick={() => setShareToggle(!shareToggle)}><AiOutlineShareAlt/></p>
                        {shareToggle ? (
                            <div tabIndex="-1" aria-hidden="true" onClick={(e) => setShareToggle(!shareToggle)}
                                 className="bg-gray-400 bg-opacity-50 fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                                <div className="relative w-screen h-full flex justify-center items-center">
                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700"
                                         onClick={(e) => temp(e)}>
                                        <button type="button" onClick={() => setShareToggle(!shareToggle)}
                                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto outline-0 border-0 inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                                data-modal-toggle="crypto-modal">
                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor"
                                                 viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd"
                                                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                        <div className="px-6 py-4 border-b rounded-t dark:border-gray-600">
                                            <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                                                Let share the interesting with everyone!
                                            </h3>
                                        </div>
                                        <div className="p-6">
                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Connect
                                                with one of our available social network providers to
                                                start <br/> sharing.</p>
                                            <ul className="my-4 space-y-3">
                                                <li>
                                                    <a href="#"
                                                       className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                        <BsMessenger/>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Messenger</span>
                                                        <span
                                                            className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#"
                                                       className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                        <BsFacebook/>
                                                        <span
                                                            className="flex-1 ml-3 whitespace-nowrap">Facebook</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#"
                                                       className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                        <AiFillInstagram/>
                                                        <span
                                                            className="flex-1 ml-3 whitespace-nowrap">Instagram</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#"
                                                       className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                        <AiFillRedditCircle/>
                                                        <span
                                                            className="flex-1 ml-3 whitespace-nowrap">Reddit</span>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#"
                                                       className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                                                        <AiFillTwitterCircle/>
                                                        <span className="flex-1 ml-3 whitespace-nowrap">Twitter</span>
                                                    </a>
                                                </li>
                                            </ul>
                                            <div>
                                                <a href="#"
                                                   className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                                                    <svg className="w-3 h-3 mr-2" aria-hidden="true"
                                                         focusable="false"
                                                         data-prefix="far" data-icon="question-circle" role="img"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                                        <path fill="currentColor"
                                                              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"/>
                                                    </svg>
                                                    Why isn't there what I need?</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ''}
                        <p onClick={checkSave ? handleUnarchived : handleStorage} className={"py-2 px-3 cursor-pointer"}
                           title={"Unarchived"}>{checkSave ? <AiFillHeart/> : <AiOutlineHeart/>}</p>
                        <p className={"py-2 px-3 cursor-pointer"} onClick={() => setCommentToggle(!commentToggle)}>
                            <BiCommentDetail/></p>
                        {commentToggle ? (
                            <div tabIndex="-1" aria-hidden="true" onClick={(e) => setCommentToggle(!commentToggle)}
                                 className="bg-gray-400 bg-opacity-50 fixed top-0 left-0 right-0 bottom-0 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">

                                <div className="relative w-screen h-full flex justify-end items-center">
                                    <div
                                        className="relative bg-white rounded-lg shadow animate-[] transfo w-[50%] min-w-[460px]
                                        h-full flex flex-col overflow-x-hidden overflow-y-auto max-sm:top-1/6 max-sm:w-screen max-sm:min-w-full"
                                        onClick={(e) => temp(e)}>
                                        <div className={"mx-8"}>
                                            <ul className={""}>
                                                <li className={"flex my-4"}>
                                                    <div>
                                                        <img src={user.avatar}
                                                             className={"w-8 h-8 rounded-full"} alt=""/>
                                                    </div>
                                                    <div className={"bg-white mb-8 rounded ml-2 w-full"}>
                                                        <form>
                                                            <div
                                                                className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-200  dark:border-gray-600">
                                                                <div
                                                                    className="px-4 py-2 bg-gray-200 rounded-t-lg ">
                                                                    <label htmlFor="comment" className="sr-only">Your
                                                                        comment</label>
                                                                    <textarea id="comment" rows="4"
                                                                              onChange={e => setComment(e.target.value)}
                                                                              className="w-full outline-0 resize-none overflow-x-hidden overflow-y-auto px-0 bg-gray-200 text-sm text-gray-900 bg-white border-0 focus:ring-0 dark:placeholder-gray-400"
                                                                              placeholder="Write a comment..."
                                                                              required/>
                                                                </div>
                                                                <div
                                                                    className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                                                    <button type="submit" onClick={e=>handleSendComment(e)}
                                                                            className="inline-flex border-0 out items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                                                        Post comment
                                                                    </button>
                                                                    <div className="flex pl-0 space-x-1 sm:pl-2">
                                                                        <button type="button"
                                                                                className="inline-flex border-0 bg-gray-200 justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                                            <RiAttachmentLine className={"w-5 h-5"}/>
                                                                            <span className="sr-only">Attach file</span>
                                                                        </button>
                                                                        <button type="button"
                                                                                className="inline-flex border-0 bg-gray-200 justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                                            <IoLocationSharp className={"w-5 h-5"}/>
                                                                            <span
                                                                                className="sr-only">Set location</span>
                                                                        </button>
                                                                        <button type="button"
                                                                                className="inline-flex border-0 bg-gray-200 justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                                            <BsFillImageFill className={"w-5 h-5"}/>
                                                                            <span
                                                                                className="sr-only">Upload image</span>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/*<span onClick={handleSendComment}>Send</span>*/}
                                                        </form>
                                                        {/*<EmojiPicker/>*/}
                                                    </div>
                                                </li>
                                                <p className={"text-gray-400 text-sm mb-2"}>This post have {allComment.length} comments</p>
                                                <hr/>
                                                {isLoading ? <Loading/> : (
                                                    <>
                                                        {allComment.map(each => (
                                                            <li key={each._id} className={"flex my-4"}>
                                                                <div>
                                                                    <img src={each.idUser.avatar}
                                                                         className={"w-8 h-8 rounded-full"} alt=""/>
                                                                </div>
                                                                <div className={"bg-gray-200 py-1 px-2 w-full mx-2 rounded-xl"}>
                                                                    <div className={"flex justify-between"}>
                                                                        <h4>{each.idUser.firstName + ' ' + each.idUser.lastName}</h4>
                                                                        {each.idUser._id === user._id ? <span className={"mr-2"}
                                                                                                              onClick={() => handleDeleteComment(each._id)}>Xoá</span> : ''}
                                                                        {/*<span className={"mr-2 cursor-pointer rounded-full hover:bg-gray-500 px-2 pt-1 "}><BsThreeDots/></span>*/}
                                                                    </div>
                                                                    <p className={"my-3"}>{each.content}</p>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                            </ul>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        ) : ''}
                    </div>
                ) : ("")}
                <div
                    className={"h-full border-solid border-0 border-l-gray-300 border-l-2 flex justify-center items-center pl-2 max-sm:hidden"}>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-600">Light</span>

                    <label className="inline-flex relative items-center cursor-pointer absolute top-0 ml-6">
                        {/*<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-600">Light</span>*/}
                        <input type="checkbox" value={""} className="sr-only peer outline-0"/>
                        <div
                            className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white-300 dark:peer-focus:ring-white-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:after:bg-black peer-checked:bg-white"/>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-600">Night</span>
                    </label>
                    {/*Night/Light mode*/}
                </div>
            </div>
        </div>
    )
}

export default HeaderBlog;
