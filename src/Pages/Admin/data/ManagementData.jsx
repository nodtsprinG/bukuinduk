import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navigation from "../../../Components/nav";
import Swal from "sweetalert2";
import { baseUrl } from "../../../utils/constan";

export default function DatabaseBackupPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleExport = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${baseUrl}/admin/database/export`, {
                responseType: "blob",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });

            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "backup.sql");
            document.body.appendChild(link);
            link.click();

            Swal.fire("Berhasil", "Backup berhasil diunduh!", "success");
        } catch (error) {
            Swal.fire("Gagal", "Gagal melakukan backup database", "error");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleImport = async () => {
        if (!selectedFile) {
            return Swal.fire("Peringatan", "Silakan pilih file SQL terlebih dahulu.", "warning");
        }

        const formData = new FormData();
        formData.append("sqlfile", selectedFile);

        try {
            setIsLoading(true);
            await axios.post(`${baseUrl}/admin/database/import`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            Swal.fire("Sukses", "Database berhasil di-import!", "success");
            navigate("/admin/auth/login/")
        } catch (error) {
            if (error.response?.status === 409) {
                Swal.fire("Info", "File SQL ini sudah pernah di-import sebelumnya.", "info");
            } else {
                Swal.fire("Gagal", "Terjadi kesalahan saat import database.", "error");
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen font-body">
            <Navigation />
            <div className="bg-white p-6 rounded-lg shadow-md text-center w-full max-w-2xl mx-auto">
                <h1 className="text-2xl font-semibold mb-6">Manajemen Data</h1>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleExport}
                        className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded"
                        disabled={isLoading}
                    >
                        {isLoading ? "Memproses..." : "Cadangkan Data"}
                    </button>

                    <div>
                        <input
                            type="file"
                            accept=".sql"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            className="mb-2"
                        />
                        <button
                            onClick={handleImport}
                            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                            disabled={isLoading}
                        >
                            {isLoading ? "Memproses..." : "Unggah Data"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
