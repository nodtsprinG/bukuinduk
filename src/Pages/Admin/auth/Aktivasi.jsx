/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../utils/constan";
import { FiCheckCircle } from "react-icons/fi";

const Aktivasi = () => {
    const navigate = useNavigate()

    const aktivasi = () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            Swal.fire({
                title: "Gagal",
                text: "Token tidak ditemukan, silakan login kembali!",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }
    
        // Langkah 1: Ambil data akun dulu (biar dapet ID)
        axios.get(baseUrl + "/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            const  email  = localStorage.getItem("akun-email")
    
            // Langkah 2: Kirim request aktivasi berdasarkan ID
            axios.put(
                baseUrl + "/admin/aktivasi",
                { email }, // kirim ID ke body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                Swal.fire({
                    title: "Berhasil",
                    text: "Akun Anda berhasil diaktivasi",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/admin/dashboard");
                });
            })
            .catch((err) => {
                Swal.fire({
                    title: "Gagal",
                    text: err.response?.data?.message || "Terjadi kesalahan saat aktivasi",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            });
        })
        .catch((err) => {
            Swal.fire({
                title: "Gagal",
                text: "Gagal mengambil data pengguna",
                icon: "error",
                confirmButtonText: "OK",
            });
        });
    };    

    const [nama, setNama] = useState("");
    const [logo, setLogo] = useState(null);
    useEffect(() => {
        axios.get(baseUrl + "/data-sekolah")
            .then((res) => {
                console.log("Data user:", res.data); // Debugging
                setNama(res.data.nama);
                setLogo(res.data.logo);
            })
            .catch((err) => console.error("Gagal mengambil data sekolah:", err));
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 px-4">
            <div className="relative flex items-center w-full max-w-xl bg-white backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border border-white/10 p-8">

                {/* Bagian Konten */}
                <div className="w-full text-center flex flex-col items-center">
                    <p className="text-black text-sm">Langkah 2 dari 2</p>
                    <p className="text-black font-bold text-3xl mt-2">Aktivasi Akun</p>

                    {/* Logo Sekolah */}
                    <img
                        src={`data:image/png;base64,${logo}`}
                        alt="Logo Sekolah"
                        className="w-40 h-40 rounded-full shadow-lg mt-4"
                    />

                    {/* Nama Pengguna */}
                    <p className="text-black font-bold text-2xl mt-3">{nama}</p>

                    {/* Keterangan */}
                    <p className="text-black text-lg w-3/4 mt-4">
                        Anda belum mengaktifkan akun petugas Anda. Klik tombol di bawah untuk mengaktifkan akun Anda!
                    </p>

                    {/* Tombol Aktivasi */}
                    <button
                        onClick={aktivasi}
                        className="mt-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold text-lg 
                                   hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <FiCheckCircle className="text-xl" />
                        Aktivasi
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Aktivasi;