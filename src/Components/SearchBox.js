import { Fragment, useState, useEffect } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import jsonp from "jsonp";

import "./../css/style.css";

let resultArray = [];

function Search(props) {
  const [selected, setSelected] = useState("");
  const [autocomplete, setAutocomplete] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    if (query.length > 2) {

      jsonp(
        `https://www.google.com/complete/search?client=hp&hl=en&sugexp=msedr&gs_rn=62&gs_ri=hp&cp=1&gs_id=9c&q=${query}&xhr=t&callback=hello`,
        null,
        (err, data) => {
          if (err) {
            console.error(err.message);
          } else {

            data[1].map((val, k) => {
                resultArray.push({query:val[0]});
            });

            setAutocomplete(resultArray);
            resultArray = [];
          }
        }
      );
    }
  }, [query]);

  const filteredPeople =
    query === "" && query.length > 2 && !autocomplete.length
      ? []
      : autocomplete.filter((search) =>
          search.query
            // .toLowerCase()
            // .replace(/\s+/g, "")
            // .includes(query.toLowerCase().replace(/\s+/g, ""))
            // .includes(query.replace(/\s+/g, ""))
        );

  function selectedHendler(event) {
    
    setSelected(event);
    navigate(`/search/${event.query.replace(/<\/?[^>]+(>|$)/g, "")}`);
    setQuery("");
    setSelected("");
  }

  return (
    <div>
      <Combobox value={selected} onChange={selectedHendler}>
        <div className="relative mt-1 lg:ml-40">
          <div className="ruko relative max-w-[500px] cursor-default overflow-hidden rounded-[9px] bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <div
              className={`flex items-center space-x-4 py-3 pl-3 pr-3 text-sm leading-5 text-gray-700 focus:ring-0 ${props.className}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <Combobox.Input
                className="w-full focus:outline-none bg-transparent"
                placeholder="Search something"
                displayValue={(search) => search.query}
                onChange={(event) => setQuery(event.target.value)}
                name="query"
                type="search"
                autoComplete="off"
              />
            </div>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute mt-1.5 max-h-60 w-full overflow-auto rounded-[4px] bg-white py-1.5 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm ${
                query.length > 2 ? "block" : "hidden"
              }`}
            >
              {query.length > 0 && (
                <Combobox.Option
                  value={{ query: query }}
                  className="relative cursor-default select-none py-2 px-4 text-gray-700"
                >
                  Search "{query}"
                </Combobox.Option>
              )}
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((search,k) => (
                  <Combobox.Option
                    key={k}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-gray-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={search}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                          dangerouslySetInnerHTML={{__html: search.query}}
                        >
                          {/* {search.query} */}
                        </span>
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default Search;
