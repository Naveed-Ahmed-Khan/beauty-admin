/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { db } from "../../api/firebase-config";
import { useStateContext } from "../../contexts/ContextProvider";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  query,
  collection,
  limit,
  orderBy,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const Chat = ({ setIsChatOpen }) => {
  const { users } = useStateContext();
  const [selectedUser, setSelectedUser] = useState([]);
  const [enteredText, setEnteredText] = useState([]);

  const q = query(
    collection(db, "messages"),
    where("chatId", "==", selectedUser?.id || ""),
    orderBy("createdAt"),
    limit(50)
  );
  const [messages] = useCollectionData(q, { idField: "id" });

  return (
    <div className=" container mx-auto">
      <div className="min-w-full bg-light border rounded-2xl lg:grid lg:grid-cols-3">
        <div className="border-r border-zinc-700 lg:col-span-1">
          <div className="mx-3 my-3">
            <div className="relative text-gray-600">
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
            </div>
            <h2 className="my-2 mb-2 ml-2 text-lg font-medium text-white">
              Chats
            </h2>
          </div>

          <ul className="overflow-auto h-[32rem]">
            <li>
              {users.map((user) => {
                return (
                  <a
                    onClick={() => setSelectedUser(user)}
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
        <div className="hidden lg:col-span-2 lg:block">
          <div className="w-full">
            <div className="relative flex items-center justify-between p-3 border-b border-zinc-700">
              <div className="flex items-center">
                {selectedUser?.username ? (
                  <>
                    <img
                      className="object-cover w-10 h-10 rounded-full"
                      src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                      alt="username"
                    />
                    <span className="block ml-2 font-bold text-white">
                      {selectedUser?.username}
                    </span>
                    <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                  </>
                ) : (
                  <div className="object-cover w-10 h-10 rounded-full" />
                )}
              </div>

              <button
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
            </div>

            <div className="relative w-full p-6 overflow-y-auto h-[34.25rem]">
              <ul className="space-y-2">
                {messages?.map((message) => {
                  return (
                    <>
                      {message.senderId === "admin" ? (
                        <li className="h-fit flex justify-end">
                          <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                            <span className="block">
                              {message?.messageBody}
                            </span>
                          </div>
                        </li>
                      ) : (
                        <li className="h-fit flex justify-start">
                          <div className="relative max-w-xl px-4 py-2 text-white bg-gray-700  rounded shadow">
                            <span className="block">
                              {message?.messageBody}
                            </span>
                          </div>
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>

            <div className="flex items-center justify-between w-full p-3 border-t border-zinc-700">
              {/* <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
              </button> */}

              <input
                type="text"
                placeholder="Message"
                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none ring-1 ring-gray-100 border-2 border-gray-100 focus:ring-1 focus:ring-primary-dark focus:text-gray-700 focus:border-2 focus:border-primary-dark "
                name="message"
                required
                value={enteredText}
                onChange={(e) => setEnteredText(e.target.value)}
              />
              {/* <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button> */}
              <button
                onClick={async () => {
                  if (enteredText.trim().length > 0 && selectedUser.username) {
                    setEnteredText("");
                    await addDoc(collection(db, "messages"), {
                      senderId: "admin",
                      recieverId: selectedUser?.id,
                      messageBody: enteredText,
                      chatId: selectedUser?.id,
                      createdAt: serverTimestamp(),
                    });
                  }
                }}
                type="button"
              >
                <svg
                  className="w-6 h-6 text-white hover:text-primary origin-center transition-all duration-300 ease-out transform rotate-90 hover:scale-125"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
