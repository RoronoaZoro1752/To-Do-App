import { useEffect, useRef, useState } from "react";
import ToDoItem from "./ToDoItem";

export default function ToDoList(){
    let data = localStorage.getItem("data");
    let [task, setTask] = useState(JSON.parse(data) || null);
    let inputName = useRef();

    let add = () =>{
        let name = inputName.current.value.trim();

        if(name === ''){
            return null;
        }

        const newTodo = {
            id: Date.now(),
            taskname: name,
            isComplete: false,
        }

        setTask((prev) => [newTodo, ...prev ]);
        inputName.current.value = '';
    }

    const deletetask = (id) =>{
        setTask((prev) => {
            return prev.filter((item) => item.id !== id);
        })
    }

    const toggle = (id) =>{
        setTask((prev) =>{
            return prev.map((item) => {

                if(item.id === id){
                    return {...item, isComplete: !item.isComplete}
                }
                return item;
            })
        })

    }

    const editTask = (id, newTask) =>{
        setTask((prev) => {
            return prev.map((item) => {
                if(item.id === id){
                    return {...item, taskname: newTask}
                }
                return item;

            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("data", JSON.stringify(task))
    }, [task])

    return(
        <>
            <div className="flex justify-center p-5 gap-2">
                <input type="text" ref={inputName} className="bg-gray-200 shadow-inner rounded-lg h-10 px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-slate-300 w-full sm:w-auto"/>
                <button onClick={add} className="rounded-xl bg-slate-400 text-white px-4 py-2 text-sm font-semibold shadow-md hover:bg-slate-500 transition duration-300 ease-in-out w-full sm:w-auto">Add +</button>
            </div>
            <div className="bg-slate-200 shadow-inner rounded-xl p-4 m-4 sm:h-[30rem] h-[25rem] overflow-y-auto flex flex-col gap-2">
                {task.length > 0 ? (task.map((item, index) =>{
                    return <ToDoItem key={index} text={item.taskname} id={item.id} isComplete={item.isComplete} deletetask={deletetask} toggle={toggle} editTask={editTask}/>
                })): (
                    <p className="text-center text-gray-500">No tasks available</p>
                )}
            </div>
        </>
    )
}