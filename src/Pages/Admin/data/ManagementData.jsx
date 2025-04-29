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

  const getCurrentDateString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseUrl}/admin/database/export`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `backup-data-${getCurrentDateString()}.sql`);
      document.body.appendChild(link);
      link.click();
      link.remove();

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
      return Swal.fire(
        "Peringatan",
        "Silakan pilih file SQL terlebih dahulu.",
        "warning"
      );
    }

    const formData = new FormData();
    formData.append("sqlfile", selectedFile);

    try {
      setIsLoading(true);
      await axios.post(`${baseUrl}/admin/database/import`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      Swal.fire("Sukses", "Database berhasil di-import!", "success");
      navigate("/admin/auth/login/");
    } catch (error) {
      if (error.response?.status === 409) {
        Swal.fire(
          "Info",
          "File SQL ini sudah pernah di-import sebelumnya.",
          "info"
        );
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
      <div className="w-full max-w-2xl mx-auto space-y-6">

        {/* Card Export */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Cadangkan Data</h2>
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4">
              Buat cadangan database dalam format SQL
            </p>
            <button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 active:bg-green-500 text-white py-2 px-6 rounded transition-all cursor-pointer w-full max-w-xs"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Cadangkan Data"}
            </button>
          </div>
        </div>

        {/* Card Import */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Pulihkan Data</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pilih File SQL
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="sqlFileInput"
                    accept=".sql"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <label
                    htmlFor="sqlFileInput"
                    className="block w-full p-2 border rounded bg-gray-100 hover:bg-gray-200 active:bg-gray-300 cursor-pointer text-center"
                  >
                    Pilih File
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-1 truncate">
                  {selectedFile ? selectedFile.name : "Belum ada file dipilih"}
                </p>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pulihkan Data
                </label>
                <button
                  onClick={handleImport}
                  className="bg-blue-600 hover:bg-blue-700 active:bg-blue-500 text-white py-2 px-6 rounded transition-all cursor-pointer w-full"
                  disabled={isLoading || !selectedFile}
                >
                  {isLoading ? "Memproses..." : "Unggah Data"}
                </button>
                <label className="block text-sm font-medium text-gray-700 mt-2">
                  Pastikan file sudah benar dan terbaru!
                </label>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}