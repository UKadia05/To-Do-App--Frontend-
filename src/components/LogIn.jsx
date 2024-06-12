import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value.trim();
    if (username === "") {
      return;
    }
    sessionStorage.setItem("user", username);
    navigate("/view/tasks");
    location.reload()
  };

  return (
    
    <div>
      <h1 className='text-6xl text-center mt-8 mb-8' style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
        Stay Organized<br />
        and<br />
        On Track<br />
        with<br />
        TaskTeam
      </h1>


      <form className="max-w-md mx-auto mt-8" onSubmit={handleLogin}>
        <div className="flex">
          <div className="relative w-full">
            <input
              type="text"
              id="username"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-white rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-600 focus:ring-purple-500 focus:border-purple-500"
              placeholder="User Name"
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-purple-700 rounded-e-lg border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
