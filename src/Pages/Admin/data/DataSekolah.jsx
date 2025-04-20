import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/constan";
import Navigation from "../../../Components/nav";
import Swal from "sweetalert2";

export default function SchoolDataComponent() {
    const [schoolName, setSchoolName] = useState("Memuat...");
    const [schoolLogo, setSchoolLogo] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        fetchSchoolData();
    }, []);

    const fetchSchoolData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/admin/data-sekolah`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setSchoolName(response.data.nama);
            setSchoolLogo(response.data.logo);
        } catch (error) {
            console.error("Gagal mengambil data sekolah:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen font-body">
            <Navigation />
            <div className="bg-white p-6 text-center w-full max-w-2xl mx-auto">
                <h1 className="text-2xl font-semibold mb-4">Data Sekolah</h1>
                <p className="text-lg font-bold text-green-700">{schoolName}</p>
                <div className="my-4">
                    {schoolLogo ? (
                        <img
                            src={`data:image/png;base64,${schoolLogo}`}
                            alt="Logo Sekolah"
                            className="w-40 h-40 object-contain mx-auto rounded-lg"
                        />
                    ) : (
                        <p className="text-gray-500">Logo tidak tersedia</p>
                    )}
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded"
                >
                    Ubah Data Sekolah
                </button>
            </div>

            {isFormOpen && (
                <SchoolFormModal
                    onClose={() => setIsFormOpen(false)}
                    onUpdateName={setSchoolName}
                    onUpdateLogo={fetchSchoolData}
                    onDeleteLogo={() => setSchoolLogo(null)}
                />
            )}
        </div>
    );
}

function SchoolFormModal({ onClose, onUpdateName, onUpdateLogo }) {
    const [newSchoolName, setNewSchoolName] = useState("");
    const [newLogo, setNewLogo] = useState(null);

    const updateSchoolData = async () => {
        if (!newSchoolName && !newLogo) return alert("Harap isi Nama Sekolah atau pilih Logo baru");

        try {
            const token = localStorage.getItem("token");

            let updatedNama = null;
            let updatedLogo = null;

            // Update Nama Sekolah jika ada perubahan
            if (newSchoolName) {
                await axios.post(`${baseUrl}/admin/data-sekolah/nama`, { nama: newSchoolName }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onUpdateName(newSchoolName);
                updatedNama = newSchoolName;
            }

            // Update Logo Sekolah jika ada perubahan
            if (newLogo) {
                const formData = new FormData();
                formData.append("logo", newLogo);
                await axios.post(`${baseUrl}/admin/data-sekolah/logo`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                onUpdateLogo();

                // Untuk menampilkan kembali preview image base64 (opsional)
                const reader = new FileReader();
                reader.onloadend = () => {
                    updatedLogo = reader.result;

                    // Perbarui localStorage setelah reader selesai
                    const cached = JSON.parse(localStorage.getItem("data_sekolah")) || {};
                    localStorage.setItem("data_sekolah", JSON.stringify({
                        ...cached,
                        nama: updatedNama || cached.nama,
                        logo: updatedLogo || cached.logo
                    }));
                };
                reader.readAsDataURL(newLogo);
            } else {
                // Jika hanya nama yang diperbarui
                const cached = JSON.parse(localStorage.getItem("data_sekolah")) || {};
                localStorage.setItem("data_sekolah", JSON.stringify({
                    ...cached,
                    nama: updatedNama || cached.nama,
                    logo: cached.logo
                }));
            }

            Swal.fire({
                icon: 'success',
                title: 'Data Sekolah diperbarui',
                confirmButtonText: 'OK',
            });

            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Gagal memperbarui data sekolah:", error);
        }
    };


    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center relative">
                <button
                    onClick={onClose}
                    className="absolute -top-2 right-2 text-2xl text-red-600 p-2"
                >
                    x
                </button>
                <h2 className="text-xl font-semibold mb-4">Ubah Data Sekolah</h2>
                <input
                    type="text"
                    placeholder="Nama Sekolah Baru"
                    value={newSchoolName}
                    onChange={(e) => setNewSchoolName(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <input
                    type="file"
                    onChange={(e) => setNewLogo(e.target.files[0])}
                    className="w-full mb-4 file:p-1 file:bg-gray-400 file:text-white file:rounded-sm file:mr-10"
                />
                <button
                    onClick={updateSchoolData}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full"
                >
                    Perbarui Data Sekolah
                </button>
            </div>
        </div>
    );
}
