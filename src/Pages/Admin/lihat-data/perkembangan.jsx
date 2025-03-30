import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalaman";
import {TextInput} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
import DatePicker from "react-datepicker";
import { Edit, Save, Download } from "lucide-react"; // Import ikon

const Biodata = () => {
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
    navigate(`/admin/lihat/${id}/hobi`);
  };

  const nextButton = () => {
    navigate(`/admin/lihat/${id}/selesai`);
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const handleChange = (e, field) => {
    setSiswa((prev) => ({
      ...prev,
      perkembangan: {
        ...prev.perkembangan,
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
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-2xl">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      {/* Tombol Edit / Simpan dan Unduh */}
      <div className="flex items-center justify-end gap-5 my-5">
        <div className="flex justify-end my-4">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              disabled={role === "petugas"}
              className={`flex items-center gap-2 px-6 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg
                ${role === "petugas" ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              <Edit className="w-5 h-5" />
              Ubah
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-900 transition duration-300 shadow-md hover:shadow-lg"
            >
              <Save className="w-5 h-5" />
              Simpan
            </button>
          )}
        </div>
        <div>
          <button
            onClick={downloadPdf}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            <Download className="w-5 h-5" />
            Unduh
          </button>
        </div>
      </div>
      <HeaderInput title={"Perkembangan Siswa"} word={"I"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            {[
              { label: "Menerima Beasiswa Tahun Kelas Dari", field: "menerima_bea_siswa_tahun_kelas_dari" },
              { label: "Tanggal Meninggalkan Sekolah", field: "meninggalkan_sekolah_ini_tanggal", type: "date" },
              { label: "Alasan Meninggalkan Sekolah", field: "meninggalkan_sekolah_ini_alasan" },
              { label: "Lulus Tahun", field: "akhir_pendidikan_tamat_belajar_lulus_tahun" },
              { label: "Nomor dan Tanggal Ijazah", field: "akhir_pendidikan_no_tanggal_ijazah" },
              { label: "Nomor dan Tanggal SKHUN", field: "akhir_pendidikan_no_tanggal_skhun" },
            ].map(({ label, field, type }, index) => (
              <tr key={index}>
                <td className="w-[63%] h-full">
                  <label className="py-1">{label}</label>
                </td>
                <td className="w-[37%] h-full">
                  {type === 'date' ? (
                    <DatePicker
                      value={siswa.perkembangan[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full w-1/2 px-4 py-2 bg-[#DEE0E1] rounded-lg"
                      disabled={!isEditing}
                    />
                  ) : (
                    <TextInput
                      value={siswa.perkembangan[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  )}
                </td>
              </tr>
            ))}

            {/* Input Tanggal Lahir */}
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tanggal Lahir</label>
              </td>
              <td className="w-[37%] h-full rounded-lg">
                <DatePicker
                  selected={new Date(siswa.data_diri.tanggal_lahir)}
                  onChange={(date) =>
                    isEditing &&
                    setSiswa((prev) => ({
                      ...prev,
                      data_diri: { ...prev.data_diri, tanggal_lahir: date },
                    }))
                  }
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
                  disabled={!isEditing}
                />
              </td>
            </tr>

            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Anak Yatim</label>
              </td>
              <td className="w-[37%] h-full">
                <select
                  name="anak_yatim"
                  value={siswa.data_diri.kelengkapan_ortu || ""}
                  className="w-full bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                  onChange={(e) =>
                    isEditing &&
                    setSiswa((prev) => ({
                      ...prev,
                      data_diri: { ...prev.data_diri, kelengkapan_ortu: e.target.value },
                    }))
                  }
                  disabled={!isEditing} // Hanya bisa diubah saat mode edit
                >
                  <option value="" hidden>Pilih</option>
                  <option value="lengkap">Lengkap</option>
                  <option value="yatim">Yatim</option>
                  <option value="piatu">Piatu</option>
                  <option value="yatim piatu">Yatim Piatu</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default Biodata;