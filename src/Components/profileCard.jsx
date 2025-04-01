import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "../utils/constan";

const StudentInfo = () => {
    const [siswa, setSiswa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Ambil ID dari localStorage
    const siswaId = localStorage.getItem("akun-id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!siswaId) {
                    setError("ID tidak ditemukan di localStorage");
                    setLoading(false);
                    return;
                }

                // Panggil API untuk mendapatkan data siswa
                const response = await axios.get(baseUrl + `/admin/akun/${siswaId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setSiswa(response.data);
            } catch (err) {
                console.log(err);
                setError("Gagal mengambil data siswa");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [siswaId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!siswa) {
        return <div>Data siswa tidak ditemukan</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
            <h2 className="text-lg font-semibold mb-4">Informasi Siswa</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Siswa</label>
                    <input
                        type="text"
                        value={siswa.data_diri.nama_lengkap}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Angkatan</label>
                    <input
                        type="text"
                        value={siswa.angkatan.tahun}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">NIS</label>
                    <input
                        type="text"
                        value={siswa.nisn}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Jurusan</label>
                    <input
                        type="text"
                        value={siswa.jurusan.nama}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;