import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../components/lihatprofil";
import InputHalaman from "../../../Components/pilihHalamanV2";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
import DatePicker from "react-datepicker";
import { Edit, Save } from "lucide-react";

const Biodata = () => {
  const [siswa, setSiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State untuk mode edit
  const navigate = useNavigate();
  const id = localStorage.getItem("akun-id")

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!id) {
          setError("ID tidak ditemukan");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${baseUrl}/siswa/data-diri`, {
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
    navigate(`/siswa/lihat-data/pendidikan`);
  };

  const nextButton = () => {
    navigate(`/siswa/lihat-data/ibu`);
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
      const ayah = siswa.ayah_kandung
      delete siswa.ayah_kandung.id
      console.log("Data yang dikirim ke backend:", ayah);
      const response = await axios.put(baseUrl + `/siswa/data-diri`, ayah, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response dari backend:", response.data);
      setIsEditing(false); // Kembali ke mode lihat setelah sukses
      window.alert("Tunggu Konfirmasi Admin!");
    } catch (err) {
      alert("Gagal menyimpan perubahan");
    }
  };

  const getUnit = (field) => {
    switch (field) {
      case "pengeluaran_per_bulan":
        return "Rp";
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
      <HeaderInput title={"Keterangan Ayah"} word={"E"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-y-2 border-spacing-x-4">
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
              <tr key={index} className="bg-white hover:bg-gray-50 transition duration-200">
                <td className="w-[60%] py-2 px-4 text-gray-700 font-medium">
                  <label>{label}</label>
                </td>
                <td className="w-[40%] py-2 px-4">
                  {type === "integer" ? (
                    <IntegerInput
                      value={siswa.ayah_kandung[field]}
                      onChange={(e) => isEditing && handleChange(e, "kelengkapan_ortu")}
                      className="h-10 w-full rounded-md bg-[#DEE0E1] text-black px-2 focus:ring-2 focus:ring-blue-500 transition duration-200"
                      disabled={!isEditing}
                    />
                  ) : type === "radio" ? (
                    <RadioInput
                      value={siswa.ayah_kandung[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-10"
                      disabled={!isEditing}
                    />
                  ) : type === "date" ? (
                    <DatePicker
                      value={siswa.ayah_kandung[field]}
                      onChange={(e) => isEditing && handleChange(e, field)}
                      className="h-10 w-full px-2 bg-[#DEE0E1] rounded-md text-black focus:ring-2 focus:ring-blue-500 transition duration-200"
                      disabled={!isEditing}
                    />
                  ) : (
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-600">{getUnit(field)}</span>
                      <TextInput
                        value={siswa.ayah_kandung[field]}
                        onChange={(e) => isEditing && handleChange(e, field)}
                        className="w-full h-10 rounded-md bg-[#DEE0E1] px-2 text-black focus:ring-2 focus:ring-blue-500 transition duration-200"
                        disabled={!isEditing}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
            <tr className="bg-white hover:bg-gray-50 transition duration-200">
              <td className="w-[60%] py-2 px-4 text-gray-700 font-medium">
                <label>Status</label>
              </td>
              <td className="w-[40%] py-2 px-4">
                <select
                  name="status"
                  value={siswa.ayah_kandung.status || ""}
                  className="w-full h-10 bg-[#DEE0E1] text-black p-2 rounded-md shadow-md focus:ring-2 focus:ring-blue-500 transition duration-200"
                  onChange={(e) =>
                    isEditing &&
                    setSiswa((prev) => ({
                      ...prev,
                      ayah_kandung: { ...prev.ayah_kandung, status: e.target.value },
                    }))
                  }
                  disabled={!isEditing}
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