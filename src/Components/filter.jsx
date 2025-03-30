/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import axios from "axios";
import { baseUrl } from "../utils/constan";

const FilterComponent = ({ stateAngkatan, stateJurusan }) => {
  const [angkatan, setAngkatan] = useState([]);
  const [jurusan, setJurusan] = useState([]);
  const [selectedJurusan, setSelectedJurusan] = useState("");
  const [selectedAngkatan, setSelectedAngkatan] = useState("");

  useEffect(() => {
    axios
      .get(baseUrl + "/admin/jurusan", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setJurusan(res.data))
      .catch((err) => console.error("Error fetching jurusan:", err));
  }, []);
  
  useEffect(() => {
    axios
      .get(baseUrl + "/admin/angkatan", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setAngkatan(res.data.map(item => ({ tahun: item.tahun }) )))
      .catch((err) => console.error("Error fetching angkatan:", err));
  }, []);  

  const handleApply = () => {
    const filteredJurusan = jurusan.map((jrs) => ({
      nama: jrs.nama,
      checked: jrs.nama === selectedJurusan,
    }));

    const filteredAngkatan = angkatan.map((ank) => ({
      tahun: ank.tahun,
      checked: ank.tahun === selectedAngkatan,
    }));

    stateJurusan(filteredJurusan);
    stateAngkatan(filteredAngkatan);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <CiFilter />
        <h2 className="text-lg font-semibold">Filter</h2>
      </div>
      <div className="flex flex-col gap-4">
        {/* Dropdown untuk Jurusan */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Jurusan</label>
          <select
            className="p-2 border rounded-md"
            value={selectedJurusan}
            onChange={(e) => setSelectedJurusan(e.target.value)}
          >
            <option value="">Pilih Jurusan</option>
            {jurusan.map((jrs) => (
              <option key={jrs.nama} value={jrs.nama}>
                {jrs.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Dropdown untuk Angkatan */}
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Angkatan</label>
          <select
            className="p-2 border rounded-md"
            value={selectedAngkatan}
            onChange={(e) => setSelectedAngkatan(e.target.value)}
          >
            <option value="">Pilih Angkatan</option>
            {angkatan.map((ank) => (
              <option key={ank.tahun} value={ank.tahun}>
                {ank.tahun}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleApply}
        className="mt-6 bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 transition"
      >
        Terapkan
      </button>
    </div>
  );
};

export default FilterComponent;
