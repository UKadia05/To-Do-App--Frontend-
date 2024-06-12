//without private stuff

// import { Link } from "react-router-dom";

// const ShowTask = ({ task }) => {
//     const { _id, task: taskName, owner, dueDate } = task; // Destructure task object

//     // Format the date
//     const formattedDate = new Date(dueDate).toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit'
//     });

//     const handleCheckBox = (e)=>{
//         // console.log(e.target.checked)
//         if (e.target.checked == false)
//             console.log("Not Completed")
    
//         const req = new Request(
//             'http://localhost:3000/update/', {
//             method: "POST",
//             headers: {
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify({completed:false})
//         }
//         )
    
//         fetch(req)
//             .then(res => res.json())
//             .then(data => {
//                 // delete data._id
    
//                 console.log(data)
//                 // setMsg(data)
    
//             })
//             .catch(err => console.error(err))
    
//         // navigate("/view")
    
//     }

//     return (
//         <li className="py-3 sm:py-4">
//             <div className="flex items-center">
//                 <div className="flex-1 min-w-0 ms-4">
//                     <p className="text-md font-bold truncate text-white">
//                         {taskName}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Owner: {owner}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Date: {formattedDate}
//                     </p>
//                 </div>
//                 <div class="flex items-center mb-4">
//                 {(!task.comp)?(
//                     <input id="default-checkbox" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={handleCheckBox} />
//                 ):( 
//                 <input id="default-checkbox" type="checkbox" checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"  onChange={handleCheckBox} />
//                 )}
                    
//                     <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Completed</label>
//                 </div>
//                 <div className="inline-flex items-center text-base font-semibold text-white">
//                     <Link
//                         to={"/update/" + _id}
//                         className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-teal-500 dark:hover:bg-green-700 dark:focus:ring-green-800">
//                         Update
//                     </Link>
//                 </div>
//             </div>
//         </li>
//     );
// };

// export default ShowTask;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const ShowTask = ({ task }) => {
//     const { _id, task: taskName, owner, private: priv, dueDate } = task; // Destructure task object

//     // Initialize local state for completed status
//     const [completed, setCompleted] = useState(false);

//     // Load completed status from localStorage on mount
//     useEffect(() => {
//         const savedStatus = localStorage.getItem(`task-${_id}-completed`);
//         if (savedStatus !== null) {
//             setCompleted(JSON.parse(savedStatus));
//         }
//     }, [_id]);

//     // Get current user from sessionStorage
//     const currentUser = sessionStorage.getItem("user");

//     // Check if the task is private and the current user is not the owner
//     if (priv && owner !== currentUser) {
//         return(
            
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center">
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-md font-bold truncate text-white">
//                             This task is private.
//                         </p>
//                     </div>
//                 </div>
//             </li>
            
//         )

//     }

//     const handleCheckBox = (e) => {
//         const isChecked = e.target.checked;
//         setCompleted(isChecked);
//         localStorage.setItem(`task-${_id}-completed`, JSON.stringify(isChecked));

//         const currentUser = sessionStorage.getItem("user");
//         localStorage.setItem(`task-${_id}-completedBy`, currentUser)
//     };

//     return (
        
//         <li className="py-3 sm:py-4">
//             <div className="flex items-center">
//                 <div className="flex-1 min-w-0 ms-4">
//                     <p className="text-md font-bold truncate text-white">
//                         {taskName}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Owner: {owner}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Date: {dueDate}
//                     </p>
//                     <input
//                         id={`checkbox-${_id}`}
//                         type="checkbox"
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                         checked={completed}
//                         onChange={handleCheckBox}
//                     />
//                     <label htmlFor={`checkbox-${_id}`} className="ms-2 text-sm font-medium text-white">
//                         Completed
//                     </label>
//                 </div>
//                 <div className="inline-flex items-center text-base font-semibold text-white">
//                     <Link
//                         to={"/update/" + _id}
//                         className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-teal-800">
//                         Update
//                     </Link>
//                 </div>
//             </div>
//         </li>
//     );
// };

// export default ShowTask;





// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import RemoveTask from "./RemoveTask";

// const ShowTask = ({ task }) => {
//     const { _id, task: taskName, owner, private: priv, dueDate } = task; // Destructure task object

