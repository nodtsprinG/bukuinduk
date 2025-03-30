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
    navigate(`/admin/lihat/${id}/pendidikan`);
  };

  const nextButton = () => {
    navigate(`/admin/lihat/${id}/ibu`);
  };

  const handleEdit = () => {
    setIsEditing(true); // Aktifkan mode edit
  };

  const handleChange = (e, field) => {
    setSiswa((prev) => ({
      ...prev,
      ayah_kandung: {
        ...prev.ayah_kandung,
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
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
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
      <HeaderInput title={"Keterangan Ayah"} word={"E"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            {[
              { label: "Nama Ayah", field: "nama" },
              { label: "Tempat Lahir", field: "tempat_lahir" },
              { label: "Tanggal Lahir", field: "tanggal_lahir", type: "date" },
              { label: "Agama", field: "agama" },
              { label: "Kewarganegaraan", field: "kewarganegaraan" },
              { label: "Pendidikan", field: "pendidikan" },
              { label: "Pekerjaan", field: "pekerjaan" },
              { label: "Pengeluaran per Bulan", field: "pengeluaran_per_bulan" },
              { label: "Alamat/No Telepon", field: "alamat_dan_no_telepon" },
            ].map(({ label, field, type }, index) => (
              <tr key={index}>
                <td className="w-[63%] h-full">
                  <label className="py-1">{label}</label>
                </td>
                <td className="w-[37%] h-full">
                  {type === "integer" ? (
                    <IntegerInput
                      value={siswa.ayah_kandung[field]}
                      onChange={(e) => isEditing && handleChange(e, "kelengkapan_ortu")}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : type === "radio" ? (
                    <RadioInput
                      value={siswa.ayah_kandung[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full"
                      disabled={!isEditing}
                    />
                  ) : type === 'date' ? (
                    <DatePicker
                      value={siswa.ayah_kandung[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-full w-1/2 px-4 py-2 bg-[#DEE0E1] rounded-lg"
                      disabled={!isEditing}
                    />
                  ) : (
                    <TextInput
                      value={siswa.ayah_kandung[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className=" w-full h-full"
                      disabled={!isEditing}
                    />
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Status</label>
              </td>
              <td className="w-[37%] h-full">
                <select
                  name="status"
                  value={siswa.ayah_kandung.ayah_kandung || ""}
                  className="w-full bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                  onChange={(e) =>
                    isEditing &&
                    setSiswa((prev) => ({
                      ...prev,
                      ayah_kandung: { ...prev.ayah_kandung, status: e.target.value },
                    }))
                  }
                  disabled={!isEditing} // Hanya bisa diubah saat mode edit
                >
                  <option value="masih hidup">Masih Hidup</option>
                  <option value="meninggal">Meninggal</option>
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