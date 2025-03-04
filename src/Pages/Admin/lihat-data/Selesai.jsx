import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../Utils/constan";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalaman";
import {
    TextInput,
    IntegerInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
// import DatePicker from "react-datepicker";

const Kesehatan = () => {
    const [siswa, setSiswa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
    const navigate = useNavigate();
    const { id } = useParams();

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
        navigate(`/admin/lihat/${id}/perkembangan`);
    };

    const nextButton = () => {
        navigate(`/admin/dashboard`);
    };

    const handleEdit = () => {
        setIsEditing(true); // Aktifkan mode edit
    };

    const handleChange = (e, field) => {
        setSiswa((prev) => ({
            ...prev,
            kesehatan: {
                ...prev.kesehatan,
                [field]: e.target.value,
            },
        }));
    };

    const handleSave = async () => {
        try {
            console.log("Data yang dikirim ke backend:", siswa);
            const response = await axios.put(baseUrl + `/admin/data-diri/${id}`, siswa, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Response dari backend:", response.data);
            setIsEditing(false); // Kembali ke mode lihat setelah sukses
            alert("Data berhasil diperbarui!");
        } catch (err) {
            alert("Gagal menyimpan perubahan");
        }
    };

    const getUnit = (field) => {
        switch (field) {
            case "tinggi":
                return "cm";
            case "berat_badan":
                return "kg";
            case "suhu":
                return "°C";
            default:
                return "";
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-2xl">
            <div className="my-10 w-full"><Profil /></div>
            <div><InputHalaman /></div>
            <HeaderInput
                title={"Selesai Pendidikan"}
                word={"J"}
                form={"admin"}
                lastpage={true} />
            <div className="bg-white p-6 flex items-center justify-center">
                <table className="w-3/4 font-body border-separate border-spacing-4">
                    <tbody>
                        {[
                            { label: "Penyakit", field: "penyakit_pernah_diderita" },
                            { label: "Kelainan Jasmani", field: "kelainan_jasmani" },
                            { label: "Tinggi Badan (cm)", field: "tinggi", type: "integer" },
                            { label: "Berat Badan", field: "berat_badan", type: "integer" },
                        ].map(({ label, field, type }, index) => (
                            <tr key={index}>
                                <td className="w-[63%] h-full">
                                    <label className="py-1">{label}</label>
                                </td>
                                <td className="w-[37%] h-full">
                                    {type === "integer" ? (
                                        <div className="flex items-center">
                                            <IntegerInput
                                                value={siswa.kesehatan[field]}
                                                onChange={(e) => isEditing && handleChange(e, field)}
                                                className="h-full"
                                                disabled={!isEditing}
                                            />
                                            <span className="ml-2 text-lg text-black">
                                                {getUnit(field)}
                                            </span>
                                        </div>
                                    ) : (
                                        <TextInput
                                            value={siswa.kesehatan[field]}
                                            onChange={(e) => isEditing && handleChange(e, field)}
                                            className="h-full"
                                            disabled={!isEditing}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}

                        <tr>
                            <td className="w-[63%] h-full">
                                <label className="py-1">Golongan Darah</label>
                            </td>
                            <td className="w-[37%] h-full">
                                <select
                                    name="anak_yatim"
                                    value={siswa.kesehatan.gol_darah || ""}
                                    className="w-full bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                                    onChange={(e) =>
                                        isEditing &&
                                        setSiswa((prev) => ({
                                            ...prev,
                                            kesehatan: { ...prev.kesehatan, gol_darah: e.target.value },
                                        }))
                                    }
                                    disabled={!isEditing} // Hanya bisa diubah saat mode edit
                                >
                                    <option value="" hidden>Pilih</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="AB">AB</option>
                                    <option value="O">O</option>
                                    <option value="lainnya">Lainnya</option>
                                    <option value="tidak_diketahui">Tidak diketahui</option>
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Tombol Edit / Simpan */}
            <div className="flex justify-center mt-4">
                {!isEditing ? (
                    <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Edit
                    </button>
                ) : (
                    <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
                        Simpan
                    </button>
                )}
            </div>

            <div>
                <Nextbefore next={nextButton} back={backButton} lastpage={true} />
            </div>
        </div>
    );
};

export default Kesehatan;