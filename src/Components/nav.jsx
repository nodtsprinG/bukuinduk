import { MdPendingActions } from "react-icons/md";
import { RiAdminFill, RiLogoutBoxLine } from "react-icons/ri";
import { VscGraph, VscOrganization } from "react-icons/vsc";
import { PiStudent } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuBookOpenText } from "react-icons/lu";
import { ImHome } from "react-icons/im";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../utils/constan";
import { School } from "lucide-react";

const Navigation = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [role, setRole] = useState(""); // Menyimpan role
  const [nama, setNama] = useState(""); // Menyimpan nama sekolah

  // 🔥 Ambil data pengguna dari API
  useEffect(() => {
    axios.get(baseUrl + "/auth/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        console.log("Data user:", res.data); // Debugging
        setRole(res.data.role);
      })
      .catch((err) => console.error("Gagal mengambil data user:", err));
  }, [role]);

  useEffect(() => {
    axios.get(baseUrl + "/admin/data-sekolah", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => {
        console.log("Data user:", res.data); // Debugging
        setNama(res.data.nama);
        setLogo(res.data.logo);
      })
      .catch((err) => console.error("Gagal mengambil data sekolah:", err));
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/admin/auth/login");
    }
  }, [navigate]);

  const Logout = () => {
    Swal.fire({
        title: "Konfirmasi Keluar",
        text: "Apakah Anda yakin ingin keluar?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Iya",
        cancelButtonText: "Batal",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.clear();
            Swal.fire("Berhasil Keluar", "Anda telah keluar.", "success").then(() => {
                navigate("/admin/auth/login");
            });
        }
    });
};

  return (
    <nav className="h-full w-72 bg-gradient-to-b from-gray-900 to-blue-950 text-white p-6 flex flex-col">
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3 mb-4">
        <label>
          <img src={`data:image/png;base64,${logo}`} alt="Logo Sekolah" className="w-16 h-16 bg-transparent rounded-full p-1 shadow-md" />
        </label>
        <div>
          <h1 className="text-lg font-bold capitalize">{nama || "Admin"}</h1>
          <h2 className="text-sm text-gray-300 capitalize">{role}</h2>
        </div>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4 flex-1">
        <li>
          <Link
            to="/admin/Dashboard"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <ImHome size={20} />
            <span className="text-sm font-medium">Beranda</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/data-sekolah"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <School size={20} />
            <span className="text-sm font-medium">Data Sekolah</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/datajurusan"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <VscOrganization size={20} />
            <span className="text-sm font-medium">Data Jurusan</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/dataangkatan"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <VscGraph size={20} />
            <span className="text-sm font-medium">Data Angkatan</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/mapel"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <LuBookOpenText size={20} />
            <span className="text-sm font-medium">Mata Pelajaran</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/datasiswa"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <PiStudent size={20} />
            <span className="text-sm font-medium">Data Siswa</span>
          </Link>
        </li>
        {role !== "petugas" && (
          <li>
            <Link
              to="/admin/petugas"
              className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
            >
              <RiAdminFill size={20} />
              <span className="text-sm font-medium">Petugas</span>
            </Link>
          </li>
        )}
        {role !== "petugas" && (
          <li>
            <Link
              to="/admin/pending"
              className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
            >
              <MdPendingActions size={20} />
              <span className="text-sm font-medium">Pending Data</span>
            </Link>
          </li>
        )}
        <li className="mt-[100px]">
          <button
            onClick={Logout}
            className="flex w-full space-x-3 p-3 rounded-lg bg-transparent hover:bg-red-700 transition duration-300"
          >
            <RiLogoutBoxLine size={20} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
