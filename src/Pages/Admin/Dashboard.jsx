/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFemale, FaMale, FaDatabase, FaUser, FaBars } from "react-icons/fa";
import Navigation from "../../Components/nav";
import { baseUrl } from "../../utils/constan";
import GenderCharts from "../../Components/GenderCharts";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    axios
      .get(baseUrl + "/admin/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setDashboard(res.data))
      .catch((err) => console.error("Gagal mengambil data:", err));
  }, []);

  return (
    <div className="flex h-full font-body bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative w-64 bg-white shadow-xl lg:w-72`}> 
        <Navigation />
      </div>

      {/* Toggle Sidebar */}
      <button onClick={() => setIsNavOpen(!isNavOpen)} className="fixed top-4 left-4 z-50 p-2 bg-blue-950 text-white rounded-lg shadow-lg lg:hidden">
        <FaBars size={20} />
      </button>

      {/* Main Content */}
      <div className={`flex-1 p-8 transition-all duration-300 ${isNavOpen ? "ml-72 lg:ml-80" : "ml-5"}`}>
        <h1 className="text-3xl font-semibold text-gray-800">Beranda</h1>
        <hr className="border-t-2 mt-4" />

        {/* Statistik Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <StatCard icon={<FaUser />} title="Total Siswa" value={dashboard.count_siswa} color="bg-purple-500" />
          {/* <StatCard icon={<FaDatabase />} title="Petugas" value={dashboard.count_datainputed} color="bg-green-900" /> */}
          <StatCard icon={<FaMale />} title="Siswa Laki-Laki" value={dashboard.count_laki} color="bg-blue-500" />
          <StatCard icon={<FaFemale />} title="Siswa Perempuan" value={dashboard.count_perempuan} color="bg-pink-500" />
        </div>

        {/* Grafik */}
        <div className="mt-5 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Statistik Siswa</h2>
          <GenderCharts maleCount={dashboard.count_laki} femaleCount={dashboard.count_perempuan} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className={`${color} w-full h-[150px] rounded-lg text-white flex flex-col items-start justify-between p-6 shadow-lg relative overflow-hidden`}> 
    <div className="absolute right-3 top-3 opacity-30 text-6xl">{icon}</div>
    <p className="font-semibold text-lg">{title}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
