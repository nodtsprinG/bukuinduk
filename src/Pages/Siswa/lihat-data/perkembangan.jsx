import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import Profil from "../../../Components/lihatprofil";
import InputHalaman from "../../../Components/pilihHalaman";
import { TextInput } from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseUrl } from "../../../utils/constan";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
/* 

=====================================================================================================
                    D A T A _ K E T E R A N G A N _ P E R K E M B A N G A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const KetPerkembanganSiswa = () => {
    const [siswa, setSiswa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    // Ambil ID dari localStorage
    const siswaId = localStorage.getItem("akun-id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!siswaId) {
                    setError("ID tidak ditemukan di localStorage");
                    setLoading(false);
                    return;
                }

                // Panggil API untuk mendapatkan data siswa
                const response = await axios.get(baseUrl + `/siswa/data-diri`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                setSiswa(response.data);
            } catch (err) {
                console.log(err)
                setError("Gagal mengambil data siswa", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [siswaId]);

    const backButton = () => {
        navigate("/siswa/lihat-data/hobi")
    }
    const nextButton = () => {
        navigate("/siswa/lihat-data/wali")
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll">
            <div className="my-10 w-full"><Profil /></div>
            <div><InputHalaman /></div>
            <HeaderInput
                title={"Perkembangan Siswa"}
                word={"I"}
                form={"siswa"}
            />
            <div className="bg-white p-6 flex items-center justify-center">
                <table className="w-3/4 font-body border-separate border-spacing-4 ">
                    <tbody>
                        <tr>
                            <td className="w=1/2 h-full">
                                <label className="py-1">Menerima Bea Siswa</label>
                            </td>
                            <td className="w-[63%] h-full">
                                <TextInput
                                    value={siswa.perkembangan?.perkembangan_bea_siswa_tahun_kelas_dari || "Tidak menerima beasiswa"}
                                    className="h-full"
                                />
                            </td>
                        </tr>
                        <tr>
                            <label className="py-1">Meninggalkan Sekolah</label>
                            <td className="w-[63%] h-full">
                                <label className="py-1">a. Tanggal</label>
                            </td>
                            <td className="w-[37%] h-full">
                                <DatePicker
                                    value={siswa.perkembangan.meninggalkan_sekolah_ini_tanggal}
                                    dateFormat={"dd-MM-yyyy"}
                                    className="w-full bg-[#DEE0E1] py-2 px-2 focus:outline-none rounded-lg"
                                    maxDate={new Date()}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="w=1/2 h-full">
                                <label className="py-1">b. Alasan</label>
                            </td>
                            <td className="w-[63%] h-full">
                                <TextInput
                                    value={siswa.perkembangan.meninggalkan_sekolah_ini_alasan}
                                    className="h-full"
                                />
                            </td>
                        </tr>
                        <tr>
                            <label className="py-1">Akhir Pendidikan</label>
                            <td className="w=1/2 h-full">
                                <label className="py-1">Tahun belajar/lulus</label>
                            </td>
                            <td className="w-[63%] h-full">
                                <TextInput
                                    value={siswa.perkembangan.meninggalkan_sekolah_ini_alasan}
                                    className="h-full"
                                />
                            </td>
                        </tr>
                        <tr>
                            <label className="py-1">Akhir Pendidikan</label>
                            <td className="w=1/2 h-full">
                                <label className="py-1">Nomor/Tanggal Ijazah</label>
                            </td>
                            <td className="w-[63%] h-full">
                                <TextInput
                                    value={siswa.perkembangan.akhir_pendidikan_no_tanggal_ijazah}
                                    className="h-full"
                                />
                            </td>
                        </tr>
                        <tr>
                            <label className="py-1">Akhir Pendidikan</label>
                            <td className="w=1/2 h-full">
                                <label className="py-1">Nomor/Tanggal SKHUN</label>
                            </td>
                            <td className="w-[63%] h-full">
                                <TextInput
                                    value={siswa.perkembangan.akhir_pendidikan_no_tanggal_skhun}
                                    className="h-full"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Nextbefore next={nextButton} back={backButton} />
        </div>
    );
};

export default KetPerkembanganSiswa;