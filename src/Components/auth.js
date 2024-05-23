import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useNavigate } from "react-router-dom";
import { FaBookmark } from "react-icons/fa";

function Auth() {
  const { login, register, isAuthenticated, user, logout } = useKindeAuth();
  const navigate = useNavigate();

  const handleSavedClick = () => {
    navigate("/fvrts");
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <button
            onClick={handleSavedClick}
            className="bg-black text-white font-bold py-2 px-4 rounded-full relative overflow-hidden hover:shadow-white transition-shadow duration-300"
            
          >
             <FaBookmark className="w-5 h-5" />
          </button>
          <button
            className="bg-black text-white font-bold py-2 px-4 rounded-full relative overflow-hidden hover:shadow-white transition-shadow duration-300"
            style={{ width: "120px", marginRight: "25px" }}
            onClick={logout}
          >
            Log Out
          </button>
        </>
      ) : (
        <>
          <button
            onClick={login}
            className="bg-black text-white font-bold py-2 px-4 rounded-full relative overflow-hidden hover:shadow-white transition-shadow duration-300"
            style={{ width: "120px" }}
          >
            LOG IN
          </button>
          <button
            onClick={register}
            className="bg-black text-white font-bold py-2 px-4 rounded-full relative overflow-hidden hover:shadow-white transition-shadow duration-300"
            style={{ width: "120px", marginRight: "25px" }}
          >
            REGISTER
          </button>
        </>
      )}
    </>
  );
}

export default Auth;
