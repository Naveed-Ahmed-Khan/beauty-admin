/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function ChatSidebar({
  selectedUser,
  setSelectedUser,
  setIsChatOpen,
  setOpenChat,
}) {
  const location = useLocation();
  const { users } = useStateContext();

  return (
    <div className="border-r border-zinc-700 w-full">
      <div className="mx-3 my-3">
        <div className="flex items-center justify-between mb-2">
          <h2 className="my-2 mb-2 ml-2 text-xl font-medium text-white">
            Chats
          </h2>
          {location.pathname !== "/chat" && (
            <button
              className="block lg:hidden"
              onClick={() => {
                setIsChatOpen(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-white hover:text-primary hover:rotate-90 hover:scale-125 transition-all duration-300 ease-out"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* <div className="relative text-gray-600">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gray-300"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            type="search"
            className="block w-full py-2 pl-10 rounded-md outline-none ring-1 ring-gray-100 border-2 border-gray-100 focus:ring-1 focus:ring-primary-dark focus:text-gray-700 focus:border-2 focus:border-primary-dark"
            name="search"
            placeholder="Search"
            required
          />
        </div> */}
      </div>

      <ul className="overflow-auto h-[32rem]">
        <li>
          {users.map((user) => {
            return (
              <a
                onClick={() => {
                  setSelectedUser(user);
                  setOpenChat(true);
                }}
                className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-zinc-700 cursor-pointer
                     hover:bg-zinc-700 focus:outline-none
                     ${selectedUser?.id === user.id && "bg-zinc-700"}`}
              >
                {user ? (
                  <img
                    className="object-cover w-10 h-10 rounded-full"
                    src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                    alt="username"
                  />
                ) : (
                  <div className="object-cover bg w-10 h-10 rounded-full" />
                )}

                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    <span className="block ml-2 font-semibold text-white">
                      {user.username}
                    </span>
                    {/* <span className="block ml-2 text-sm text-gray-600">
                          25 minutes
                        </span> */}
                  </div>
                  {/* <span className="block ml-2 text-sm text-gray-600">
                        bye
                      </span> */}
                </div>
              </a>
            );
          })}
        </li>
      </ul>
    </div>
  );
}
