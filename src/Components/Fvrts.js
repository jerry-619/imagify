import React, { useEffect, useState } from "react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoDownload } from "react-icons/io5"; 

import saved from './../image/saved.png';

function Fvrts() {
  const { user } = useKindeAuth();
  const [savedImages, setSavedImages] = useState([]);
  const [displayedImages, setDisplayedImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContentLoading, setModalContentLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 8;

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:6900/api/savedImages/${user.id}`)
        .then((response) => {
          setSavedImages(response.data);
          setDisplayedImages(response.data.slice(0, imagesPerPage));
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching saved images:", error);
          setError(true);
          setLoading(false);
        });
    }
  }, [user]);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    const newImages = savedImages.slice(0, (nextPage + 1) * imagesPerPage);
    setDisplayedImages(newImages);
    setCurrentPage(nextPage);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    setModalContentLoading(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleDownload = () => {
    if(selectedImage) {
      fetch(selectedImage.imageUrl)
        .then((response) => response.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setDownloadUrl(url);
        });
    }
  };

  useEffect(() => {
    if (downloadUrl) {
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = `${selectedImage.id}.jpg`;
      downloadLink.click();
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
  }, [downloadUrl, selectedImage]);

  useEffect(() => {
    if (!selectedImage) return;
    const timer = setTimeout(() => {
      setModalContentLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [selectedImage]);

  const handleImageLoad = (index) => {
    // Remove skeleton loader for the image once loaded
    const updatedDisplayedImages = [...displayedImages];
    updatedDisplayedImages[index].loaded = true;
    setDisplayedImages(updatedDisplayedImages);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <Link to="/" className="text-4xl font-semibold text-center block mb-4" style={{ fontWeight: "bold", letterSpacing: "8px" }}>
          IMAGIFY
        </Link>
        <img src={saved} alt="saved-images" style={{width: "80px", height: "80px"}}/>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 w-full h-72 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center text-red-500">Error fetching saved images</div>
      ) : displayedImages.length === 0 ? (
        <div className="text-center">No saved images found</div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayedImages.map((image, index) => (
              <div key={image._id} className="relative">
                {!image.loaded && ( // Display skeleton loader if image is not loaded
                  <div className="bg-gray-200 w-full h-full rounded-lg"></div>
                )}
                <img
                  src={image.imageUrl}
                  alt="Saved"
                  className={`w-full h-full object-cover rounded-lg cursor-pointer ${image.loaded ? 'block' : 'hidden'}`}
                  onLoad={() => handleImageLoad(index)} // Call handleImageLoad when image is loaded
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          </div>
          {displayedImages.length < savedImages.length && (
            <div className="text-center mt-4">
              <button 
                onClick={handleShowMore} 
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 font-medium text-black hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                Show More
              </button>
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-3/4 md:w-1/2 relative transform transition-all duration-500">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-900 text-2xl" style={{ fontSize: "3rem", zIndex: 1 }}
            >
              &times;
            </button>
            {modalContentLoading ? (
              <div className="bg-gray-200 w-full h-96"></div>
            ) : (
              <img src={selectedImage.imageUrl} alt="Selected" className="w-full h-96 object-cover" />
            )}
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
    </div>
  );
}

export default Fvrts;
