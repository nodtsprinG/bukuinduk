/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../../components/nav";
import { data, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import FilterComponent from "../../../components/filter";
import { baseUrl } from "../../../Utils/constan";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import detailPreparing from "../../../Utils/detailPreparing";

const DataSiswa = () => {
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [jurusans, setJurusans] = useState([]);
  const [angkatans, setAngkatans] = useState([]);
  const [filters, setFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/admin/akun`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setSiswa(res.data);
        console.log(res.data);
      })
  }, []);

  useEffect(() => {
    if (!siswa) return;
    let data = siswa.filter((s) =>
      s.nama.toLowerCase().includes(searchKey.toLowerCase())
    );

    const selectedAngkatans = angkatans
      .filter((x) => x.checked)
      .map((x) => x.tahun);
    const selectedJurusans = jurusans
      .filter((x) => x.checked)
      .map((x) => x.nama);

    if (selectedAngkatans.length)
      data = data.filter((s) => selectedAngkatans.includes(s.angkatan));
    if (selectedJurusans.length)
      data = data.filter((s) => selectedJurusans.includes(s.jurusan));

    setFiltered(data);
  }, [siswa, searchKey, angkatans, jurusans]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih data terlebih dahulu");

    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${baseUrl}/import-excel`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File berhasil diunggah");
    } catch {
      alert("File gagal diunggah");
    }
  };const handleImportBelakang = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih data terlebih dahulu");

    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${baseUrl}/import-exce`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File berhasil diunggah");
    } catch {
      alert("File gagal diunggah");
    }
  };

  const exportDataPDFHalBelakang = (e) => {
    if (!semester || !jurusanId || !angkatanId) {
      alert("Pilih semester, jurusan, dan angkatan terlebih dahulu!");
      return;
    }
    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-raport-pdf?&semester=${semester}&jurusanId=${jurusanId}&angkatanId=${angkatanId}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, `nilai-siswa-semester-${semester}-jurusan-${jurusanId}-angkatan-${angkatanId}.xlsx`);
        window.alert(`Berhasil mengunduh raport semester ${semester} dari jurusan ${jurusanId}`);
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor PDF!");
      });
  };

  const exportDataExcelHalBelakang = (e) => {
    if (!semester || !jurusanId || !angkatanId) {
      alert("Pilih semester, jurusan, dan angkatan terlebih dahulu!");
      return;
    }
    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-raport-excel?&semester=${semester}&jurusanId=${jurusanId}&angkatanId=${angkatanId}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, `nilai-siswa-semester-${semester}-jurusan-${jurusanId}-angkatan-${angkatanId}.xlsx`);
        window.alert(`Berhasil mengunduh raport semester ${semester} dari jurusan ${jurusanId}`);
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor PDF!");
      });
  };

  const exportDataExcelHalBelakangDummy = (e) => {
    // e.preventDefault()
    const searchQuery = searchKey;
    const jurusanQuery = jurusans
      .filter((x) => x.checked)
      .map((x) => x.nama)
      .join(",");
    const angkatanQuery = angkatans
      .filter((x) => x.checked)
      .map((x) => x.tahun)
      .join(",");

    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-raport-template?semester=${1}&jurusan=${jurusanQuery}&angkatan=${angkatanQuery}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, "nilai-siswa.xlsx");
        window.alert("Ekspor PDF berhasil");
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor PDF!");
      });
  };

  const exportDataPDFdpan = (e) => {
    // e.preventDefault()
    const searchQuery = searchKey;

    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-pdf?jurusan=${jurusanId}&angkatan=${angkatanId}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, `data-siswa-${jurusanId}-angkatan-${angkatanId}.pdf`);
        window.alert("Ekspor PDF berhasil");
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor PDF!");
      });
  };

  const exportDataExcel = (e) => {
    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-excel?&semester=${1}&jurusanId=${1}&angkatanId=${1}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, "nilai-siswa.xlsx");
        window.alert("Ekspor PDF berhasil");
      })
      .catch((error) => {
        console.error("Download error:", error);
        window.alert("Gagal mengekspor PDF!");
      });
  };

  const exportDataExcelDepanDummy = (e) => {
    // e.preventDefault()
    const searchQuery = searchKey;
    const jurusanQuery = jurusans
      .filter((x) => x.checked)
      .map((x) => x.nama)
      .join(",");
    const angkatanQuery = angkatans
      .filter((x) => x.checked)
      .map((x) => x.tahun)
      .join(",");

    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-excel-kosong`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, "format-halaman-depan.xlsx");
        toast.success("Berhasil mengunduh format");
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal negunduh format!");
      });
  };

  const handleDetailClick = (id) => {
    detailPreparing(id);
    localStorage.setItem("akun-id", id);
    navigate(`/admin/lihat/${id}/biodata`);
  };

  const [selected, setSelected] = useState("Option 1");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [semester, setSemester] = useState("");
  const [jurusanId, setJurusanId] = useState("");
  const [angkatanId, setAngkatanId] = useState("");

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const renderModalBelakang = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl mb-4">Pilih Data Export</h2>

        <label className="block mb-2">Semester:</label>
        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Pilih Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
          <option value="3">Semester 3</option>
          <option value="4">Semester 4</option>
          <option value="5">Semester 5</option>
          <option value="6">Semester 6</option>
        </select>

        <label className="block mb-2">Jurusan : </label>
        <select
          value={jurusanId}
          onChange={(e) => setJurusanId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Pilih Jurusan</option>
          <option value="1">Rekayasa Perangkat Lunak</option>
          <option value="2">Desain Komunikasi Visual</option>
          <option value="3">Audio Video</option>
          <option value="4">Broadcasting</option>
          <option value="5">Animasi</option>
          <option value="6">Teknik Komputer dan Jaringan</option>
          <option value="7">Elektronika Industri</option>
          <option value="8">Mekatronika</option>
        </select>

        <label className="block mb-2">Angkatan : </label>
        <select
          value={angkatanId}
          onChange={(e) => setAngkatanId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Pilih Angkatan</option>
          <option value="1">2022</option>
          <option value="2">2023</option>
          <option value="3">2024</option>
        </select>

        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-4 py-2 mr-2 bg-gray-300 rounded"
          >
            Batal
          </button>
          <button
            onClick={exportDataExcelHalBelakang}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );

  const renderModalDepan = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl mb-4">Pilih Data</h2>

        <label className="block mb-2">Jurusan : </label>
        <select
          value={jurusanId}
          onChange={(e) => setJurusanId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Pilih Jurusan</option>
          <option value="1">Rekayasa Perangkat Lunak</option>
          <option value="2">Desain Komunikasi Visual</option>
          <option value="3">Audio Video</option>
          <option value="4">Broadcasting</option>
          <option value="5">Animasi</option>
          <option value="6">Teknik Komputer dan Jaringan</option>
          <option value="7">Elektronika Industri</option>
          <option value="8">Mekatronika</option>
        </select>

        <label className="block mb-2">Angkatan : </label>
        <select
          value={angkatanId}
          onChange={(e) => setAngkatanId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Pilih Angkatan</option>
          <option value="1">2022</option>
          <option value="2">2023</option>
          <option value="3">2024</option>
        </select>

        <div className="flex justify-end">
          <button
            onClick={() => setIsModalOpen2(false)}
            className="px-4 py-2 mr-2 bg-gray-300 rounded"
          >
            Batal
          </button>
          <button
            onClick={exportDataPDFdpan}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <div className="flex h-screen font-body">
      <Navigation />
      <div className="flex-1 p-6 bg-white text-black overflow-y-scroll">
        <h1 className="text-3xl font-normal ml-2">Data Siswa</h1>
        <header className="flex justify-end gap-4 my-5">
          <div className="relative inline-block text-left">
            <button
              onClick={() => {
                setOpen2(!open2);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-sm shadow-md"
            >
              Halaman Depan
            </button>
            <div
              className={`absolute mt-2 w-40 bg-white border rounded-sm shadow-lg ${!open2 ? "hidden" : "block"
                }`}
            >
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white transition `}
                onClick={() => setIsModalOpen2(true)}
              >
                Unduh PDF
              </button>
              {isModalOpen2 && renderModalDepan()}
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white transition `}
                onClick={(e) => exportDataExcel(e)}
              >
                Unduh Excel
              </button>
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white transition `}
                onClick={(e) => exportDataExcelDepanDummy(e)}
              >
                Unduh Format
              </button>
            </div>
          </div>
          <div className="relative inline-block text-left">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-sm shadow-md"
            >
              Halaman Belakang
            </button>
            <div
              className={`absolute mt-2 w-40 bg-white border rounded-sm shadow-lg ${!open ? "hidden" : "block"
                }`}
            >
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white transition `}
                onClick={(e) => exportDataPDFHalBelakang(e)}
              >
                Unduh PDF
              </button>
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white transition `}
                onClick={() => setIsModalOpen(true)}
              >
                Unduh Excel
              </button>
              {isModalOpen && renderModalBelakang()}
              <button
                className={`block w-full px-4 py-2 text-left hover:bg-blue-500 hover:text-white transition `}
                onClick={(e) => exportDataExcelHalBelakangDummy(e)}
              >
                Unduh Format
              </button>
            </div>
          </div>
          <form onSubmit={handleImport} className="flex gap-5">
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-black rounded-sm py-1 px-2 file:bg-gray-300 file:rounded file:border file:border-black file:p-1 placeholder:ml-2"
            />
            <button
              type="submit"
              className="bg-blue-500 rounded-sm py-1 px-2 text-white"
            >
              Unggah Excel
            </button>
          </form>
        </header>
        <div className="grid grid-cols-10 gap-5 mt-6">
          <input
            type="search"
            placeholder="Cari.."
            className="border border-gray-400 rounded-sm col-span-9 p-2"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button
            onClick={() => setFilters(!filters)}
            className="border border-gray-400 rounded-sm text-black col-span-1 p-2 flex items-center justify-center"
          >
            <CiFilter className="mr-2" /> Filter
          </button>
        </div>
        {filters && (
          <FilterComponent
            stateAngkatan={setAngkatans}
            stateJurusan={setJurusans}
          />
        )}

        <table className="w-full mt-8 border border-gray-300">
          <thead className="bg-gray-200 border p-2">
            <tr>
              <th className="border p-2">No</th>
              <th className="border p-2">NISN</th>
              <th className="border p-2">Nama</th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((s, index) => (
              <tr key={s.id} className="text-center border">
                <td className="border px-4 py-2">
                  {indexOfFirstItem + index + 1}
                </td>
                <td className="border px-4 py-2">{s.nisn}</td>
                <td className="border px-4 py-2">{s.nama}</td>
                <td className="px-4 py-2 justify-center">
                  <button
                    onClick={() => handleDetailClick(s.id)}
                    className="bg-blue-500 rounded-sm p-2 text-white border"
                  >
                    Detail Siswa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Kembali
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataSiswa;
