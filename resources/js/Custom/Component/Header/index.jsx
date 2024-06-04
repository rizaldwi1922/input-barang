import React from "react";
import LogoIcon from "../../images/logo/logo-icon.svg";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className="sticky top-0 flex w-full bg-white z-999 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
            <div className="flex items-center justify-end flex-grow px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
