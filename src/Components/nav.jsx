import { MdPendingActions } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { VscGraph, VscOrganization } from "react-icons/vsc";
import { PiStudent } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Logo from "../assets/logosekolah.png"
import { LuBookOpenText } from "react-icons/lu";
import { ImHome } from "react-icons/im";
const Navigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/admin/auth/login");
    }
  }, [navigate]);

  const Logout = () => {
    localStorage.clear();
    navigate("/admin/auth/login");
  };

  return (
    <nav className="h-full w-72 bg-gradient-to-b from-gray-900 to-blue-950 text-white p-6 flex flex-col">
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3 mb-6">
        <img src={Logo} alt="Logo Sekolah" className="w-15 h-15 bg-transparent rounded-full p-1 shadow-md" />
        <h1 className="text-xl font-bold">Admin</h1>
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
            to="/admin/datajurusan"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <VscOrganization size={20} />
            <span className="text-sm font-medium">Data Jurusan</span>
          </Link>
        </li>
        <li>
          <Link
            to="/admin/pending"
            className="flex items-center space-x-3 p-3 rounded-lg transition duration-300 hover:bg-gray-700"
          >
            <MdPendingActions size={20} />
            <span className="text-sm font-medium">Pending Data</span>
          </Link>
        </li>
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