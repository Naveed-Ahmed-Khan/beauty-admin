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
import Backdrop from "../Backdrop";
import ChatSidebar from "./ChatSidebar";
import SendMessage from "./SendMessage";

const Chat = ({ setIsChatOpen }) => {
  const [selectedUser, setSelectedUser] = useState([]);
  const [openChat, setOpenChat] = useState(false);

  return (
    <>
      <div className="container mx-auto">
        <div
          className={` min-w-full bg-light border rounded-2xl lg:grid lg:grid-cols-3 `}
        >
          <div className={`${openChat ? "hidden" : "block"} lg:col-span-1`}>
            <ChatSidebar
              setIsChatOpen={setIsChatOpen}
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
              setOpenChat={setOpenChat}
              // openChat={openChat}
            />
          </div>
          {/*  <div className="block lg:hidden lg:col-span-1">
            <ChatSidebar
              selectedUser={selectedUser}
              setSelectedUser={setSelectedUser}
            />
          </div> */}

          {/* Chat */}
          <div
            className={`${
              openChat ? "block " : "hidden"
            } lg:col-span-2 lg:block`}
          >
            <SendMessage
              setIsChatOpen={setIsChatOpen}
              setOpenChat={setOpenChat}
              selectedUser={selectedUser}
            />
          </div>
          {/* Chat */}
        </div>
      </div>
      {/* <Backdrop
        showBackdrop={showChatBackdrop}
        onClick={() => {
          setOpen(!open);
          setShowChatBackdrop(false);
        }}
      /> */}
    </>
  );
};

export default Chat;
