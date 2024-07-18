// ["NavBar", "Component"]    


import React, { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./AuthenticationSlice_Store";

const navigation = [
  { name: "Login", href: "/" },
  { name: "Main Content", href: "/main" },
  { name: "Admin", href: "/admin" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar_Component() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isTransparent, setIsTransparent] = useState(true);
  const isAuthenticated = useSelector((state) => state.authenticationState.isAuthenticated);

  // IMPORTANT: Add event listener for scroll to toggle transparency
  React.useEffect(() => {
    const toggleTransparency = () => {
      setIsTransparent(window.scrollY === 0);
    };
    window.addEventListener('scroll', toggleTransparency);
    return () => window.removeEventListener('scroll', toggleTransparency);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navItems = [
    ...navigation,
    ...(isAuthenticated ? [{ name: "Logout", href: "#", onClick: handleLogout }] : []),
  ];

  return (
    <Disclosure as="nav" className={`fixed top-0 w-full z-50 ${isTransparent ? 'bg-transparent' : 'bg-[#E6F3FF]'} transition-colors duration-300`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navItems.map((item) => (
                      item.onClick ? (
                        <button
                          key={item.name}
                          onClick={item.onClick}
                          className={classNames(
                            "text-gray-700 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                          )}
                        >
                          {item.name}
                        </button>
                      ) : (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-gray-900 text-white"
                              : "text-gray-700 hover:bg-gray-700 hover:text-white",
                            "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                          )}
                          aria-current={location.pathname === item.href ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className={classNames(
                      "text-gray-700 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium w-full text-left"
                    )}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-700 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={location.pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                )
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}