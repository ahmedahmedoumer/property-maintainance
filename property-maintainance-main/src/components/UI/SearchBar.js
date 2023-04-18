import React from 'react'

const SearchBar = (props) => {
  return (
    <div className={`flex justify-center ${props.dashboardLayout ? "w-[100%]" : "w-[80%]"}`}>
        <div className="w-full">
            <div className="relative flex flex-wrap items-stretch bg-gray-100 rounded-sm p-1">
            <span
                className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                id="basic-addon2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                    fillRule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clipRule="evenodd" />
                </svg>
            </span>
            <input
                type="search"
                className="focus:border-none relative m-0 block min-w-0 flex-auto rounded bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-neutral-700 outline-none transition duration-300 ease-in-out focus:border-primary-600 focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200"
                placeholder="Search here"
                aria-label="Search here"
                aria-describedby="button-addon2" />
            </div>
        </div>
    </div>
  )
}

export default SearchBar