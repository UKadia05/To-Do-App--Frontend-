import React, { useState, useEffect } from "react";
import ShowTask from "./ShowTask";
import { useNavigate } from "react-router-dom";

const ShowAll = () => {
    
    const [msg, setMsg] = useState(null);
    const [allTasks, setAllTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const navigate = useNavigate();
    const [lastSorted, setLastSorted] = useState(null);
    const [filterStatus, setFilterStatus] = useState(null);
    const [selectedOwner, setSelectedOwner] = useState("");
    const [uniqueOwners, setUniqueOwners] = useState([]);
    const [uniqueCompletedBy, setUniqueCompletedBy] = useState([]);
    const [selectedCompletedBy, setSelectedCompletedBy] = useState(""); // New state for completedBy filter

    if (!sessionStorage.getItem("user")) {
        navigate("/");
    }

    useEffect(() => {
        const req = new Request('http://localhost:3000/tasks', {
            headers: {
                "content-type": "application/json"
            }
        });

        fetch(req)
            .then(res => res.json())
            .then(data => {
                console.table(data);
                if (!data.message) {
                    const tasksWithCompletion = data.map(task => ({
                        ...task,
                        completed: JSON.parse(localStorage.getItem(`task-${task._id}-completed`)) || false,
                        completedBy: localStorage.getItem(`task-${task._id}-completedBy`) || null // Adding completedBy to each task
                    }));
                    setAllTasks(tasksWithCompletion);
                    setFilteredTasks(tasksWithCompletion);

                    const owners = [...new Set(tasksWithCompletion.map(task => task.owner))];
                    setUniqueOwners(owners);

                    const completedBy = [...new Set(tasksWithCompletion.map(task => task.completedBy))];
                    setUniqueCompletedBy(completedBy);
                } else {
                    setMsg(data);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const sortTasks = (order) => {
        setLastSorted(order);
        let sortedTasks = [...filteredTasks];

        if (order === "ascending") {
            sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (order === "descending") {
            sortedTasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        }

        setFilteredTasks(sortedTasks);
    };

    const handleOwnerChange = (e) => {
        const selectedOwner = e.target.value;
        setSelectedOwner(selectedOwner);
        applyFiltersAndSort(filterStatus, selectedOwner, selectedCompletedBy);
    };

    const handleCompletedByChange = (e) => {
        const selectedCompletedBy = e.target.value;
        setSelectedCompletedBy(selectedCompletedBy);
        applyFiltersAndSort(filterStatus, selectedOwner, selectedCompletedBy);
    };

    const filterTasks = (status, owner, completedBy) => {
        let filtered = [...allTasks];

        if (status === "completed") {
            filtered = filtered.filter(task => task.completed);
        } else if (status === "notCompleted") {
            filtered = filtered.filter(task => !task.completed);
        }

        if (owner) {
            filtered = filtered.filter(task => task.owner === owner);
        }

        // Filtering by completedBy
        if (completedBy) {
            filtered = filtered.filter(task => task.completedBy === completedBy);
        }

        return filtered;
    };

    const applyFiltersAndSort = (status, owner, completedBy) => {
        let filtered = filterTasks(status, owner, completedBy);

        if (lastSorted === "ascending") {
            filtered.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        } else if (lastSorted === "descending") {
            filtered.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        }

        setFilteredTasks(filtered);
    };

    useEffect(() => {
        applyFiltersAndSort(filterStatus, selectedOwner, selectedCompletedBy);
    }, [filterStatus, selectedOwner, selectedCompletedBy, lastSorted]);

    return (

        <div>
            
            <div className="flex flex-col items-center rounded-md mt-5 mb-5">
                <div className="flex items-center space-x-8">
                    <div className="flex flex-col items-center">
                        <p className="text-sm font-medium text-gray-700">by date</p>
                        <div className="flex mt-2">
                            <button
                                className={`px-4 py-2 text-sm font-medium text-white border border-white rounded-s-lg hover:bg-purple-700 focus:text-blue-700 ${lastSorted === "ascending" ? "bg-purple-700" : "bg-purple-500"}`}
                                onClick={() => sortTasks("ascending")}
                            >
                                Ascending {lastSorted === "ascending" ? "(Active)" : ""}
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium text-white border-t border-b border-white rounded-e-lg hover:bg-purple-700 hover:text-blue-700 focus:z-10 focus:text-blue-700 ${lastSorted === "descending" ? "bg-purple-700" : "bg-purple-500"}`}
                                onClick={() => sortTasks("descending")}
                            >
                                Descending {lastSorted === "descending" ? "(Active)" : ""}
                            </button>
                        </div>
                    </div>
                    
                     <div className="flex flex-col items-center">
                         <p className="text-sm font-medium text-gray-700">sort by status</p>
                         <div className="flex mt-2">
                             <button
                                className={`px-4 py-2 text-sm font-medium text-white border border-white rounded-s-lg hover:bg-purple-700 focus:text-blue-700 ${filterStatus === "completed" ? "bg-purple-700" : "bg-purple-500"}`}
                                onClick={() => setFilterStatus("completed")}
                            >
                                Completed {filterStatus === "completed" ? "(Active)" : ""}
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium text-white border-t border-b border-white rounded-e-lg hover:bg-purple-700 hover:text-blue-700 focus:z-10 focus:text-blue-700 ${filterStatus === "notCompleted" ? "bg-purple-700" : "bg-purple-500"}`}
                                onClick={() => setFilterStatus("notCompleted")}
                            >
                                Not Completed {filterStatus === "notCompleted" ? "(Active)" : ""}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                         <p className="text-sm font-medium text-gray-700">filter by owner</p>
                         <select
                            value={selectedOwner}
                            onChange={handleOwnerChange}
                            className="px-4 py-2 text-sm font-medium text-white border border-white rounded-lg bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">All</option>
                            {uniqueOwners.map(owner => (
                                <option key={owner} value={owner}>{owner}</option>
                            ))}
                        </select>
                    </div>
                    {/* Filter by Completed By */}
                    <div className="flex flex-col items-center">
                        <p className="text-sm font-medium text-gray-700">completed by</p>
                        <select
                            value={selectedCompletedBy}
                            onChange={handleCompletedByChange}
                            className="px-4 py-2 text-sm font-medium text-white border border-white rounded-lg bg-purple-500 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <option value="">All</option>
                            {uniqueCompletedBy.map(completedBy => (
                                <option key={completedBy} value={completedBy}>{completedBy}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Task Display */}
            <div className="flex justify-center items-center">
                <div className="w-full max-w-md p-4 bg-purple-500 border border-gray-200 rounded-lg shadow sm:p-8">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-xl font-bold leading-none text-white">Tasks Found: {filteredTasks.length}</h5>
                    </div>
                    <div className="overflow-y-auto max-h-[400px] pr-4">
                        <ul role="list" className="divide-y divide-white">
                            {filteredTasks.map(task => (
                                <ShowTask key={task._id} task={task} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowAll;
