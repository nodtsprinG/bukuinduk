import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../utils/constan";
import { 
  FaHome,
  FaSchool, 
  FaUserGraduate,
  FaUserCog,
  FaSignOutAlt,
  FaBook,
  FaLayerGroup,
  FaHistory
} from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
const Navigation = () => {
  const navigate = useNavigate();
  const [logo, setLogo] = useState(null);
  const [role, setRole] = useState("");
  const [nama, setNama] = useState("");

  useEffect(() => {
    const cachedUser = localStorage.getItem("user_role");
  
    if (cachedUser) {
      setRole(JSON.parse(cachedUser));
    } else {
      axios.get(baseUrl + "/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          setRole(res.data.role);
          localStorage.setItem("user_role", JSON.stringify(res.data.role));
        })
        .catch((err) => console.error("Gagal mengambil data user:", err));
    }
  }, []);
  
  useEffect(() => {
    const cachedSekolah = localStorage.getItem("data_sekolah");
  
    if (cachedSekolah) {
      const data = JSON.parse(cachedSekolah);
      setNama(data.nama);
      setLogo(data.logo);
    } else {
      axios.get(baseUrl + "/admin/data-sekolah", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((res) => {
          setNama(res.data.nama);
          setLogo(res.data.logo);
          localStorage.setItem("data_sekolah", JSON.stringify(res.data));
        })
        .catch((err) => console.error("Gagal mengambil data sekolah:", err));
    }
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
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire("Berhasil Keluar", "Anda telah keluar.", "success").then(() => {
          navigate("/admin/auth/login");
        });
      }
    });
  };

  const menuItems = [
    { to: "/admin/Dashboard", icon: <FaHome size={20} />, label: "Beranda" },
    { to: "/admin/data-sekolah", icon: <FaSchool size={20} />, label: "Data Sekolah" },
    { to: "/admin/datajurusan", icon: <FaLayerGroup size={20} />, label: "Data Jurusan" },
    { to: "/admin/dataangkatan", icon: <FaHistory size={20} />, label: "Data Angkatan" },
    { to: "/admin/mapel", icon: <FaBook size={20} />, label: "Mata Pelajaran" },
    { to: "/admin/datasiswa", icon: <FaUserGraduate size={20} />, label: "Data Siswa" },
    role !== "petugas" && { to: "/admin/petugas", icon: <FaUserCog size={20} />, label: "Data Petugas" },
    role !== "petugas" && { to: "/admin/pending", icon: <MdPendingActions size={20} />, label: "Data Pengajuan" },
    role !== "petugas" && { to: "/admin/unverified", icon: <MdPendingActions size={20} />, label: "Verifikasi Data" }
  ].filter(Boolean);

  return (
    <nav className="h-full w-72 bg-gray-900 text-white p-6 flex flex-col space-y-5">
      <div className="flex items-center space-x-3 mb-6">
        <img 
          src={`data:image/png;base64,${logo}`} 
          alt="Logo Sekolah" 
          className="w-14 h-14 rounded-full shadow-md object-cover" 
        />
        <div>
          <h1 className="text-lg font-bold capitalize">{nama || "Admin"}</h1>
          <h2 className="text-sm text-gray-300 capitalize">{role}</h2>
        </div>
      </div>

      <ul className="space-y-2 flex-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link 
              to={item.to} 
              className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <button 
          onClick={Logout} 
          className="flex w-full items-center space-x-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition duration-300"
        >
          <FaSignOutAlt size={20} />
          <span className="text-sm font-medium">Keluar</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation;