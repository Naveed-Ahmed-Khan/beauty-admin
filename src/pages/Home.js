import React, { useEffect, useState } from "react";
import AppointmentsTable from "../components/AppointmentsTable";
import ApprovedTable from "../components/ApprovedTable";
import AvailabilityTable from "../components/AvailabilityTable";
import Table from "../components/Table";
import Spinner from "../components/UI/Spinner";
import UsersTable from "../components/UsersTable";
import { useStateContext } from "../contexts/ContextProvider";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { data: availabilityData } = useFetch("weekstatus", true);
  const { users, appointments } = useStateContext();

  return (
    <div className="pt-[4vh] flex-auto grid place-content-center grid-cols-1 xl:grid-cols-2 text-white text-7xl">
      <UsersTable rows={users} />
      <AppointmentsTable rows={appointments} />
      <AvailabilityTable rows={availabilityData} />
      {/* <ApprovedTable rows={appointments} /> */}
    </div>
  );
};

export default Home;
