import React from "react";
import Table from "../components/Table";

const Home = () => {
  return (
    <div className="mt-10 flex-auto grid grid-cols-2 text-white text-7xl">
      <Table />
      <Table />
      <Table />
      <Table />
    </div>
  );
};

export default Home;