//     // Initialize local state for completed status
//     const [completed, setCompleted] = useState(false);
//     const [completedBy, setCompletedBy] = useState(null);

//     // Load completed status from localStorage on mount
//     useEffect(() => {
//         const savedStatus = localStorage.getItem(`task-${_id}-completed`);
//         if (savedStatus !== null) {
//             setCompleted(JSON.parse(savedStatus));
//             const savedCompletedBy = localStorage.getItem(`task-${_id}-completedBy`);
//             setCompletedBy(savedCompletedBy);
//         }
//     }, [_id]);

//     // Get current user from sessionStorage
//     const currentUser = sessionStorage.getItem("user");

//     // Check if the task is private and the current user is not the owner
//     if (priv && owner !== currentUser) {
//         return (
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center">
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-md font-bold truncate text-white">
//                             This task is private.
//                         </p>
//                     </div>
//                 </div>
//             </li>
//         );
//     }

//     const handleCheckBox = (e) => {
//         const isChecked = e.target.checked;
//         setCompleted(isChecked);
//         localStorage.setItem(`task-${_id}-completed`, JSON.stringify(isChecked));

//         const currentUser = sessionStorage.getItem("user");
//         if (isChecked) {
//             localStorage.setItem(`task-${_id}-completedBy`, currentUser);
//             setCompletedBy(currentUser);
//         } else {
//             localStorage.removeItem(`task-${_id}-completedBy`);
//             localStorage.removeItem(`task-${_id}-completed`, JSON.stringify(isChecked));
//             setCompletedBy(null);
//         }
//     };

//     return (
//         <li className="py-3 sm:py-4">
//             <div className="flex items-center">
//                 <div className="flex-1 min-w-0 ms-4">
//                     <p className="text-md font-bold truncate text-white">
//                         {taskName}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Owner: {owner}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Date: {dueDate}
//                     </p>
//                     <input
//                         id={`checkbox-${_id}`}
//                         type="checkbox"
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                         checked={completed}
//                         onChange={handleCheckBox}
//                     />
//                     <label htmlFor={`checkbox-${_id}`} className="ms-2 text-sm font-medium text-white">
//                         {completed ? `Completed by ${completedBy || currentUser}` : 'Completed'}
//                     </label>
//                 </div>
//                 <div className="inline-flex items-center text-base font-semibold text-white">
//                     <Link
//                         to={"/task/update/" + _id}
//                         className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-teal-800">
//                         Update
//                     </Link>
//                     <RemoveTask id={task._id}/>
//                 </div>
//             </div>
//         </li>
//     );
// };

// export default ShowTask;



// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import RemoveTask from "./RemoveTask";

// const ShowTask = ({ task }) => {
//     const { _id, task: taskName, owner, private: priv, dueDate } = task; // Destructure task object

//     // Initialize local state for completed status
//     const [completed, setCompleted] = useState(false);
//     const [completedBy, setCompletedBy] = useState(null);

//     // Load completed status from localStorage on mount
//     useEffect(() => {
//         const savedStatus = localStorage.getItem(`task-${_id}-completed`);
//         if (savedStatus !== null) {
//             setCompleted(JSON.parse(savedStatus));
//             const savedCompletedBy = localStorage.getItem(`task-${_id}-completedBy`);
//             setCompletedBy(savedCompletedBy);
//         }
//     }, [_id]);

//     // Get current user from sessionStorage
//     const currentUser = sessionStorage.getItem("user");

//     // Check if the task is private and the current user is not the owner
//     if (priv && owner !== currentUser) {
//         return (
//             <li className="py-3 sm:py-4">
//                 <div className="flex items-center">
//                     <div className="flex-1 min-w-0 ms-4">
//                         <p className="text-md font-bold truncate text-white">
//                             This task is private.
//                         </p>
//                     </div>
//                 </div>
//             </li>
//         );
//     }

//     const handleCheckBox = (e) => {
//         const isChecked = e.target.checked;
//         setCompleted(isChecked);
//         localStorage.setItem(`task-${_id}-completed`, JSON.stringify(isChecked));

