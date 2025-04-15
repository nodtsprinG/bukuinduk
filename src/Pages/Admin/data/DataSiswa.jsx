/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Navigation from "../../../Components/nav";
import { Link, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import FilterComponent from "../../../components/filter";
import { baseUrl } from "../../../utils/constan";
import fileDownload from "js-file-download";
import { FaDownload, FaFilePdf, FaFileExcel, FaRegFile, FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import SearchBar from "../../../Components/SearchBar";
import Pagination from "../../../Components/Pagination";

const DataSiswa = () => {
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [jurusans, setJurusans] = useState([]);
  const [angkatans, setAngkatans] = useState([]);
  const [jurusanList, setJurusanList] = useState([]);
  const [angkatanList, setAngkatanList] = useState([]);
  const [filters, setFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const cachedSiswa = localStorage.getItem("id_siswa");
    
        // ✅ Ambil jurusan & angkatan SELALU
        const [jurusanRes, angkatanRes] = await Promise.all([
          axios.get(`${baseUrl}/admin/jurusan`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${baseUrl}/admin/angkatan`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setJurusanList(jurusanRes.data);
        setAngkatanList(angkatanRes.data);
    
        if (cachedSiswa) {
          // ✅ Gunakan data siswa dari cache
          const cachedSiswaData = localStorage.getItem("siswa_data");
          if (cachedSiswaData) {
            setSiswa(JSON.parse(cachedSiswaData));
            console.log("📦 Menampilkan siswa dari cache");
          }
          return;
        }
    
        // ✅ Ambil data siswa jika belum ada di cache
        const akunRes = await axios.get(`${baseUrl}/admin/akun`, {
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const siswaData = akunRes.data;
    
        setSiswa(siswaData);
        localStorage.setItem("id_siswa", JSON.stringify(siswaData.map((item) => item.id)));
        localStorage.setItem("siswa_data", JSON.stringify(siswaData));
        console.log("📦 Data siswa disimpan di localStorage");
    
      } catch (error) {
        console.error("❌ Error mengambil data:", error);
      }
    };    

    fetchData();
  }, []); // Tetap hanya dijalankan sekali  



  const filteredData = useMemo(() => {
    if (!siswa) return [];

    let data = siswa.filter((s) =>
      s.nama.toLowerCase().includes(searchKey.toLowerCase())
    );


    const selectedAngkatans = angkatans
      .filter((x) => x.checked)
      .map((x) => Number(x.tahun));
    const selectedJurusans = jurusans.filter((x) => x.checked).map((x) => x.nama);

    if (selectedAngkatans.length)
      data = data.filter((s) => selectedAngkatans.includes(s.angkatan));
    if (selectedJurusans.length)
      data = data.filter((s) => selectedJurusans.includes(s.jurusan));
    console.log("S.angkatan:", data.map((s) => s.angkatan));
    console.log("Selected Angkatans:", selectedAngkatans);
    return data;
  }, [siswa, searchKey, angkatans, jurusans]); // Hanya menghitung ulang jika salah satu dependency berubah

  useEffect(() => {
    setFiltered(filteredData);
  }, [filteredData]); // Set state hanya jika hasil filtering berubah

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  //Import Halaman Depan
  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) {
      Swal.fire({
        title: "Peringatan!",
        text: "Pilih data terlebih dahulu",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${baseUrl}/import-excel`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        title: "Berhasil!",
        text: "File berhasil diunggah",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch {
      Swal.fire({
        title: "Gagal!",
        text: "File gagal diunggah",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  //Import Halaman Belakang Raport Bulk
  const handleImportBelakang = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih data terlebih dahulu");

    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${baseUrl}/import-raport?&semester=${semester}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File berhasil diunggah");
    } catch {
      alert("File gagal diunggah");
    }
  };

  // Ekpor PDF Rapor
  const exportDataPDFHalBelakang = (e) => {
    if (!jurusanId || !angkatanId) {
      Swal.fire({
        title: "Peringatan!",
        text: "Pilih jurusan, dan angkatan terlebih dahulu!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    const jurusanNama = jurusanList.find((j) => j.id === parseInt(jurusanId))?.nama || "Jurusan-Tidak-Diketahui";
    const angkatanNama = angkatanList.find((a) => a.id === parseInt(angkatanId))?.tahun || "Angkatan-Tidak-Diketahui";

    const url = `${baseUrl}/admin/export-raport-pdf?&jurusanId=${jurusanId}&angkatanId=${angkatanId}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, `Nilai Siswa Jurusan ${jurusanNama} Angkatan ${angkatanNama}.pdf`);
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil mengunduh file",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Download error:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal mengekspor PDF!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  //Ekspor Excel Rapor
  const exportDataExcelHalBelakang = (e) => {
    if (!jurusanId || !angkatanId) {
      Swal.fire({
        title: "Peringatan!",
        text: "Pilih jurusan, dan angkatan terlebih dahulu!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    const jurusanNama = jurusanList.find((j) => j.id === parseInt(jurusanId))?.nama || "Jurusan-Tidak-Diketahui";
    const angkatanNama = angkatanList.find((a) => a.id === parseInt(angkatanId))?.tahun || "Angkatan-Tidak-Diketahui";
    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-raport-excel?&jurusanId=${jurusanId}&angkatanId=${angkatanId}&semester=${semester}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, `Nilai Siswa Jurusan ${jurusanNama} Angkatan ${angkatanNama}.xlsx Semester ${semester}`);
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil mengunduh file",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Download error:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal mengekspor PDF!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  //Elspor Format Rapor
  const exportDataExcelHalBelakangDummy = (e) => {
    if (!semester) {
      Swal.fire({
        title: "Peringatan!",
        text: "Pilih semester terlebih dahulu!",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-raport-template?&semester=${semester}`;

    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, `Format Rapor Siswa Semester ${semester}.xlsx`);
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil mengunduh format",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Download error:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal mengekspor PDF!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  // Ekspor PDF Halaman Depan
  const exportDataPDFdpan = () => {
    const jurusanNama = jurusanList.find((j) => j.id === parseInt(jurusanId))?.nama || "Jurusan-Tidak-Diketahui";
    const angkatanNama = angkatanList.find((a) => a.id === parseInt(angkatanId))?.tahun || "Angkatan-Tidak-Diketahui";
    axios
      .get(
        `${baseUrl}/admin/export-pdf?&jurusanId=${jurusanId}&angkatanId=${angkatanId}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        // Membuat nama file dinamis berdasarkan filter yang dipilih
        const fileName = `Data jurusan ${jurusanNama || "Semua-Jurusan"}- angkatan ${angkatanNama || "Semua-Angkatan"
          }.pdf`;
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil mengunduh file",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        fileDownload(response.data, fileName);
      })
      .catch((error) => {
        console.error("Download error:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal mengekspor PDF!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };


  // Ekspor Excel halaman Depan
  const exportDataExcel = (e) => {
    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-excel?&jurusanId=${jurusanId}&angkatanId=${angkatanId}`;
    const jurusanNama = jurusanList.find((j) => j.id === parseInt(jurusanId))?.nama || "Jurusan-Tidak-Diketahui";
    const angkatanNama = angkatanList.find((a) => a.id === parseInt(angkatanId))?.tahun || "Angkatan-Tidak-Diketahui";
    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, `Data Jurusan ${jurusanNama} Angkatan ${angkatanNama}.xlsx`);
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil mengunduh file",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Download error:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal mengekspor file!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  // Ekspor Format Halaman Depan
  const exportDataExcelDepanDummy = (e) => {
    // const semester = prompt("Masukkan semester 1-5")
    const url = `${baseUrl}/admin/export-excel-template`;
    axios
      .get(url, {
        responseType: "blob",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        fileDownload(response.data, "format-halaman-depan.xlsx");
        Swal.fire({
          title: "Berhasil!",
          text: "Berhasil mengunduh format",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      })
      .catch((error) => {
        console.error("Download error:", error);
        Swal.fire({
          title: "Gagal!",
          text: "Gagal mengekspor PDF!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  const handleDetailClick = (id) => {
    localStorage.setItem("akun-id", id);
    navigate(`/admin/lihat/${id}/biodata`);
  };

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(null);
  const [semester, setSemester] = useState("");
  const [jurusanId, setJurusanId] = useState("");
  const [angkatanId, setAngkatanId] = useState("");

  const semesterOptions = ["1", "2", "3", "4", "5", "6"];

  const exportFunctions = {
    excelDepan: exportDataExcel,
    pdfDepan: exportDataPDFdpan,
    excelBelakang: exportDataExcelHalBelakang,
    pdfBelakang: exportDataPDFHalBelakang,
    formatBelakang: exportDataExcelHalBelakangDummy
  };

  const handleExport = (type) => {
    exportFunctions[type]?.();
    setIsModalOpen(null);
  };

  const renderModal = (type, hasSemester = false) => (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl mb-4">Pilih Data Export</h2>
        {hasSemester && (
          <>
            <label className="block mb-2">Semester:</label>
            <select value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full mb-4 p-2 border rounded">
              <option value="">Pilih Semester</option>
              {semesterOptions.map((s, index) => (
                <option key={index} value={s}>{`Semester ${s}`}</option>
              ))}
            </select>
          </>
        )}
        {/* Jurusan */}
        <label className="block mb-2">Jurusan:</label>
        <select
          value={jurusanId}
          onChange={(e) => setJurusanId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Pilih Jurusan</option>
          {jurusanList.map((j) => (
            <option key={j.id} value={j.id}>
              {j.nama}
            </option>
          ))}
        </select>
        {/* Angkatan */}
        <label className="block mb-2">Angkatan:</label>
        <select
          value={angkatanId}
          onChange={(e) => setAngkatanId(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Pilih Angkatan</option>
          {angkatanList.map((a) => (
            <option key={a.id} value={a.id}>
              {a.tahun}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button onClick={() => setIsModalOpen(null)} className="px-4 py-2 mr-2 bg-gray-300 rounded">Batal</button>
          <button onClick={() => handleExport(type)} className="px-4 py-2 bg-blue-500 text-white rounded">Export</button>
        </div>
      </div>
    </div>
  );

  const modalImport = (type, hasSemester = false) => (
    setIsModalOpen1(true)
  );

  const tambah = (i) => {
    navigate("/siswa/data/upload/akun");
  };

  return (
    <div className="flex h-screen font-body">
      <Navigation />
      <div className="flex-1 p-6 bg-white text-black overflow-y-scroll">
        <h1 className="text-3xl font-normal ml-2">Data Siswa</h1>
        <header className="flex justify-end gap-4 my-5">

          <div className="relative inline-block text-left">
            {/* Tombol Utama */}
            <button
              onClick={() => setOpen(!open)}
              className="px-2 py-2 flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white rounded-sm transition-all"
            >
              <FaDownload className="text-sm" />
              Unduh Buku Induk
            </button>

            {/* Dropdown */}
            {open && !isModalOpen && (
              <div className="absolute mt-2 w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {/* Halaman Depan */}
                <div className="px-4 py-2 font-semibold text-gray-700 bg-gray-100 rounded-t-lg">
                  Halaman Depan
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => setIsModalOpen("pdfDepan")}
                >
                  <FaFilePdf className="text-red-500" /> Unduh PDF
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => setIsModalOpen("excelDepan")}
                >
                  <FaFileExcel className="text-green-500" /> Unduh Excel
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => exportDataExcelDepanDummy()}
                >
                  <FaRegFile className="text-green-500" /> Unduh Format
                </button>
                <hr className="border-gray-300" />

                {/* Halaman Belakang */}
                <div className="px-4 py-2 font-semibold text-gray-700 bg-gray-100">
                  Halaman Belakang
                </div>
                <button
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-200 transition"
                  onClick={() => setIsModalOpen("pdfBelakang")}
                >
                  <FaFilePdf className="text-red-500" /> Unduh PDF
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-200 transition rounded-b-lg"
                  onClick={() => setIsModalOpen("excelBelakang")}
                >
                  <FaFileExcel className="text-green-500" /> Unduh Excel
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 w-full text-left text-gray-600 hover:bg-gray-200 transition rounded-b-lg"
                  onClick={() => setIsModalOpen("formatBelakang")}
                >
                  <FaRegFile className="text-green-500" /> Unduh Format
                </button>
              </div>
            )}

            {/* Modal */}
            {isModalOpen && renderModal(isModalOpen, isModalOpen.includes("Belakang"))}
          </div>
          <form className="flex gap-5">
            {/* Input File */}
            <input
              type="file"
              onChange={handleFileChange}
              className="border border-black py-1 px-2 file:bg-gray-400 file:border file:border-gray-700 file:text-white file:p-1 file:mr-8"
            />

            {/* Tombol Unggah Halaman Depan */}
            <button
              type="button"
              onClick={handleImport}
              className="bg-blue-700 rounded-md py-1 px-2 text-white hover:bg-blue-800"
            >
              Unggah Data
            </button>

            {/* Tombol Unggah Halaman Belakang */}
            <button
              type="button"
              onClick={() => modalImport()}
              className="bg-green-700 rounded-md py-1 px-2 text-white hover:bg-green-800"
            >
              Unggah Rapor
            </button>
            {isModalOpen1 && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <h2 className="text-xl mb-4">Pilih Semester</h2>

                  <label className="block mb-2">Semester:</label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full mb-4 p-2 border rounded"
                  >
                    <option value="">Pilih Semester</option>
                    {semesterOptions.map((s, index) => (
                      <option key={index} value={s}>{`Semester ${s}`}</option>
                    ))}
                  </select>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsModalOpen1(false)}
                      className="px-4 py-2 mr-2 bg-gray-300 rounded"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        handleImportBelakang();
                        setIsModalOpen1(false);
                      }}
                      className="px-4 py-2 bg-blue-700 text-white rounded"
                    >
                      Impor
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </header>

        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          onToggleFilter={() => setFilters(!filters)}
        />

        {filters && (
          <FilterComponent
            stateAngkatan={setAngkatans}
            stateJurusan={setJurusans}
          />
        )}

        {currentItems.length === 0 ? (
          <div className="text-center mt-6 text-gray-500">Tidak ada data siswa</div>
        ) : (
          <div className="mt-6 overflow-x-auto shadow">
            <table className="min-w-full border border-gray-200 bg-white text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 border">No</th>
                  <th className="px-6 py-3 border">NISN</th>
                  <th className="px-6 py-3 border">Nama</th>
                  <th className="px-6 py-3 border">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-800">
                {currentItems.map((s, index) => (
                  <tr
                    key={s.id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-3 border">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-3 border">{s.nisn}</td>
                    <td className="px-6 py-3 border">{s.nama}</td>
                    <td className="px-6 py-3 border">
                      <button
                        onClick={() => handleDetailClick(s.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      >
                        Detail Siswa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default DataSiswa;
