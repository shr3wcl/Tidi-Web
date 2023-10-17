import React from "react";
import DetailProject from "./Content/DetailProject";
import NavProject from "./Nav/NavProject";
import { Route, Routes } from "react-router-dom";

function Project() {

    return (
        <>
            <div className={"ml-12 flex"}>
                <div className={"sticky top-0 p-4 z-50"}>
                    <NavProject ></NavProject>
                </div>
                <Routes>
                    <Route path={"/*"}>
                        <Route path={"project/:id"} element={<DetailProject />} />
                        {/*<Route path={"member"} element={}/>*/}
                    </Route>
                </Routes>
            </div>
        </>


    )
}
export default Project;
