/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../components/nav";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import FilterComponent from "../../components/filter";
import { baseUrl } from "../../Utils/constan";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import detailPreparing from "../../Utils/detailPreparing"

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

    // useEffect(() => {
    //     axios.get(`${baseUrl}/admin/akun`, {
    //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //     }).then((res) => setSiswa(res.data));
    //     if (!siswa) return;
    //     let data = siswa.filter((s) =>
    //         s.nama.toLowerCase().includes(searchKey.toLowerCase())
    //     );

    //     if (angkatans.length > 0) {
    //         data = data.filter((s) => angkatans.includes(s.angkatan));
    //     }

    //     if (jurusans.length > 0) {
    //         data = data.filter((s) => jurusans.includes(s.jurusan));
    //     }

    //     setFiltered(data);
    // }, [siswa, searchKey, angkatans, jurusans]);

    // useEffect(() => {
    //     if (!siswa) return;
    //     let data = siswa.filter((s) => s.nama.toLowerCase().includes(searchKey.toLowerCase()));
    //     setFiltered(data);
    // }, [siswa, searchKey]);

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
    };

    const exportData = () => {
        const searchQuery = searchKey;
        const jurusanQuery = jurusans.filter((x) => x.checked).map((x) => x.nama).join(",");
        const angkatanQuery = angkatans.filter((x) => x.checked).map((x) => x.tahun).join(",");
        axios
            .get(
                `${baseUrl}/admin/export-excel?search=${searchQuery}&jurusan=${jurusanQuery}&angkatan=${angkatanQuery}`,
                {
                    responseType: "blob",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            )
            .then((response) => {
                fileDownload(response.data, "data-siswa.xlsx");
                toast.success("Ekspor Excel berhasil");
            })
            .catch((error) => {
                console.error("Download error:", error);
                toast.error("Gagal mengekspor Excel!");
            });
    };

    const exportDataPDF = () => {
        const searchQuery = searchKey;
        const jurusanQuery = jurusans.filter((x) => x.checked).map((x) => x.nama).join(",");
        const angkatanQuery = angkatans.filter((x) => x.checked).map((x) => x.tahun).join(",");

        axios
            .get(
                `${baseUrl}/admin/export-pdf?search=${searchQuery}&jurusan=${jurusanQuery}&angkatan=${angkatanQuery}`,
                {
                    responseType: "blob",
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            )
            .then((response) => {
                fileDownload(response.data, "download.pdf");
                toast.success("Ekspor PDF berhasil");
            })
            .catch((error) => {
                console.error("Download error:", error);
                toast.error("Gagal mengekspor PDF!");
            });
    };

    const handleDetailClick = (id) => {
        detailPreparing(id);
        localStorage.setItem("akun-id", id);
        navigate(`/admin/lihat/${id}/biodata`);
    };

    const handleEditClick = (id) => {
        detailPreparing(id);
        navigate(`/admin/audit/${id}/biodata`);
    };

    return (
        <div className="flex h-screen font-body">
            <Navigation />
            <div className="flex-1 p-6 bg-white text-black overflow-y-scroll">
                <h1 className="text-3xl font-normal ml-2">Data Pending</h1>
                <header className="flex justify-end gap-4 my-5">
                    <button onClick={() => exportData()} className="bg-blue-500 rounded-sm py-1 px-2 text-white">Unduh Excel</button>
                    <button onClick={() => exportDataPDF()} className="bg-blue-500 rounded-sm py-1 px-2 text-white">Unduh PDF</button>
                    <button onClick={() => exportDataPDF()} className="bg-blue-500 rounded-sm py-1 px-2 text-white">Unduh Format</button>
                    <form onSubmit={handleImport} className="flex gap-5">
                        <input type="file" onChange={handleFileChange} className="border border-black rounded-sm py-1 px-2 file:bg-gray-300 file:rounded file:border file:border-black file:p-1 placeholder:ml-2" />
                        <button type="submit" className="bg-blue-500 rounded-sm py-1 px-2 text-white">Impor Excel</button>
                    </form>
                </header>
                <div className="grid grid-cols-10 gap-5 mt-6">
                    <input
                        type="search"
                        placeholder="Cari.."
                        className="border border-gray-400 rounded-sm col-span-9 p-2"
                        onChange={(e) => setSearchKey(e.target.value)}
                    />
                    <button onClick={() => setFilters(!filters)} className="border border-gray-400 rounded-sm text-black col-span-1 p-2 flex items-center justify-center">
                        <CiFilter className="mr-2" /> Filter
                    </button>
                </div>
                {filters && <FilterComponent stateAngkatan={setAngkatans} stateJurusan={setJurusans} />}

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
                                <td className="border px-4 py-2">{indexOfFirstItem + index + 1}</td>
                                <td className="border px-4 py-2">{s.nisn}</td>
                                <td className="border px-4 py-2">{s.nama}</td>
                                <td className="px-4 py-2 grid grid-cols-2 gap-2 justify-center">
                                    <button onClick={() => handleDetailClick(s.id)} className="bg-blue-500 rounded-sm p-2 text-white border">Lihat Detail</button>
                                    <button onClick={() => handleEditClick(s.id)} className="bg-green-800 rounded-sm p-2 text-white border">Perbarui</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">Kembali</button>
                    <span className="px-4 py-2">{currentPage} / {totalPages}</span>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 mx-1 bg-gray-300 rounded disabled:opacity-50">Selanjutnya</button>
                </div>
            </div>
        </div>
    );
};

export default DataSiswa;