/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalaman";
import { IntegerInput, TextInput, } from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Edit, Save, Download } from "lucide-react"; // Import ikon
import Swal from "sweetalert2";

const Kesehatan = () => {
    const [siswa, setSiswa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
    const navigate = useNavigate();
    const { id } = useParams();
    const [role, setRole] = useState(""); // State untuk menyimpan role pengguna

    // 🔥 Ambil Role dari API /auth/me
    useEffect(() => {
        axios.get(baseUrl + "/auth/me", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
            .then((res) => {
                console.log("Role pengguna:", res.data); // Debugging
                setRole(res.data.role); // Pastikan state diperbarui
            }) // Ambil role dari response API
            .catch((err) => console.error("Gagal mengambil data user:", err));
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    setError("ID tidak ditemukan");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${baseUrl}/admin/akun/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                });

                setSiswa(response.data);
            } catch (err) {
                setError("Gagal mengambil data siswa");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const backButton = () => {
        navigate(`/admin/lihat/${id}/perkembangansiswa`);
    };

    const nextButton = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan!',
            text: 'Anda akan dialihkan ke halaman data siswa. Apakah Anda yakin ingin melanjutkan?',
            showCancelButton: true,
            confirmButtonText: 'Lanjutkan',
            cancelButtonText: 'Batal',
        }).then((result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("token"); // Simpan token sebelum clear
                localStorage.clear(); // Hapus semua data
                if (token) {
                    localStorage.setItem("token", token); // Simpan kembali token
                }
                navigate(`/admin/datasiswa`);
            }
        });
    };

    const handleEdit = () => {
        setIsEditing(true); // Aktifkan mode edit
    };

    const handleChange = (e, field) => {
        setSiswa((prev) => ({
            ...prev,
            setelah_pendidikan: {
                ...prev.setelah_pendidikan,
                [field]: e.target.value,
            },
        }));
    };

    const handleSave = async () => {
        try {

            const setelah_pendidikan = {
                ...siswa.setelah_pendidikan, // Tambahkan status perubahan
                status_perubahan: "approved",
            };

            console.log("Struktur siswa yang dikirim:", JSON.stringify(setelah_pendidikan, null, 2));

            const response = await axios.put(baseUrl + `/admin/data-diri/${id}`, { setelah_pendidikan }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });

            console.log("Response dari backend:", response.data);
            setIsEditing(false); // Kembali ke mode lihat setelah sukses
            Swal.fire({
                icon: 'success',
                title: 'Data Berhasil diperbarui',
                confirmButtonText: 'OK',
            })
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Gagal menyimpan perubahan',
                confirmButtonText: 'OK',
            })
        }
    };

    const getUnit = (field) => {
        switch (field) {
            case "bekerja_penghasilan":
                return "Rp";
        }
    };
    const downloadPdf = async () => {
        console.log(baseUrl, id)
        const response = await axios.get(`${baseUrl}/admin/export-pdf/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            responseType: 'blob', // Untuk menerima data dalam format blob (binary large object)
        });
        console.log(localStorage.getItem("token"))
        // Buat URL dari blob yang diterima
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf'); // Nama file yang diunduh
        document.body.appendChild(link);
        link.click();

        // Hapus URL dan elemen link setelah selesai
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-gray-100 w-screen px-10 pb-6 h-screen overflow-y-auto text-xl">
            {/* Profil dan Input Halaman */}
            <div className="my-10 w-full flex flex-col gap-6">
                <Profil />
                <InputHalaman />
            </div>

            {/* Tombol Edit / Simpan dan Unduh */}
            <div className="flex items-center justify-end gap-4 my-6">
                <button
                    onClick={isEditing ? handleSave : handleEdit}
                    className={`flex items-center gap-2 px-6 py-2 rounded-md shadow-md hover:shadow-lg transition duration-300 text-white ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                    {isEditing ? "Simpan" : "Ubah"}
                </button>
                <button
                    onClick={downloadPdf}
                    className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                >
                    <Download className="w-5 h-5" />
                    Unduh
                </button>
            </div>

            {/* Form Data Diri */}
            <HeaderInput title={"Selesai Pendidikan"} word={"J"} form={"admin"} />
            <div className="bg-white shadow-md p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { label: "Melanjutkan Ke", field: "melanjutkan_ke" },
                        { label: "Bekerja : Nama Perusahaan", field: "bekerja_nama_perusahaan" },
                        { label: "Bekerja : Tanggal Mulai", field: "bekerja_tanggal_mulai", type: "date" },
                        { label: "Bekerja : Penghasilan", field: "bekerja_penghasilan", type: "integer" },
                    ].map(({ label, field, type }, index) => (
                        <div key={index} className="flex flex-col">
                            <label className="text-gray-700 font-medium mb-1">{label}</label>
                            {type === 'date' ? (
                                <DatePicker
                                    selected={siswa.setelah_pendidikan[field] ? new Date(siswa.setelah_pendidikan[field]) : null}
                                    onChange={(date) => isEditing && handleChange({ target: { value: date } }, field)}
                                    dateFormat={"dd-MM-yyyy"}
                                    className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 py-2 px-4 w-[50%] rounded-lg shadow-sm transition duration-300 ease-in-out focus:outline-none"
                                    disabled={!isEditing}
                                />
                            ) : type === 'integer' ? (
                                <div>
                                    <span className="mr-8">{getUnit(field)}</span>
                                    <IntegerInput
                                        value={siswa.setelah_pendidikan[field]}
                                        onChange={(e) => isEditing && handleChange(e, field)}
                                        className="input-field"
                                        disabled={!isEditing}
                                    />
                                </div>
                            ) : (
                                <TextInput
                                    value={siswa.setelah_pendidikan[field]}
                                    onChange={(e) => isEditing && handleChange(e, field)}
                                    className="input-field"
                                    disabled={!isEditing}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Tombol Next & Back */}
            <div className="flex justify-end space-x-4">
                <Nextbefore next={nextButton} back={backButton} lastpage={true} />
            </div>
        </div>
    );
};

export default Kesehatan;