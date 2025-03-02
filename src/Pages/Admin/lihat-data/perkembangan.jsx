import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../Components/profileCard";
import InputHalaman from "../../../Components/pilihHalamanV2";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import HeaderInput from "../../../Components/headerInput";
import DatePicker from "react-datepicker";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-2xl">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      {/* Tombol Edit / Simpan */}
      <div className="flex justify-center">
        {!isEditing ? (
          <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Ubah Data
          </button>
        ) : (
          <button onClick={handleSave} className="bg-green-800 text-white px-4 py-2 rounded">
            Simpan
          </button>
        )}
      </div>
      <HeaderInput title={"Perkembangan Siswa"} word={"I"} form={"admin"} />
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