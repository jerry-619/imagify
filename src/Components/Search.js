import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import Modal from "./Modal";
import axios from "axios";
import { useParams } from "react-router-dom";

function Search() {
  // State variables to manage image data, pagination, loading state, etc.
  const [imageData, setImageData] = useState([]);
  const [totlePage, setTotlePage] = useState(1);  // Typo: should be 'totalPage' instead of 'totlePage'
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [imageObj, setImageObj] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [pageParams] = useSearchParams();
  const { query } = useParams();
  const navigate = useNavigate();
  const top = useRef();

  // Get the page number from the URL query parameter, default to 1
  let page = pageParams.get("page") ?? 1;

  // Fetch images when the component mounts or the query/page changes
  useEffect(() => {
    setLoading(true);
    if (query.length > 2) {
      axios
        .get(
          `https://api.unsplash.com/search/photos/?per_page=30&page=${page}&query=${query}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`
        )
        .then((response) => {
          const data = response.data.results;
          setTotlePage(response.data.total_pages);
          setTotal(response.data.total);
          setImageData(data);
          setTimeout(() => {
            setLoading(false);
            setError(false);
          }, 500);
        })
        .catch((error) => {
          console.log(error);
          setTimeout(() => {
            setLoading(false);
            setError(true);
          }, 500);
        });
    }
  }, [query, page]);

  // Close the modal
  function closeModal() {
    setIsOpen(false);
  }

  // Open the modal and set the image object
  function viewImage(imgObj) {
    setImageObj(imgObj);
    setIsOpen(true);
  }

  // Navigate to the next page of search results
  function handleNextPage() {
    navigate(`/search/${query}?page=${parseInt(page) + 1}`);
    top.current.scrollIntoView();
  }

  // Navigate to the previous page of search results
  function handlePrevPage() {
    navigate(`/search/${query}?page=${parseInt(page) - 1}`);
    top.current.scrollIntoView();
  }

  // JSX to render the component
  return (
    <div className="w-full">
      <div className="container max-w-4xl py-6 px-4 mx-auto" ref={top}>
        {/* Logo and search box */}
        <Link to="/" className="text-4xl font-semibold text-center block mb-4" style={{ fontWeight: "bold", letterSpacing: "8px" }}>
          IMAGIFY
        </Link>
        <div className="justify-between items-center grid grid-cols-2 gap-y-4">
          <div className="col-span-2 sm:col-span-1">
            <SearchBox
              className="shadow-sm border border-gray-100 !bg-gray-50 !rounded-sm placeholder:text-gray-600"
              imageData={imageData}
              setImageData={setImageData}
            ></SearchBox>
          </div>
        </div>
        {/* Search results info */}
        <p className="mt-3">
          Showing results for{" "}
          <span className="text-indigo-500"> {query}</span>
        </p>
        <span className="text-sm text-slate-500">
          {total===0?('No'):('Total ' + total)}  Images have been found
        </span>
        {/* Modal for viewing images */}
        <Modal show={isOpen} image={imageObj} closeModle={closeModal} />
        {/* Handle error state */}
        {error ? (
          <div className="flex flex-col items-center py-20">
            <h1 className="text-center text-3xl text-gray-700">
              404 Page not found
            </h1>
            <Link to="/" className="text-indigo-500 mt-2 hover:underline">
              Go to home page
            </Link>
          </div>
        ) : isLoading ? (
          // Loading state with placeholder images
          <div className="gap-4 lg:gap-5 md:columns-4 columns-2 mt-14 animate-pulse">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="!h-96 bg-slate-300 mb-4 rounded"></div>
            ))}
          </div>
        ) : (
          // Display images
          <>
            {imageData.length > 0 ? (
              <>
                <div className="gap-4 lg:gap-5 md:columns-4 columns-2 mt-14 ">
                  {imageData.map((image, key) => (
                    <img
                      src={`${image.urls.small}`}
                      key={key}
                      alt=""
                      className="bg-gray-300 mb-5 w-full rounded-md cursor-pointer"
                      onClick={() => viewImage(image)}
                      loading="lazy"
                    />
                  ))}
                </div>
                {/* Pagination */}
                <div className="flex flex-col items-center mb-8 md:mb-12 mt-8">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                      Showing page{" "}
                      <span className="font-semibold text-gray-900 ">
                        {page}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900 ">
                        {" "}
                        {totlePage}{" "}
                      </span>
                      Pages
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                      <button
                        onClick={() => handlePrevPage()}
                        className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
                        disabled={page < 2}
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => handleNextPage()}
                        className="py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
                        disabled={totlePage <= page}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // No results message
              <div className="flex flex-col items-center py-20">
                <h1 className="text-center text-xl text-gray-600">
                  Record not found
                </h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Search;
