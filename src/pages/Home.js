import React from "react";
import Table from "../components/Table";
import Spinner from "../components/UI/Spinner";
import UsersTable from "../components/UsersTable";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const { data: users, isloading } = useFetch("Users", true);
  console.log(users);

  return (
    <>
      {isloading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <div className="mt-10 flex-auto grid place-content-center grid-cols-1 lg:grid-cols-2 text-white text-7xl">
          <UsersTable rows={users} />
          {/* <Table header={"All Users"} /> */}
          <Table header={"Appointments"} />
          <Table header={"Availability"} />
          <Table header={"Approved Appointments"} />
        </div>
      )}
    </>
  );
};

export default Home;
