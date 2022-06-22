import { collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../api/firebase-config";
import { useStateContext } from "../contexts/ContextProvider";

const AppointmentsTable = ({ rows }) => {
  const { users, appointments, updateAppointments, updateCheck } =
    useStateContext();

  const [filterValue, setFilterValue] = useState("");

  const setAppointment = async (userId, approved) => {
    const appointmentsCollectionRef = collection(db, "appointments");
    const data = doc(appointmentsCollectionRef, userId);
    await updateDoc(data, {
      isApproved: approved,
    });
  };

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="">
        <div className="flex flex-row mb-1 sm:mb-0 items-center justify-between w-full">
          <h2 className="text-3xl text-primary font-medium leading-tight">
            Appointments
          </h2>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 md:space-y-0 justify-center">
              <input
                type="text"
                id='"form-subscribe-Filter'
                className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full  px-4 bg-secondary text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                placeholder="name"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              {filterValue.length > 0 ? (
                <button
                  className="flex-shrink-0 px-4  text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Clear
                </button>
              ) : (
                <button
                  className="flex-shrink-0 px-4  text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                  type="submit"
                >
                  Filter
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="bg-light bg-opacity-30 h-[21rem] inline-block min-w-full shadow rounded-3xl overflow-auto scrollbar-thin scrollbar-thumb-gray-400  scrollbar-track-black">
            <table className=" min-w-full leading-normal">
              <thead className="">
                <tr className="">
                  <th
                    scope="col"
                    className="px-5 py-3 text-center bg-secondary bg-opacity-20  border-b-2 border-white border-opacity-50  text-white text-opacity-50 text-sm uppercase font-normal"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-center bg-secondary bg-opacity-20  border-b-2 border-white border-opacity-50  text-white text-opacity-50 text-sm uppercase font-normal"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-center bg-secondary bg-opacity-20  border-b-2 border-white border-opacity-50  text-white text-opacity-50 text-sm uppercase font-normal"
                  >
                    Day
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-center bg-secondary bg-opacity-20  border-b-2 border-white border-opacity-50  text-white text-opacity-50 text-sm uppercase font-normal"
                  >
                    Approval
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {appointments.map((user) => {
                  const selectedUser = users?.filter(
                    (usr) => usr?.id === user?.userId
                  );
                  console.log(selectedUser);

                  return (
                    <>
                      {user.isApproved === false && (
                        <tr>
                          {console.log(user)}
                          <td className="px-5 py-2 text-center border-b border-white border-opacity-50 bg-secondary bg-opacity-20 text-sm">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                <a href="#" className="block relative">
                                  <img
                                    alt="profil"
                                    src="/images/person/8.jpg"
                                    className="mx-auto object-cover rounded-full "
                                  />
                                </a>
                              </div>
                              <div className="ml-3">
                                <p className="text-white whitespace-no-wrap">
                                  {/* {user.userId} */}
                                  {selectedUser[0]?.username}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-2 text-center border-b border-white border-opacity-50 bg-secondary bg-opacity-20 text-sm">
                            <p className="text-white whitespace-no-wrap">
                              {user.appointment.toDate().toLocaleTimeString()}
                            </p>
                          </td>
                          <td className="px-5 py-2 text-center border-b border-white border-opacity-50 bg-secondary bg-opacity-20 text-sm">
                            <p className="text-white whitespace-no-wrap">
                              {weekday[user.appointment.toDate().getDay()]}
                              {/* {new Date(user.appointment).toLocaleTimeString().} */}
                            </p>
                          </td>
                          <td className="px-5 py-2 text-center border-b border-white border-opacity-50 bg-secondary bg-opacity-20 text-sm">
                            <div className="flex items-center justify-evenly">
                              <button
                                onClick={() => {
                                  setAppointment(user.id, true);
                                  updateAppointments(user.id, true);
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
                                  setAppointment(user.id, false);
                                  updateAppointments(user.id, false);
                                  updateCheck();
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
                          </td>
                        </tr>
                      )}
                    </>
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

export default AppointmentsTable;
