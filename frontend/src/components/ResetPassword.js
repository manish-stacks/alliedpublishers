// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const ResetPassword = () => {
//   const { token } = useParams(); // Get token from URL
//   const navigate = useNavigate();
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch(`http://localhost:5001/api/auth/reset-password/${token}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage(data.message);
//         setTimeout(() => navigate("/login"), 2000); // Redirect to login after success
//       } else {
//         setError(data.message);
//       }
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
//         <h2 className="text-2xl font-semibold text-center mb-4">Reset Password</h2>

//         {message && <p className="text-green-600">{message}</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         <form onSubmit={handleResetPassword}>
//           <div className="mb-4">
//             <label className="block text-gray-700">New Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
//           >
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Password reset successful. You are now logged in.");
        navigate("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Reset Password</h2>
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
