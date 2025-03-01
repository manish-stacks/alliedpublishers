// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5001/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     if (response.ok) {
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     } else {
//       setError(data.message);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-700">Welcome Back!</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
//           <button type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300">
//             Login
//           </button>
//         </form>
//         <p className="text-center text-gray-600">
//           Forgot password? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/forgot-password")}>Reset</span>
//         </p>
//         <p className="text-center text-gray-600">
//           No account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Sign up</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // Toggle between User & Admin Login
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if logging in as admin
    if (isAdmin) {
      if (email === "allied" && password === "allied123") {
        localStorage.setItem("admin", true);
        window.location.href = "http://localhost:3000/admin/locations/"; // Redirect to Admin Locations
      } else {
        setError("Invalid admin credentials!");
      }
      return;
    }

    // Normal user login
    const response = await fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/");
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {isAdmin ? "Admin Login" : "Welcome Back!"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" placeholder={isAdmin ? "Admin Username" : "Email"} value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
          <input type="password" placeholder="Password" value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
          <button type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300">
            {isAdmin ? "Login as Admin" : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600">
          {isAdmin ? "Switch to User Login?" : "Login as Admin?"}
          <span className="text-blue-500 cursor-pointer" onClick={() => setIsAdmin(!isAdmin)}> Click Here</span>
        </p>
        {!isAdmin && (
          <>
            <p className="text-center text-gray-600">
              Forgot password? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/forgot-password")}>Reset</span>
            </p>
            <p className="text-center text-gray-600">
              No account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>Sign up</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
