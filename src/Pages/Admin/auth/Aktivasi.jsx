/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../utils/constan";
import { FiCheckCircle } from "react-icons/fi";

const Aktivasi = () => {
    const navigate = useNavigate();

    const [tokenInput, setTokenInput] = useState(""); // Token dari input manual
    const [nama, setNama] = useState("");
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + "/data-sekolah")
            .then((res) => {
                setNama(res.data.nama);
                setLogo(res.data.logo);
            })
            .catch((err) => console.error("Gagal mengambil data sekolah:", err));
    }, []);


    const handleManualVerification = () => {
        if (!tokenInput) {
            Swal.fire({
                icon: "error",
                title: "Token Kosong",
                text: "Silakan masukkan token verifikasi dari email!",
            });
            return;
        }
        localStorage.setItem("token-verifikasi", tokenInput); // Simpan token ke localStorage
        navigate(`/admin/verify/` + tokenInput)
    };    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 px-4">
            <div className="relative flex items-center w-full max-w-xl bg-white backdrop-blur-lg shadow-xl rounded-xl overflow-hidden border border-white/10 p-8">
                <div className="w-full text-center flex flex-col items-center">
                    <p className="text-black text-sm">Langkah 2 dari 2</p>
                    <p className="text-black font-bold text-3xl mt-2">Aktivasi Akun</p>

                    <img
                        src={`data:image/png;base64,${logo}`}
                        alt="Logo Sekolah"
                        className="w-40 h-40 rounded-full shadow-lg mt-4"
                    />

                    <p className="text-black font-bold text-2xl mt-3">{nama}</p>

                    <p className="text-black text-lg w-3/4 mt-4">
                        Masukkan token verifikasi di bawah untuk mengaktifkan akun Anda!
                    </p>

                    <input
                            type="text"
                            value={tokenInput}
                            onChange={(e) => setTokenInput(e.target.value)}
                            className="w-[80%] p-3 mt-4 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleManualVerification}
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
                        >
                            Verifikasi Token
                        </button>
                </div>
            </div>
        </div>
    );
};

export default Aktivasi;
