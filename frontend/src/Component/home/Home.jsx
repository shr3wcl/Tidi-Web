import React from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";


function Home() {
    const isLogin = useSelector(state => state.auth.login.success);

    return (
        <>
            {/*<div className=' bg-gray-900 text-white bg-opacity-60 w-full h-screen relative' >*/}
            <div className='bg-opacity-60'>
                <div>Home</div>
                {isLogin ||
                    (
                        <div className="float-right">
                            <Link to={"/login"}>Login</Link>
                            <Link to={"/register"}>Register</Link>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default Home;
