import React, { useEffect, useState, useRef } from "react";

import { GrAdd } from "react-icons/gr";
import FormAdd from "./FormAdd";
function BtnAdd({ id }) {


    function handleSetVisible() {
        console.log(1);
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
            <button className="bg-blue-300 rounded-xl m-auto cursor-pointer p-4 mt-2 float-right" onClick={handleSetVisible}>
                <GrAdd></GrAdd>
            </button>
            {isComponentVisible && (<div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black bg-opacity-30" >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  bg-white w-1/3 h-auto" ref={ref}>
                    <FormAdd id={id} handleSetVisible={handleSetVisible}></FormAdd>
                </div>
            </div>)}
        </>
    )
}
export default BtnAdd;