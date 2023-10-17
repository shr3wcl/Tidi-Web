import React, { useEffect, useState, useRef } from "react";

import { AiOutlineDelete } from "react-icons/ai";
import AleartDelete from "./AleartDelete";
function BtnDelete({ project }) {
    function handleCreate() {
        setIsComponentVisible(pre => !pre);
        console.log(isComponentVisible)
        console.log(1);
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
            <div className="p-4 m-auto w-full h-full" onClick={handleCreate}>
                <AiOutlineDelete></AiOutlineDelete>
            </div>
            {isComponentVisible &&
                <div className="fixed top-0 left-0 bottom-0 right-0 z-40 bg-black bg-opacity-30">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50  bg-white w-1/3 h-1/4" ref={ref}>
                        <AleartDelete handleClick={handleCreate} project={project}></AleartDelete>
                    </div>
                </div>

            }
        </>
    )
}
export default BtnDelete
    ;