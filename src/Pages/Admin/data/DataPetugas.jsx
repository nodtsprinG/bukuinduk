import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../../Components/nav";
import { baseUrl } from "../../../utils/constan";
import Swal from "sweetalert2";

const DataJurusan = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [editId, setEditId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [petugas, setPetugas] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [filtered, setFiltered] = useState([]);

  // Fetch data petugas
  const updatePetugas = () => {
    axios.get(baseUrl + "/admin/petugas", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setPetugas(res.data));
  };

  useEffect(updatePetugas, []);

  // Filter pencarian
  useEffect(() => {
    setFiltered(
      searchKey ? petugas.filter((x) => x.username.toLowerCase().includes(searchKey.toLowerCase())) : petugas
    );
  }, [searchKey, petugas]);

  // Tambah petugas
  const handleAddClick = () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      return alert("Semua data harus diisi!");
    }

    axios.post(baseUrl + "/admin/petugas/",
      { username, email, password },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
      .then(() => {
        setShowDialog(false);
        setUsername("");  // Reset input setelah berhasil
        setEmail("");
        setPassword("");
        Swal.fire({
          icon: "info",
          title: "Tunggu Konfirmasi Petugas",
          text: "Menunggu konfirmasi petugas",
          showConfirmButton: false,
          timer: 3000
        })
        console.log("✅ Data berhasil dikirim:", { username, email, password });

        updatePetugas(); // Jika ada fungsi untuk refresh data petugas
      })
      .catch(error => {
        console.error("❌ Error saat menambahkan petugas:", error.response?.data || error.message);
        alert("Terjadi kesalahan: " + (error.response?.data?.message || "Silakan coba lagi."));
      });
  };


  // Buka dialog edit
  const handleEditClick = (id, uname, mail, pass) => {
    setEditId(id);
    setEditUsername(uname);
    setEditEmail(mail);
    setEditPassword(pass);
    setEditDialog(true);
  };

  // Update petugas
  const handleUpdateClick = () => {
    if (!editUsername || !editEmail || !editPassword) return alert("Semua data harus diisi!");

    axios.put(baseUrl + `/admin/petugas/${editId}`,
      { username: editUsername, email: editEmail, password: editPassword },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ).then(() => {
      updatePetugas();
      setEditDialog(false);
    });
  };

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: "Data petugas ini akan dihapus secara permanen.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(baseUrl + `/admin/petugas/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then(() => {
          Swal.fire('Berhasil!', 'Data petugas telah dihapus.', 'success');
          updatePetugas();
        }).catch(() => {
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
        });
      }
    });
  };


  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="flex-1 p-6 bg-white text-black overflow-y-scroll">
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-3xl">Petugas</h1>
          <button onClick={() => setShowDialog(true)} className="bg-blue-500 text-white p-2 rounded-sm">
            Tambah Petugas
          </button>
        </header>
        <input
          type="search"
          placeholder="Cari Petugas"
          onChange={(e) => setSearchKey(e.target.value)}
          className="border w-full p-2 rounded-lg"
        />
        <table className="w-full mt-4 border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">No</th>
              <th className="p-2">Petugas</th>
              <th className="p-2">Email</th>
              <th className="p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, index) => (
              <tr key={s.id} className="border">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{s.username}</td>
                <td className="border px-4 py-2">{s.email}</td>
                <td className="px-4 py-2 grid grid-cols-2 gap-2">
                  <button onClick={() => handleEditClick(s.id, s.username, s.email, s.password)} className="bg-green-700 text-white px-3 py-1 rounded">
                    Ubah
                  </button>
                  <button onClick={() => handleDeleteClick(s.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog Tambah Petugas */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tambah Petugas</h2>
            <div className="space-y-3">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nama Petugas"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Kata Sandi"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
              >
                Batal
              </button>
              <button
                onClick={handleAddClick}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog Edit Petugas */}
      {editDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 transition-opacity">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-fade-in">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Ubah Petugas</h2>
            <div className="space-y-3">
              <input
                value={editUsername}
                onChange={(e) => setEditUsername(e.target.value)}
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setEditDialog(false)}
                className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
              >
                Batal
              </button>
              <button
                onClick={handleUpdateClick}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
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