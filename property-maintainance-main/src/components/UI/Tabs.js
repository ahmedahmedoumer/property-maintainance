import React from 'react'
import { NavLink } from 'react-router-dom';

const Tabs = (props) => {
    return (
        <div className={`w-3/4 ${props.className}`}>
            <ul
                className="mb-4 flex list-none flex-col flex-wrap border-b pl-0 md:flex-row"
                id="tabs-tab3"
                role="tablist"
                data-te-nav-ref>
                {props.tabs && props.tabs.map(tab => (
                    <li role="presentation" key={tab.id}>
                        <NavLink
                            to={`#${tab.href}`}
                            className="text-gray-600 font-medium mt-2 rounded-t-2xl block border-x-0 border-t-0 border-b-4 border-transparent px-7 pt-4 pb-3.5 text-xs uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:font-bold data-[te-nav-active]:bg-gray-100 data-[te-nav-active]:border-[#14A9F9] data-[te-nav-active]:text-[#14A9F9] dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                            id={`${tab.id}`}
                            data-te-toggle="pill"
                            data-te-target={`#${tab.href}`}
                            data-te-nav-active={tab.active ? "true" : undefined}
                            data-te-tab-active={tab.active ? true : undefined}
                            role="tab"
                            aria-controls={`${tab.href}`}
                            aria-selected={tab.active}
                            >{tab.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div>
                {props.tabs && props.tabs.map(tab => (
                    <div key={tab.id}
                        className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
                        id={`${tab.href}`}
                        role="tabpanel"
                        data-te-tab-active={tab.active ? true : undefined}
                        aria-labelledby={`${tab.id}`}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Tabs