import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import Modal from "./Modal";
import axios from "axios";
import { useParams } from "react-router-dom";

function Search() {
  const [imageData, setImageData] = useState([]);
  // const [page, setPage] = useState(1)
  const [totlePage, setTotlePage] = useState(1);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [imageObj, setImageObj] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [pageParams] = useSearchParams();
  const { query } = useParams();
  const navigate = useNavigate();
  const top = useRef();

  let page = pageParams.get("page") ?? 1;

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

  function closeModal() {
    setIsOpen(false);
  }

  function viewImage(imgObj) {
    setImageObj(imgObj);
    setIsOpen(true);
  }

  function handleNextPage() {
    navigate(`/search/${query}?page=${parseInt(page) + 1}`);
    top.current.scrollIntoView();
  }

  function handlePrevPage() {
    navigate(`/search/${query}?page=${parseInt(page) - 1}`);
    top.current.scrollIntoView();
  }

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="container max-w-4xl py-6 px-4 mx-auto" ref={top}>
          <div className="justify-between items-center grid grid-cols-2 gap-y-4">
            <Link
              to="/"
              className="text-4xl font-semibold col-span-2 sm:col-span-1 text-center"
            >
              IMAGIFY
            </Link>
            <div className="col-span-2 sm:col-span-1">
              <SearchBox
                className="shadow-sm border border-gray-100 !bg-gray-50 !rounded-sm placeholder:text-gray-600"
                imageData={imageData}
                setImageData={setImageData}
              ></SearchBox>
            </div>
          </div>
          <p className="mt-3">
            Showing results for{" "}
            <span className="text-indigo-500"> {query}</span>
          </p>
          <span className="text-sm text-slate-500">
            {total==0?('No'):('Total ' + total)}  Images have been found
          </span>
          <Modal show={isOpen} image={imageObj} closeModle={closeModal} />
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
            <div className="gap-4 lg:gap-5 md:columns-3 columns-2 mt-14 animate-pulse">
              <div className="!h-56 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-96 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-56 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-96 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-56 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-96 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-56 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-96 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-56 bg-slate-300 mb-4 rounded"></div>
              <div className="!h-96 bg-slate-300 mb-4 rounded"></div>
            </div>
          ) : (
            <>
              {imageData.length > 0 ? (
                <>
                  <div className="gap-4 lg:gap-5 md:columns-3 columns-2 mt-14 ">
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
                  <div className="flex flex-col items-center mb-8 md:mb-12 mt-8">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-700 dark:text-gray-400">
                        Showing page{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {page}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
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
                <div className="flex flex-col items-center py-20">
                  <h1 className="text-center text-xl text-gray-600">
                    Record not found
                  </h1>
                </div>
              )}
            </>
          )}
        </div>
        <footer className="bottom-0 w-full fixed p-4 justify-center bg-white rounded-lg shadow flex md:items-center dark:bg-gray-800">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              Developed with ❤️ By {" "}
                <a
                  href="https://optimumitapps.com/"
                  target="_blank"
                  className="hover:underline"
                >
                  Optimumitapps
                </a>
                .
            </span>
          </footer>
      </div>
    </div>
  );
}

export default Search;
