import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");

    navigate("/");
  };

  return logout;
};

export default useLogout;
