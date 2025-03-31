/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalaman";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
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
    const token = localStorage.getItem("token"); // Simpan token sebelum clear
    localStorage.clear(); // Hapus semua data
    if (token) {
        localStorage.setItem("token", token); // Simpan kembali token
    }
    navigate("/admin/dashboard");
  };

  const nextButton = () => {
    navigate(`/admin/lihat/${id}/tempattinggal`);
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const handleChange = (e, field) => {
    setSiswa((prev) => ({
      ...prev,
      data_diri: {
        ...prev.data_diri,
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
    const nama = siswa.data_diri.nama_lengkap
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
    link.setAttribute('download', `${nama}.pdf`); // Nama file yang diunduh
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
              className="flex items-center gap-2 px-6 py-2 rounded-md transition duration-300 shadow-md hover:shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
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
      <HeaderInput title={"Data Diri Siswa"} word={"A"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            {[
              { label: "Nama Lengkap", field: "nama_lengkap" },
              { label: "Nama Panggilan", field: "nama_panggilan" },
              { label: "Jenis Kelamin", field: "jenis_kelamin", type: "radio" },
              { label: "Tempat Lahir", field: "tempat_lahir" },
              { label: "Agama", field: "agama" },
              { label: "Kewarganegaraan", field: "kewarganegaraan" },
              { label: "Anak ke", field: "anak_ke", type: "integer" },
              { label: "Jumlah Saudara Kandung", field: "jml_saudara_kandung", type: "integer" },
              { label: "Jumlah Saudara Tiri", field: "jml_saudara_tiri", type: "integer" },
              { label: "Jumlah Saudara Angkat", field: "jml_saudara_angkat", type: "integer" },
              { label: "Bahasa Sehari-hari", field: "bahasa_sehari_hari" },
            ].map(({ label, field, type }, index) => (
              <tr key={index}>
                <td className="w-[63%] h-full">
                  <label className="py-1">{label}</label>
                </td>
                <td className="w-[37%] h-full">
                  {type === "integer" ? (
                    <IntegerInput
                      value={siswa.data_diri[field]}
                      onChange={(e) => isEditing && handleChange(e, "kelengkapan_ortu")}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : type === "radio" ? (
                    <RadioInput
                      value={siswa.data_diri[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : (
                    <TextInput
                      value={siswa.data_diri[field]}
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