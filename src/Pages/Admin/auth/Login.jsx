import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import { baseUrl } from "../../../utils/constan";
import Swal from "sweetalert2";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('status') === 'aktif') {
                navigate("/admin/dashboard")
            }
            else {
                navigate("/admin/auth/aktivasi")
            }
        }
    })

    const verify = () => {
        if (email.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Email Kosong',
                text: 'Silakan masukkan email Anda!',
                showConfirmButton: true,
            });
            return;
        } else if (password.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Password Kosong',
                text: 'Silakan masukkan password Anda!',
                showConfirmButton: true,
            });
            return;
        }
    
        console.log(email, password);
    
        axios.post(baseUrl + "/auth/login-admin", { email, password })
            .then((res) => {
                const { action, code } = res.data;
                console.log("Actionnya :", action)
    
                if (action === "need_code") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Kode Dikirim ke Email',
                        text: 'Silakan cek email Anda untuk verifikasi',
                        showConfirmButton: false,
                        timer: 2000
                    });
    
                    localStorage.setItem("akun-email", email);
                    navigate("/admin/auth/verification/" + code);
    
                } else if (action === "need_verification") {
                    Swal.fire({
                        icon: 'info',
                        title: 'Akun Belum Aktif',
                        text: 'Silakan aktivasi akun Anda terlebih dahulu',
                        showConfirmButton: false,
                        timer: 2000
                    });
    
                    navigate("/admin/auth/aktivasi");
    
                } else {
                    // fallback jika action tidak diketahui
                    Swal.fire({
                        icon: 'warning',
                        title: 'Respons Tidak Dikenal',
                        text: 'Mohon hubungi administrator',
                        showConfirmButton: true,
                    });
                }
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: err.response?.data?.message || 'Terjadi kesalahan pada server',
                    showConfirmButton: true,
                });
            });
    }    

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

                {/* Bagian Kanan - Form Login */}
                <div className="w-full md:w-1/2 px-10 py-12">
                    <p className="text-gray-500 text-sm">Langkah 1 dari 2</p>
                    <p className="text-gray-800 font-bold text-3xl mt-2">Masuk</p>
                    <div className="mt-8">
                        <label className="text-gray-600 text-sm font-semibold">Alamat Email</label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Masukkan email Anda"
                        />
                        <label className="text-gray-600 text-sm font-semibold mt-4 block">Kata Sandi</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Masukkan kata sandi"
                        />
                        <div className="flex justify-between items-center mt-6">
                            <button
                                onClick={() => navigate('/')}
                                className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition duration-300"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={verify}
                                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                            >
                                Masuk
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;