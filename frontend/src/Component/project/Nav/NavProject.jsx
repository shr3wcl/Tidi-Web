import React from "react";
import { AiOutlineProject, AiFillProject } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import ListProject from "./ListProject";
import BtnCreate from "../Create/BtnCreate";

function NavProject() {
    const listFeature = [

        {
            id: 1,
            icon: <AiOutlineProject />,
            iconActive: <AiFillProject />,
            item: "/project",
            itemLink: "/project",
            name: "Project",
        },
    ]
    //render project+ member
    const renderList = listFeature.map(function (list, index) {
        return (
            <>
                <NavLink className={`item_${index + 1}`} to={`${list.itemLink}`} key={list.id} exact="true">
                    {
                        (
                            <>
                                <div className="p-4 text-xl cursor-pointer text-black
                                     bg-gray-200 font-medium border-r border-black" key={list.id}>
                                    <div className="inline-block mx-2" key={list.id}>
                                        {list.iconActive}
                                    </div>
                                    <p className="inline-block mx-2" key={list.name}>{list.name}</p>
                                </div>

                                <div key={list.name}>
                                    <ListProject></ListProject>
                                </div>

                            </>)}
                </NavLink >

            </>

        )
    })
    return (
        <>
            <div id="project" className=" w-1/5 min-w-fit border-r border-r-gray-200 py-4 hidden lg:block z-50">
                <div className="text-center text-xl p-2">
                    <h1>Tidi.works</h1>
                </div>
                <div className="">
                    {renderList}
                </div>
            </div>
            <div className="hidden lg:block">
                <BtnCreate></BtnCreate>
            </div>
        </>
    )
}
export default NavProject
