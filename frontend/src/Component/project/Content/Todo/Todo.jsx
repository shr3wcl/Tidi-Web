import React, { useState, useEffect } from "react";
import BtnCreate from "../Todo/Create/BtnCreate";
import {
    useParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../../createInstance";
import { getProjectSuccess } from "../../../../Redux/Slice/projectSlice";
import { getAllOwnerTodo } from "../../../../Redux/APIRequest/apiTodoRequest";
import Loading from "../../../loading/Loading"
import BtnDelete from "./Delete/BtnDelete";
function Todo() {
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
        getAllOwnerTodo(accessToken, dispatch, axiosJWT, id).then(raw => {
            setData(raw.data);
            setIsLoading(false);
        });
    }, [accessToken, dispatch, id, refreshToken, user]);

    function Kanban({ heading, state, taskList }) {
        return (
            <div key={heading} className="h-full cursor-pointer">
                <div className="text-center font-semibold text-2xl">
                    {heading}
                </div>
                <div>
                    {taskList.map(function (task) {
                        return <>
                            <div key={task.title} className="flex flex-col p-2 m-2 rounded border box-shadow-custom">
                                <div className=" flex flex-row justify-between">
                                    <div className="font-semibold text-xl">
                                        {task.title}
                                    </div>
                                    <div className="my-auto">
                                        <BtnDelete idTodo={task._id}></BtnDelete>
                                    </div>
                                </div>
                                <div className=" text-limit">
                                    {task.content}
                                </div>
                                <div className="text-center mt-4 hidden">
                                    {task.creatAt}
                                </div>
                            </div>
                        </>
                    })}
                </div>
                <BtnCreate id={id} state={state}></BtnCreate>


            </div>
        )
    }
    const listTodo = data.filter(todo => todo.state === 1);
    const listDoing = data.filter(todo => todo.state === 2);
    const listDone = data.filter(todo => todo.state === 3);
    const listTest = data.filter(todo => todo.state === 4);
    console.log(listTest)
    return (
        <>
            {isLoading ? <Loading /> : (<div className="h-full w-full grid grid-cols-4  px-4">
                <Kanban heading={"Todo"} state={1} taskList={listTodo} ></Kanban>
                <Kanban heading={"Doing"} state={2} taskList={listDoing} ></Kanban>
                <Kanban heading={"Done"} state={3} taskList={listDone} ></Kanban>
                <Kanban heading={"Test"} state={4} taskList={listTest} ></Kanban>
            </div>)}
        </>
    )
}
export default Todo;