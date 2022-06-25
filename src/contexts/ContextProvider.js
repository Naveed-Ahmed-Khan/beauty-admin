import React, { createContext, useContext, useEffect, useState } from "react";
import useAppointments from "../hooks/useAppointments";
import useFetch from "../hooks/useFetch";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [check, setCheck] = useState([]);
  const [users, setUsers] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);

  const { data: usersData } = useFetch("Users", check);
  const { data: availabilityData } = useFetch("weekstatus", check);
  const { appointmentData } = useAppointments(check);

  console.log(appointmentData);

  const updateCheck = () => {
    setCheck(!check);
  };

  const updateUsers = (data) => {
    setUsers(data);
  };
  const updateCurrentUser = (data) => {
    setCurrentUser(data);
  };
  const updateAppointments = (id, approved) => {
    console.log(id + " " + approved);
    appointments.forEach((appointment) => {
      if (appointment.id === id) {
        console.log(appointment);
        appointment.isApproved = approved;
      }
    });
    console.log(appointments);
    setAppointments(appointments);
  };
  const updateAvailability = (id, start, end) => {
    console.log(start + " " + end);
    availability.forEach((avail) => {
      if (avail.id === id) {
        console.log(avail);
        avail.bookingStart = start;
        avail.bookingEnd = end;
      }
    });
    console.log(availability);
    setAvailability(availability);
  };
  const updateOffday = (id, offday) => {
    console.log(offday);
    availability.forEach((avail) => {
      if (avail.id === id) {
        console.log(avail);
        avail.isOffday = offday;
      }
    });
    console.log(availability);
    setAvailability(availability);
  };

  useEffect(() => {
    const initialize = () => {
      setUsers(usersData);
      setAppointments(appointmentData);
      setAvailability(availabilityData);
    };
    initialize();
    // setIsLoading(false);
  }, [appointmentData, usersData, availabilityData]);

  console.log(appointments);
  console.log(users);
  return (
    <StateContext.Provider
      value={{
        currentUser,
        users,
        appointments,
        availability,
        setCurrentUser,
        updateCheck,
        updateAppointments,
        updateAvailability,
        updateOffday,
        updateUsers,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
