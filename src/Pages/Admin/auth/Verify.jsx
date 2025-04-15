/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Logo from "../../../assets/logosekolah.png"
import EmailIcon from "../../../assets/EmailIcon.png"
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../utils/constan";

const Verify = () => {
    const [kode, setKode] = useState("")
    const navigate = useNavigate()
    const { code } = useParams()

    const verify = () => {
        if (code.length === 0) {
            alert("Error");
        } else {
            axios.post(baseUrl + '/auth/code-admin', { code })
                .then((res) => {
                    const { token } = res.data;

                    // Simpan token ke localStorage
                    localStorage.setItem("token", token);

                    // Ambil status akun dari API setelah mendapatkan token
                    axios.get(baseUrl + "/auth/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then((res) => {
                        const status = res.data?.status || res.data?.data?.status;
                        const role = res.data?.role || res.data?.data?.role;
                        console.log("DATA /auth/me:", res.data);
                        console.log("Status akun:", status); // Debugging
                        localStorage.setItem("status", status);
                        localStorage.setItem("Role : ", role);
                        Swal.fire({
                            title: "Berhasil",
                            text: "Akun Anda berhasil diverifikasi",
                            icon: "success",
                            confirmButtonText: "OK",
                        }).then(() => {
                            console.log("Status akun:", status);
                            // Arahkan berdasarkan status akun
                            if (status === "aktif") {
                                navigate("/admin/dashboard");
                            } else {
                                navigate("/admin/auth/aktivasi");
                            }
                        });
                    }).catch((err) => {
                        console.error("Gagal mendapatkan status akun:", err);
                        Swal.fire({
                            title: "Error",
                            text: "Terjadi kesalahan saat mengambil data akun",
                            icon: "error",
                        });
                    });
                }).catch((err) => {
                    console.error("Error verifikasi kode:", err);
                    Swal.fire({
                        title: "Error",
                        text: "Kode verifikasi salah atau terjadi kesalahan",
                        icon: "error",
                    });
                });
        }
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 px-4">
            <div className="flex flex-col md:flex-row items-center w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
                {/* Bagian Kiri - Logo */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/2 py-10 px-6">
                    <img src={`data:image/png;base64,${logo}`} alt="Logo Sekolah" className="w-40 h-40 rounded-full shadow-lg" />
                    <p className="text-black font-bold text-2xl mt-4 text-center">{nama}</p>
                </div>

                {/* Bagian Kanan - Form Verifikasi */}
                <div className="w-full md:w-1/2 px-10 py-10">
                    <p className="text-gray-500 text-sm">Langkah 2 dari 2</p>
                    <p className="text-gray-800 font-bold text-3xl mt-2">Verifikasi</p>
                    <div className="mt-8 text-center">
                        <input
                            type="text"
                            maxLength={6}
                            onChange={(e) => setKode(e.target.value)}
                            className="w-full p-3 border rounded-md text-center text-xl tracking-widest focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Masukkan kode"
                        />
                        <div className="flex flex-col items-center py-8">
                            <p className="text-gray-500 w-2/3 text-sm">Kami telah mengirimkan kode verifikasi ke email Anda</p>
                            <img src={EmailIcon} alt="Email Icon" className="w-16 mt-4" />
                        </div>
                        <button
                            onClick={verify}
                            className="w-full bg-blue-600 text-white px-5 py-3 rounded-md font-bold hover:bg-blue-700 transition duration-300"
                        >
                            Verifikasi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verify;