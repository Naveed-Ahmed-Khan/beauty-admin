import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../api/firebase-config";
import useFetch from "./useFetch";

export default function useAppointments() {
  const { data: usersData } = useFetch("Users", true);

  const [appointmentData, setAppointmentData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const orderData = [];
      try {
        usersData.forEach(async (user) => {
          const userOrder = collection(db, "Users", `${user.id}`, "OrderData");
          const order = await getDocs(userOrder);
          if (order) {
            orderData.push({
              user: user,
              order: order.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
              })),
            });
          }
        });
        console.log(orderData);
        setAppointmentData(orderData);

        setIsloading(false);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
        alert(error);
      }
    };

    fetchData();
  }, [usersData]);

  console.log(appointmentData);

  return { appointmentData, isloading, errorMessage };
}
