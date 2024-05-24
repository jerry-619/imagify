import React, { useState, useEffect } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { FaBookmark } from "react-icons/fa";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Saved({ image }) {
  const { user } = useKindeAuth();
  const [savedImages, setSavedImages] = useState([]);

  useEffect(() => {
    if (user) {
      // Fetch the saved images for the current user
      axios.get(`http://localhost:6900/api/savedImages/${user.id}`)
        .then((response) => {
          setSavedImages(response.data);
        })
        .catch((error) => {
          console.error("Error fetching saved images:", error);
        });
    }
  }, [user]);

  const isImageSaved = savedImages.some(savedImage => savedImage.imageUrl === image.urls.full);

  const handleButtonClick = async () => {
    if (user) {
      if (isImageSaved) {
        toast.info("Image already saved!", {
          position: "top-center",
          autoClose: 4000,
          style: { backgroundColor: "grey", color: "black" },
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        return;
      }
      try {
        await axios.post('http://localhost:6900/api/saveImage', {
          userId: user.id,
          imageUrl: image.urls.full,
        });

        toast.info("Image Saved!", {
          position: "top-center",
          autoClose: 4000,
          style: { backgroundColor: "green", color: "white" },
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        setSavedImages([...savedImages, { imageUrl: image.urls.full }]);
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
