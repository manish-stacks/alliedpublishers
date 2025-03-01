import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    // Reload page to reset authentication state
    window.location.reload();

    // Redirect to home page
    navigate("/");
  };

  return logout;
};

export default useLogout;
