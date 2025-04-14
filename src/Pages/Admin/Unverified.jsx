/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../Components/nav";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import FilterComponent from "../../components/filter";
import { baseUrl } from "../../utils/constan";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import detailPreparing from "../../Utils/detailPreparing"
import Modal from "../../Components/Modal";
import VerifNav from "../../Components/VerifNav"

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

    useEffect(() => {
        axios.get(`${baseUrl}/admin/data-diri/unverified`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }).then((res) => {
            setSiswa(res.data.data)
            let data = res.data.data

            if (angkatans.length > 0) {
                data = data.filter((s) => angkatans.includes(s.angkatan));
            }

            if (jurusans.length > 0) {
                data = data.filter((s) => jurusans.includes(s.jurusan));
            }
            setFiltered(data);
        });
        

    }, [ searchKey, angkatans, jurusans]);

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const [detailOpen, setDetailOpen] = React.useState(false);
    const [detailSiswaID, setDetailSiswaID] = React.useState({});
    const handleDetailClick = (id) => {
        // detailPreparing(id);
        setDetailOpen(!detailOpen)
        setDetailSiswaID(filtered.find((val, index) => (val.id === id)));

    };

    return (
        <div className="flex h-screen font-body">
            <Navigation />
            <div className="flex-1 p-6 bg-white text-black overflow-y-scroll">
                <h1 className="text-3xl font-normal ml-2">Data Pengajuan Verifikasi</h1>
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
                                <td className="border px-4 py-2">{s.data_diri.nama_lengkap}</td>
                                <td className="px-4 py-2 flex items-center justify-center">
                                    <button onClick={() => handleDetailClick(s.id)} className="bg-yellow-500 rounded-sm p-2 text-white border">Belum Verifikasi</button>
                                    {/* <button onClick={() => handleEditClick(s.id)} className="bg-green-800 rounded-sm p-2 text-white border">Perbarui</button> */}
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

            <Modal isOpen={detailOpen} onClose={() => {setDetailOpen(false); console.log(detailSiswaID)}}>
                <h1 className="font-bold text-2xl">Verifikasi</h1>
                <VerifNav data={detailSiswaID}/>
            </Modal>
        </div>
    );
};

export default DataSiswa;