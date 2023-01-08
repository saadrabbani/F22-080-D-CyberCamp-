import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../sessions/auth";

const Logout = () => {
  const navigate = useNavigate();
  const logoutUser = async () => {
    try {
      logout();
      navigate(`/login/`);
    } catch (error) {
      console.log("Logout Error : ", error);
    }
  };

  useEffect(() => {
    logoutUser();
  }, []);

  return <></>;
};

export default Logout;
