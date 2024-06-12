import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
    const navigate = useNavigate();

    const [msg, setMsg] = useState(null)
    const [formData, setFormData] = useState({
        task: "",
        owner: sessionStorage.getItem("user"),
        privacy: "",
        dueDate: "",
    })

    useEffect(() => {
        if (!sessionStorage.getItem("user"))
            navigate("/");
    })

    const addATask = (e) => {
        e.preventDefault()

        console.debug(formData)
        const req = new Request(
            'http://localhost:3000/add', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(formData)
        }
        )

        fetch(req)
            .then(res => res.json())
            .then(data => {

                setMsg(data)
                navigate("/view/tasks");

            })
            .catch(err => console.error(err))
    }

    const handleChange = (e) => {
        if (e.target.id === "dueDate") {
            const dateParts = e.target.value.split("/"); // Split the date into parts
            const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Rearrange the parts to yyyy-mm-dd
            setFormData({
                ...formData,
                [e.target.id]: formattedDate,
            });
            return;
        } else if (e.target.id === "private") {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
            return;
        }
    
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    

    return (        
        <>
            {!msg ? (
                <div className="flex justify-center m-2">
                    <div className="bg-blue-50 lg:basis-1/2 sm:p-6 lg:p-2 bg-purple-500 border border-gray-200 rounded-lg shadow sm:p-8 ">
                        <p className="text-xl text-center mb-3 text-white">Add a task</p>
                        <form method="POST" className="max-w-md mx-auto">
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="text"
                                    name="task"
                                    id="task"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                                    placeholder=" "
                                    required
                                    onChange={handleChange}
                                />
                                <label htmlFor="task" className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Task</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="date"
                                    name="dueDate"
                                    id="dueDate"
                                    className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-white peer"
                                    placeholder=" "
                                    required
                                    onChange={handleChange}
                                />
                                <label htmlFor="dueDate" className="peer-focus:font-medium absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:left-auto peer-focus:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Due Date</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <label className="inline-flex items-center mb-5 cursor-pointer">
                                    <input type="checkbox" id="private" onChange={handleChange} className="sr-only peer" />
                                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-white after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                    <span className="ms-3 text-sm font-medium text-white">Private</span>
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={addATask}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            ) : (
                <p className="m-5 text-center text-white text-4xl">{msg.message}</p>
            )}
        </>


    );
}

export default AddTask