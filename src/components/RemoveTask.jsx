import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const RemoveTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    useEffect(() => {
        // Fetch task details based on the id
        fetch('http://localhost:3000/task/' + id)
            .then(res => res.json())
            .then(data => setTask(data))
            .catch(err => console.error(err));
    }, [id]);

    const handleRemoveTask = () => {
        // Send DELETE request to remove the task
        fetch('http://localhost:3000/remove/' + id, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                navigate("/view/tasks");
            })
            .catch(err => console.error(err));
    }

    return (
        task ? (
            <div className="flex justify-center m-2">
                <div className="bg-purple-500 lg:basis-1/2 sm:p-6 lg:p-2 text-white border border-gray-200 rounded-lg shadow sm:p-8">
                    <p className="text-xl text-center mb-3">Are you sure you want to remove this task?</p>
                    <div className="max-w-md mx-auto" >
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="task"
                                id="task"
                                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-white appearance-none 0  focus:border-white focus:outline-none focus:ring-0 focus:border-white"
                                placeholder=" "
                                value={task.task}
                            />
                            <label htmlFor="task" className="peer-focus:font-medium absolute text-sm  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Task</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="owner"
                                id="owner"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                                placeholder=" "
                                value={task.owner}
                            />
                            <label htmlFor="owner" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Owner</label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="dueDate"
                                id="dueDate"
                                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-white appearance-none  focus:outline-none focus:ring-0 focus:border-white peer"
                                placeholder=" "
                                value={task.dueDate}
                            />
                            <label htmlFor="dueDate" className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Due Date</label>
                        </div>
                        <button
                            className="text-white bg-red-500 hover:bg-red-800  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            onClick={handleRemoveTask}
                        >
                            Remove Task
                        </button>
                    </div>
                </div>
            </div>
        ) : (
            <p>Loading task details...</p>
        )
    );
}

export default RemoveTask;
