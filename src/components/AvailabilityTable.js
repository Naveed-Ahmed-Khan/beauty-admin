import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import TimePicker from "react-time-picker";
import { db } from "../api/firebase-config";
import { useStateContext } from "../contexts/ContextProvider";

const AvailabilityTable = ({ rows }) => {
  const { availability, updateAvailability, updateOffday, updateCheck } =
    useStateContext();
  const [selected, setSelected] = useState("");
  const [isOffday, setIsOffday] = useState(false);
  const [startTime, setStartTime] = useState("12:30");
  const [startZone, setStartZone] = useState("AM");
  const [endTime, setEndTime] = useState("12:30");
  const [endZone, setEndZone] = useState("PM");

  console.log(startTime);

  const appointmentsCollectionRef = collection(db, "weekstatus");

  const setAvailability = async (userId, start, end) => {
    await updateDoc(doc(appointmentsCollectionRef, userId), {
      bookingStart: start,
      bookingEnd: end,
    });
  };
  const setOffday = async (userId, offday) => {
    await updateDoc(doc(appointmentsCollectionRef, userId), {
      isOffday: offday,
    });
  };
  console.log(startZone);
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="">
        <div className="flex flex-row mb-1 sm:mb-0 items-center justify-between w-full">
          <h2 className="mb-1 text-2xl text-primary font-medium leading-tight">
            Availability
          </h2>
          {/* <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 md:space-y-0 justify-center">
              <input
                type="text"
                id='"form-subscribe-Filter'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full px-4 bg-secondary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="name"
              />

              <button
                className="flex-shrink-0 px-4  text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div> */}
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="bg-secondary bg-opacity-20 h-[21rem] inline-block min-w-full shadow rounded-3xl overflow-auto scrollbar-thin scrollbar-thumb-gray-400  scrollbar-track-black">
            <table className="min-w-full leading-normal">
              <thead className="">
                <tr className="">
                  <th
                    scope="col"
                    className="px-5 py-3  border-b-2 border-white border-opacity-50  text-white text-opacity-50  text-left text-sm uppercase font-normal"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b-2 border-white border-opacity-50  text-white text-opacity-50  text-left text-sm uppercase font-normal"
                  >
                    Booking Availability
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3  border-b-2 border-white border-opacity-50  text-white text-opacity-50  text-left text-sm uppercase font-normal"
                  >
                    <div className="flex items-center justify-evenly">
                      <p className="">Actions</p>
                      <p className="">Status</p>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className=" overflow-y-auto">
                {availability.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td className="px-5 py-2 border-b border-white border-opacity-50 text-sm">
                        <div className="flex items-center">
                          <div className="">
                            <p className="text-white whitespace-no-wrap">
                              {user.day}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-2  border-b border-white border-opacity-50 text-sm">
                        {selected === user.id ? (
                          <div className="flex justify-evenly gap-2">
                            <div className="flex mr-1">
                              <TimePicker
                                format="h:m"
                                clearIcon={null}
                                disableClock
                                onChange={(time) => {
                                  setStartTime(time + "" + startZone);
                                }}
                                value={startTime}
                              />
                              <button
                                onClick={() => {
                                  setStartZone(
                                    startZone === "AM" ? "PM" : "AM"
                                  );
                                }}
                                className="z-20 -ml-6"
                              >
                                {startZone}
                              </button>
                            </div>
                            -
                            <div className="flex">
                              <TimePicker
                                className=""
                                format="h:m"
                                clearIcon={null}
                                disableClock
                                onChange={(time) => {
                                  setEndTime(time + "" + endZone);
                                }}
                                value={endTime}
                              />
                              <button
                                onClick={() => {
                                  setEndZone(endZone === "PM" ? "AM" : "PM");
                                }}
                                className="z-20 -ml-6"
                              >
                                {endZone}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="flex gap-4 text-white whitespace-no-wrap">
                            <div>{user.bookingStart}</div>-
                            <div>{user.bookingEnd}</div>
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-2 border-b border-white border-opacity-50 text-sm">
                        <div className="flex items-center justify-evenly">
                          {selected === user.id ? (
                            <div className="flex items-center justify-evenly">
                              <button
                                onClick={() => {
                                  setAvailability(user.id, startTime, endTime);
                                  updateAvailability(
                                    user.id,
                                    startTime,
                                    endTime
                                  );
                                  updateCheck();
                                }}
                                className="mr-6 text-white hover:text-blue-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>

                              <button
                                onClick={() => {
                                  setSelected("");
                                }}
                                className=" text-white hover:text-red-500"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <>
                              {user.isOffday ? (
                                <button
                                  onClick={() => {
                                    setSelected(user.id);
                                    console.log(selected);

                                    // setEditTime(true);
                                  }}
                                  disabled
                                  className="text-gray-700 bg-white rounded-lg px-4 py-1 disabled:opacity-50"
                                >
                                  Set Time
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    setSelected(user.id);
                                    console.log(selected);

                                    // setEditTime(true);
                                  }}
                                  className="text-gray-700 bg-white rounded-lg px-4 py-1"
                                >
                                  Set Time
                                </button>
                              )}
                            </>
                          )}
                          {user.isOffday ? (
                            <button
                              onClick={() => {
                                setIsOffday(false);
                                setOffday(user.id, false);
                                updateOffday(user.id, false);
                                updateCheck();
                              }}
                              className="text-gray-700 bg-white opacity-60 hover:bg-primary active:bg-primary rounded-lg px-4 py-1"
                            >
                              Off Day
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setIsOffday(true);
                                setOffday(user.id, true);
                                updateOffday(user.id, true);
                                updateCheck();
                              }}
                              className="text-gray-700 bg-white hover:bg-primary active:bg-primary rounded-lg px-4 py-1"
                            >
                              Work Day
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTable;
