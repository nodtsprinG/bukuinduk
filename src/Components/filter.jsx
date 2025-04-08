/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import axios from "axios";
import { baseUrl } from "../utils/constan";

const FilterComponent = ({ stateAngkatan, stateJurusan }) => {
  const [angkatanList, setAngkatanList] = useState([]);
  const [jurusanList, setJurusanList] = useState([]);
  const [selectedAngkatan, setSelectedAngkatan] = useState("");
  const [selectedJurusan, setSelectedJurusan] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(baseUrl + "/admin/angkatan", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data.map((item) => ({
          tahun: String(item.tahun), // pastikan string untuk keseragaman
        }));
        setAngkatanList(data);
      })
      .catch((err) => console.error("❌ Gagal mengambil angkatan:", err));

    axios
      .get(baseUrl + "/admin/jurusan", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setJurusanList(res.data))
      .catch((err) => console.error("❌ Gagal mengambil jurusan:", err));
  }, []);

  const handleApply = () => {
    const selectedAngkatans = angkatanList.map((item) => ({
      tahun: item.tahun,
      checked: item.tahun === String(selectedAngkatan),
    }));

    const selectedJurusans = jurusanList.map((item) => ({
      nama: item.nama,
      checked: item.nama === selectedJurusan,
    }));

    stateAngkatan(selectedAngkatans);
    stateJurusan(selectedJurusans);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-lg mt-4">
      <div className="flex items-center gap-2 mb-4">
        <CiFilter />
        <h2 className="text-lg font-semibold">Filter</h2>
      </div>

      <div className="flex flex-col gap-4">
        {/* Jurusan */}
        <div>
          <label className="font-semibold">Jurusan</label>
          <select
            className="p-2 border rounded w-full mt-1"
            value={selectedJurusan}
            onChange={(e) => setSelectedJurusan(e.target.value)}
          >
            <option value="">Pilih Jurusan</option>
            {jurusanList.map((jrs) => (
              <option key={jrs.nama} value={jrs.nama}>
                {jrs.nama}
              </option>
            ))}
          </select>
        </div>

        {/* Angkatan */}
        <div>
          <label className="font-semibold">Angkatan</label>
          <select
            className="p-2 border rounded w-full mt-1"
            value={selectedAngkatan}
            onChange={(e) => setSelectedAngkatan(e.target.value)}
          >
            <option value="">Pilih Angkatan</option>
            {angkatanList.map((ank) => (
              <option key={ank.tahun} value={ank.tahun}>
                {ank.tahun}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleApply}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition"
        >
          Terapkan
        </button>
        {/* Reset Button */}
        <button
          onClick={() => {
            setSelectedJurusan("");
            setSelectedAngkatan("");
          }}
          className="mt-2 text-sm text-blue-600 hover:underline self-end"
        >
          Reset Filter
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
