import React, { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import axios from "axios";
import { IoDownload } from "react-icons/io5";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Fvrts() {
  const { user } = useKindeAuth();
  const [savedImages, setSavedImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (user) {
      axios
        .get(`http://localhost:6900/api/savedImages/${user.id}`)
        .then((response) => {
          setSavedImages(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching saved images:", error);
          setError(true);
          setLoading(false);
        });
    }
  }, [user]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  // Function to handle download button click
  const handleDownload = () => {
    if(selectedImage) {
      fetch(selectedImage.imageUrl) // Fetch full resolution image
        .then((response) => response.blob()) // Convert response to blob
        .then((blob) => {
          const url = URL.createObjectURL(blob); // Create a URL for the blob
          setDownloadUrl(url); // Set the download URL to trigger useEffect
        });
    }
  };

  // useEffect to download image when downloadUrl changes
  useEffect(() => {
    if (downloadUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = `${selectedImage.id}.jpg`; // Set downloaded image name
      downloadLink.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  }, [downloadUrl, selectedImage]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Saved Images</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error fetching saved images</div>
      ) : savedImages.length === 0 ? (
        <div className="text-center">No saved images found</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {savedImages.map((image) => (
            <div key={image._id} className="relative">
              <img
                src={image.imageUrl}
                alt="Saved"
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-3/4 md:w-1/2 relative">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-900 text-2xl" style={{ fontSize: "3rem", zIndex: 1 }}
            >
              &times;
            </button>
              <img src={selectedImage.imageUrl} alt="Selected" className="w-full h-96 object-cover" />
                  {/* Download button */}
                  <button
              onClick={handleDownload}
              className="absolute bottom-4 left-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-900 text-2xl"
               style={{ fontSize: "3rem", zIndex: 1 }}
            >
              <IoDownload className="w-8 h-8 mr-1" />

            </button>
                </div>
              </div>
      )}

      <ToastContainer />
    </div>
  );
}

export default Fvrts;
