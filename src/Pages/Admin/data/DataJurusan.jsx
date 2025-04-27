import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../../Components/nav";
import { baseUrl } from "../../../utils/constan";

const DataJurusan = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editValue, setEditValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [jurusan, setJurusan] = useState([]);
  const [searchkey, setSearchkey] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [role, setRole] = useState(""); // State untuk menyimpan role pengguna

  useEffect(() => {
    axios.get(baseUrl + "/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        console.log("Role pengguna:", res.data); // Debugging
        setRole(res.data.role); // Pastikan state diperbarui
      }) // Ambil role dari response API
      .catch((err) => console.error("Gagal mengambil data user:", err));
  }, []);

  const updateJurusan = () => {
    axios.get(baseUrl + "/admin/jurusan", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setJurusan(res.data));
  };

  useEffect(updateJurusan, []);

  useEffect(() => {
    setFiltered(
      searchkey ? jurusan.filter((x) => x.nama.toLowerCase().includes(searchkey.toLowerCase())) : jurusan
    );
  }, [searchkey, jurusan]);

  const handleAddClick = () => {
    axios.post(baseUrl + "/admin/jurusan/", { nama: inputValue }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(() => {
      updateJurusan();
      setShowDialog(false);
      setInputValue("");
    });
  };

  const handleEditClick = (id, nama) => {
    setEditId(id);
    setEditValue(nama);
    setEditDialog(true);
  };

  const handleUpdateClick = () => {
    axios.put(baseUrl + `/admin/jurusan/${editId}`, { nama: editValue }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(() => {
      updateJurusan();
      setEditDialog(false);
    });
  };

  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 p-6 bg-white text-black overflow-y-scroll">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl">Jurusan SMKN 2 Singosari</h1>
          <button
            disabled={role !== "admin"}
            onClick={() => setShowDialog(true)}
            className={`p-2 rounded-sm text-white ${role !== "admin" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              }`}
          >
            Tambah Jurusan
          </button>
        </header>
        <input
          type="search"
          placeholder="Cari jurusan"
          onChange={(e) => setSearchkey(e.target.value)}
          className="border w-full p-2 rounded-lg"
        />
        <div className="mt-6 overflow-x-auto shadow">
          <table className="min-w-full border border-gray-200 bg-white text-sm">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 border">No</th>
                <th className="px-6 py-3 border">Jurusan</th>
                <th className="px-6 py-3 border">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-center text-gray-800">
              {filtered.map((s, index) => (
                <tr
                  key={s.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="px-6 py-3 border">{index + 1}</td>
                  <td className="px-6 py-3 border">{s.nama}</td>
                  <td className="px-6 py-3 border">
                    <button
                      disabled={role !== "admin"}
                      onClick={() => handleEditClick(s.id, s.nama)}
                      className={`w-full px-4 py-2 rounded text-sm font-semibold transition-colors duration-200 ${role !== "admin"
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white"
                        }`}
                    >
                      Ubah
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Tambah Jurusan</h2>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowDialog(false)}
                className="bg-gray-500 text-white p-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleAddClick}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
      {editDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Ubah Jurusan</h2>
            <input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setEditDialog(false)}
                className="bg-gray-500 text-white p-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateClick}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataJurusan;