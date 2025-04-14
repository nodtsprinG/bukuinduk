import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../../utils/constan";

const VerifikasiToken = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Token:", token);
        if (!token) {
            Swal.fire({
                icon: "error",
                title: "Token Tidak Valid",
                text: "Token verifikasi tidak ditemukan.",
            }).then(() => navigate("/admin/login"));
            return;
        }

        axios.post(`${baseUrl}/verify`, {token})
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Akun Diaktifkan",
                    text: res.data.message || "Silakan login kembali.",
                    confirmButtonText: "Login",
                }).then(() => navigate("/admin/login"));
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Verifikasi Gagal",
                    text: err.response?.data?.message || "Token tidak valid atau sudah kadaluarsa.",
                    confirmButtonText: "Kembali",
                }).then(() => navigate("/admin/login"));
            });
    }, [token, navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white text-xl">
            Memverifikasi akun Anda...
        </div>
    );
};

export default VerifikasiToken;