//         const currentUser = sessionStorage.getItem("user");
//         if (isChecked) {
//             localStorage.setItem(`task-${_id}-completedBy`, currentUser);
//             setCompletedBy(currentUser);
//         } else {
//             localStorage.removeItem(`task-${_id}-completedBy`);
//             localStorage.removeItem(`task-${_id}-completed`);
//             setCompletedBy(null);
//         }
//     };

//     return (
//         <li className="py-3 sm:py-4">
//             <div className="flex items-center">
//                 <div className="flex-1 min-w-0 ms-4">
//                     <p className="text-md font-bold truncate text-white">
//                         {taskName}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Owner: {owner}
//                     </p>
//                     <p className="text-sm text-white truncate">
//                         Date: {dueDate}
//                     </p>
//                     <input
//                         id={`checkbox-${_id}`}
//                         type="checkbox"
//                         className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                         checked={completed}
//                         onChange={handleCheckBox}
//                     />
//                     <label htmlFor={`checkbox-${_id}`} className="ms-2 text-sm font-medium text-white">
//                         {completed ? `Completed by ${completedBy || currentUser}` : 'Completed'}
//                     </label>
//                 </div>
//                 <div className="inline-flex items-center text-base font-semibold text-white">
//                     <Link
//                         to={"/update/" + _id}
//                         className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-green-300 ">
//                         Update
//                     </Link>
//                     {(owner === currentUser || completed) && (
//                         // <RemoveTask id={task._id} />
//                         <Link
//                             to={"/remove/" + _id}
//                             className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-red-300 ">
//                             Remove
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </li>
//     );
// };

// export default ShowTask;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ShowTask = ({ task }) => {
    const { _id, task: taskName, owner, private: priv, dueDate } = task; // Destructure task object

    // Initialize local state for completed status
    const [completed, setCompleted] = useState(false);
    const [completedBy, setCompletedBy] = useState(null);

    // Load completed status from localStorage on mount
    useEffect(() => {
        const savedStatus = localStorage.getItem(`task-${_id}-completed`);
        if (savedStatus !== null) {
            setCompleted(JSON.parse(savedStatus));
            const savedCompletedBy = localStorage.getItem(`task-${_id}-completedBy`);
            setCompletedBy(savedCompletedBy);
        }
    }, [_id]);

    // Get current user from sessionStorage
    const currentUser = sessionStorage.getItem("user");

    // Check if the task is private and the current user is not the owner
    if (priv && owner !== currentUser) {
        return (
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-md font-bold truncate text-white">
                            This task is private.
                        </p>
                    </div>
                </div>
            </li>
        );
    }

    const handleCheckBox = (e) => {
        const isChecked = e.target.checked;
        setCompleted(isChecked);
        localStorage.setItem(`task-${_id}-completed`, JSON.stringify(isChecked));

        const currentUser = sessionStorage.getItem("user");
        if (isChecked) {
            localStorage.setItem(`task-${_id}-completedBy`, currentUser);
            setCompletedBy(currentUser);
        } else {
            localStorage.removeItem(`task-${_id}-completedBy`);
            localStorage.removeItem(`task-${_id}-completed`);
            setCompletedBy(null);
        }
    };

    return (
        <li className="py-3 sm:py-4">
            <div className="flex items-center">
                <div className="flex-1 min-w-0 ms-4">
                    <p className="text-md font-bold truncate text-white">
                        {taskName}
                    </p>
                    <p className="text-sm text-white truncate">
                        Owner: {owner}
                    </p>
                    <p className="text-sm text-white truncate">
                        Date: {dueDate}
                    </p>
                    <input
                        id={`checkbox-${_id}`}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={completed}
                        onChange={handleCheckBox}
                    />
                    <label htmlFor={`checkbox-${_id}`} className="ms-2 text-sm font-medium text-white">
                        {completed ? `Completed by ${completedBy || currentUser}` : 'Completed'}
                    </label>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-white">
                    {owner === currentUser && !completed && (
                        <Link
                            to={"/update/" + _id}
                            className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-green-300 ">
                            Update
                        </Link>
                    )}
                    {(owner === currentUser || completed) && (
                        <Link
                            to={"/remove/" + _id}
                            className="ml-1 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-red-300 ">
                            Remove
                        </Link>
                    )}
                </div>
            </div>
        </li>
    );
};

export default ShowTask;
