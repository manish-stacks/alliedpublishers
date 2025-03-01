// import { useState } from "react";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleReset = async () => {
//     const response = await fetch("http://localhost:5001/api/auth/forgot-password", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     });

//     const data = await response.json();
//     setMessage(data.message);
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center text-gray-700">Forgot Password?</h2>
//         <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
//         <button onClick={handleReset}
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300">
//           Send Reset Link
//         </button>
//         {message && <p className="text-center text-green-500">{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error("Error sending reset link:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-700">Forgot Password?</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          onClick={handleReset}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition duration-300"
        >
          Send Reset Link
        </button>
        {message && <p className="text-center text-green-500">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
