import { useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

const UpdateTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [msg, setMsg] = useState(null);
    const [formData, setFormData] = useState({
        task: "",
        owner: sessionStorage.getItem("user"),
        private: "",
        dueDate: ""
    });

    useEffect(() => {
        const req = new Request(
            'http://localhost:3000/task/' + id, {
            headers: {
                "content-type": "application/json"
            }
        });

        fetch(req)
            .then(res => res.json())
            .then(data => {
                delete data._id;
                setFormData(data);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleUpdateTask = (e) => {
        e.preventDefault();
        const req = new Request(
            'http://localhost:3000/update/' + id, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        fetch(req)
            .then(res => res.json())
            .then(data => {
                setMsg(data);
                navigate("/view/tasks");
            })
            .catch(err => console.error(err));
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    return (
        <>
            {!msg ? (
                <div className="flex justify-center m-2">
                    <div className="bg-purple-500 text-white lg:basis-1/2 sm:p-6 lg:p-2 border border-gray-200 rounded-lg shadow sm:p-8">
                        <p className="text-xl text-center mb-3">Update Task</p>
                        <form method="POST" className="max-w-md mx-auto" onSubmit={handleUpdateTask}>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="task"
                                    id="task"
                                    className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-white appearance-none  focus:outline-none focus:ring-0 focus:border-white"
                                    placeholder=" "
                                    required
                                    onChange={handleChange}
                                    value={formData.task}
                                />
                                <label htmlFor="task" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Task</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="date" name="dueDate" id="dueDate" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-white appearance-none   focus:outline-none focus:ring-0 focus:border-white peer" placeholder=" " required onChange={handleChange} value={formData.dueDate}/>
                                <label htmlFor="dueDate" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Due Date</label>
                            </div>
                            <button type="submit" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <p className="m-5 text-center text-red-600 text-4xl">{msg.message}</p>
            )}
        </>
    );
};

export default UpdateTask;
