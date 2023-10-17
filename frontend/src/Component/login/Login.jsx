import {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {loginUser} from "../../Redux/APIRequest/apiAuthRequest";
import {useDispatch, useSelector} from "react-redux";
import {loginStart, loginSuccess} from "../../Redux/Slice/authSlice";
import {toast, ToastContainer} from "react-toastify";


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const isLogin = useSelector(state => state.auth.login.success);
    // let msg = useSelector(state => state.auth.login?.msg);

    useEffect(() => {
        isLogin && navigate('/');
    }, [dispatch, isLogin, navigate]);

    function handleLogin(e) {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        loginUser(data, dispatch, navigate)
            .then(user => {
                dispatch(loginSuccess(user.data));
            })
            .catch(err => toast.error("🦄 "+err.response.data, {
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            }));
    }

    return (
        <div className={"h-screen w-screen flex justify-center items-center"}>
            <div
                className='bg-black bg-opacity-70 px-10 shadow-2xl rounded-lg flex justify-center flex-col py-10'>
                <div className='py-4 text-center w-full text-white  '>
                    <h2 className=' text-5xl font-bold tracking-wider mb-1 '>Welcome!</h2>
                    <p className='font-normal text-gray-400'> Wish you have a nice time</p>
                </div>
                <form className='flex flex-col w-full' id='form-login' onSubmit={handleLogin}>
                    {/*<span className='err text-red-700'>{msg}</span>*/}
                    <div className='pt-4'>
                        <label className='text-lg font-semibold text-white  '>Username</label> <br/>
                        <input type="text" value={username} onChange={e => setUserName(e.target.value)}
                               className=' w-full py-3 bg-gray-300 pr-10 pl-3 my-1 rounded-md focus:outline-0'
                               placeholder='Username here...'/>
                        <p className='er'></p>
                    </div>
                    <div className='pt-4'>
                        <label className='text-lg font-semibold  text-white '>Password</label> <br/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                               className='w-full py-3 bg-gray-300 pr-10 pl-3 my-1 rounded-md focus:outline-0'
                               placeholder='Password here...'/>
                        <p className='er'></p>
                    </div>
                    <div className='pt-2 '>
                        <div className='inline-block m-3 float-left'>
                            <input type='checkbox' className='h-4 w-4 mr-1'/>
                            <label className='text-white '>Remember me</label>
                        </div>
                        <div className='inline-block m-3 underline italic text-white  float-right'>
                            <Link to={'/forgotPass'}>Forgot Password</Link>
                        </div>
                    </div>
                    <button type='submit'
                            className=' mt-1 w-full bg-gray-900  text-yellow-50  rounded-md py-3 shadow-lg hover:shadow '>Login
                    </button>
                </form>
                <div className='my-4 w-full text-center text-white '>
                    <p className='inline-block '>Don't have an account?</p>
                    <Link to='/register' className='italic underline '>Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
