import React, { useEffect, useState, useRef } from "react";

import { GrAdd } from "react-icons/gr";
import FormCreate from "./FormCreate";
function BtnCreate() {


    function handleCreate() {
        setIsComponentVisible(pre => !pre);
    }

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
                console.log("out");
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
    return (
        <>
            <div className=" p-4 rounded bg-blue-300 flex cursor-pointer " onClick={handleCreate}>
                <div className="m-auto ">
                    <GrAdd></GrAdd>
                </div>
                <span className="ml-2 hidden lg:block" >Create New Project</span>
            </div>
            {isComponentVisible &&
                <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black bg-opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-1/4 h-auto" ref={ref}>
                        <FormCreate handleClick={handleCreate}></FormCreate>
                    </div>
                </div>

            }
        </>
    )
}
export default BtnCreate;