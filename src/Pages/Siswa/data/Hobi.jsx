import HeaderInput from "../../../Components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
} from "../../../Components/inputComponent";
import Nextbefore from "../../../Components/nextbefore";
import { useNavigate, useParams } from "react-router";

import uploadAll from "../../../Utils/uploadAll";
import Swal from "sweetalert2";

/* 

=====================================================================================================
                    D A T A _ H O B I _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const Hobi = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [olahraga, setOlahraga] = useState("");
  const [kesenian, setKesenian] = useState("");
  const [organisasi, setOrganisasi] = useState("");
  const [lainlain, setLainlain] = useState("");

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("hobi-kesenian") !== "null")
      setKesenian(localStorage.getItem("hobi-kesenian"));
    if (localStorage.getItem("hobi-olahraga") !== "null")
      setOlahraga(localStorage.getItem("hobi-olahraga"));
    if (localStorage.getItem("hobi-organisasi") !== "null")
      setOrganisasi(localStorage.getItem("hobi-organisasi"));
    if (localStorage.getItem("hobi-lainlain") !== "null")
      setLainlain(localStorage.getItem("hobi-lainlain"));
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/wali`);
  };

  const nextButton = () => {
    // Simpan data ke localStorage secara ringkas
    const hobiKeys = ["kesenian", "olahraga", "organisasi", "lainlain"];
    const hobiValues = [kesenian, olahraga, organisasi, lainlain];

    hobiKeys.forEach((key, index) => {
      localStorage.setItem(`hobi-${key}`, hobiValues[index] || null);
    });

    uploadAll()
  .then(() => {
    Swal.fire({
      title: "Berhasil!",
      text: "Data berhasil diupload.",
      icon: "success",
      confirmButtonText: "OK",
    });
    navigate("/siswa/login")
  })
  .catch((error) => {
    Swal.fire({
      title: "Gagal!",
      text: `Gagal mengupload data: ${error.message}`,
      icon: "error",
      confirmButtonText: "Coba Lagi",
    });
  });
  };

  return (
    <div className="bg-gray-100 w-screen min-h-screen px-8 py-6 text-lg overflow-y-auto">
      <HeaderInput title="Hobi Siswa" word="H" form="siswa" lastpage={true} />

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Hobi dan Minat</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1">Kesenian</label>
            <TextInput value={kesenian} onChange={(e) => setKesenian(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Olahraga</label>
            <TextInput value={olahraga} onChange={(e) => setOlahraga(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Organisasi/Kemasyarakatan</label>
            <TextInput value={organisasi} onChange={(e) => setOrganisasi(e.target.value)} />
          </div>

          <div>
            <label className="block font-medium mb-1">Lain-lain</label>
            <TextInput value={lainlain} onChange={(e) => setLainlain(e.target.value)} />
          </div>
        </div>
      </div>

      {/* Tombol Next & Back */}
      <div className="flex justify-end space-x-4">
        <Nextbefore next={nextButton} back={backButton} lastpage={true} />
      </div>
    </div>
  );
};
export default Hobi;
