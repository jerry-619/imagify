// saved.js
import React from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { FaBookmark } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Saved({ image }) {
  const { user } = useKindeAuth();
  console.log('User:', user); 
  const handleButtonClick = async () => {
    if (user) {
      try {
        await axios.post('http://localhost:6900/api/saveImage', {
          userId: user.id,
          imageUrl: image.urls.full,
        });

        toast.info("Saved!", {
          position: "top-center",
          autoClose: 4000,
          style: { backgroundColor: "green", color: "white" },
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      } catch (error) {
        console.log(error)
        toast.error("Error saving image.", {
          position: "top-center",
          autoClose: 4000,
          style: { backgroundColor: "red", color: "white" },
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      }
    } else {
      toast.info("Please register or login to save the image!", {
        position: "top-center",
        autoClose: 4000,
        style: { backgroundColor: "red", color: "white" },
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    }
  };

  return (
    <button
      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      onClick={handleButtonClick}
    >
      <FaBookmark className="w-5 h-5" />
    </button>
  );
}

export default Saved;
